const URL = "https://script.google.com/macros/s/AKfycbyu4aeKdYFT0SnsM-4eSc82qL7vPElqGMxU1KnT5G3CzWFtvQIZUTeo3h4ISXaJzRGoAA/exec";

let listaNomes = [];

// 🔹 carregar lista uma vez
fetch(URL)
.then(res => res.json())
.then(lista => {
  listaNomes = lista;
});

// 🔹 autocomplete com filtro
const inputNome = document.getElementById("nome");
const datalist = document.getElementById("nomes");

inputNome.addEventListener("input", () => {
  const valor = inputNome.value.trim().toLowerCase();

  // limpa lista
  datalist.innerHTML = "";

  // 🔴 só executa com 4+ caracteres
  if (valor.length < 4) return;

  // filtra nomes
  const filtrados = listaNomes.filter(item =>
    item.nome.toLowerCase().includes(valor)
  );

  // limita quantidade (opcional, melhora UX)
  filtrados.slice(0, 10).forEach(item => {
    const option = document.createElement("option");
    option.value = item.nome;
    datalist.appendChild(option);
  });
});
.catch(err => {
  console.error("Erro no autocomplete:", err);
});

// 🔹 registrar presença
function registrar() {

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (!nome || !cpf) {
    alert("Preencha todos os campos");
    return;
  }
if (cpf.length !== 11) {
  alert("CPF deve conter 11 números");
  return;
}
  navigator.geolocation.getCurrentPosition(pos => {

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        nome,
        cpf,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
    .then(res => res.json())
    .then(res => {
      document.getElementById("msg").innerText = res.mensagem;
    });

  }, () => {
    alert("Ative a localização!");
  });
}
