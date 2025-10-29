function getAlunos() {
  return JSON.parse(localStorage.getItem("alunos")) || [];
}

function setAlunos(alunos) {
  localStorage.setItem("alunos", JSON.stringify(alunos));
}

function renderPresenca(filtro = "") {
  const alunos = getAlunos();
  const tbody = document.querySelector("#tabelaPresenca tbody");
  tbody.innerHTML = "";

  alunos
    .filter((a) => a.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((aluno, index) => {
      if (!aluno.presenca) aluno.presenca = "Ausente ❌";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>
          ${aluno.presenca}
          <button onclick="marcarPresenca(${index})">Marcar Presente</button>
          <button onclick="marcarAusente(${index})">Marcar Ausente</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

function marcarPresenca(index) {
  const alunos = getAlunos();
  alunos[index].presenca = "Presente ✅";
  setAlunos(alunos);
  renderPresenca(document.querySelector("#pesquisa").value);
}

function marcarAusente(index) {
  const alunos = getAlunos();
  alunos[index].presenca = "Ausente ❌";
  setAlunos(alunos);
  renderPresenca(document.querySelector("#pesquisa").value);
}

document.querySelector("#pesquisa").addEventListener("input", (e) => {
  renderPresenca(e.target.value);
});

document.addEventListener("DOMContentLoaded", () => renderPresenca());
