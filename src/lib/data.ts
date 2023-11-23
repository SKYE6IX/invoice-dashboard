import prisma from './prisma';
import { formatCurrency, sumUpAmount } from './utils';

export async function fetchCardData() {
  try {
    const pendingInvoiceStatus = await prisma.invoice.aggregate({
      where: {
        status: 'pending',
      },
      _sum: {
        amount: true,
      },
    });
    const paidInvoiceStatus = await prisma.invoice.aggregate({
      where: {
        status: 'paid',
      },
      _sum: {
        amount: true,
      },
    });

    const numberOfInvoices = await prisma.invoice.count();
    const numberOfCustomers = await prisma.customer.count();

    const totalPendingInvoices = formatCurrency(
      pendingInvoiceStatus._sum.amount
    )!;
    const totalPaidInvoices = formatCurrency(paidInvoiceStatus._sum.amount)!;
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function fetchRevenue() {
  try {
    const revenues = await prisma.revenue.findMany();
    return revenues;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function fetchLatestInvoices() {
  try {
    const latestInvoice = await prisma.invoice.findMany({
      select: {
        amount: true,
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: 5,
    });
    return latestInvoice;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const filterdInvoices = await prisma.invoice.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      select: {
        id: true,
        amount: true,
        date: true,
        status: true,
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
      where: {
        OR: [
          {
            customer: {
              name: {
                contains: `%${query}%`,
              },
            },
          },
          {
            customer: {
              email: {
                contains: `%${query}%`,
              },
            },
          },
          {
            date: {
              contains: `%${query}%`,
            },
          },
          {
            status: {
              contains: `%${query}%`,
            },
          },
        ],
      },
      orderBy: {
        date: 'desc',
      },
    });
    return filterdInvoices;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetched filtered invoice');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const totalCount = await prisma.invoice.count({
      where: {
        OR: [
          {
            date: {
              contains: `%${query}%`,
            },
          },
          {
            status: {
              contains: `%${query}%`,
            },
          },
          {
            customer: {
              name: {
                contains: `%${query}%`,
              },
            },
          },
          {
            customer: {
              email: {
                contains: `%${query}%`,
              },
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
    throw new Error('Faield to fetch invoices pages');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const singleInvoice = await prisma.invoice.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        customer_id: true,
        status: true,
        amount: true,
      },
    });
    return singleInvoice;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch single invoice');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return customers;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch all customer');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        _count: {
          select: {
            invoices: true,
          },
        },
        invoices: {
          select: {
            status: true,
            amount: true,
          },
        },
      },
      where: {
        OR: [
          {
            name: {
              contains: `%${query}%`,
            },
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
    });
    const filterdCustomer = data.map((d) => {
      return {
        ...d,
        totalInvoice: d._count.invoices,
        totalPending: formatCurrency(sumUpAmount(d.invoices).pendingTotal),
        totalPaid: formatCurrency(sumUpAmount(d.invoices).paidTotal),
      };
    });
    return filterdCustomer;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch filterd customer');
  }
}

export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get user!');
  }
}
