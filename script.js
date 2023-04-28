const qtdLinhas = 15;
const qtdColunas = 15;
let qtdBombas = 30;

let quadradosCanto = [];
let quadradosBordaEsquerda = [];
let quadradosBordaDireita = [];
let quadradosBordaCima = [];
let quadradosBordaBaixo = [];
let idsBombas = [];
let primeiroClique = true;

let grid = document.getElementById('grid');

populaPosicaoQuadrados();
criaBombas();
criaTabela();

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    let elemento = event.target;
    if (elemento.classList.contains('bandeirinha')) {
        elemento.classList.remove('bandeirinha');
    } else if (!elemento.classList.contains('aberto')) {
        elemento.classList.add('bandeirinha');
    }
});



function criaTabela() {
    for (let i = 0; i < qtdLinhas; i++) {
        let linha = document.createElement('tr');

        for (let j = 0; j < qtdColunas; j++) {
            let coluna = document.createElement('td');
            let id = 1 + (j) + (qtdColunas * i);
            coluna.onclick = function () {
                var el = document.getElementById(id);
                if (!el.classList.contains("bandeirinha")) {
                    verificaPosicao(id);
                }
            }

            coluna.id = id;
            // coluna.innerHTML = retornaQuantidadeBombasRedor(id);

            linha.appendChild(coluna);

        }

        grid.appendChild(linha);
    }
}

document.querySelector("#inputAtualiza").addEventListener('click', function() {
    debugger
    var numBombas = Number(document.getElementById("inputNum").value);
    qtdBombas = numBombas;
    grid.innerHTML = "";
    populaPosicaoQuadrados();
    criaBombas();
    criaTabela();
});

function criaBombas() {
    idsBombas = geraNumerosAleatorios(qtdBombas, 1, (qtdLinhas * qtdColunas));
}

// function coloreBombas() {
//     for (let i = 0; i < idsBombas.length; i++) {
//         let quadrado = document.getElementById(idsBombas[i]);

//         quadrado.style.backgroundColor = 'white';
//     }
// }

function geraNumerosAleatorios(quantidadeNumeros, numeroInicial, numeroFinal) {
    let numeros = new Set();

    while (numeros.size < quantidadeNumeros) {
        let numero = Math.floor(Math.random() * (numeroFinal - numeroInicial + 1)) + numeroInicial;
        numeros.add(numero);
    }

    return Array.from(numeros);
}

function retornaPosicoesRedorQuadrado(id) {
    let posicoesRedorQuadrado = new Array(8);

    if (quadradosCanto.includes(id)) {
        let index = quadradosCanto.indexOf(id);
        switch (index) {
            case 0:
                posicoesRedorQuadrado[4] = id + 1;
                posicoesRedorQuadrado[6] = id + qtdColunas;
                posicoesRedorQuadrado[7] = id + (qtdColunas + 1);
                break;

            case 1:
                posicoesRedorQuadrado[3] = id - 1;
                posicoesRedorQuadrado[5] = id + (qtdColunas - 1);
                posicoesRedorQuadrado[6] = id + qtdColunas;
                break;

            case 2:
                posicoesRedorQuadrado[1] = id - qtdColunas;
                posicoesRedorQuadrado[2] = id - (qtdColunas - 1);
                posicoesRedorQuadrado[4] = id + 1;
                break;

            case 3:
                posicoesRedorQuadrado[0] = id - (qtdColunas + 1);
                posicoesRedorQuadrado[1] = id - qtdColunas;
                posicoesRedorQuadrado[3] = id - 1;
                break;

            default:
                break;
        }
    } else if (quadradosBordaCima.includes(id)) {
        posicoesRedorQuadrado[3] = id - 1;
        posicoesRedorQuadrado[4] = id + 1;
        posicoesRedorQuadrado[5] = id + (qtdColunas - 1);
        posicoesRedorQuadrado[6] = id + qtdColunas;
        posicoesRedorQuadrado[7] = id + (qtdColunas + 1);

    } else if (quadradosBordaDireita.includes(id)) {
        posicoesRedorQuadrado[0] = id - (qtdColunas + 1);
        posicoesRedorQuadrado[1] = id - qtdColunas;
        posicoesRedorQuadrado[3] = id - 1;
        posicoesRedorQuadrado[5] = id + (qtdColunas - 1);
        posicoesRedorQuadrado[6] = id + qtdColunas;

    } else if (quadradosBordaEsquerda.includes(id)) {
        posicoesRedorQuadrado[1] = id - qtdColunas;
        posicoesRedorQuadrado[2] = id - (qtdColunas - 1);
        posicoesRedorQuadrado[4] = id + 1;
        posicoesRedorQuadrado[6] = id + qtdColunas;
        posicoesRedorQuadrado[7] = id + (qtdColunas + 1);

    } else if (quadradosBordaBaixo.includes(id)) {
        posicoesRedorQuadrado[0] = id - (qtdColunas + 1);
        posicoesRedorQuadrado[1] = id - qtdColunas;
        posicoesRedorQuadrado[2] = id - (qtdColunas - 1);
        posicoesRedorQuadrado[3] = id - 1;
        posicoesRedorQuadrado[4] = id + 1;
    } else {
        posicoesRedorQuadrado[0] = id - (qtdColunas + 1);
        posicoesRedorQuadrado[1] = id - qtdColunas;
        posicoesRedorQuadrado[2] = id - (qtdColunas - 1);
        posicoesRedorQuadrado[3] = id - 1;
        posicoesRedorQuadrado[4] = id + 1;
        posicoesRedorQuadrado[5] = id + (qtdColunas - 1);
        posicoesRedorQuadrado[6] = id + qtdColunas;
        posicoesRedorQuadrado[7] = id + (qtdColunas + 1);
    }

    return posicoesRedorQuadrado;
}

