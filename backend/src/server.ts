
/*
 * Entry point do backend
 * - Carrega variáveis de ambiente via dotenv
 * - Cria app Express, registra middleware e rotas
 * - Expõe /health para monitorar disponibilidade e conexão com DB
 */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import pool from './database/connection';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON no body das requisições
app.use(express.json());

// Todas as rotas da API ficam prefixadas com /api
app.use('/api', routes);

// Healthcheck básico: verifica servidor e conexão com banco
app.get('/health', async (req, res) => {
  try {
    // Executa uma query simples para validar a conexão
    await pool.query('SELECT 1');
    res.json({
      server: 'online',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Se falhar, devolve status 500 com motivo
    res.status(500).json({
      server: 'online',
      database: 'disconnected',
      error: String(error),
    });
  }
});

// Inicia o servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} acesse http://localhost:${PORT}/health`);
});