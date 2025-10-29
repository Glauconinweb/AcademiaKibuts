function getAlunos() {
  return JSON.parse(localStorage.getItem("alunos")) || [];
}

function setAlunos(alunos) {
  localStorage.setItem("alunos", JSON.stringify(alunos));
}
function renderTabela() {
  const alunos = getAlunos();
  const tbody = document.querySelector("tabelaAlunos");
  tbody.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.plano}</td>
            <td>${aluno.telefone}</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                 <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
            `;
    tbody.appendChild(tr);
  });
}

document.querySelector("#formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const idade = document.querySelector("#idade").value;
  const plano = document.querySelector("#plano").value;
  const telefone = document.querySelector("#telefone").value.trim();

  if (!nome || !idade) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const alunos = getAlunos();
  alunos.push({ nome, idade, plano, telefone });
  setAlunos(alunos);
  renderTabela();
  e.target.reset();
});

function editarAluno(index) {
  const alunos = getAlunos();
  const aluno = alunos[index];

  const novoNome = prompt("Editar nome:", aluno.nome);
  const novaIdade = prompt("Editar idade:", aluno.idade);
  const novoPlano = prompt("Editar plano:", aluno.plano);
  const novoTelefone = prompt("Editar telefone:", aluno.telefone);

  if (novoNome && novaIdade) {
    alunos[index] = {
      nome: novoNome,
      idade: novaIdade,
      plano: novoPlano,
      telefone: novoTelefone,
    };
    setAlunos(alunos);
    renderTabela();
  }
}
renderTabela();
