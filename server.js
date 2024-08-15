
import pkg from 'pg';
const { Pool } = pkg;
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { routes } from './routes.js';

dotenv.config({ path: 'variaveis.env' });

const app = express();
const port = process.env.PORT || 3000;

// Determina o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/', routes);  

// Middleware para definir políticas de segurança (Content Security Policy)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
  next();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});




