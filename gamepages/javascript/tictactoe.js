var startButton;
var currentPlayerTracker;
var currentTurnCounter;
var currentGame;

const playerType = Object.freeze({
	Control: "control",
	Computer: "computer"
});

class Game {
	
	constructor(player1Type, player2Type) {
		currentPlayerTracker = document.getElementById("currentPlayerTracker");
		currentTurnCounter = document.getElementById("currentTurnCounter");
		this.turnCount = 0;
		this.currentPlayerTurn = 1; //can randomize later
		this.cellList = new Array(9);
		this.playerList = new Array(2);
		this.playerList[0] = new Player(player1Type);
		this.playerList[1] = new Player(player2Type);
		this.initializeCells();
		this.updateTurnCount();
	}
	
	initializeCells() {
		for (var i=0; i<this.cellList.length; i++) {
			let newCell = new Cell(i);
			this.cellList[i] = newCell;
		}
	}
	
	checkContainsPlayer(player) {
		if (this.playerList[0] == player || this.playerList[1] == player) {
			return true;
		}
		return false;
	}
	
	clickCell(cellPosition) {
		if (cellPosition >= 0 && cellPosition < 9) {
			var currentCell = this.cellList[cellPosition];
			var setTaken = currentCell.setPlayerTaken(this.currentPlayerTurn);
			if (setTaken) {
				this.addTurnCount();
				this.updateTurnCount();
			}
		}
	}
	
	addTurnCount() {
		this.currentPlayerTurn = (this.turnCount)%2;
		this.turnCount++;
	}
	
	updateTurnCount() {
		currentPlayerTracker.innerHTML = 'Current Player: ' + determinePlayerSymbol(this.currentPlayerTurn);
		currentTurnCounter.innerHTML = 'Turns: ' + this.turnCount;
	}
	
}

class Cell {
	
	constructor(cellPosition) {
		this.playerTaken;
		this.position = cellPosition;
		this.object = document.getElementById("cell" + cellPosition);
		this.object.innerHTML = '';
	}
	
	setPlayerTaken(playerNumber) {
		if (this.playerTaken == null) {
			this.playerTaken = playerNumber;
			this.object.innerHTML = determinePlayerSymbol(playerNumber);
			return true;
		}
		return false;
	}
	
}

class Player {
	
	constructor(playerType) {
		this.playerType = playerType;
	}
	
}

function startNewGame() {
	deleteCurrentGame();
	currentGame = new Game(playerType.Control, playerType.Control);
	startButton = document.getElementById("startButton");
	startButton.innerHTML = 'Restart';
}

function deleteCurrentGame() {
	if (currentGame != null) {
		delete currentGame;
		currentGame = null;
	}
}

function determinePlayerSymbol(playerNumber) {
	if (playerNumber == 0) {
		return 'x';
	}
	else if (playerNumber == 1) {
		return 'o';
	}
	return 'x';
}

function clickCell(cellPosition) {
	if (currentGame != null && cellPosition >= 0 && cellPosition < 9) {
		currentGame.clickCell(cellPosition);
	}
}
