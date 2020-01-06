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
		this.winner = -1;
		this.gameOver = false;
		this.cellList = new Array(9);
		this.playerList = new Array(2);
		this.playerList[0] = new Player(player1Type);
		this.playerList[1] = new Player(player2Type);
		this.initializeCells();
		this.updateTurnCount();
	}
	
	initializeCells() {
		for (var i=0; i<this.cellList.length; i++) {
			this.cellList[i] = new Cell(i);
		}
	}
	
	checkContainsPlayer(player) {
		if (this.playerList[0] == player || this.playerList[1] == player) {
			return true;
		}
		return false;
	}
	
	checkPlayerWin(playerNumber, cellPosition) {
		var columnCount = 0;
		var rowCount = 0;
		var diagonalCount = 0;
		var reverseDiagonalCount = 0;
		var winSize = Math.round(Math.sqrt(this.cellList.length));
		
		var cellDistanceFromStart = cellPosition%winSize;
		var cellRowStart = cellPosition - cellDistanceFromStart;
		var cellColumnStart = cellDistanceFromStart;
		var cellDiagonalStart = 0;
		var cellReverseDiagonalStart = winSize-1;
		
		//check row
		for (var i=cellRowStart; i<cellRowStart+winSize; i++) {
			if (this.cellList[i].checkPlayerTaken(playerNumber)) {
				rowCount++;
			}
		}
		if (rowCount == winSize) {
			this.winner = playerNumber;
			return true;
		}
		
		//check column
		for (var i=cellColumnStart; i<this.cellList.length; i+=winSize) {
			if (this.cellList[i].checkPlayerTaken(playerNumber)) {
				columnCount++;
			}
		}
		if (columnCount == winSize) {
			this.winner = playerNumber;
			return true;
		}
		
		//check diagonal
		for (var i=0; i<this.cellList.length; i+=winSize+1) {
			if (this.cellList[i].checkPlayerTaken(playerNumber)) {
				diagonalCount++;
			}
		}
		if (diagonalCount == winSize) {
			this.winner = playerNumber;
			return true;
		}
		
		//check reverse diagonal
		for (var i=cellReverseDiagonalStart; i<this.cellList.length-winSize+1; i+=winSize-1) {
			if (this.cellList[i].checkPlayerTaken(playerNumber)) {
				reverseDiagonalCount++;
			}
		}
		if (reverseDiagonalCount == winSize) {
			this.winner = playerNumber;
			return true;
		}
		
		return false;
	}
	
	checkGameOver() {
		if (this.winner != -1 || this.turnCount >= this.cellList.length - 1) {
			this.gameOver = true;
			return true;
		}
		return false;
	}
	
	clickCell(cellPosition) {
		if (!this.gameOver && cellPosition >= 0 && cellPosition < 9) {
			var currentCell = this.cellList[cellPosition];
			var setTaken = currentCell.setPlayerTaken(this.currentPlayerTurn);
			if (setTaken) {
				var checkWin = this.checkPlayerWin(this.currentPlayerTurn, cellPosition);
				var checkGameOver = this.checkGameOver();
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
		if (!this.gameOver) {
			currentPlayerTracker.innerHTML = 'Current Player: ' + determinePlayerSymbol(this.currentPlayerTurn);
		}
		else {
			if (this.winner == -1)
				currentPlayerTracker.innerHTML = 'Tie!';
			else
				currentPlayerTracker.innerHTML = determinePlayerSymbol(this.winner) + ' wins!';
		}
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
	
	checkPlayerTaken(playerNumber) {
		if (this.playerTaken == playerNumber) {
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
		return 'X';
	}
	else if (playerNumber == 1) {
		return 'O';
	}
	return 'X';
}

function clickCell(cellPosition) {
	if (currentGame != null && cellPosition >= 0 && cellPosition < 9) {
		currentGame.clickCell(cellPosition);
	}
}
