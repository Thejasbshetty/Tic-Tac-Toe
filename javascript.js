console.log("Welcome To Tic Tac Toe!");
let music = new Audio("music.mp3");
let audioturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";


// Function to change the turn
const changeTurn = () => {
  turn = turn === "X" ? "O" : "X";
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      changeTurn();
      audioturn.play();
      checkWin();
      document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    }
  });
});

// Function to check for a win
const checkWin = () => {
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
  
      // Check if the boxes contain the same non-empty value and it's a win
      if (
        boxes[a].querySelector(".boxtext").innerText !== "" &&
        boxes[a].querySelector(".boxtext").innerText ===
          boxes[b].querySelector(".boxtext").innerText &&
        boxes[b].querySelector(".boxtext").innerText ===
          boxes[c].querySelector(".boxtext").innerText
      ) {
        // Highlight the winning boxes
        boxes[a].classList.add("win");
        boxes[b].classList.add("win");
        boxes[c].classList.add("win");
  
        // Play game over sound
        gameover.play();
  
        // Display the winner or perform any other required actions
        const winner = boxes[a].querySelector(".boxtext").innerText;
        document.getElementsByClassName("info")[0].innerText =
          "Player " + winner + " wins!";
  
        // Create and append the image element
        const imgBox = document.querySelector(".imgbox");
        const image = document.createElement("img");
        image.src = "excited.gif"; 
        image.alt = "Winner Image";
        image.style.width = "250px";
        imgBox.appendChild(image);
  
        // Disable further clicks on the boxes
        for (let box of boxes) {
          box.removeEventListener("click", handleClick);
        }
  
        return;
      }
    }
  };
  
// Reset the game
const resetGame = () => {
    // Clear the box texts
    Array.from(boxes).forEach((element) => {
      element.querySelector(".boxtext").innerText = "";
      element.classList.remove("win");
    });
  
    // Reset the turn to "X"
    turn = "X";
  
    // Reattach event listener to the boxes
    Array.from(boxes).forEach((element) => {
      element.addEventListener("click", handleClick);
    });
  
    // Clear the info display
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

     // Remove the image
    image.style.display ="0px";
  };
  
  // Event listener for reset button
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", resetGame);
  
    
  