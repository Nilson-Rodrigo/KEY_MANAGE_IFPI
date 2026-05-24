/*
 * Cria e exporta um Pool de conexões com PostgreSQL.
 * Valida a presença de variáveis de ambiente essenciais e loga informações úteis.
 */
import 'dotenv/config';
import { Pool } from 'pg';

const dbPassword = process.env.DB_PASSWORD;

// Log básico da configuração (mas sem imprimir a senha em claro)
console.log('🔍 DB Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: dbPassword ? '***definida***' : 'VAZIA',
  database: process.env.DB_NAME,
});

// Validação simples para garantir que o processo não tente rodar sem senha
if (!dbPassword || typeof dbPassword !== 'string' || dbPassword.trim() === '') {
  console.error('DB_PASSWORD inválida ou não definida. Abortando inicialização. Verifique backend/.env');
  process.exit(1);
}

// Cria o pool de conexões com as variáveis de ambiente
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: dbPassword,
  database: process.env.DB_NAME,
});

// Eventos do pool para ajudar no diagnóstico em tempo de execução
pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erro no pool do PostgreSQL:', err);
});

export default pool;