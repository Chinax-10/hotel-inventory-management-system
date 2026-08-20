# Bromford Hotel Inventory Management System

A web-based inventory management system developed as a 3MTT Software Development capstone project for managing hotel inventory operations.

The system provides a centralized platform for managing stock, suppliers, purchase requests, stock issues, approvals and users. It is designed to reduce manual inventory tracking, improve accountability and help hotel management maintain accurate stock records.

## Problem Statement

Hotels handle different categories of items every day, including beverages, stationery, kitchen supplies and other operational materials.

When inventory activities are handled manually, it can become difficult to:

- Know the current quantity of available stock
- Track purchases and stock additions
- Track items issued to departments
- Monitor low-stock items
- Know who requested or approved a transaction
- Maintain accurate inventory records
- Prevent unauthorized stock changes

The Bromford Hotel Inventory Management System provides a digital solution to these challenges.

## Solution

The system allows hotel staff to manage inventory from a centralized web application.

Staff can submit purchase and stock issue requests, while authorized Managers and Administrators can review, approve or reject requests.

Approved transactions automatically update inventory quantities, helping maintain more accurate stock records.

## Key Features

### 1. Authentication & Authorization

- Secure user login
- JWT-based authentication
- Role-based access control
- Protected application routes
- Administrator, Manager and Storekeeper/Staff roles
- Logout functionality

### 2. Inventory Management

- Add inventory items
- View inventory items
- Track available quantities
- Monitor stock levels
- Set reorder levels
- Organize items by category
- Track purchase and selling prices
- Associate items with suppliers

### 3. Supplier Management

- Add suppliers
- View supplier information
- Store supplier company details
- Link suppliers to inventory purchases

### 4. Purchase Management

- Submit purchase requests
- View purchase records
- Calculate purchase totals
- Send purchase requests for approval
- Manager/Admin approval workflow
- Automatically increase inventory after an approved purchase

### 5. Stock Issue Management

- Submit stock issue requests
- Select inventory items
- Specify quantity and department
- Specify who the item is issued to
- Add remarks/details
- Manager/Admin approval workflow
- Automatically reduce inventory after approval
- View stock issue history

### 6. Approval Center

Managers and Administrators can review pending requests.

The Approval Center supports:

- Pending purchase requests
- Pending stock issue requests
- Approving purchase requests
- Rejecting purchase requests
- Approving stock issue requests
- Rejecting stock issue requests

Approved transactions update the inventory automatically.

### 7. Dashboard

The dashboard provides a quick overview of the system, including:

- Total inventory items
- Current stock
- Low-stock items
- Stock value
- Number of suppliers
- Number of departments

### 8. User Management

Administrators can:

- Create users
- View users
- Assign user roles
- Delete users
- Manage system access

Users are protected by role-based permissions.

### 9. System Settings

Administrators can manage basic system information such as:

- Hotel name
- System name
- Location
- Currency
- Default reorder level

## User Roles

| Role | Main Access |
|---|---|
| Administrator | Full system access, user management, approvals and system settings |
| Manager | Inventory, suppliers, purchases, stock issues, reports and approvals |
| Storekeeper/Staff | Inventory operations, purchase requests and stock issue requests |

## Purchase Approval Workflow

The purchase process follows this workflow:

1. Storekeeper/Staff submits a purchase request.
2. The request is saved with a `pending` status.
3. Manager or Administrator reviews the request.
4. The request can be approved or rejected.
5. When approved, a purchase record is created.
6. The purchased quantity is automatically added to inventory.
7. The request status changes to `approved`.

## Stock Issue Approval Workflow

The stock issue process follows this workflow:

1. Storekeeper/Staff selects an inventory item.
2. Staff enters the quantity, department, recipient and other details.
3. A stock issue request is created with a `pending` status.
4. Manager or Administrator reviews the request.
5. The request can be approved or rejected.
6. When approved, the requested quantity is deducted from inventory.
7. The request status changes to `approved`.

This approval process helps prevent unauthorized changes to stock quantities.

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
- REST API
- JWT Authentication
- JavaScript

### Database

- PostgreSQL

### Development Tools

- Visual Studio Code
- Git
- GitHub
- PostgreSQL / pgAdmin

## System Architecture

The application follows a frontend-backend-database architecture.

```text
User
  |
  v
React Frontend
  |
  | HTTP / REST API
  v
Node.js + Express Backend
  |
  | SQL Queries
  v
PostgreSQL Database