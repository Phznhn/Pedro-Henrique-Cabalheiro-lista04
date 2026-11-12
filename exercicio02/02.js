const selectEstado = document.getElementById('estado');
const selectCidade = document.getElementById('cidade');
const resultado = document.getElementById('resultado');

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => response.json())
    .then(estados => {
        estados.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.sigla;
            option.textContent = estado.nome;
            selectEstado.appendChild(option);
        });
    })
    .catch(erro => console.error('Erro ao carregar estados:', erro));

selectEstado.addEventListener('change', () => {
    const uf = selectEstado.value;

    selectCidade.innerHTML = '<option value="">Selecione uma cidade</option>';
    resultado.textContent = '';

    if (!uf) return;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`)
        .then(response => response.json())
        .then(cidades => {
            cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.nome;
                option.textContent = cidade.nome;
                selectCidade.appendChild(option);
            });
        })
        .catch(erro => console.error('Erro ao carregar cidades:', erro));
});

selectCidade.addEventListener('change', () => {
    const cidadeSelecionada = selectCidade.value;
    const estadoSelecionado = selectEstado.options[selectEstado.selectedIndex].text;

    if (cidadeSelecionada) {
        resultado.textContent = `Você selecionou: ${cidadeSelecionada} - ${estadoSelecionado}`;
    } else {
        resultado.textContent = '';
    }
});