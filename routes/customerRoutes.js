const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Add new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all customers (optional)
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// SEEDING DATA FOR TESTING

// Uncomment the following code to seed the database with sample customers
// router.post('/seed', async (req, res) => {
// try {
// const sampleCustomers = [
// { name: 'John Doe', email: 'john@example.com', spend: 7000, visits: 2, lastActive: new Date('2024-12-01') },
// { name: 'Priya Sharma', email: 'priya@example.com', spend: 12000, visits: 5, lastActive: new Date('2025-01-15') },
// { name: 'David Kim', email: 'david@example.com', spend: 3000, visits: 1, lastActive: new Date('2023-10-10') },
// { name: 'Sara Ali', email: 'sara@example.com', spend: 9500, visits: 3, lastActive: new Date('2025-03-20') },
// { name: 'Aarav Mehta', email: 'aarav@example.com', spend: 11000, visits: 7, lastActive: new Date('2025-05-01') },
// { name: 'Emily Wang', email: 'emily@example.com', spend: 4800, visits: 2, lastActive: new Date('2024-08-15') },
// { name: 'Carlos Reyes', email: 'carlos@example.com', spend: 18000, visits: 12, lastActive: new Date('2025-02-28') },
// { name: 'Zara Khan', email: 'zara@example.com', spend: 4200, visits: 0, lastActive: new Date('2023-06-20') },
// { name: 'Leo Tan', email: 'leo@example.com', spend: 500, visits: 1, lastActive: new Date('2022-12-01') },
// { name: 'Fatima Yusuf', email: 'fatima@example.com', spend: 10500, visits: 9, lastActive: new Date('2025-04-14') },
// { name: 'Tom Harris', email: 'tom@example.com', spend: 2300, visits: 2, lastActive: new Date('2024-01-01') },
// { name: 'Neha Patil', email: 'neha@example.com', spend: 8900, visits: 3, lastActive: new Date('2025-05-10') },
// { name: 'Ali Mohamed', email: 'ali@example.com', spend: 6500, visits: 5, lastActive: new Date('2025-05-15') },
// { name: 'Nina Jones', email: 'nina@example.com', spend: 10200, visits: 6, lastActive: new Date('2024-11-11') },
// { name: 'Raj Verma', email: 'raj@example.com', spend: 4000, visits: 4, lastActive: new Date('2023-05-05') },
// { name: 'Kim Lee', email: 'kim@example.com', spend: 3900, visits: 3, lastActive: new Date('2023-07-07') },
// { name: 'Omar Nasser', email: 'omar@example.com', spend: 6000, visits: 8, lastActive: new Date('2025-05-20') },
// { name: 'Lara Thomas', email: 'lara@example.com', spend: 7500, visits: 4, lastActive: new Date('2024-06-01') },
// { name: 'Emma Zhang', email: 'emma@example.com', spend: 3100, visits: 1, lastActive: new Date('2023-09-01') },
// { name: 'William Park', email: 'william@example.com', spend: 9200, visits: 7, lastActive: new Date('2025-05-25') },
// { name: 'Jessica Liu', email: 'jessica@example.com', spend: 8300, visits: 5, lastActive: new Date('2025-05-28') },
// { name: 'Ravi Singh', email: 'ravi@example.com', spend: 13000, visits: 6, lastActive: new Date('2025-03-10') },
// { name: 'Tanya George', email: 'tanya@example.com', spend: 5600, visits: 3, lastActive: new Date('2023-11-15') },
// { name: 'Derek Chan', email: 'derek@example.com', spend: 2600, visits: 2, lastActive: new Date('2022-10-30') },
// { name: 'Isla Dsouza', email: 'isla@example.com', spend: 8700, visits: 4, lastActive: new Date('2024-04-15') },
// { name: 'Manav Batra', email: 'manav@example.com', spend: 14000, visits: 9, lastActive: new Date('2025-01-05') },
// { name: 'Sophia Tran', email: 'sophia@example.com', spend: 3900, visits: 1, lastActive: new Date('2023-03-03') },
// { name: 'Ahmed Saleh', email: 'ahmed@example.com', spend: 5200, visits: 4, lastActive: new Date('2024-12-20') },
// { name: 'Layla Kapoor', email: 'layla@example.com', spend: 11900, visits: 6, lastActive: new Date('2025-02-01') },
// { name: 'Jacob Green', email: 'jacob@example.com', spend: 8800, visits: 5, lastActive: new Date('2025-05-30') },
// { name: 'Ananya Iyer', email: 'ananya@example.com', spend: 10100, visits: 7, lastActive: new Date('2025-06-01') },
// { name: 'Ethan Wright', email: 'ethan@example.com', spend: 2700, visits: 2, lastActive: new Date('2024-07-15') },
// { name: 'Amira Khan', email: 'amira@example.com', spend: 15000, visits: 10, lastActive: new Date('2025-05-20') },
// { name: 'Jayden Rao', email: 'jayden@example.com', spend: 6400, visits: 3, lastActive: new Date('2025-04-18') },
// { name: 'Chloe Wu', email: 'chloe@example.com', spend: 3500, visits: 2, lastActive: new Date('2023-08-10') }
// ];

// await Customer.deleteMany({});
// await Customer.insertMany(sampleCustomers);

// res.status(201).json({ message: 'Seeded successfully', count: sampleCustomers.length });
// } catch (err) {
// res.status(500).json({ error: err.message });
// }
// });

module.exports = router;
