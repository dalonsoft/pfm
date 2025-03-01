# PFM (Personal Finance Manager)

## General Description
PFM (Personal Finance Manager) is an application designed to help users manage their personal finances. The application allows users to keep track of their different accounts and record all transactions, categorizing them with the goal of defining budgets and controlling expenses, income, investments, and savings.

## Technology Stack
Web application built in monolithic architecture using the following technologies:
- **Backend**: PHP, Laravel, Inertia.js, Jetstream
- **Frontend**: HTML, CSS, Tailwind CSS, React

## Main Features

### Account Management
- **Create Account**: Allows the user to create new accounts (e.g., bank account, credit card).
- **Edit Account**: Allows the user to edit the information of an existing account.
- **Delete Account**: Allows the user to delete an existing account.
- **List Accounts**: Allows the user to view a list of all their accounts.

### Transaction Recording
- **Record Transaction**: Allows the user to record a new financial transaction (e.g., expense, income).
- **Edit Transaction**: Allows the user to edit the information of an existing transaction.
- **Delete Transaction**: Allows the user to delete an existing transaction.
- **List Transactions**: Allows the user to view a list of all their financial transactions.

### Transaction Categorization
- **Create Category**: Allows the user to create new categories for transactions (e.g., food, transportation).
- **Edit Category**: Allows the user to edit the information of an existing category.
- **Delete Category**: Allows the user to delete an existing category.
- **List Categories**: Allows the user to view a list of all their categories.

### Budgets
- **Define Budget**: Allows the user to define budgets for different categories.
- **Edit Budget**: Allows the user to edit the information of an existing budget.
- **Delete Budget**: Allows the user to delete an existing budget.
- **List Budgets**: Allows the user to view a list of all their budgets.

### Reports and Analysis
- **Expense Report**: Allows the user to generate expense reports by category and time period.
- **Income Report**: Allows the user to generate income reports by category and time period.
- **Investment/Savings Analysis**: Allows the user to analyze their investments and savings over time.

## Project Structure
- **Source Code**: Located in the `src/` directory
- **Documentation**: Located in the `docs/` directory

## System Requirements
- **Server**: PHP 8.2+, Composer, Laravel 11+
- **Frontend**: Node.js 14+, npm/yarn
- **Database**: MariaDB 10.3+ or MySQL 5.7+ or PostgreSQL 10+

## Installation and Configuration
1. Clone the repository.
2. Navigate to the project directory.
3. Run `composer install` to install PHP dependencies.
4. Run `npm install` or `yarn install` to install JavaScript dependencies.
5. Configure the `.env` file with database credentials.
6. Run migrations with `php artisan migrate`.
7. Run `npm run dev` or `yarn dev` to start the application in development mode.

## Contribution
To contribute to the project, please follow these guidelines:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your changes (`git push origin feature/new-feature`).
5. Open a Pull Request for review.

## License
This project is licensed under the MIT License. See the `licenses/pfm-1.0.0.txt` file for more details.