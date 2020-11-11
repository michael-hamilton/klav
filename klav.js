// Klav
import * as Tone from 'tone';

class Klav {
	static notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	static whiteKeyIndexes = [0, 2, 4, 5, 7, 9, 11];

	constructor(keyboard) {
		this.synth = new Tone.Synth().toDestination();
		this.keyboard = keyboard;
	}

	init() {
		this.buildKeyboard(this.keyboard, 4, 2);
		this.initKeyListeners();
	}

	//Build a keyboard by taking a jQuery selector for the keyboard, number of octave, and start octave
	buildKeyboard(keyboard, octaves, startOctave) {
		let tmpKeyboard = ``;
		for (let octave = 0 ; octave < octaves; octave++) {
			let tmpKeys = ``;

			for (let noteIndex = 0; noteIndex < Klav.notes.length; noteIndex++) {
				let keyClass = Klav.whiteKeyIndexes.includes(noteIndex) ? 'white' : 'black';
				tmpKeys += `<div class="key ${keyClass}" data-octave="${octave + startOctave}" data-note="${Klav.notes[noteIndex]}"></div>`;
			}

			tmpKeyboard += `<div class="octave" data-octave="${octave + startOctave}">${tmpKeys}</div>`
		}

		keyboard.innerHTML = tmpKeyboard;
	}

	//Listens for clicks on keyboard keys and calls function to play sound
	initKeyListeners() {
		const keys = this.keyboard.getElementsByClassName('key');
		Array.from(keys).forEach((key) => {
			key.addEventListener('click', (e) => {
				const octave = e.target.getAttribute('data-octave');
				const note = e.target.getAttribute('data-note');

				this.playSound(note, octave, '16n');
			});
		});
	}

	//Plays a sound with provided note, octave, and duration
	playSound(note, octave, duration) {
		this.synth.triggerAttackRelease(note+octave, duration);
	}
}

const K = new Klav(document.getElementById('keyboard'));
K.init();
