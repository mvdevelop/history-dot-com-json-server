import express from 'express';
import { Request, Response, Router } from 'express';
import { User } from '../../types/user.types';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const router = Router();

// Get all users
router.get('/', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));
    res.json(db.users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));
    const user = db.users.find((item: User) => item.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Add new user
router.post('/', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));

    const newUser: User = {
      id: db.users.length > 0 ? Math.max(...db.users.map((item: User) => item.id)) + 1 : 1,
      img: req.body.img || '',
      name: req.body.name || '',
      ocupation: req.body.ocupation || ''
    };

    db.users.push(newUser);
    writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Update user
router.put('/:id', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));

    const userIndex = db.users.findIndex((item: User) => item.id === parseInt(req.params.id));

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    db.users[userIndex] = {
      ...db.users[userIndex],
      img: req.body.img !== undefined ? req.body.img : db.users[userIndex].img,
      name: req.body.name !== undefined ? req.body.name : db.users[userIndex].name,
      ocupation: req.body.ocupation !== undefined ? req.body.ocupation : db.users[userIndex].ocupation
    };

    writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json(db.users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));

    const userIndex = db.users.findIndex((item: User) => item.id === parseInt(req.params.id));

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    db.users.splice(userIndex, 1);
    writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;