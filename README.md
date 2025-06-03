# Xeno CRM Backend

A backend service for managing customer relationships, built with Node.js and Express.

## Features

- User authentication and authorization
- Customer data management (CRUD)
- Lead and opportunity tracking
- RESTful API endpoints
- MongoDB integration

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB

### Installation

```bash
git clone https://github.com/yourusername/xeno-crm-backend.git
cd xeno-crm-backend
npm install
```

### Configuration

Create a `.env` file in the root directory:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/xeno-crm
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm start
```

The server will run on `http://localhost:3000`.

## API Documentation

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/customers` - List all customers
- `POST /api/customers` - Add a new customer
- `PUT /api/customers/:id` - Update customer details
- `DELETE /api/customers/:id` - Delete a customer

## Folder Structure

```
xeno-crm-backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── app.js
└── README.md
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](LICENSE)