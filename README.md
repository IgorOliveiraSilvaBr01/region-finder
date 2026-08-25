# RegionFinder - Documentação do Projeto

**RegionFinder** é uma aplicação web intuitiva e responsiva desenvolvida para consultar informações regionais de qualquer Código de Discagem Direta a Distância (DDD) do Brasil. O projeto consome dados em tempo real da API pública **BrasilAPI** através da Fetch API do JavaScript.

**Página WEB:**

https://igoroliveirasilvabr01.github.io/region-finder/

---

## Estrutura de Arquivos

O projeto utiliza uma arquitetura modularizada para separação de responsabilidades (HTML, CSS e JavaScript):

```text
region-finder/
├── index.html
├── css/
│   ├── imports.css
│   ├── reset.css
│   ├── style.css
│   └── variables.css
└── js/
    └── script.js
```

---

## Tecnologias Utilizadas

- **HTML5**: Estruturação semântica da aplicação (`<header>`, `<main>`, `<input>`, `<button>`).
- **CSS3**: Estilização modularizada utilizando:
  - `@import` para organização e centralização dos arquivos CSS.
  - **Variáveis CSS** (`:root`) para gerenciamento e padronização da paleta de cores.
  - **Flexbox** para alinhamento centralizado e layout responsivo.
  - **Reset CSS** para padronização dos estilos entre diferentes navegadores.
  - Fontes externas via Google Fonts (*Roboto*).
- **JavaScript (ES6+)**:
  - Manipulação de eventos da DOM (`click` e `keypress`).
  - Expressões Regulares (Regex) para higienização dos dados de entrada.
  - Consumo assíncrono de Web API via **Fetch API** baseada em Promises.
  - Renderização dinâmica de HTML utilizando *Template Literals*.

---

## Consumo da API (BrasilAPI)

A aplicação realiza requisições HTTP do tipo `GET` para o endpoint público de DDDs fornecido pela BrasilAPI.

### Endpoint da API
`GET https://brasilapi.com.br/api/ddd/v1/{ddd}`

### Exemplo de Resposta (JSON) - Consulta do DDD 11
```json
{
  "state": "SP",
  "cities": [
    "SÃO PAULO",
    "SANTO ANDRÉ",
    "SÃO BERNARDO DO CAMPO",
    "SÃO CAETANO DO SUL",
    "DIADEMA",
    "OSASCO",
    "GUARULHOS"
  ]
}
```

---

## Detalhamento dos Módulos do Código

### 1. Estrutura HTML (`index.html`)
- **Cabeçalho (`<header>`)**: Exibe o nome do projeto e um link de navegação direcionado ao GitHub.
- **Conteúdo Principal (`<main>`)**:
  - Título principal (`<h1>`) com destaque na palavra chave "instantaneamente".
  - **Container de Busca (`.search-container`)**: Agrupa o campo de entrada (`<input id="ddd">`) limitado a 2 caracteres (`maxlength="2"`) e o botão de ação (`<button id="btn-buscar">`).
  - **Área de Exibição (`<div id="resultado">`)**: Container dinâmico reservado para exibir mensagens de carregamento, alertas de validação/erro ou o resultado retornado pela API.

### 2. Estilização CSS

- **`variables.css`**: Centraliza o tema visual da aplicação utilizando variáveis nativas:
  - `--primary-color`: `#0D4435` (Verde escuro de destaque)
  - `--neutral-color`: `#333333` (Cinza escuro para textos)
  - `--bg-color`: `#f4f5f7` (Fundo suave da aplicação)
  - `--white-color`: `#ffffff`
- **`reset.css`**: Zera margens, preenchimentos e bordas padrão, definindo a família tipográfica *Roboto*.
- **`style.css`**: Define o layout responsivo, caixas de busca, sombras (`box-shadow`), transição de *hover* no botão e barra de rolagem estilizada (`overflow-y: auto`) para a lista de cidades.
- **`imports.css`**: Ponto central de importação dos estilos CSS organizados em ordem de dependência.

### 3. Lógica JavaScript (`js/script.js`)

#### A. Captura de Eventos
O sistema escuta dois gatilhos do usuário:
1. **Clique no botão**: Dispara a função `buscarDDD()` via clique do mouse.
2. **Pressionar a tecla Enter**: Permite que a busca seja executada diretamente ao pressionar "Enter" enquanto o foco estiver no campo de input.

```javascript
// Clique no botão
btnBuscar.addEventListener("click", buscarDDD);

// Pressionar tecla Enter
campoDDD.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarDDD();
    }
});
```

#### B. Sanitização e Validação de Entrada
Antes de enviar a requisição para o servidor:
- **`campoDDD.value.replace(/\D/g, "")`**: Aplica Regex para remover qualquer caractere que não seja número.
- **Validação de Tamanho**: Verifica se a string informada possui exatamente 2 dígitos (`ddd.length !== 2`). Em caso negativo, exibe uma mensagem de alerta.

#### C. Fluxo da Requisição com `fetch()`
1. Ativa a classe CSS `.ativo` no container de resultado para torná-lo visível.
2. Atualiza o conteúdo com o feedback `"Consultando DDD..."`.
3. Executa a requisição assíncrona utilizando `fetch()`.
4. Verifica o status da resposta HTTP (`response.ok`). Se houver erro (status != 200), dispara uma exceção.
5. Mapeia a lista de cidades recebidas no JSON (`dados.cities.map(...)`) transformando-as em itens de lista `<li>`.
6. Injeta o código HTML formatado com Estado, Região e Cidades dentro do container `#resultado`.
7. Trata eventuais falhas com `.catch()`, exibindo uma mensagem amigável em vermelho (`.erro`).

---

## Como Executar o Projeto

1. Baixe ou clone os arquivos do repositório.
2. Mantenha a estrutura de pastas conforme apresentada (`css/`, `js/` e `index.html`).
3. Abra o arquivo `index.html` em qualquer navegador web moderno.
4. Digite um DDD válido com 2 dígitos (exemplo: `11`, `21`, `31`, `85`) e clique em **Localizar Região** ou pressione **Enter**.

---

## Tratamento de Erros e Exceções

- **Entrada inválida**: Exibe mensagem informando que o DDD deve ter exatamente 2 números caso o usuário digite apenas 1 número ou letras.
- **DDD não localizado / Falha na API**: Captura retornos HTTP de erro (ex: 404/444) ou problemas de conexão e apresenta um alerta em tela informando a indisponibilidade.
