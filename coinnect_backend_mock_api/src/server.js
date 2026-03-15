import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const quickActions = [
  { title: 'Split', subtitle: 'Rechnung teilen', tone: 'bg-[#e7b11a]/14 text-[#e7b11a]', icon: 'group' },
  { title: 'Zahlen', subtitle: 'Schnellzahlung', tone: 'bg-[#0d3d2a] text-[#22c55e]', icon: 'bank' },
  { title: 'Sparen', subtitle: 'Investment', tone: 'bg-[#e7b11a]/14 text-[#e7b11a]', icon: 'piggy' },
  { title: 'QR-Code', subtitle: 'Scannen', tone: 'bg-[#202632] text-[#cdd3df]', icon: 'qr' },
];

const groups = [
  { id: 1, name: 'WG 2026', members: ['Max', 'Anna', 'Tom', 'Erik'], balance: '+42,50 €', detail: 'Miete, Strom und Pizza-Abende', openPayments: 3 },
  { id: 2, name: 'Kino Crew', members: ['Lisa', 'Jan', 'Michael'], balance: '-12,40 €', detail: 'Tickets, Snacks und Parken', openPayments: 1 },
  { id: 3, name: 'Sommertrip', members: ['Sarah', 'Lukas', 'Nina', 'Alex', 'Paul'], balance: '+88,00 €', detail: 'Hotel, Benzin und Aktivitäten', openPayments: 2 },
];

const activities = [
  { id: 1, title: "Pizza bei Luigi's", subtitle: 'Mit Max, Anna, Tom', amount: '-15,50 €', date: '12. Jan.', positive: false, type: 'group' },
  { id: 2, title: 'Von Sarah', subtitle: '11. Jan.', amount: '+25,00 €', date: '', positive: true, type: 'incoming' },
  { id: 3, title: 'An Michael', subtitle: '10. Jan.', amount: '-50,00 €', date: '', positive: false, type: 'outgoing' },
  { id: 4, title: 'Kino Tickets', subtitle: 'Mit Lisa, Jan', amount: '-32,80 €', date: '9. Jan.', positive: false, type: 'group' },
  { id: 5, title: 'WG Miete von Erik', subtitle: '8. Jan.', amount: '+100,00 €', date: '', positive: true, type: 'incoming' },
];

let users = [
  {
    id: 1,
    name: 'Max Schmid',
    email: 'max@coinnect.at',
    password: '12345678',
    initials: 'MS',
    memberSince: 'Jänner 2026',
    activeGroups: 4,
    balance: '1.247,50 €',
  },
];

function toPublicUser(user) {
  const { password, ...publicUser } = user;
  return publicUser;
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Ungültige E-Mail oder Passwort.' });
  }

  res.json({ token: `demo-token-${user.id}`, user: toPublicUser(user) });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const existing = users.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase());

  if (existing) {
    return res.status(409).json({ message: 'Für diese E-Mail gibt es bereits ein Konto.' });
  }

  const initials = String(name || 'NN').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    initials,
    memberSince: 'Heute',
    activeGroups: 3,
    balance: '1.247,50 €',
  };

  users.push(newUser);
  res.status(201).json({ token: `demo-token-${newUser.id}`, user: toPublicUser(newUser) });
});

app.get('/api/app/overview', (_req, res) => {
  res.json({ user: toPublicUser(users[0]), quickActions, groups, activities });
});

app.get('/api/groups', (_req, res) => res.json(groups));
app.get('/api/history', (_req, res) => res.json(activities));
app.get('/api/profile', (_req, res) => res.json({ user: toPublicUser(users[0]), quickActions }));

process.on('unhandledRejection', (reason) => console.error('unhandledRejection:', reason));
process.on('uncaughtException', (error) => console.error('uncaughtException:', error));

app.listen(port, () => {
  console.log(`Coinnect mock backend listening on port ${port}`);
});
