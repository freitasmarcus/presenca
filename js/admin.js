const URL = "https://script.google.com/macros/s/AKfycbyrZpABm_VQ2XJwwlDwiG-PcbWWU8jRMQXkdJQedK6ATclcfp1j0xWLqSvmOVBzjogO/exec";

function buscar() {
  const data = document.getElementById("data").value;
  const turma = document.getElementById("turma").value;

  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      tipo: "consulta",
      data,
      turma
    })
  })
  .then(res => res.json())
  .then(lista => {

    let html = "<tr><th>Nome</th><th>Hora</th></tr>";

    lista.forEach(item => {
      html += `<tr><td>${item.nome}</td><td>${item.hora}</td></tr>`;
    });

    document.getElementById("tabela").innerHTML = html;
  });
}

// 🔹 exportar relatório
function exportar() {
  fetch(URL, {
    method: "POST",
    body: JSON.stringify({ tipo: "relatorio" })
  })
  .then(res => res.text())
  .then(link => {
    window.open(link);
  });
}