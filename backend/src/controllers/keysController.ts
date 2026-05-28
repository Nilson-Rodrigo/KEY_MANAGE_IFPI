import { Request, Response } from 'express';
import adapter from '../adapters/db/postgresAdapter';

// GET /api/keys
// Retorna o estado atual de todas as chaves, incluindo quem é o titular (se houver)
export async function getKeys(req: Request, res: Response) {
  try {
    const rows = await adapter.listKeysWithHolder();
    res.json({
      total: rows.length,
      keys: rows,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
}