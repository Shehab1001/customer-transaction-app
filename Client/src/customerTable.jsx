import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import baseUrl from '../../baseUrl';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterName, setFilterName] = useState('');

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${baseUrl}/api/data`);
        setCustomers(result.data.customers);
        setTransactions(result.data.transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle customer row click
  const handleCustomerClick = (customerId) => {
    setSelectedCustomer(customerId);
  };

  // Filter customers by name
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // Calculate total transaction amount for each customer
  const customerTransactionAmounts = filteredCustomers.map((customer) => {
    const totalAmount = transactions
      .filter((transaction) => transaction.customer_id === customer.id)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    return { ...customer, totalAmount };
  });

  // Aggregate transaction data by date for the selected customer
  const transactionData = transactions
    .filter((transaction) => transaction.customer_id === selectedCustomer)
    .reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) acc[date] = 0;
      acc[date] += transaction.amount;
      return acc;
    }, {});

  // Prepare data for the chart
  const chartData = Object.keys(transactionData).map((date) => ({
    date,
    amount: transactionData[date]
  }));

  // Function to highlight the search keyword in the customer name
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 text-gray-800">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="dark">
      <div className="container mx-auto p-4 bg-gray-800 text-white min-h-screen">
        <h1 className="text-3xl text-center font-bold m-4">Customer Transactions</h1>
        <div className="mb-8 flex items-center justify-center">
          <input
            type="text"
            placeholder="Filter by customer name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="p-2 border w-1/4 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <table className="w-3/4 mx-auto bg-gray-700 border border-gray-600">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600">ID</th>
              <th className="py-2 px-4 border-b border-gray-600">Name</th>
              <th className="py-2 px-4 border-b border-gray-600">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {customerTransactionAmounts.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => handleCustomerClick(customer.id)}
                className={`cursor-pointer ${selectedCustomer === customer.id ? 'bg-gray-600' : ''}`}
              >
                <td className="py-2 px-4 border-b border-gray-600 text-center">{customer.id}</td>
                <td className="py-2 px-4 border-b border-gray-600 text-center">
                  {highlightText(customer.name, filterName)}
                </td>
                <td className="py-2 px-4 border-b border-gray-600 text-center">{customer.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">
            {selectedCustomer ? `Transactions for Customer ${selectedCustomer}` : 'Select a customer to view transactions'}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={selectedCustomer ? chartData : []}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600" />
              <XAxis dataKey="date" className="stroke-white" />
              <YAxis className="stroke-white" />
              <Tooltip contentStyle={{ backgroundColor: '#2d3748' }} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
