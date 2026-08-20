# Bromford Hotel Inventory Management System

A web-based inventory management system developed for Bromford Hotel, Owerri, Imo State.

The system helps hotel staff manage inventory, suppliers, purchases, stock issues, approvals, users and reports from a centralized platform.

## Features

### Authentication & Authorization
- Secure user login
- JWT-based authentication
- Role-based access control
- Admin, Manager and Storekeeper/Staff roles
- Protected application routes
- Logout functionality

### Inventory Management
- Add and manage inventory items
- Track stock quantities
- Monitor inventory levels
- Category-based inventory organization

### Supplier Management
- Add and manage suppliers
- Store supplier contact information
- Link suppliers to purchases

### Purchase Management
- Submit purchase requests
- Manager/Admin approval workflow
- Automatic stock increase after approval
- Purchase history
- Purchase amount calculations

### Stock Issue Management
- Submit stock issue requests
- Manager/Admin approval workflow
- Automatic stock deduction after approval
- Stock issue history

### Approval Management
- Managers and Administrators can review pending requests
- Approve or reject purchase requests
- Approve or reject stock issue requests
- Approved transactions automatically update inventory

### Reports
- Current stock reports
- Purchase summaries
- Stock issue summaries
- Inventory transaction history

### User Management
- Admin can create users
- Assign system roles
- View system users
- Delete users
- Users cannot delete their own accounts

### System Settings
- Hotel information
- System name
- Location
- Currency
- Default reorder level
- Admin-only editing of system settings

## User Roles

| Role | Access |
|---|---|
| Administrator | Full system access, user management and system settings |
| Manager | Inventory, suppliers, purchases, stock issues, reports and approvals |
| Storekeeper/Staff | Inventory operations, purchase requests and stock issue requests |

## Technology Stack

### Frontend
- React.js
- React Router
- Axios
- Bootstrap
- JavaScript

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

### Database
- PostgreSQL

## Project Structure

```text
Bromford-Hotel-Inventory/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── ProtectedRoute.js
│   └── package.json
│
└── server/
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── index.js
    └── package.json