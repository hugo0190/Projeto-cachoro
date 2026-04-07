const cpfsCadastrados = ["12345678900", "11122233344"];
 
document.getElementById("formAdocao").addEventListener("submit", function (e) {
  e.preventDefault();
 
  const nome     = document.getElementById("nome").value.trim();
  const email    = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cpf      = document.getElementById("cpf").value.trim().replace(/\D/g, "");
  const idade    = parseInt(document.getElementById("idade").value);
  const cidade   = document.getElementById("cidade").value.trim();
  const moradia  = document.getElementById("moradia").value;
  const quintal  = document.querySelector('input[name="quintal"]:checked');
  const pet      = document.querySelector('input[name="pet"]:checked');
  const horas    = parseInt(document.getElementById("horas").value);
  const motivo   = document.getElementById("motivo").value.trim();
  const termo    = document.getElementById("termo").checked;
 
  // Validações
  if (nome.length < 3)               return alert("Nome inválido.");
  if (!email.includes("@"))          return alert("Email inválido.");
  if (telefone.replace(/\D/g, "").length < 8) return alert("Telefone inválido.");
  if (!cpf)                          return alert("CPF obrigatório.");
  if (cpfsCadastrados.includes(cpf)) return alert("CPF já cadastrado.");
  if (isNaN(idade) || idade < 18)    return alert("Você deve ser maior de idade.");
  if (!cidade)                       return alert("Cidade obrigatória.");
  if (!moradia)                      return alert("Selecione o tipo de moradia.");
  if (!quintal)                      return alert("Informe se possui quintal.");
  if (!pet)                          return alert("Informe se já teve pet.");
  if (isNaN(horas))                  return alert("Horas inválidas.");
  if (motivo.length < 10)            return alert("Motivo muito curto. Elabore um pouco mais.");
  if (!termo)                        return alert("Você deve aceitar o termo de responsabilidade.");
 
  // Regras de negócio
  if (moradia === "apartamento" && quintal.value === "sim")
    return alert("Apartamento não pode ter quintal.");
 
  if (moradia === "apartamento") {
    const permite = prompt("O apartamento permite animais? (sim/não)");
    if (permite?.toLowerCase() !== "sim") return alert("Local não permite animais.");
  }
 
  if (moradia === "casa") {
    const seguro = prompt("O quintal é seguro e cercado? (sim/não)");
    if (seguro?.toLowerCase() !== "sim") return alert("Quintal não é considerado seguro.");
  }
 
  if (horas > 8) {
    const just = prompt("O animal ficará muito tempo sozinho. Justifique:");
    if (!just || just.trim().length < 5) return alert("Justificativa obrigatória.");
  }
 
  if (pet.value === "nao")
    alert("A ONG poderá acompanhar sua adaptação com o animal.");
 
  const motivosInvalidos = ["quero", "porque sim", "sim"];
  if (motivosInvalidos.includes(motivo.toLowerCase()))
    return alert("Motivo inválido ou genérico.");
 
  const financeiro = prompt("Possui condições financeiras para cuidar do animal? (sim/não)");
  if (financeiro?.toLowerCase() === "nao")
    return alert("Adoção não permitida sem condições financeiras.");
 
  const decisao = prompt("Decidiu adotar hoje? (sim/não)");
  if (decisao?.toLowerCase() === "sim")
    alert("Atenção: evite decisões impulsivas!");
 
  // Sucesso
  const resultado = document.getElementById("resultado");
  resultado.style.display = "block";
  resultado.innerHTML = `
    <h3>✅ Cadastro realizado com sucesso!</h3>
    <strong>Nome:</strong> ${nome}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Telefone:</strong> ${telefone}<br>
    <strong>Cidade:</strong> ${cidade}
  `;
 
  resultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
