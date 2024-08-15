import db from '../db.js';

const buscarTodos = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM carros', (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.rows);
    });
  });
};

const buscarUm = (codigo) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM carros WHERE codigo = $1', [codigo], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      if (results.rows.length > 0) {
        resolve(results.rows[0]);
      } else {
        resolve(null); 
      }
    });
  });
};

const inserir = (modelo, placa) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO carros (modelo, placa) VALUES ($1, $2) RETURNING codigo', [modelo, placa], (error, results) => {
      if (error) { reject(error); return; }
      resolve(results.rows[0].codigo);
    });
  });
};

const alterar = (codigo, modelo, placa) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE carros SET modelo = $1, placa = $2 WHERE codigo = $3 RETURNING codigo', [modelo, placa, codigo], (error, results) => {
      if (error) { reject(error); return; }
      resolve(results.rows[0].codigo);
    });
  });
};

const excluir = (codigo) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM carros WHERE codigo = $1', [codigo], (error, results) => {
      if (error) { reject(error); return; }
      resolve(true);
    });
  });
};

export default {
  buscarTodos,
  buscarUm,
  inserir,
  alterar,
  excluir
};
