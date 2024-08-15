import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';

dotenv.config({ path: 'variaveis.env' });

console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT // Certifique-se de adicionar a porta do PostgreSQL
});

export default pool;
