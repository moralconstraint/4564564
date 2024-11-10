import { Transaction } from '@/lib/transactions';

export function exportToCSV(data: any[], filename: string) {
  // Define headers based on the first object's keys
  const headers = Object.keys(data[0]);
  
  // Convert data to CSV format
  const csvContent = [
    // Headers row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle dates
        if (value instanceof Date) {
          return value.toLocaleString();
        }
        // Handle strings with commas
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportOrders(orders: Transaction[]) {
  const formattedOrders = orders.map(order => ({
    Order_ID: order.id,
    Product: order.description,
    Date: new Date(order.date).toLocaleString(),
    Amount: `$${order.amount.toFixed(2)}`,
    Status: order.status,
    Type: order.type,
    License_Key: order.key || 'N/A'
  }));

  exportToCSV(formattedOrders, `orders-${new Date().toISOString().split('T')[0]}`);
}