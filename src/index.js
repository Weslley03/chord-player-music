const startNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']; 
const startNotesSelector = document.querySelector('#start-note')
const octavesSelector = document.querySelector('#octave')

const app = {
    init(){ //um metodo criado para unificar a chamada lá embaixo 
        this.setupStartNotes();
        this.setupOctaves();
    },

    setupStartNotes() { //conf start notes
        startNotes.forEach(noteName => { //forEach no array 'startNotes' onde cada elemento é noteName
            let noteNameOption = this.createElement('option', noteName); 
            /* variavel noteNameOption recebe uma chamada ao metodo createElement, 'this' faz referencia ao 
            app, ou seja 'dentro do app, metodo createElement*/
            startNotesSelector.appendChild(noteNameOption) // coloca a nova opção dentro do startNotesSelector
        });
    },

    setupOctaves() {
        for(let i = 1; i <= 7; i++) {
            let octavesNumber = this.createElement('option', i) //passa do 1 ao 7 e chama o createElement do app
            octavesSelector.appendChild(octavesNumber) //passa 7 opções para o octavesSelector
        }
    },

    createElement(elementName, content) { //famossa HOF
        let element = document.createElement(elementName); //element passa a ser um document.createElement, recebe elementName os options acima
        element.innerHTML = content; //e como segundo parametro, passa o conteudo, sendo noteName ou i
        return element
    }
}

app.init()