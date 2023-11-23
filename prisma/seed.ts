import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {
  users,
  customers,
  invoices,
  revenues,
} from '../src/lib/placeholder-data';

const prisma = new PrismaClient();

async function seedUsers() {
  users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const insertedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        email: user.email,
        password: hashedPassword,
        name: user.name,
      },
    });
    console.log(insertedUser);
  });
}

async function seedCustomers() {
  customers.map(async (customer) => {
    const insertedCustomer = await prisma.customer.upsert({
      where: { email: customer.email },
      update: {},
      create: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        image_url: customer.image_url,
      },
    });
    console.log(insertedCustomer);
  });
}

async function seedInvoices() {
  invoices.map(async (invoice) => {
    const insertedInvoice = await prisma.invoice.createMany({
      data: [
        {
          customer_id: invoice.customer_id,
          status: invoice.status,
          amount: invoice.amount,
          date: invoice.date,
        },
      ],
    });
    console.log(insertedInvoice);
  });
}

async function seedRevenue() {
  revenues.map(async (revenue) => {
    const insertedRevenue = await prisma.revenue.createMany({
      data: [
        {
          month: revenue.month,
          revenue: revenue.revenue,
        },
      ],
    });
    console.log(insertedRevenue);
  });
}

(async () => {
  await Promise.all([
    seedUsers(),
    seedCustomers(),
    seedInvoices(),
    seedRevenue(),
  ])
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });
})();
