const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db");

db.serialize(() => {

  // livros
  db.run(`
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      autores TEXT NOT NULL,
      data_publicacao TEXT NOT NULL,
      qtd_paginas INTEGER NOT NULL,
      num_edicao INTEGER NOT NULL,
      categoria TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `);

  // usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);

  // empreśtimos 
  db.run(`
    CREATE TABLE IF NOT EXISTS emprestimos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_livro INTEGER,
      id_usuario INTEGER,
      data_emprestimo TEXT,
      data_vencimento TEXT,
      status TEXT,
      FOREIGN KEY (id_livro) REFERENCES livros(id),
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    )
  `);

});

module.exports = db;