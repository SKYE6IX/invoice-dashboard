import { RevenueType } from '@/modules/dashboard/revenue-chart/revenue-chart';

interface InvoiceType {
  status: string;
  amount: number;
}

export function sumUpAmount(invoices: InvoiceType[]) {
  const sum = invoices.reduce(
    (accumulator, currentValue) => {
      if (currentValue.status === 'paid') {
        accumulator.paidTotal += currentValue.amount;
      } else if (currentValue.status === 'pending') {
        accumulator.pendingTotal += currentValue.amount;
      }
      return accumulator;
    },
    { paidTotal: 0, pendingTotal: 0 }
  );
  return sum;
}

export const formatCurrency = (amount: number | null) => {
  if (amount) {
    return (amount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
  return (0 / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const generateYAxis = (revenues: RevenueType[]) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenues.map((revenue) => revenue.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US'
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  // // If the current page is among the last 3 pages,
  // // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
