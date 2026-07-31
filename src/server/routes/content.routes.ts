import express from 'express';
import { Request, Response, Router } from 'express';
import { Content } from '../../types/content.types';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const router = Router();

// Get all content
router.get('/', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));
    res.json(db.content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Get content by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));
    const content = db.content.find((item: Content) => item.id === parseInt(req.params.id));

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Add new content
router.post('/', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));

    const newContent: Content = {
      id: db.content.length > 0 ? Math.max(...db.content.map((item: Content) => item.id)) + 1 : 1,
      img: req.body.img || '',
      title: req.body.title || '',
      description: req.body.description || ''
    };

    db.content.push(newContent);
    writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add content' });
  }
});

// Update content
router.put('/:id', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));

    const contentIndex = db.content.findIndex((item: Content) => item.id === parseInt(req.params.id));

    if (contentIndex === -1) {
      return res.status(404).json({ error: 'Content not found' });
    }

    db.content[contentIndex] = {
      ...db.content[contentIndex],
      img: req.body.img !== undefined ? req.body.img : db.content[contentIndex].img,
      title: req.body.title !== undefined ? req.body.title : db.content[contentIndex].title,
      description: req.body.description !== undefined ? req.body.description : db.content[contentIndex].description
    };

    writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json(db.content[contentIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Delete content
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '..', '..', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));

    const contentIndex = db.content.findIndex((item: Content) => item.id === parseInt(req.params.id));

    if (contentIndex === -1) {
      return res.status(404).json({ error: 'Content not found' });
    }

    db.content.splice(contentIndex, 1);
    writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

export default router;