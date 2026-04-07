let cpfsCadastrados = ["12345678900", "11122233344"];

document.getElementById("formAdocao").addEventListener("submit", function (e) {
  e.preventDefault();


  let nome     = document.getElementById("nome").value.trim();
  let email    = document.getElementById("email").value.trim();
  let cpf      = document.getElementById("cpf").value.trim().replace(/\D/g, "");
  let moradia  = document.getElementById("moradia").value;
  let quintal  = document.querySelector('input[name="quintal"]:checked');
  let termo    = document.getElementById("termo").checked;


  if (nome.length < 3) return alert("Nome Inválido");
  if (!email.includes("@")) return alert("Email Inválido");
  if (cpfsCadastrados.includes(cpf)) return alert("CPF já cadastrado");
  if (!termo) return alert("Aceite os termos de responsabilidade");


  if (moradia === "apartamento" && quintal?.value === "sim") {
    return alert("Conflito: Apartamento não pode ter quintal.");
  }

 
  let resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h3>Cadastro realizado com sucesso!</h3>
    <b>Nome:</b> ${nome}<br>
    <b>Email:</b> ${email}<br>
    <b>Moradia:</b> ${moradia}
  `;
  
  resultado.style.display = "block";
});