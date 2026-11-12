function buscarCEP(){
    const inputCep = document.getElementById("cep-informado").value;
    const erroElement = document.getElementById("erro");
    const cep = inputCep.replace(/\D/g, '');

    erroElement.textContent = '';
    document.getElementById("cep").textContent = '';
    document.getElementById("logradouro").textContent = '';
    document.getElementById("bairro").textContent = '';
    document.getElementById("cidade").textContent = '';
    document.getElementById("estado").textContent = '';

    if (cep.length !== 8) {
        erroElement.textContent = 'CEP inválido. O CEP deve conter 8 dígitos.';
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error("falha na api");
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                erroElement.textContent = 'CEP não encontrado.';
                return;
            }

            document.getElementById("cep").textContent = data.cep;
            document.getElementById("logradouro").textContent = data.logradouro || "-";
            document.getElementById("bairro").textContent = data.bairro || "-";
            document.getElementById("cidade").textContent = data.localidade || "-";
            document.getElementById("estado").textContent = data.uf || "-";
        })
        .catch(error => {
            erroElement.textContent = "Erro ao buscar o CEP";
        })
}