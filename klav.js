var Klav = {

	synth: new Tone.Synth().toMaster(),
	notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
	whiteKeyIndexes: [0, 2, 4, 5, 7, 9, 11],

	init: function() {
		Klav.buildKeyboard($('#keyboard'), 4, 2);
		Klav.initKeyListeners();
	},

	//Build a keyboard by taking a jQuery selector for the keyboard, number of octave, and start octave
	buildKeyboard: function(keyboard, octaves, startOctave) {
		var tmpKeyboard = ``;
		for (var octave = 0 ; octave < octaves; octave++) {
			var tmpKeys = ``;

			for (var noteIndex = 0; noteIndex < Klav.notes.length; noteIndex++) {
				var keyClass = Klav.whiteKeyIndexes.includes(noteIndex) ? 'white' : 'black';
				tmpKeys += `<div class="key ${keyClass}" data-note="${Klav.notes[noteIndex]}"></div>`;
			}

			tmpKeyboard += `<div class="octave" data-octave="${octave + startOctave}">${tmpKeys}</div>`
		}

		keyboard.html(tmpKeyboard);
	},

	//Listens for clicks on keyboard keys and calls function to play sound
	initKeyListeners: function () {
		$('.key').click(function() {
			var octave = $(this).closest('.octave').data('octave'),
					note = $(this).data('note');

			Klav.playSound(note, octave, '16n');
		});
	},

	//Plays a sound with provided note, octave, and duration
	playSound: function (note, octave, duration) {
		Klav.synth.triggerAttackRelease(note+octave, duration);
	}
};

$(document).ready(Klav.init);