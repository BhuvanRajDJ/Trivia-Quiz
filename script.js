// set category array to null initially
var categories_selected = "none";
// initialize category to null
var category_selected = "";
//To track the number of differnt category
var countcat = 0;
// initialize correct Option to null
var correctOption = "";
// initialize trivagame to null
let trivagame = "";
// initialise the player1 name to empty
var player1 = "";
// initialise the player2 name to empty
var player2 = "";
// initialize player1 Score to 0
var player1_score = 0;
// initialize player1 Score to 0
var player2_score = 0;
// initialise the question number to 1
var questionno = 1;
// set difficulty level to easy
var difficultylevel = "easy";

// add event listener to move to next section
document
  .getElementById("playersinput")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      // Fetch and display player names and category
      player1 = document.getElementById("name1").value;
      player2 = document.getElementById("name2").value;
      // the players input field
      document.getElementById("playersinput").style.display = "none";
      // display the players input field
      document.getElementById("categories").style.display = "grid";
    }
  });

// add event listener for getting the category
document
  .getElementById("categories")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      // alert(player1 + "," + player2);
      // Set the category only if it's not selected previously
      category_selected = document.getElementById("category").value;
      if (categories_selected != category_selected) {
        // set the selected category to disable
        document
          .getElementById(category_selected)
          .setAttribute("disabled", "true");
        document.getElementById("categories").style.display = "none";
        document.getElementById("endthe-game").style.display = "none";

        // diplay players name
        document.getElementById("displayPlayer1").innerText = player1;
        document.getElementById("displayPlayer2").innerText = player2;

        // set the display to grid
        document.getElementById("players").style.display = "grid";
        // fetchQuestion(categories_selected);
        // call the function to fetch the function
        fetchQuestion(categories_selected);
        document.getElementById("questionContainer").style.display = "grid";
        // alert("category" + categories_selected);
      } else {
        alert("select differnt option, because its already been selected.");
        categories_selected = category_selected;
        // categories_selected = "";
        document.getElementById("categories").style.display = "grid";
      }
    }
  });

async function fetchQuestion() {
  try {
    // set category
    category = "categories_selected";
    // category = "science";
    // set difficultyLevel
    // difficultylevel = "easy";
    // difficultylevel tracking
    if (questionno > 0 && questionno < 3) {
      difficultylevel = "easy";
    } else if (questionno > 2 && questionno < 5) {
      difficultylevel = "medium";
    } else if (questionno > 4 && questionno < 7) {
      difficultylevel = "hard";
    } else {
      countcat = countcat + 1;
      // If all category is been selected then declare the winner
      if (countcat == 7) {
        document.getElementById("players").style.display = "none";
        document.getElementById("questionContainer").style.display = "none";
        document.getElementById("categories").style.display = "none";
        document.getElementById("End_Game").style.display = "none";
        document.getElementById("endthe-game").style.display = "none";

        document.getElementById("win").style.display = "grid";

        if (player1_score > player2_score) {
          document.getElementById("Winner").innerText = player1;
          document.getElementById("Score1").innerText = player1_score;
          document.getElementById("Looser").innerText = player2;
          document.getElementById("Score2").innerText = player2_score;
        } else {
          document.getElementById("Winner").innerText = player2;
          document.getElementById("Score1").innerText = player2_score;
          document.getElementById("Looser").innerText = player1;
          document.getElementById("Score2").innerText = player1_score;
        }
      }
      // else move to category.
      else {
        categories_selected = category_selected;
        questionno = 1;
        document.getElementById("questionContainer").style.display = "none";
        document.getElementById("categories").style.display = "grid";
        document.getElementById("endthe-game").style.display = "inherit";
      }
    }

    // fetch question
    const response = await fetch(
      `https://the-trivia-api.com/v2/questions?limit=1&categories=${category}&difficulties=${difficultylevel}`
    );
    if (!response.ok) {
      // throw new actual error
      throw new Error("Could not fecth the data: " + response.status);
    }
    // convert response and store it in the data
    const data = await response.json();
    // useing forEach loop to iterate
    data.forEach(function (element) {
      // display question
      document.getElementById(
        "question"
      ).innerText = `${element.question.text}`;

      // Create options array and store all the options here
      const options = [
        element.correctAnswer,
        element.incorrectAnswers[0],
        element.incorrectAnswers[1],
        element.incorrectAnswers[2],
      ];
      correctOption = element.correctAnswer;
      // call the function
      // randomize the options
      function random(options) {
        const randomopt = [...options];
        for (let i = randomopt.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomopt[i], randomopt[j]] = [randomopt[j], randomopt[i]];
        }
        return randomopt;
      }
      const randomopt = random(options);

      // set data-option value
      document
        .getElementById("option1")
        .setAttribute("data-option", randomopt[0]);
      document
        .getElementById("option2")
        .setAttribute("data-option", randomopt[1]);
      document
        .getElementById("option3")
        .setAttribute("data-option", randomopt[2]);
      document
        .getElementById("option4")
        .setAttribute("data-option", randomopt[3]);

      document.getElementById("option1").innerText = randomopt[0];
      document.getElementById("option2").innerText = randomopt[1];
      document.getElementById("option3").innerText = randomopt[2];
      document.getElementById("option4").innerText = randomopt[3];
    });
  } catch (error) {
    // display error
    alert(error.stack);
  }
}

