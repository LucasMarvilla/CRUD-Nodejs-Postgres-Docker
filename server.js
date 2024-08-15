
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

console.log('Variáveis de ambiente carregadas:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('PORT:', process.env.PORT);

const app = express();
const port = process.env.PORT || 3000;

// Determina o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurando o diretório de views
app.set('views', path.join(__dirname, 'views'));

// Configurando EJS como o motor de visualização
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear o corpo das requisições
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilita o CORS
app.use(cors());

// Roteamento
app.use('/', routes);  // Note que use '/' para garantir que todas as rotas sejam aplicadas corretamente

// Middleware para definir políticas de segurança (Content Security Policy)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
  next();
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});




