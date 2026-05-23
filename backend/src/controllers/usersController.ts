import { Request, Response } from 'express';
import pool from '../database/connection';

// GET /api/users/cache
// Exporta lista de matrículas válidas para o app usar offline
export async function getUsersCache(req: Request, res: Response) {
  try {
    const result = await pool.query(
      'SELECT id, name, matricula FROM users ORDER BY name ASC'
    );

    res.json({
      total: result.rows.length,
      users: result.rows,
      cached_at: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
}