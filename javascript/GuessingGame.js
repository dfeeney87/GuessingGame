function generateWinningNumber () {
	return Math.floor(Math.random()*100 + 1)
}


function shuffle (arrI) {
	var m = arrI.length, i, t;
	while(m){

		i = Math.floor(Math.random() * m--);

		t = arrI[m];
		arrI[m] = arrI[i];
		arrI[i] = t;
	}
	return arrI;
}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.guessesRemaining = function() { return 5 - this.pastGuesses.length};
    this.winningNumber= generateWinningNumber.call(this);
}

Game.prototype.difference = function () {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function () {
	if (this.playersGuess < this.winningNumber) {
		return true;
	} else return false;
}

Game.prototype.playersGuessSubmission = function (inpNum) {
	if (inpNum < 1 || inpNum > 100 || typeof inpNum !== 'number'){
		throw 'That is an invalid guess.';
	}
	else {
		this.playersGuess = inpNum;
	}
	return this.checkGuess();
};

Game.prototype.checkGuess = function () {
	if (this.playersGuess === this.winningNumber) {
		 $('#title').text('You Win!');
        $('#subtitle').text('Press the reset button to play again');
        $("#userInput").addClass("winner");
        $("#input-parent").children("p").text("Winning Number");
        $("#userInput").val(this.winningNumber);
        return 'You Win!';
        
	} 
	
	if (this.winningNumber !== this.playersGuess) {
		if (this.pastGuesses.indexOf(this.playersGuess) === -1) {
			this.pastGuesses.push(this.playersGuess);
            $('#past-guesses li:nth-child('+ this.pastGuesses.length+')').text(this.playersGuess);
                    console.log(this.guessesRemaining());
            $("#subtitle").text("You have "+this.guessesRemaining()+" guesses remaining");
		} else  {
            $('#title').text('You have already guessed that number');
        $("#subtitle").text("Pick a UNIQUE number between 1-100")
        }
	
	if (this.pastGuesses.length === 5) {
        console.log("wtf?")
        $('#title').text('You are fired!');
        $('#subtitle').text('Press the reset button to play again');
        $("#submit, #userInput, #hint").prop("disabled", true);
        $("#input-parent").children("p").text("Winning Number");
//        $("#input-parent").children("p").animate({"left":"-0px"});
        $("#userInput").val(this.winningNumber);
        $("#userInput").addClass("loser");
        return 'You Lose.';
	}
			
			var guessQuality =  this.difference();
			if (guessQuality < 10 && guessQuality > 0) {
				$("#title").text("You're burning up!")
                return "You're burning up!";
			}
			if (guessQuality < 25 && guessQuality >= 10) {
				
                $("#title").text("You're lukewarm.")
                return "You're lukewarm.";
			}
			if (guessQuality < 50 && guessQuality >= 25) {
				$("#title").text("You're a bit chilly.")
                return "You're a bit chilly.";
			}
			if (guessQuality < 100 && guessQuality >= 50) {
				$("#title").text("You're ice cold!")
                return "You're ice cold!";
		}
	}
};

Game.prototype.provideHint = function () {
	var retArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	return shuffle(retArr);
}

function makeGuess (game) {
    var guess = $('#userInput').val();
    $('#userInput').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    console.log(output);
}

$(document).ready(function () { 
    var game = new Game();
    
    $('#submit').on('click', function (e) {
        makeGuess(game);
        $("#userInput").focus();
    })
    
    $('#hint').on('click', function (e) {
        var hints = game.provideHint();
        $("#subtitle").text("The answer can be "+hints[0]+", "+hints[1]+" or "+hints[2]+".");
    })
    
    $('#userInput').keyup(function (event) {
        if (event.which == 13) {
        makeGuess(game);
        }
    })
    
    $("#reset").on("click", function() { 
        game = new Game();
        $('#title').text('THIS...IS... Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100');
        $(".guesses").text("-");
        $("#hint, #userInput, #submit").prop('disabled', false);
        $("#userInput").removeClass();
        $("#userInput").val('');
        
});
    
});

