# Atividade-dos-desafios
# Desafios de JavaScript: Objetos, Protótipos e JSON

## Desafio 1: A Natureza do Objeto e o Paradoxo do `const`

**Pesquisa Teórica: O que é exatamente um objeto literal em JavaScript?**
Um objeto literal é uma estrutura de dados fundamental em JavaScript que armazena coleções de pares chave-valor (propriedades e métodos). Ele é criado declarando essas chaves e valores dentro de chavetas `{}`. É chamado de "literal" porque estamos a definir o seu conteúdo exatamente como ele será lido na criação, em oposição a instanciá-lo a partir de uma classe ou construtor.

**Reflexão:** Por que o Node.js permite alterar um objeto declarado como `const` sem erro?
Em JavaScript, declarar uma variável com `const` impede que a **referência de memória** seja reatribuída. Ou seja, não podemos dizer que a variável passará a ser outro objeto ou um tipo primitivo (ex: `variavel = {}` ou `variavel = 5`). No entanto, o `const` não torna o objeto imutável. Os valores armazenados dentro dessa referência de memória podem ser alterados, adicionados ou apagados livremente.

---

## Desafio 2: Padrões de Criação (Factory vs. Construtor)

**Pesquisa Teórica: Qual é a diferença entre uma Função Construtora e uma Função Fábrica?**
*   **Função Construtora:** Usa-se com a palavra-chave `new`. Ao ser invocada, o JS cria um objeto vazio em background, aponta o `this` para esse objeto, executa o corpo da função (anexando propriedades ao `this`) e retorna o objeto implicitamente. Convencionalmente, começa com letra maiúscula.
*   **Função Fábrica (Factory):** É uma função normal que retorna um novo objeto literal `{}` em cada chamada. Não necessita da palavra `new` nem depende do `this` para a criação.

**Reflexão:** Quais as vantagens de usar uma Factory em relação aos problemas de escopo do `this`?
O `this` em JS é dinâmico e depende de *como* a função é chamada, não de onde foi criada. Se passarmos um método de uma Função Construtora como *callback* (por exemplo, num `setTimeout` ou *Event Listener*), o `this` perde o contexto e passa a apontar para o objeto global (ou `undefined` no strict mode). As Factory Functions resolvem isso porque retornam objetos puros e muitas vezes usam *Closures* para encapsular dados, tornando o comportamento previsível e à prova de perdas de contexto, eliminando a dor de cabeça de usar `.bind(this)`.

---

## Desafio 3: O Controle de Acesso (Getters/Setters e Bloqueios)

**Pesquisa Teórica: Para que servem o `get` e o `set` num objeto literal?**
Servem para intercetar a leitura (`get`) ou a escrita (`set`) de uma propriedade. O `get` permite computar valores dinamicamente na hora da leitura, parecendo uma propriedade normal em vez de uma função. O `set` permite executar validações ou regras de negócio antes de atribuir de facto o valor à propriedade (ex: impedir saldos negativos).

**Diferença entre `Object.seal()` e `Object.freeze()`:**
*   **`Object.seal()` (Selar):** Impede que novas propriedades sejam adicionadas e que as propriedades existentes sejam apagadas. No entanto, os **valores das propriedades que já existem podem ser alterados**.
*   **`Object.freeze()` (Congelar):** É mais restrito. Faz tudo o que o `seal()` faz, mas também **impede a alteração** dos valores das propriedades existentes. O objeto fica 100% estático (a não ser que tenha objetos aninhados, pois o freeze é *shallow*/superficial).

---

## Desafio 4: A Verdadeira Herança (Cadeia de Protótipos)

**Pesquisa Teórica: O que é a propriedade oculta `__proto__`?**
O `__proto__` (formalmente conhecido como `[[Prototype]]`) é uma propriedade interna de todos os objetos em JavaScript que aponta para o protótipo (outro objeto) do qual ele herda. Quando tentamos aceder a uma propriedade ou método num objeto e o JS não o encontra, ele segue essa referência `__proto__` para procurar no objeto "pai". Isto chama-se "Prototype Chain" (Cadeia de Protótipos).

---

## Desafio 5: O Trânsito de Dados (JSON vs. JS Object)

**Pesquisa Teórica: Quais são as regras estruturais que diferenciam um .json de um Objeto Literal?**
1. O JSON (JavaScript Object Notation) é uma **string/texto**, enquanto um objeto JS é uma estrutura de dados em memória.
2. No JSON, **todas as chaves (propriedades) têm de estar obrigatoriamente entre aspas duplas** `"chave"`. No JS, as aspas nas chaves são opcionais.
3. O JSON só suporta valores primitivos (strings, números, booleanos, null), arrays e outros objetos JSON. **Não suporta funções**, `undefined` ou Símbolos.

**Reflexão:** O que aconteceu com a função após a conversão? Por que acontece nas APIs REST?
Ao aplicar o `JSON.stringify()`, a função foi simplesmente **ignorada e removida** do resultado final.
Isto acontece na arquitetura de APIs REST porque as APIs comunicam via protocolos de rede (como HTTP) baseados em transferência de **texto puro/dados**. Passar código executável (funções) entre servidores e clientes através de texto:
1. Destruiria a interoperabilidade (uma API em Python não sabe o que fazer com uma função JavaScript).
2. Seria uma enorme falha de segurança (Remote Code Execution - permitiria a execução de código malicioso de terceiros no servidor ou cliente).
