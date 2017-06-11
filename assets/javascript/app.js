

/**
	- Show the start button at the beginning of the game
	- On click of start button, hide start button, start timer, show all questions with answer choices, 
	  show done button
	- At expiration of timer, report total of correct, incorrect, and unanswered questions
	- On click of done button, report total of correct, incorrect, and unanswered questions
**/

  
$(document).ready(function() {

	/***VARIABLES***/ 
	var quiz = {
		correctCount: 0,
		wrongCount: 0,
		unansweredCount: 0,

		startButton: $('#js-start-button'),
		doneButton: $('#js-done-button'),

		timer: {
			number: 75,
			intervalId: '',
		},
		
		trivia: [
			{
		  	question: 'In what year was Frank Lloyd Wright born?',
		  	answers: ['1865', '1866', '1867', '1868'],
		  	correctAnswer: '1867',
		  	userChoice: '',
		  	},
		  	{
		  	question: 'Where was Wright born?',
		  	answers: ['Wisconsin', 'Illinois', 'Ohio', 'New York'],
		  	correctAnswer: 'Wisconsin',
		  	userChoice: '',
		  	},
		  	{
		  	question: 'In what year did Wright die?',
		  	answers: ['1948', '1952','1955', '1959'],
		  	correctAnswer: '1959',
		  	userChoice: '',
		  	},
			{
		  	question: 'Who was Wright\'s first employer?',
		  	answers: ['Louis Sullivan', 'Henry Hobson Richardson', 'Daniel Burnham', 'Joseph Lyman Silsbee'],
		  	correctAnswer: 'Joseph Lyman Silsbee',
		  	userChoice: '',
			},
			{
		  	question: 'Wright only fought to save one of his buildings--which one?',
		  	answers: ['Robie House', 'Larkin Building', 'Heller House', 'Unity Temple'],
		  	correctAnswer: 'Robie House',
		  	userChoice: '',
			},
			{
			question: 'What style of architecture is Wright most famous for?',
		  	answers: ['Art Deco', 'Prairie Style', 'International Style', 'Modernist'],
		  	correctAnswer: 'Prairie Style',
		  	userChoice: '',
			},
			{
			question: 'Which of these authors wrote a book with the main character inspired by Wright?',
		  	answers: ['Ernest Hemmingway', 'F. Scott Fitzgerald', 'Jack Kerouac', 'Ayn Rand'],
		  	correctAnswer: 'Ayn Rand',
		  	userChoice: '',
			},
			{
			question: 'Which campus did Frank Lloyd Wright design?',
		  	answers: ['Florida Southern College', 'Lake Forest College', 'Arizona State University', 'University of Wisconsin'],
		  	correctAnswer: 'Florida Southern College',
		  	userChoice: '',
			},
		],
	};


	/***EVENTS***/

    /**Initialize the game**/
	init();

    /**Start the quiz on click of the start button**/
	quiz.startButton.on('click', function() {
		startQuiz();
		recordChoice();
	});

	/**Show quiz results on click of the done button**/
	quiz.doneButton.on('click', function() {
		clearInterval(quiz.timer.intervalId);
		showResults();
	});



	/***FUNCTIONS***/

	/**Set the initial state of the game**/
	function init() {
		correctCount = 0;
		wrongCount = 0;
		unansweredCount = 0;
		$('#js-trivia').hide();
		quiz.doneButton.hide();
	}

	/**Start the quiz**/
	function startQuiz() {
		quiz.startButton.hide();
		$('#js-trivia').show();
		$('#js-timer').html('<h2 class="bold-text center red-text">' + quiz.timer.number + ' seconds </h2>');
		quiz.doneButton.show();
		runTimer();
		displayQuestions();
	}

	/**Create a div for each question and its answer options**/
	function displayQuestions() {	
		var questionText = '';
		for (var i=0; i<quiz.trivia.length; i++) {
			var answerOptions = '';
			questionText = '<div class="bold-text center">' + quiz.trivia[i].question + '</div>';

			for(var a=0; a < quiz.trivia[i].answers.length; a++) {
            	answerOptions += '<input class="answer js-choice" type="radio" name="' + i +'" data-name="'+ 
              	quiz.trivia[i].answers[a] +'">' + quiz.trivia[i].answers[a] + '</input>';
            }

        	$('#js-quiz').append('<div class="question center">' + questionText + answerOptions + '</div>');
		}
	}

	/**Run the timer**/
	function runTimer() {
		quiz.timer.intervalId = setInterval(decrement, 1000);
	}

	/**Decrement the timer**/
	function decrement() {
		quiz.timer.number--;
		$('#js-timer').html('<h2 class="bold-text center red-text">' + quiz.timer.number + ' seconds </h2>');

		/**When the timer reaches 0, show the results of the quiz**/
		if (quiz.timer.number === 0) {
			clearInterval(quiz.timer.intervalId);
			showResults();
		}
	}

	/**Record the user's choice with each click of a radio button**/
	function recordChoice() {
		$('.js-choice').on('click', function() {
			this.userChoice = ($(this).attr('data-name'));
			this.triviaQuestion = ($(this).attr('name'))
			quiz.trivia[this.triviaQuestion].userChoice = this.userChoice;
		})	
	}

	/*Calculate and display the results of the quiz*/
	function showResults() {
		for (var i=0; i<quiz.trivia.length; i++) {
			if (quiz.trivia[i].userChoice === quiz.trivia[i].correctAnswer) quiz.correctCount++;
			else if (quiz.trivia[i].userChoice === '') quiz.unansweredCount++;
			else quiz.wrongCount++;
		}

		$('#js-trivia').html('');
		$('#js-trivia').append('<h2 class="bold-text center">All done!</h2>')
			.append('<div class="bold-text center">' + 'Correct: ' + quiz.correctCount + '</div>')
			.append('<div class="bold-text center">' + 'Incorrect: ' + quiz.wrongCount + '</div>')
			.append('<div class="bold-text center">' + 'Unanswered: ' + quiz.unansweredCount + '</div>');
		quiz.doneButton.hide();
	}
});
