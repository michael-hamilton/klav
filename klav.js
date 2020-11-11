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
		this.keyboard.innerHTML = this.buildKeyboard(4, 2);
		this.initKeyListeners();
	}

	// Builds a keyboard with a set number of octaves beginning at an optional start octave
	buildKeyboard(octaves, startOctave = 1) {
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

		Array.from(keys).forEach((key) => {
			key.addEventListener('mousedown', (e) => {
				const octave = e.target.getAttribute('data-octave');
				const note = e.target.getAttribute('data-note');

				this.playNote(note, octave, '16n');
			});
		});
	}

	//Plays a note for a duration at a specified octave
	playNote(note, octave, duration) {
		this.synth.triggerAttackRelease(note+octave, duration);
	}
}

const K = new Klav(document.getElementById('keyboard'));
K.init();
