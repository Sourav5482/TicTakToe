      // JavaScript for Tic-Tac-Toe Functionality
      const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
        "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "Act as if what you do makes a difference. It does. - William James",
        "You miss 100% of the shots you don't take. - Wayne Gretzky",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      ];

      const board = document.getElementById("board");
      const cells = document.querySelectorAll("[data-cell]");
      const statusDisplay = document.getElementById("status");
      const resetButton = document.getElementById("reset");
      const modal = document.getElementById("modal");
      const modalMessage = document.getElementById("modalMessage");
      const replayButton = document.getElementById("replay");
      const exitButton = document.getElementById("exit");
      const quoteDisplay = document.getElementById("quote");
      const modalQuote = document.getElementById("modalQuote");
      const emojiDisplay = document.getElementById("emoji"); // Emoji Element
      // New quote display for modal

      function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
      }

      let isXTurn = true; // X goes first
      let boardState = ["", "", "", "", "", "", "", "", ""]; // Empty board

      const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      function handleClick(e) {
        const cell = e.target;
        const currentClass = isXTurn ? "X" : "O";

        if (cell.textContent !== "") return; // Ignore if cell is already filled

        // Update cell and board state
        cell.textContent = currentClass;
        boardState[Array.from(cells).indexOf(cell)] = currentClass;

        if (checkWin(currentClass)) {
          displayModal(`Player ${currentClass} Wins!`,'win');
        } else if (boardState.every((cell) => cell !== "")) {
          displayModal("It's a Draw!",'draw');
        } else {
          isXTurn = !isXTurn; // Switch turns
          statusDisplay.textContent = `Player ${isXTurn ? "X" : "O"}'s turn`;
        }
      }

      function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some((combination) => {
          return combination.every(
            (index) => boardState[index] === currentClass
          );
        });
      }

      function displayModal(message, result) {
        modalMessage.textContent = message;
        modalQuote.textContent = getRandomQuote();
        // Set different emoji based on result
        if (result === "win") {
          emojiDisplay.textContent = "🎉"; // Emoji for win
          emojiDisplay.style.display = "inline-block"; // Show win emoji
          emojiDisplay.classList.add("bounce"); // Add bounce animation
        } else {
          emojiDisplay.textContent = "😞"; // Emoji for draw
          emojiDisplay.style.display = "inline-block"; // Show draw emoji
          emojiDisplay.classList.remove("bounce"); // Remove bounce animation
        } // Display random quote
        modal.style.display = "flex";
        modal.classList.add(result === "win" ? "win" : "draw"); // Add animation class
        setTimeout(() => {
          modal.classList.remove(result === "win" ? "win" : "draw"); // Remove animation class
        }, 500);
      }

      function hideModal() {
        modal.style.display = "none";
      }

      function resetGame() {
        boardState.fill("");
        cells.forEach((cell) => {
          cell.textContent = "";
          cell.addEventListener("click", handleClick);
        });
        isXTurn = true;
        statusDisplay.textContent = "Player X's turn";
        modal.style.display = "none";
        hideModal();
        emojiDisplay.style.display = "none"; // Hide emoji
        emojiDisplay.classList.remove("bounce");
        // Display random quote
        quoteDisplay.textContent = getRandomQuote();
      }

      function exitGame() {
        hideModal();
        alert("Thanks for playing!");
      }

      // Event listeners
      cells.forEach((cell) => cell.addEventListener("click", handleClick));
      resetButton.addEventListener("click", resetGame);
      replayButton.addEventListener("click", resetGame);
      exitButton.addEventListener(
        "click",
        () => {
          modal.style.display = "none";
          emojiDisplay.style.display = "none";
        },
        exitGame
      );
      quoteDisplay.textContent = getRandomQuote();
