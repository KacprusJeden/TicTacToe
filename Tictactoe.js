const board = document.querySelector("#board")
const info = document.querySelector("#info")
const startCells = ["","","","","","","","",""]

let tictactoe = Math.random();
let go;

if (tictactoe <= 0.5){
	go = "circle"
}else{
	go = "cross"
}

info.textContent = `This game starts: ${go}`

function createBoard(){
	startCells.forEach((_cell, index) => {
		const cellElement = document.createElement('div')
		cellElement.classList.add('square')
		cellElement.id = index
		cellElement.addEventListener('click', addGo)
		board.append(cellElement)
	})
}

createBoard()

function addGo(e){
	const goDisplay = document.createElement('div')
	goDisplay.classList.add(go)
	e.target.append(goDisplay)
	go = go === "circle" ? "cross" : "circle" 
	info.textContent = `${go} has the move`
	e.target.removeEventListener("click", addGo)
	checkStore()
}

function checkStore(){
	const allSquares = document.querySelectorAll(".square")
	const winningCombos = [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
		[0,4,8], [2,4,6]
	]
	
	winningCombos.forEach(array => {
		const wins = array.every(cell =>
			allSquares[cell].firstChild?.classList.contains(go))
		
		if(wins){
			info.textContent =`The winner is: ${go.toUpperCase()}!!!!!`
			allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
		}
	})
}