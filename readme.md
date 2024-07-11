# Customer Transactions Application

This is a React application that retrieves customer and transaction data from a provided API endpoint and displays it in a user-friendly format. The application features a table listing customers along with their transaction data and a graph displaying the total transaction amount per day for the selected customer. The application supports filtering the table by customer name and highlights the search term in the results. The application is designed to always be in dark mode.

## Features

- Displays a list of customers along with their total transaction amount.
- Highlights the search term in customer names.
- Shows an empty graph by default, which updates to display the total transaction amount per day for the selected customer.
- Always in dark mode for a consistent visual experience.

## Technologies Used

- **Frontend**: React, Vite ,Tailwind CSS, Axios, Recharts
- **Backend**: Node.js, Express.js

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- Git installed on your machine.

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Shehab1001/customer-transaction-app.git
   cd customer-transaction-app
2. **Install backend dependencies:**
   ```sh
   cd Server
   npm install
3. **Start the backend server:**
   ```sh
   node index.js
4. **Install frontend dependencies:**
   ```sh
   cd ../Client
   npm install
5. **Start the frontend development server**
   ```sh
   npm run dev