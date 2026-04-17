// importação das bibliotecas
const express = require("express");
const cors = require("cors");

// iniciação do servidor 
const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());

// verificação de teste para ver se está ativo
app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor funcionando!' });
});

// importação das rotas utilizadas e suas funções 
app.use("/livros", require("./src/rotas/livros"));
app.use("/usuarios", require("./src/rotas/usuarios"));
app.use("/emprestimos", require("./src/rotas/emprestimo"));

// iniciação do servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});