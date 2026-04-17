const express = require("express");
const router = express.Router();
const db = require("../database");




// POST
//http://localhost:3000/usuarios
router.post("/", (req, res) => {
  const { nome, cpf, telefone, email } = req.body;

  if (!nome || !cpf || !telefone || !email) {
    return res.status(400).json({ erro: "Dados obrigatórios" });
  }

  db.run(
    "INSERT INTO usuarios (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)",
    [nome, cpf, telefone, email],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});





// GET por CPF
//http://localhost:3000/usuarios/(cpf do usuário)
router.get("/:cpf", (req, res) => {
  db.get("SELECT * FROM usuarios WHERE cpf=?", [req.params.cpf], (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
});




// DELETE
//http://localhost:3000/usuarios/(id do usuário)
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM usuarios WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deletado: this.changes });
  });
});

module.exports = router;