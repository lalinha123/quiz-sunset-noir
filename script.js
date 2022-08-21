class Pergunta{
    constructor(pergunta, resposta, alt1, alt2 = '', alt3 = ''){
        this._pergunta = pergunta;
        this._alternativas = {
            resposta,
            alt1,
            alt2,
            alt3,
        };
    }

    get pergunta(){
        return this._pergunta;
    }

    get resposta(){
        return this._resposta;
    }

    get alternativas(){
        return this._alternativas;
    }

    get alt1(){
        return this._alt1;
    }

    get alt2(){
        return this._alt2;
    }

    get alt3(){
        return this._alt3;
    }
}

const listaPergSemRandom = [];

const criarPergunta = (perg, resp, alt1, alt2, alt3) => {
    const pergunta = new Pergunta(perg, resp, alt1, alt2, alt3);

    listaPergSemRandom.push(pergunta);

    return pergunta;
};

const perg1 = criarPergunta('Quem tem a carequinha mais bacana?', 'Kris', 'Bia', 'Júlia', 'Pãozinho');
const perg2 = criarPergunta('Qual é a gatinha mais linda?', 'Sarninha', 'Júlia', 'Merch (Rick)', 'Luska');
const perg3 = criarPergunta('O nachos é gay?', 'Sim, e muito', 'Não', 'Talvez', 'Sim, mas só um pouquinho');
const perg4 = criarPergunta('Quem é o namorado da May?', 'Morango', 'Lore', 'Bia', 'Rafa');
const perg5 = criarPergunta('Quem é o macaco?', '***ele***', 'nn sei O__O', 'hmmmm', 'sim');
const perg6 = criarPergunta('Quem não é da staff?', 'Saas', 'May', 'Bia', 'Henry');
const perg7 = criarPergunta('Qual é o server do amor?', 'Sunset Noir', 'Cleber', 'Aquele server de Pokémon que você faz parte mas nunca interage', 'Qualquer um');

//--------------------------------------------------------------------------
const quiz = document.querySelector(`#quiz`);
const classAlt = document.querySelectorAll('.alternativa');
let pergNum = 1;
let acertos = 0;
let erros = 0;
let perguntaAtual;


const random = (array) => {
    const arrayAlt = [];

    for (i = 0; i < array.length; i++) {
        arrayAlt.push(i);
    }

    arrayAlt.sort(() => Math.random() - 0.5);

    for (i = 0; i < arrayAlt.length; i++) {
        arrayAlt[i] = array[arrayAlt[i]];
    }

    return arrayAlt;
}

const randomizaAlt = () => {
    const { resposta, alt1, alt2, alt3 } = perguntaAtual.alternativas;
    const listaKeyObj = [resposta, alt1, alt2, alt3];

    const lista = random(listaKeyObj);

    classAlt.forEach((alt, idx) => {
        alt.textContent = lista[idx];
    });
};

const verificaAlt = (alt) => {
    const acertou = (certo = true) => {
        if(certo){
            acertos++;
            alt.classList.add('certo');
        }

        else{
            erros++;
            alt.classList.add('errado');
        }

        setTimeout(() => {
            pergNum++;
            pergNum > listaPerg.length ? termina() : updateQuiz();
        }, 1000);
    }

    alt.textContent === perguntaAtual.alternativas.resposta ? acertou() : acertou(false);
};

const updateQuiz = () => {
    perguntaAtual = listaPerg[pergNum - 1];
    const txtPergunta = document.querySelector('#pergunta');
    const txtpergNum = document.querySelector('#pergNum');

    txtPergunta.textContent = perguntaAtual.pergunta;
    txtpergNum.textContent = `${pergNum}.`;

    randomizaAlt();

    classAlt.forEach(alt => {
        alt.classList.remove('certo');
        alt.classList.remove('errado');
    });
};

const inicia = (btnId) => {
    pergNum = 1;
    acertos = 0;
    erros = 0;

    document.querySelector(`#${btnId}`).style.display = 'none';
    quiz.style.display = 'block';

    listaPerg = random(listaPergSemRandom);
    updateQuiz();

    classAlt.forEach(alt => {
        alt.addEventListener('click', () => {
            verificaAlt(alt);
        });
    });
}

const termina = () => {
    quiz.style.display = 'none';

    if(acertos > listaPerg.length / 2){
        resultado = 'Parabéns!! Você é foda :D'
    }

    else{
        resultado = 'Seu bananão >:('
    }

    document.querySelector('#resultado').textContent = resultado;
    document.querySelector('#acertos').textContent = `Acertos: ${acertos}`;
    document.querySelector('#erros').textContent = `Erros: ${erros}`;

    document.querySelector('#placar').style.display = 'block';
}