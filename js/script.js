const btnBuscar = document.getElementById("btn-buscar");
        const campoDDD = document.getElementById("ddd");
        const resultado = document.getElementById("resultado");

        // Executa a função quando o botão é clicado
        btnBuscar.addEventListener("click", buscarDDD);

        // Permite apertar "Enter" no teclado para buscar
        campoDDD.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                buscarDDD();
            }
        });

        function buscarDDD() {
            // Remove tudo que não for número
            const ddd = campoDDD.value.replace(/\D/g, "");

            resultado.classList.add("ativo"); // Torna a div visível

            if (ddd.length !== 2) {
                resultado.innerHTML = '<p class="erro">Por favor, digite um DDD válido com 2 números (Ex: 11, 21, 31).</p>';
                return;
            }

            resultado.innerHTML = "<p>Consultando DDD...</p>";

            // Faz a requisição na API
            fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("DDD não encontrado");
                    }
                    return response.json();
                })
                .then(dados => {
                    // Lista as cidades
                    const listaCidades = dados.cities
                        .map(cidade => `<li>${cidade}</li>`)
                        .join("");

                    // Monta o HTML com a resposta
                    resultado.innerHTML = `
                        <h2>DDD Encontrado!</h2>
                        <p><strong>DDD:</strong> ${ddd}</p>
                        <p><strong>Estado:</strong> ${dados.state}</p>
                        <p><strong>Região:</strong> ${dados.region || 'Não informada'}</p>

                        <h3>Cidades atendidas:</h3>
                        <ul>
                            ${listaCidades}
                        </ul>
                    `;
                })
                .catch(error => {
                    resultado.innerHTML = '<p class="erro">DDD não encontrado ou ocorreu um erro na consulta.</p>';
                    console.error(error);
                });
        }