function retornaQuantidadeBombasRedor(id) {
    let posicoesRedorQuadrado = retornaPosicoesRedorQuadrado(id);
    let listaComum = idsBombas.filter(x => posicoesRedorQuadrado.includes(x));

    return listaComum.length;
}

function populaPosicaoQuadrados() {

    let ids = Array.from({ length: (qtdColunas * qtdLinhas) }, (_, i) => i + 1);

    quadradosCanto = [1, qtdColunas, (qtdLinhas * qtdColunas - (qtdColunas - 1)), qtdLinhas * qtdColunas];
    quadradosBordaCima = ids.filter(x => x < qtdColunas && x > 1);
    quadradosBordaDireita = ids.filter(x => x % qtdColunas == 0 && x > qtdColunas && x < (qtdColunas * qtdLinhas));
    quadradosBordaEsquerda = ids.filter(x => x % qtdColunas == 1 && x > qtdColunas && x < (qtdColunas * qtdLinhas - qtdColunas));
    quadradosBordaBaixo = ids.filter(x => x > ((qtdColunas * qtdLinhas) - qtdColunas + 1) && x < qtdColunas * qtdLinhas);

}

function verificaPosicao(id) {

    if (primeiroClique && idsBombas.includes(id)) {
        while (idsBombas.includes(id)) {
            criaBombas();
        }
    }
    primeiroClique = false;
    let posicao = document.getElementById(id);
    let qtdBombasRedor = retornaQuantidadeBombasRedor(id);
    if (idsBombas.includes(id)) {
        gameOver();
        primeiroClique = true;
        posicao.style.backgroundColor = '#b30000';
    } else {

        if (qtdBombasRedor == 0) {
            abreQuadradosRedor(id);
        }

        posicao.style.backgroundColor = 'white';
        posicao.innerHTML = qtdBombasRedor;
        posicao.classList.add('aberto');

        verificaVitoria();
    }

}

function gameOver() {

    for (let i = 0; i < idsBombas.length; i++) {
        let bomba = document.getElementById(idsBombas[i]);
        bomba.classList.add('bomba');
    }
    setTimeout(() => {

        if (!alert('Game Over')) {
            grid.innerHTML = "";
            populaPosicaoQuadrados();
            criaBombas();
            criaTabela();
        }
    }, 500)

}

function abreQuadradosRedor(id) {
    let posicoesRedorQuadrado = retornaPosicoesRedorQuadrado(id).filter(function (element) {
        return element !== "" && element !== null && element !== undefined;
    });
    let qtdBombasRedor = 0;

    for (let i = 0; i < posicoesRedorQuadrado.length; i++) {
        let posicao = document.getElementById(posicoesRedorQuadrado[i]);
        qtdBombasRedor = retornaQuantidadeBombasRedor(posicoesRedorQuadrado[i]);
        if (!idsBombas.includes(id) && !posicao.classList.contains('aberto')) {

            posicao.classList.remove('bandeirinha');
            posicao.style.backgroundColor = 'white';
            posicao.innerHTML = qtdBombasRedor;
            posicao.classList.add('aberto');

            if (qtdBombasRedor == 0) {
                abreQuadradosRedor(posicoesRedorQuadrado[i]);
            }

        }
    }
}

function verificaVitoria() {
    let quantidadeAbertos = document.querySelectorAll('.aberto').length;
    if (quantidadeAbertos == (qtdColunas * qtdLinhas - idsBombas.length)) {
        primeiroClique = true;
        for (let i = 0; i < idsBombas.length; i++) {
            let bomba = document.getElementById(idsBombas[i]);
            bomba.classList.add('bomba');
        }
        setTimeout(() => {

            if (!alert('Win')) {
                grid.innerHTML = "";
                populaPosicaoQuadrados();
                criaBombas();
                criaTabela();
            }
        }, 500)
    }
}