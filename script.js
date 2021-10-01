var
	tableRow = document.getElementsByTagName("tr"),
	tableCell = document.getElementsByTagName("td"),
	tableSlot = document.querySelectorAll(".slot");

const
	playerTurn = document.querySelector(".player-turn"),
	reset = document.querySelector(".reset");

for (let i = 0; i < tableCell.length; i++) {
	tableCell[i].addEventListener("click", (e) => {
		console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
	});
}

while (!player1) {
	var player1 = prompt("Player red, enter your name:");
}
player1Color = "red";

while (!player2) {
	var player2 = prompt("Player yellow, enter your name:");
}
player2Color = "yellow";

var currentPlayer = 1;
var backColor = 'lightslategray';

playerTurn.textContent = `${player1}'s turn!`;

Array.prototype.forEach.call(tableCell, (cell) => {
	cell.addEventListener("click", changeColor);
	cell.style.backgroundColor = backColor;
})

function changeColor(e) {
	let column = e.target.cellIndex;
	let row = [];

	for (let i = 5; i > -1; i--) {
		if (tableRow[i].children[column].style.backgroundColor == backColor) {
			row.push(tableRow[i].children[column]);
			if (currentPlayer == 1) {
				row[0].style.backgroundColor = player1Color;
				if (match()) {
					playerTurn.textContent = `${player1} has won!`;
				} else if (draw()) {
					playerTurn.textContent = `It's a draw!`;
				} else {
					playerTurn.textContent = `${player2}'s turn!`;
					return currentPlayer = 2;
				}
			} else {
				row[0].style.backgroundColor = player2Color;
				if (match()) {
					playerTurn.textContent = `${player2} has won!`;
				} else if (draw()) {
					playerTurn.textContent = `It's a draw!`;
				} else {
					playerTurn.textContent = `${player1}'s turn!`;
					return currentPlayer = 1;
				}

			}
		}
	}
}

function match() {
	return (horizontalMatch() || verticalMatch() || diagonalMatch() || antidiagonalMatch());
}
function draw() {
	let fullSlot = [];
	for (let i = 0; i < tableCell.length; i++) {
		if (tableCell[i].style.backgroundColor != backColor) {
			fullSlot.push(tableCell[i])
		}
	}
	if (fullSlot.length == tableCell.length) {
		return true;
	}
}
function horizontalMatch() {
	for (let row = 0; row < tableRow.length; row++) {
		for (let col = 0; col < 4; col++) {
			if (colorMatch(
				tableRow[row].children[col].style.backgroundColor,
				tableRow[row].children[col+1].style.backgroundColor,
				tableRow[row].children[col+2].style.backgroundColor,
				tableRow[row].children[col+3].style.backgroundColor
			)) {
				console.log("It's a horizontal match");
				return true;
			}
		}
	}
}
function verticalMatch() {
	for (let col = 0; col < 7; col++) {
		for (let row = 0; row < 3; row++) {
			if (colorMatch(
				tableRow[row].children[col].style.backgroundColor,
				tableRow[row+1].children[col].style.backgroundColor,
				tableRow[row+2].children[col].style.backgroundColor,
				tableRow[row+3].children[col].style.backgroundColor
			)) {
				console.log("It's a vertical match");
				return true;
			}
		}
	}
}
function diagonalMatch() {
	for (let col = 0; col < 4; col++) {
		for (let row = 0; row < 3; row++) {
			if (colorMatch(
				tableRow[row].children[col].style.backgroundColor,
				tableRow[row+1].children[col+1].style.backgroundColor,
				tableRow[row+2].children[col+2].style.backgroundColor,
				tableRow[row+3].children[col+3].style.backgroundColor
			)) {
				console.log("It's a diagonal match!");
				console.log("Cell:"+row+", "+col+" to Cell:"+(row+3)+", "+(col+3));
				return true;
			}
		}
	}
}
function antidiagonalMatch() {
	for (let col = 0; col < 4; col++) {
		for (let row = 5; row > 2; row--) {
			if (colorMatch(
				tableRow[row].children[col].style.backgroundColor,
				tableRow[row-1].children[col+1].style.backgroundColor,
				tableRow[row-2].children[col+2].style.backgroundColor,
				tableRow[row-3].children[col+3].style.backgroundColor
			)) {
				console.log("It's a antidiagonal match!");
				console.log("Cell:"+row+", "+col+" to Cell:"+(row-3)+", "+(col+3));
				return true;
			}
		}
	}
}
function colorMatch(one, two, three, four) {
	return (one != backColor && one == two && one == three && one == four);
}

reset.addEventListener("click", () => {
	tableSlot.forEach(slot => {
		slot.style.backgroundColor = backColor;
	});
	return (currentPlayer == 1 ? playerTurn.textContent = `${player1}'s Turn` : playerTurn.textContent = `${player2}'s Turn`);
});