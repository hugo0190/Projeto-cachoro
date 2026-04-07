let cpfsCadastrados = ["12345678900", "11122233344"];

document.getElementById("formAdocao").addEventListener("submit", function (e) {
  e.preventDefault();

  let nome     = document.getElementById("nome").value.trim();
  let email    = document.getElementById("email").value.trim();
  let telefone = document.getElementById("telefone").value.trim().replace(/\D/g, "");
  let cpf      = document.getElementById("cpf").value.trim().replace(/\D/g, "");
  let idade    = parseInt(document.getElementById("idade").value);
  let moradia  = document.getElementById("moradia").value; // 'casa' ou 'apartamento'
  let quintal  = document.querySelector('input[name="quintal"]:checked'); // 'sim' ou 'nao'
  let pet      = document.querySelector('input[name="pet"]:checked'); // 'sim' ou 'nao'
  let horas    = parseInt(document.getElementById("horas").value);
  let motivo   = document.getElementById("motivo").value.trim();
  let financeiro = document.querySelector('input[name="financeiro"]:checked'); // 'sim' ou 'nao'
  let decisao  = document.querySelector('input[name="decisao"]:checked'); // 'hoje' ou 'planejado'
  let termo    = document.getElementById("termo").checked;


  if (nome.length < 3) return alert("Nome Inválido.");
  if (!email.includes("@")) return alert("Email Inválido.");
  if (telefone.length < 10) return alert("Telefone inválido. Informe DDD + número.");
  if (cpfsCadastrados.includes(cpf)) return alert("Erro: CPF já cadastrado no sistema.");
  if (isNaN(idade) || idade < 18) return alert("Adoção permitida apenas para maiores de 18 anos.");
  if (!termo) return alert("Você precisa aceitar o termo de responsabilidade.");

  
  if (moradia === "apartamento") {
    if (quintal?.value === "sim") return alert("Erro: Apartamento não pode possuir quintal.");
    
    let permiteAnimais = prompt("O condomínio do apartamento permite animais? (sim/não)");
    if (permiteAnimais?.toLowerCase() !== "sim") return alert("Adoção bloqueada: o local não permite animais.");
  }

  if (moradia === "casa") {
    let quintalSeguro = prompt("O quintal da casa é seguro e totalmente cercado? (sim/não)");
    if (quintalSeguro?.toLowerCase() !== "sim") return alert("Adoção bloqueada: o quintal precisa ser seguro.");
  }

 
  if (horas > 8) {
    let justificativa = prompt("O animal ficará mais de 8h sozinho. Como será o cuidado nesse período?");
    if (!justificativa || justificativa.length < 10) return alert("Justificativa insuficiente.");
  }

  if (pet?.value === "nao") {
    alert("Nota: Como você nunca teve pet, a ONG realizará um acompanhamento especial na adaptação.");
  }

 
  let motivosInvalidos = ["quero", "porque sim", "sim", "nao sei"];
  if (motivosInvalidos.includes(motivo.toLowerCase()) || motivo.length < 5) {
    return alert("Por favor, descreva um motivo de adoção menos genérico.");
  }

  if (financeiro?.value === "nao") {
    return alert("Adoção bloqueada: é necessário ter condições financeiras para os cuidados básicos.");
  }

  if (decisao?.value === "hoje") {
    alert("Alerta: Adoções por impulso podem não ser saudáveis. Pense bem na responsabilidade!");
  }

  let resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h3>✅ Cadastro realizado com sucesso!</h3>
    <b>Candidato:</b> ${nome}<br>
    <b>Contato:</b> ${telefone}<br>
    <b>Status:</b> Em análise pela ONG.
  `;
  resultado.style.display = "block";
  resultado.scrollIntoView({ behavior: "smooth" });
});