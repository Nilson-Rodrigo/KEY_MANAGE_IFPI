import { Request, Response } from 'express';
import pool from '../database/connection';

// GET /api/users/cache
// Exporta lista de usuários (id, nome, matrícula) para o app usar offline
export async function getUsersCache(req: Request, res: Response) {
  try {
    // Seleciona campos necessários para o cache do app
    const result = await pool.query(
      'SELECT id, name, matricula FROM users ORDER BY name ASC'
    );

    // Retorna os usuários com um carimbo indicando quando foi gerado o cache
    res.json({
      total: result.rows.length,
      users: result.rows,
      cached_at: new Date().toISOString(),
    });
  } catch (error) {
    // Erro ao consultar o DB
    res.status(500).json({ error: String(error) });
  }
}