// Desafio 1: A Natureza do Objeto e o Paradoxo do const

const pessoa = {
    nome: "João",
    idade: 25
};

console.log("Objeto original:", pessoa);

pessoa.profissao = "Desenvolvedor";
console.log("Após adicionar:", pessoa);

pessoa.idade = 26;
console.log("Após alterar:", pessoa);

delete pessoa.nome;
console.log("Após apagar:", pessoa);

__________________________________________________________________________________________________

// Desafio 2: Padrões de Criação (Factory vs. Construtor)

function ProdutoConstrutor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
    this.exibir = function() {
        console.log(`[Construtor] Produto: ${this.nome} | Preço: ${this.preco}€`);
    };
}

const p1 = new ProdutoConstrutor("Portátil", 1200);
p1.exibir();

function criarProdutoFactory(nome, preco) {
    return {
        nome: nome,
        preco: preco,
        exibir() {
            console.log(`[Factory] Produto: ${this.nome} | Preço: ${this.preco}€`);
        }
    };
}

const p2 = criarProdutoFactory("Teclado", 150);
p2.exibir();
__________________________________________________________________________________________________

// Desafio 3: O Controle de Acesso e Bloqueios

const contaBancaria = {
    _saldo: 1000,
    
    get saldo() {
        return this._saldo;
    },
    
    set saldo(novoValor) {
        if (novoValor < 0) {
            console.error("ERRO: O saldo não pode receber um valor negativo!");
        } else {
            this._saldo = novoValor;
            console.log("Saldo atualizado com sucesso para:", this._saldo);
        }
    }
};

console.log("Saldo Inicial:", contaBancaria.saldo);
contaBancaria.saldo = -500;
contaBancaria.saldo = 1200;


console.log("\n--- PARTE 2: Seal vs Freeze ---");

const objSelado = { id: 1, status: "ativo" };
Object.seal(objSelado);

objSelado.status = "inativo";
objSelado.novo = "teste";    
delete objSelado.id;         
console.log("Objeto Selado:", objSelado); 


const objCongelado = { id: 2, status: "ativo" };
Object.freeze(objCongelado);

objCongelado.status = "inativo";
objCongelado.novo = "teste";     
delete objCongelado.id;        
console.log("Objeto Congelado:", objCongelado);
__________________________________________________________________________________________________

// Desafio 4: A Verdadeira Herança (Cadeia de Protótipos)

const Veiculo = {
    rodas: 4,
    acelerar() {
        console.log("Vrummm! O veículo está a acelerar.");
    }
};

const Carro = Object.create(Veiculo);

Carro.marca = "Toyota";
Carro.modelo = "Corolla";

console.log(`Carro: ${Carro.marca} ${Carro.modelo}`);
console.log(`Quantas rodas tem o carro? ${Carro.rodas}`);

Carro.acelerar();

console.log("O protótipo de Carro é o Veiculo?", Object.getPrototypeOf(Carro) === Veiculo);

__________________________________________________________________________________________________

// Desafio 5: O Trânsito de Dados (JSON vs. JS Object)

const utilizadorJS = {
    nome: "Ana Silva",        
    pontuacao: 95,            
    cumprimentar: function() {
        return `Olá, eu sou a ${this.nome}`;
    }
};

console.log("--- Objeto Original JS ---");
console.log(utilizadorJS);
console.log("Chamando a função:", utilizadorJS.cumprimentar());

const textoJSON = JSON.stringify(utilizadorJS);

console.log("\n--- Convertido para JSON ---");
console.log(textoJSON);
