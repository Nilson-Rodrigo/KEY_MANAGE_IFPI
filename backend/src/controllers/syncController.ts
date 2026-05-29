import { Request, Response } from 'express';
import adapter from '../adapters/db/postgresAdapter';

interface SyncEvent {
  id: string;
  device_id: string;
  type: 'RETIRADA' | 'DEVOLUCAO';
  key_id: number;
  user_id: number;
  device_timestamp: string;
}

// POST /api/sync
export async function syncEvents(req: Request, res: Response) {
  const events: SyncEvent[] = req.body.events;

  if (!events || !Array.isArray(events) || events.length === 0) {
    res.status(400).json({ error: 'Nenhum evento recebido.' });
    return;
  }


  const applied: string[] = [];
  const conflicts: string[] = [];
  const skipped: string[] = [];


  for (const event of events) {
    // 1. Verifica se o evento já existe (evita duplicidade)
    const exists = await adapter.eventExists(event.id);

    if (exists) {
      skipped.push(event.id);
      continue;
    }

    // 2. Busca o último evento aplicado para essa chave
    const lastEvent = await adapter.getLastAppliedEventForKey(event.key_id);

    // 3. Verifica conflito de timestamp
    if (lastEvent) {
      const lastTimestamp = new Date(lastEvent.device_timestamp);
      const newTimestamp = new Date(event.device_timestamp);

      if (newTimestamp <= lastTimestamp) {
        // Conflito — evento mais antigo chegou depois
        await adapter.insertEvent(event, 'conflict');
        conflicts.push(event.id);
        continue;
      }
    }

    // 4. Aplica o evento — atualiza estado da chave
    await adapter.applyKeyStatusUpdate(event);

    // 5. Registra evento como aplicado
    await adapter.insertEvent(event, 'applied');

    applied.push(event.id);
  }

  res.json({
    received: events.length,
    applied: applied.length,
    conflicts: conflicts.length,
    skipped: skipped.length,
    detail: { applied, conflicts, skipped },
  });
}

// GET /api/sync/status/:deviceId
export async function getSyncStatus(req: Request, res: Response) {
  const { deviceId } = req.params;
  const normalizedDeviceId = Array.isArray(deviceId) ? deviceId[0] : deviceId;

  const rows = await adapter.getEventsByDevice(normalizedDeviceId);

  res.json({
    device_id: normalizedDeviceId,
    total: rows.length,
    events: rows,
  });
}