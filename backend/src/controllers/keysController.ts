import { Request, Response } from 'express';
import pool from '../database/connection';

// GET /api/keys
// Retorna estado atual de todas as chaves
export async function getKeys(req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT 
        k.id,
        k.code,
        k.status,
        k.updated_at,
        u.name AS holder_name,
        u.matricula AS holder_matricula
      FROM keys k
      LEFT JOIN users u ON k.current_holder_id = u.id
      ORDER BY k.code ASC
    `);

    res.json({
      total: result.rows.length,
      keys: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
}