document.getElementById("options").addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const option = event.target.getAttribute("data-option");

    // player questins turn
    if (questionno % 2 == 0) {
      if (option == correctOption) {
        // updating marks according to level of dificulty
        if (difficultylevel == "easy") {
          player2_score = player2_score + 10;
        } else if (difficultylevel == "medium") {
          player2_score = player2_score + 15;
        } else {
          player2_score = player2_score + 20;
        }
        // alert(player2_score);
      }
      // display players score
      document.getElementById("plyscore1").innerText = player1_score;
      document.getElementById("plyscore2").innerText = player2_score;
      questionno = questionno + 1;
      fetchQuestion();
    } else {
      if (option == correctOption) {
        // updating marks according to level of dificulty
        if (difficultylevel == "easy") {
          player1_score = player1_score + 10;
        } else if (difficultylevel == "medium") {
          player1_score = player1_score + 15;
        } else {
          player1_score = player1_score + 20;
        }
      }
      // alert(player1_score);
      // display players score
      document.getElementById("plyscore1").innerText = player1_score;
      document.getElementById("plyscore2").innerText = player2_score;

      questionno = questionno + 1;
      fetchQuestion();
    }
  }
});

document.getElementById("end_game").addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    document.getElementById("players").style.display = "none";
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("categories").style.display = "none";
    document.getElementById("End_Game").style.display = "none";
    document.getElementById("endthe-game").style.display = "none";

    document.getElementById("win").style.display = "grid";

    if (player1_score > player2_score) {
      document.getElementById("Winner").innerText = player1;
      document.getElementById("Score1").innerText = player1_score;
      document.getElementById("Looser").innerText = player2;
      document.getElementById("Score2").innerText = player2_score;
    } else if (player1_score == player2_score) {
      document.getElementById("tie").innerHTML = `Tie Match,  Play again! ${player1} and ${player2}`;
    } else {
      document.getElementById("Winner").innerText = player2;
      document.getElementById("Score1").innerText = player2_score;
      document.getElementById("Looser").innerText = player1;
      document.getElementById("Score2").innerText = player1_score;
    }
  }
});

document.getElementById("End_Game").addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    document.getElementById("players").style.display = "none";
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("categories").style.display = "none";
    document.getElementById("endthe-game").style.display = "none";
    document.getElementById("win").style.display = "grid";

    if (player1_score > player2_score) {
      document.getElementById("Winner").innerText = player1;
      document.getElementById("Score1").innerText = player1_score;
      document.getElementById("Looser").innerText = player2;
      document.getElementById("Score2").innerText = player2_score;
    } else {
      document.getElementById("Winner").innerText = player2;
      document.getElementById("Score1").innerText = player2_score;
      document.getElementById("Looser").innerText = player1;
      document.getElementById("Score2").innerText = player1_score;
    }
  }
});
