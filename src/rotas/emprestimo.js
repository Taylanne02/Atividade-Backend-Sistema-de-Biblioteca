const express = require("express");
const router = express.Router();
const db = require("../database");




// POST
//http://localhost:3000/emprestimos
router.post("/", (req, res) => {
  const { id_livro, id_usuario, data_emprestimo, data_vencimento, status } = req.body;

  if (!id_livro || !id_usuario) {
    return res.status(400).json({ erro: "Livro e usuário obrigatórios" });
  }

  db.run(
    `INSERT INTO emprestimos 
    (id_livro, id_usuario, data_emprestimo, data_vencimento, status)
    VALUES (?, ?, ?, ?, ?)`,
    [id_livro, id_usuario, data_emprestimo, data_vencimento, status],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});




// PUT - atualizar empréstimo
//http://localhost:3000/emprestimos/(id do empréstimo)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { id_livro, id_usuario, data_emprestimo, data_vencimento, status } = req.body;

  if (!id_livro || !id_usuario || !status) { 
    return res.status(400).json({
      erro: "Campos obrigatórios não preenchidos"
    });
  }

  db.run(
    `UPDATE emprestimos 
     SET id_livro=?, id_usuario=?, data_emprestimo=?, data_vencimento=?, status=? 
     WHERE id=?`,
    [id_livro, id_usuario, data_emprestimo, data_vencimento, status, id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        atualizado: this.changes
      });
    }
  );
});



// GET todos
//http://localhost:3000/emprestimos
router.get("/", (req, res) => {
  db.all("SELECT * FROM emprestimos ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});




// GET por usuário
//http://localhost:3000/emprestimos/usuario/(id do usuário)
router.get("/usuario/:id", (req, res) => {
  db.all(
    "SELECT * FROM emprestimos WHERE id_usuario=?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});




// GET por status
//http://localhost:3000/emprestimos/status/(ATIVO, ATRASADO, CONCLUIDO)
router.get("/status/:status", (req, res) => {
  db.all(
    "SELECT * FROM emprestimos WHERE status=?",
    [req.params.status],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

module.exports = router;