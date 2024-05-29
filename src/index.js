import { entries } from "@tonaljs/chord-dictionary";
import { chord } from "@tonaljs/chord";
import { transpose } from "@tonaljs/tonal";
import { Howler, Howl } from "howler";

const sound = new Howl({
    src: ['assets/pianosprite.mp3'],
    onload(){
        console.log('sound file has been load. do something here')
        soundEngine.init()
    },
    onloaderror(e, msg){
        console.log('error', e, msg)
    }
})

const startNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']; 
const startNotesSelector = document.querySelector('#start-note')
const octavesSelector = document.querySelector('#octave')
const buttons = document.querySelector('.buttons')
const intervalInChord = document.querySelector('.intervals-in-chord')
const notesInChord = document.querySelector('.notes-in-chord')

let selectedStartNote = 'C'
let selectedOctave = 1
let selectedChord;

const app = {
    init(){ //um metodo criado para unificar a chamada lá embaixo 
        this.setupStartNotes();
        this.setupOctaves();
        this.setupButtons();
        this.setupEventListener();
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

    setupButtons() {
        const chordNames = entries().map(itens => {
            return itens.aliases[0]
        });
        chordNames.forEach(itens => {
            let chordButton = this.createElement('button', itens)
            buttons.appendChild(chordButton)
        })
    },

    setupEventListener() {
        startNotesSelector.addEventListener('change', () => {
            selectedStartNote = startNotesSelector.value;
            console.log(selectedStartNote)
        })
        octavesSelector.addEventListener('change', () => {
            selectedOctave = octavesSelector.value;
            console.log(selectedOctave)
        })
        buttons.addEventListener('click', (event) => {
            if(event.target.classList.contains('buttons')) {
                return;
            }
            selectedChord = event.target.innerHTML;
            this.displayChordInfo(selectedChord);
        })
    },  

    displayChordInfo(selectedChord) {
        let chordINterval = chord(selectedChord).intervals
        intervalInChord.innerHTML = chordINterval.join(' - ')
        
        const startNoteWithOctave = selectedStartNote + selectedOctave
        let chordNotes = chordINterval.map(val => {
            return transpose(startNoteWithOctave, val);
        })
        notesInChord.innerHTML = chordNotes.join(' - ');
    },

    createElement(elementName, content) { //famossa HOF
        let element = document.createElement(elementName); //element passa a ser um document.createElement, recebe elementName os options acima
        element.innerHTML = content; //e como segundo parametro, passa o conteudo, sendo noteName ou i
        return element
    }
}

const soundEngine = {
    init() {
        const lengthOfNote = 2400;
        let timeIndex = 0
        for(let i = 24; i <= 96; i++) {
            sound['_sprite'][i] = [timeIndex, lengthOfNote]
                timeIndex += lengthOfNote;
        }
        sound.play('48');
    }
}

app.init()