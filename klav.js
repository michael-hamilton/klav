// Klav
import * as Tone from 'tone';

class Klav {
	static notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	static whiteKeyIndexes = [0, 2, 4, 5, 7, 9, 11];

	constructor(keyboard) {
		this.keyboard = keyboard;
		this.synth = new Tone.Synth().toDestination();
	}

	init() {
		this.buildKeyboard();
		window.addEventListener('resize', () => this.buildKeyboard());
	}

	// Builds a keyboard that fits within the screen
	buildKeyboard() {
		const keybed = this.keyboard.getElementsByClassName('keybed');
		const octaves = window.innerWidth / (window.innerWidth < 800 ? 600 : 500);
		keybed[0].innerHTML = this.generateKeys(octaves, window.innerWidth < 800 ? 3 : 2);
		this.keyboard.style.display = '';
		this.initKeyListeners();
	}

	// Generates n octaves of keys beginning at a start octave
	generateKeys(octaves, startOctave = 1) {
		let tmpKeyboard = ``;
		for (let octave = 0 ; octave < octaves; octave++) {
			let tmpKeys = ``;

			this.constructor.notes.forEach((note, index) => {
				let keyClass = this.constructor.whiteKeyIndexes.includes(index) ? 'white' : 'black';
				tmpKeys += `<div class="key ${keyClass}" data-octave="${octave + startOctave}" data-note="${this.constructor.notes[index]}"></div>`;
			});

			tmpKeyboard += `<div class="octave" data-octave="${octave + startOctave}">${tmpKeys}</div>`
		}

		return tmpKeyboard;
	}

	//Listens for presses on keyboard keys and plays the respective note
	initKeyListeners() {
		const keys = this.keyboard.getElementsByClassName('key');

		const handlePlay = key => {
			const octave = key.getAttribute('data-octave');
			const note = key.getAttribute('data-note')

			key.classList.add('active')
			this.playNote(note, octave, '16n');
		}

		Array.from(keys).forEach((key) => {
			key.addEventListener('mousedown', e => handlePlay(key));
			key.addEventListener('mouseup', e => key.classList.remove('active'));
			key.addEventListener('mouseout', e => key.classList.remove('active'));
		});
	}

	//Plays a note for a duration at a specified octave
	playNote(note, octave, duration) {
		this.synth.triggerAttackRelease(note+octave, duration);
	}
}

const K = new Klav(document.getElementById('keyboard'));
K.init();
