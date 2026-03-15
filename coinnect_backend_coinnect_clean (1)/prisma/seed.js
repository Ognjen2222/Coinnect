import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const demoPassword = 'Coinnect!2026#Demo';
const annaPassword = 'AnnaSecure!2026#Group';

function euro(cents) {
  return new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

async function main() {
  await prisma.expenseShare.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  const [maxHash, annaHash, lisaHash] = await Promise.all([
    bcrypt.hash(demoPassword, 10),
    bcrypt.hash(annaPassword, 10),
    bcrypt.hash('LisaWallet!2026#Pay', 10),
  ]);

  const max = await prisma.user.create({
    data: {
      email: 'max@coinnect.at',
      passwordHash: maxHash,
      name: 'Max Schmid',
      initials: 'MS',
      memberSince: 'Jänner 2026',
      balanceDisplay: euro(124750),
    },
  });

  const anna = await prisma.user.create({
    data: {
      email: 'anna@coinnect.at',
      passwordHash: annaHash,
      name: 'Anna Berger',
      initials: 'AB',
      memberSince: 'Februar 2026',
      balanceDisplay: euro(4820),
    },
  });

  const lisa = await prisma.user.create({
    data: {
      email: 'lisa@coinnect.at',
      passwordHash: lisaHash,
      name: 'Lisa Hofer',
      initials: 'LH',
      memberSince: 'Februar 2026',
      balanceDisplay: euro(-1260),
    },
  });

  const wg = await prisma.group.create({
    data: {
      name: 'WG Wien',
      description: 'Miete, Einkäufe und gemeinsame Kosten',
      color: 'green',
    },
  });

  const cityTrip = await prisma.group.create({
    data: {
      name: 'Barcelona Trip',
      description: 'Flüge, Tickets und gemeinsame Ausgaben',
      color: 'gold',
    },
  });

  const office = await prisma.group.create({
    data: {
      name: 'Office Lunch',
      description: 'Mittagessen und kleine Teamkosten',
      color: 'slate',
    },
  });

  await prisma.groupMember.createMany({
    data: [
      { userId: max.id, groupId: wg.id, role: 'owner' },
      { userId: anna.id, groupId: wg.id, role: 'member' },
      { userId: lisa.id, groupId: wg.id, role: 'member' },
      { userId: max.id, groupId: cityTrip.id, role: 'owner' },
      { userId: anna.id, groupId: cityTrip.id, role: 'member' },
      { userId: lisa.id, groupId: cityTrip.id, role: 'member' },
      { userId: max.id, groupId: office.id, role: 'owner' },
      { userId: anna.id, groupId: office.id, role: 'member' },
    ],
  });

  const pizza = await prisma.expense.create({
    data: {
      title: "Pizza bei Luigi's",
      amountCents: 1550,
      groupId: office.id,
      paidById: max.id,
      paidAt: new Date('2026-01-12T18:30:00Z'),
      shares: {
        create: [
          { userId: max.id, shareCents: 517 },
          { userId: anna.id, shareCents: 517 },
          { userId: lisa.id, shareCents: 516 },
        ],
      },
    },
  });

  const tickets = await prisma.expense.create({
    data: {
      title: 'Kino Tickets',
      amountCents: 3280,
      groupId: cityTrip.id,
      paidById: max.id,
      paidAt: new Date('2026-01-09T20:00:00Z'),
      shares: {
        create: [
          { userId: max.id, shareCents: 1094 },
          { userId: anna.id, shareCents: 1093 },
          { userId: lisa.id, shareCents: 1093 },
        ],
      },
    },
  });

  await prisma.activity.createMany({
    data: [
      {
        type: 'expense',
        title: pizza.title,
        subtitle: 'Mit Max, Anna, Tom',
        amountCents: -1550,
        direction: 'out',
        userId: max.id,
        groupId: office.id,
        happenedAt: new Date('2026-01-12T18:30:00Z'),
      },
      {
        type: 'incoming',
        title: 'Von Sarah',
        subtitle: 'Teilrückzahlung',
        amountCents: 2500,
        direction: 'in',
        userId: max.id,
        happenedAt: new Date('2026-01-11T12:00:00Z'),
      },
      {
        type: 'outgoing',
        title: 'An Michael',
        subtitle: 'Ausgleich gesendet',
        amountCents: -5000,
        direction: 'out',
        userId: max.id,
        happenedAt: new Date('2026-01-10T15:45:00Z'),
      },
      {
        type: 'expense',
        title: tickets.title,
        subtitle: 'Mit Lisa, Jan',
        amountCents: -3280,
        direction: 'out',
        userId: max.id,
        groupId: cityTrip.id,
        happenedAt: new Date('2026-01-09T20:00:00Z'),
      },
      {
        type: 'incoming',
        title: 'WG Miete von Erik',
        subtitle: 'Monatlicher Beitrag',
        amountCents: 10000,
        direction: 'in',
        userId: max.id,
        groupId: wg.id,
        happenedAt: new Date('2026-01-08T08:30:00Z'),
      }
    ]
  });

  console.log('Coinnect seed complete');
  console.log('Demo login: max@coinnect.at / ' + demoPassword);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
