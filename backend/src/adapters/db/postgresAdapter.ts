import pool from '../../database/connection';
import { Chave, RegistroOperacao } from '../../core/entities';
import { ChaveRepository, RegistroRepository } from '../../core/ports';

// Helper functions used by controllers
export async function listKeysWithHolder() {
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
  return result.rows;
}

// Implementação do ChaveRepository para Postgres
export const pgChaveRepo: ChaveRepository = {
  async findByCodigo(codigo: string) {
    const result = await pool.query(
      `SELECT id, code, status, updated_at FROM keys WHERE code = $1 LIMIT 1`,
      [codigo]
    );
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    const chave: Chave = {
      id: String(r.id),
      codigo: r.code,
      descricao: null,
      disponivel: r.status === 'available',
    };
    return chave;
  },

  async listAll() {
    const result = await pool.query(`SELECT id, code, status FROM keys ORDER BY code ASC`);
    return result.rows.map((r: any) => ({
      id: String(r.id),
      codigo: r.code,
      descricao: null,
      disponivel: r.status === 'available',
    }));
  },

  async save(chave: Chave) {
    // Atualiza o status da chave no banco
    const status = chave.disponivel ? 'available' : 'in_use';
    await pool.query(
      `UPDATE keys SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status, chave.id]
    );
  },
};

// Implementação do RegistroRepository para Postgres (adaptação simples)
export const pgRegistroRepo: RegistroRepository = {
  async save(reg: RegistroOperacao) {
    const type = reg.operacao === 'retirada' ? 'RETIRADA' : 'DEVOLUCAO';
    const status = reg.sincronizado ? 'applied' : 'pending';
    // Tentamos armazenar o evento no esquema existente `events`. Alguns campos podem ser nulos.
    await pool.query(
      `INSERT INTO events (id, device_id, type, key_id, user_id, device_timestamp, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [reg.id, 'server', type, reg.chaveId, null, reg.timestamp, status]
    );
  },

  async listPending() {
    const result = await pool.query(`SELECT id, device_id, type, key_id, user_id, device_timestamp, status FROM events WHERE status != 'applied'`);
    return result.rows.map((r: any) => ({
      id: String(r.id),
      chaveId: String(r.key_id),
      operacao: r.type === 'RETIRADA' ? 'retirada' : 'devolucao',
      operador: r.user_id ? String(r.user_id) : 'unknown',
      timestamp: r.device_timestamp,
      sincronizado: r.status === 'applied',
    } as RegistroOperacao));
  },
};

// Funções auxiliares para o fluxo de sincronização
export async function eventExists(eventId: string) {
  const res = await pool.query(`SELECT id FROM events WHERE id = $1`, [eventId]);
  return res.rows.length > 0;
}

export async function getLastAppliedEventForKey(keyId: number) {
  const res = await pool.query(
    `SELECT device_timestamp, type FROM events WHERE key_id = $1 AND status = 'applied' ORDER BY device_timestamp DESC LIMIT 1`,
    [keyId]
  );
  return res.rows.length > 0 ? res.rows[0] : null;
}

export async function insertEvent(event: any, status: 'applied' | 'conflict' | 'pending' = 'applied') {
  await pool.query(
    `INSERT INTO events (id, device_id, type, key_id, user_id, device_timestamp, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [event.id, event.device_id, event.type, event.key_id, event.user_id, event.device_timestamp, status]
  );
}

export async function applyKeyStatusUpdate(event: any) {
  if (event.type === 'RETIRADA') {
    await pool.query(
      `UPDATE keys SET status = 'in_use', current_holder_id = $1, updated_at = NOW() WHERE id = $2`,
      [event.user_id, event.key_id]
    );
  } else if (event.type === 'DEVOLUCAO') {
    await pool.query(
      `UPDATE keys SET status = 'available', current_holder_id = NULL, updated_at = NOW() WHERE id = $1`,
      [event.key_id]
    );
  }
}

export async function getEventsByDevice(deviceId: string) {
  const res = await pool.query(
    `SELECT id, type, key_id, device_timestamp, status FROM events WHERE device_id = $1 ORDER BY device_timestamp DESC`,
    [deviceId]
  );
  return res.rows;
}

export default {
  listKeysWithHolder,
  pgChaveRepo,
  pgRegistroRepo,
  eventExists,
  getLastAppliedEventForKey,
  insertEvent,
  applyKeyStatusUpdate,
  getEventsByDevice,
};
