function initializeGameState(player1, player2) {
  return {
    players: [player1, player2],
    currentPlayerIndex: 0,

    board: [Array(3), Array(3), Array(3)].map((innerArray) =>
      innerArray.fill("", 0, 3)
    ),
    previousBoardStates: [],
  };
}

const columnMap = {
  A: 0,
  B: 1,
  C: 2,
};

const rowMap = {
  1: 0,
  2: 1,
  3: 2,
};

const GameOrchestrator = (player1, player2) => {
  const gameState = initializeGameState(player1, player2);

  const playRound = () => {
    // ask for move from player
    // check if move position has already been played
    // set move position
    // check for win
    // print board
    // switch player
  };
  return gameState;
};

window.addEventListener("DOMContentLoaded", () => {
  window.gameState = GameOrchestrator("Player 1", "Player 2");
});
