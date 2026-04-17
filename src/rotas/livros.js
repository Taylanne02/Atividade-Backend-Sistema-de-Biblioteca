const express = require("express");
const router = express.Router();
const db = require("../database");




// POST
// http://localhost:3000/livros
router.post("/", (req, res) => {
  try {
    const { nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status } = req.body;

    if (!nome || !autores || !data_publicacao) {
      return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
    }

    db.run(
      `INSERT INTO livros (nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status],
      function (err) {
        if (err) {
          return res.status(500).json({ erro: "Erro ao inserir livro", detalhe: err.message });
        }

        res.status(201).json({
          mensagem: "Livro cadastrado com sucesso",
          id: this.lastID
        });
      }
    );

  } catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor", detalhe: error.message });
  }
});




// GET todos
//http://localhost:3000/livros
router.get("/", (req, res) => {
  db.all("SELECT * FROM livros", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});




// GET por nome
//http://localhost:3000/livros/nome/(nome do livro)
router.get("/nome/:nome", (req, res) => {
  const nome = "%" + req.params.nome + "%";

  db.all("SELECT * FROM livros WHERE nome LIKE ?", [nome], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});




// GET cópias
//http://localhost:3000/livros/copias
router.get("/copias", (req, res) => {
  db.all(
    `SELECT nome, num_edicao, COUNT(*) as quantidade
     FROM livros
     GROUP BY nome, num_edicao`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});




// PUT
//http://localhost:3000/livros/(id do livro)
router.put("/:id", (req, res) => {
  const { nome, autores } = req.body;

  if (!nome || !autores) {
    return res.status(400).json({ erro: "Nome e autores obrigatórios" });
  }

  db.run(
    "UPDATE livros SET nome=?, autores=? WHERE id=?",
    [nome, autores, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ atualizado: this.changes });
    }
  );
});

// DELETE
//http://localhost:3000/livros/(id do livro)
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM livros WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deletado: this.changes });
  });
});

module.exports = router;