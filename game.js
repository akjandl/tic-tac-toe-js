const WINNING_COMBINATIONS = [
  // rows
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // columns
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // diagonals
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

const EMPTY_CELL = "";

const PLAYER_SYMBOLS = ["X", "O"];

function initializeGameState(player1, player2) {
  return {
    winner: null,
    gameFinished: false,

    players: [player1, player2],
    currentPlayerIndex: 0,

    board: [Array(3), Array(3), Array(3)].map((innerArray) =>
      innerArray.fill(EMPTY_CELL, 0, 3)
    ),

    previousBoardStates: [],
  };
}

function checkIfPositionAlreadyPlayed(board, row, column) {
  return board[row][column] !== EMPTY_CELL;
}

function checkForPlayerWin(board, playerSymbol) {
  for (const combination of WINNING_COMBINATIONS) {
    const [[aRow, aCol], [bRow, bCol], [cRow, cCol]] = combination;
    if (
      board[aRow][aCol] === playerSymbol &&
      board[bRow][bCol] === playerSymbol &&
      board[cRow][cCol] === playerSymbol
    ) {
      return true;
    }
  }
}

function checkForDraw(board) {
  return board.flat().every((cell) => cell !== EMPTY_CELL);
}

function createBoardStateAfterPositionPlayed(board, row, column, playerSymbol) {
  // Return new board with player symbol set at coordinates
  // being sure to not mutate the original board, not even inner arrays.
  const newBoard = board.map((innerArray) => innerArray.slice());
  newBoard[row][column] = playerSymbol;

  return newBoard;
}

function printBoard(board) {
  console.table(board, []);
}

function promptPlayerForMove(playerName, playerSymbol) {
  return prompt(`
      ${playerName} ("${playerSymbol}"), choose your square. Type your move as a combination of row and column indexes.

      For example, 00 for the top left square, 01 for the top middle square, and so on.  (e.g. 00, 01, 02, 10, 11, 12, 20, 21, 22)
    `);
}

const GameOrchestrator = (player1, player2) => {
  let gameState;

  const playRound = () => {
    // setup round variables
    const currentPlayerName = gameState.players[gameState.currentPlayerIndex];
    const currentPlayerSymbol = PLAYER_SYMBOLS[gameState.currentPlayerIndex];

    // ask for move from player
    const playedPosition = promptPlayerForMove(
      currentPlayerName,
      currentPlayerSymbol
    );
    const [row, column] = playedPosition.split("").map(Number);

    // check if move position has already been played
    const positionTaken = checkIfPositionAlreadyPlayed(
      gameState.board,
      row,
      column
    );

    if (positionTaken) {
      alert("Position already taken. Try again.");
      return;
    }

    // create new board state
    const newBoard = createBoardStateAfterPositionPlayed(
      gameState.board,
      row,
      column,
      currentPlayerSymbol
    );

    // update game state
    gameState.previousBoardStates.push(gameState.board);
    gameState.board = newBoard;

    // print board
    printBoard(gameState.board);

    // check for win
    const playerWon = checkForPlayerWin(newBoard, currentPlayerSymbol);

    if (playerWon) {
      alert(`${currentPlayerName} ("${currentPlayerSymbol}") wins!`);
      gameState.winner = currentPlayerName;
      gameState.gameFinished = true;
      return;
    }

    // check for draw
    const isDraw = checkForDraw(newBoard);
    if (isDraw) {
      alert("It's a draw!");
      gameState.gameFinished = true;
      return;
    }

    // switch player
    gameState.currentPlayerIndex = 1 - gameState.currentPlayerIndex;
  };

  const playGame = () => {
    gameState = initializeGameState(player1, player2);

    printBoard(gameState.board);

    while (!gameState.gameFinished) {
      playRound();
    }
  };

  return { gameState, playGame };
};

// attach game objects to window
const { gameState, playGame } = GameOrchestrator("Player 1", "Player 2");
window.gameState = gameState;
window.playGame = playGame;

/*
  To play the game, call the window.playGame function from the console.
  You can also access the game state at any time with window.gameState.
*/
