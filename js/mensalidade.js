function getAlunos() {
  return JSON.parse(localStorage.getItem("alunos")) || [];
}

function setAlunos(alunos) {
  localStorage.setItem("alunos", JSON.stringify(alunos));
}

function renderMensalidades() {
  const alunos = getAlunos();
  const tbody = document.querySelector("#tabelaMensalidades tbody");
  tbody.innerHTML = "";

  alunos.forEach((aluno, index) => {
    if (!aluno.mensalidade) aluno.mensalidade = "Pendente";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.plano}</td>
      <td>${aluno.mensalidade}</td>
      <td>
        <button onclick="pagarMensalidade(${index})">Marcar Pago</button>
        <button onclick="cancelarPagamento(${index})">Cancelar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function pagarMensalidade(index) {
  const alunos = getAlunos();
  alunos[index].mensalidade = "Pago ✅";
  setAlunos(alunos);
  renderMensalidades();
}

function cancelarPagamento(index) {
  const alunos = getAlunos();
  alunos[index].mensalidade = "Pendente ❌";
  setAlunos(alunos);
  renderMensalidades();
}

document.addEventListener("DOMContentLoaded", renderMensalidades);
