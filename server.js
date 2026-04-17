//importação das bibliotecas
const express = require("express");

//iniciação do servidor 
const app = express();
const PORT = 3000;

app.use(express.json());

//verifica de teste para ver se está ativo
app.get('/', (req, res) => {
res.json({ mensagem: 'Servidor funcionando!' });
});

//importação das rotas utilizadas e suas funções 
app.use("/livros", require("./src/rotas/livros"));
app.use("/usuarios", require("./src/rotas/usuarios"));
app.use("/emprestimos", require("./src/rotas/emprestimo"));

//iniciação do servidor na porta 3000
app.listen(3000, () => {
  console.log('Rodando na porta 3000');
});