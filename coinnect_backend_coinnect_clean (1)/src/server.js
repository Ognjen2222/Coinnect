import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT || 3001);
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const jwtSecret = process.env.JWT_SECRET || 'coinnect-dev-secret-change-me';

app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json());

function euro(cents) {
  return new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
}

function sanitizeUser(user, activeGroups = 0) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    initials: user.initials,
    memberSince: user.memberSince,
    activeGroups,
    balance: user.balanceDisplay,
  };
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Nicht eingeloggt.' });
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await prisma.user.findUnique({ where: { id: Number(payload.sub) } });
    if (!user) return res.status(401).json({ message: 'Benutzer nicht gefunden.' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Token ungültig.' });
  }
}

app.get('/api/health', (_req, res) => res.json({ ok: true, app: 'coinnect-backend' }));

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, E-Mail und Passwort sind erforderlich.' });
  }
  if (String(password).length < 10) {
    return res.status(400).json({ message: 'Passwort muss mindestens 10 Zeichen lang sein.' });
  }
  const existing = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
  if (existing) return res.status(409).json({ message: 'E-Mail ist bereits registriert.' });
  const passwordHash = await bcrypt.hash(password, 10);
  const initials = String(name).split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const memberSince = new Intl.DateTimeFormat('de-AT', { month: 'long', year: 'numeric' }).format(new Date());
  const user = await prisma.user.create({
    data: {
      name,
      email: String(email).toLowerCase(),
      passwordHash,
      initials,
      memberSince,
      balanceDisplay: euro(0),
    },
  });
  const token = signToken(user);
  res.status(201).json({ token, user: sanitizeUser(user, 0) });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await prisma.user.findUnique({ where: { email: String(email || '').toLowerCase() } });
  if (!user) return res.status(401).json({ message: 'E-Mail oder Passwort falsch.' });
  const valid = await bcrypt.compare(String(password || ''), user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'E-Mail oder Passwort falsch.' });
  const activeGroups = await prisma.groupMember.count({ where: { userId: user.id } });
  res.json({ token: signToken(user), user: sanitizeUser(user, activeGroups) });
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  const activeGroups = await prisma.groupMember.count({ where: { userId: req.user.id } });
  res.json({ user: sanitizeUser(req.user, activeGroups) });
});

app.get('/api/home', authMiddleware, async (req, res) => {
  const [userGroups, activities] = await Promise.all([
    prisma.groupMember.findMany({
      where: { userId: req.user.id },
      include: { group: true },
      take: 4,
    }),
    prisma.activity.findMany({
      where: { userId: req.user.id },
      orderBy: { happenedAt: 'desc' },
      take: 5,
    }),
  ]);

  res.json({
    balance: req.user.balanceDisplay,
    quickActions: [
      { key: 'split', label: 'Split', subtitle: 'Rechnung teilen' },
      { key: 'pay', label: 'Zahlen', subtitle: 'Schnellzahlung' },
      { key: 'save', label: 'Sparen', subtitle: 'Investment' },
      { key: 'qr', label: 'QR-Code', subtitle: 'Scannen' },
    ],
    groups: userGroups.map(({ group }) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      color: group.color,
    })),
    recentActivities: activities.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      amount: euro(item.amountCents),
      amountCents: item.amountCents,
      direction: item.direction,
      date: new Intl.DateTimeFormat('de-AT', { day: 'numeric', month: 'short' }).format(item.happenedAt),
      type: item.type,
    })),
  });
});

app.get('/api/activities', authMiddleware, async (req, res) => {
  const activities = await prisma.activity.findMany({
    where: { userId: req.user.id },
    orderBy: { happenedAt: 'desc' },
  });
  res.json(activities.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    amount: euro(item.amountCents),
    amountCents: item.amountCents,
    direction: item.direction,
    date: new Intl.DateTimeFormat('de-AT', { day: 'numeric', month: 'short' }).format(item.happenedAt),
    type: item.type,
  })));
});

app.get('/api/groups', authMiddleware, async (req, res) => {
  const groups = await prisma.groupMember.findMany({
    where: { userId: req.user.id },
    include: {
      group: {
        include: {
          members: { include: { user: true } },
          expenses: { orderBy: { paidAt: 'desc' }, take: 3, include: { paidBy: true } },
        },
      },
    },
  });

  res.json(groups.map(({ group }) => ({
    id: group.id,
    name: group.name,
    description: group.description,
    color: group.color,
    members: group.members.map((m) => ({ id: m.user.id, name: m.user.name, initials: m.user.initials })),
    latestExpenses: group.expenses.map((e) => ({ title: e.title, amount: euro(e.amountCents), paidBy: e.paidBy.name })),
  })));
});

app.post('/api/groups', authMiddleware, async (req, res) => {
  const { name, description } = req.body || {};
  if (!name) return res.status(400).json({ message: 'Gruppenname fehlt.' });
  const group = await prisma.group.create({ data: { name, description: description || '', color: 'gold' } });
  await prisma.groupMember.create({ data: { groupId: group.id, userId: req.user.id, role: 'owner' } });
  await prisma.activity.create({
    data: {
      type: 'group',
      title: `Gruppe ${name} erstellt`,
      subtitle: 'Du bist der Gruppenadmin',
      amountCents: 0,
      direction: 'neutral',
      userId: req.user.id,
      groupId: group.id,
    },
  });
  res.status(201).json({ id: group.id, name: group.name, description: group.description, color: group.color, members: [{ id: req.user.id, name: req.user.name, initials: req.user.initials }], latestExpenses: [] });
});

app.get('/api/profile', authMiddleware, async (req, res) => {
  const activeGroups = await prisma.groupMember.count({ where: { userId: req.user.id } });
  res.json({
    ...sanitizeUser(req.user, activeGroups),
    notifications: 1,
    settings: [
      { key: 'send', label: 'Senden', enabled: true },
      { key: 'request', label: 'Anfordern', enabled: true },
      { key: 'split', label: 'Split', enabled: true },
      { key: 'qr', label: 'QR-Code', enabled: true },
    ],
  });
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Coinnect backend running on http://localhost:${port}`);
});
