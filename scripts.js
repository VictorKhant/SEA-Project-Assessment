/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */
// Importing data of video games
import videoGames from "./data.js";
let filteredGames = [];
let sort_genre = "";
let sort_order = "";
let is_searched = false;
let last_platform = "ALL";
// This is an array of strings (Video Games objects)

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array

function showCards(games = videoGames) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const templateCard = document.querySelector(".card");

  //const user_input = document.querySelector("#pokeSearch");
  //const user_input_trimmed = user_input.value.trim;
  for (let i = 0; i < games.length; i++) {
    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    let title = games[i];
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title); // Edit title and image

    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle.name;

  const cardImage = card.querySelector("img");
  cardImage.src = newTitle.image;
  cardImage.alt = newTitle.name + " Poster";

  const cardDes = card.querySelectorAll("li");
  cardDes[2].textContent = newTitle.release_date;
  cardDes[0].textContent = "Platform: " + newTitle.platform;
  cardDes[1].textContent = "Rating: " + newTitle.user_review;
  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}



window.quoteAlert = function () {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
};

window.removeLastCard = function () {
  videoGames.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
};

window.filteredCard = function (platform) {
  let temp = [];
  if(last_platform!="ALL" || platform=="ALL"){
    document.getElementById("search-input").value = "";
    is_searched = false;
  }
  
  last_platform=platform;
  
  if (!is_searched) {
    temp = videoGames;
  } else {
    temp = filteredGames;
  }
  filteredGames = [];
 

  if (platform == "ALL") {
    return showCards();
  }

  for (let i = 0; i < temp.length; i++) {
    if (temp[i].platform.includes(platform)) {
      filteredGames.push(temp[i]);
    }
  }

  if (sort_genre != "" && filteredGames.length!=0) return sortedCard(sort_genre, sort_order);

  return showCards(filteredGames);
};

window.sortedCard = function (category = "release", order = "descend") {
  sort_genre = category;
  sort_order = order;

  if (filteredGames.length == 0) {
    filteredGames = videoGames;
  }

  if (category == "rating") {
    filteredGames.sort(
      (a, b) => parseFloat(a.user_review) - parseFloat(b.user_review)
    );
  } else if (category == "release") {
    filteredGames.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
  }
  if (order == "descend") filteredGames.reverse();
  return showCards(filteredGames);
};

// Function to perform search
function searchGames() {
  if (filteredGames.length == 0) filteredGames = videoGames;
  const searchText = document.getElementById("search-input").value.toLowerCase();

  const buttons = document.querySelectorAll(".filter button");

  // Reset all buttons to a default color
  buttons.forEach(
    (button) => {
      button.style.backgroundColor = "snow";
    }
  );
  last_platform="ALL";

  // Check if the search text is empty
  if (searchText.length == 0) {
    is_searched = false;
    filteredGames = videoGames;
    if (sort_genre != "") return sortedCard(sort_genre, sort_order);
    return showCards(videoGames); // Display all games if the search is cleared
  }

  const searchedGames = filteredGames.filter((game) =>
    game.name.toLowerCase().includes(searchText)
  );
  filteredGames = searchedGames;
  is_searched = true;
  return showCards(filteredGames);
}

// Function to change the background color of the clicked button and reset others
function changeFilterColor(clickedButton) {
  // Select all buttons within the filter class
  const buttons = document.querySelectorAll(".filter button");

  // Reset all buttons to a default color
  buttons.forEach((button) => {
    button.style.backgroundColor = "snow";
  });

  // Change the background color of the clicked button
  clickedButton.style.backgroundColor = "#b1f2ff";
}

// Function to change the background color of the clicked button and reset others
function changeSortColor(clickedButton) {
  // Select all buttons within the filter class
  const buttons = document.querySelectorAll(".sort button");

  // Reset all buttons to a default color
  buttons.forEach((button) => {
    button.style.backgroundColor = "snow";
  });

  // Change the background color of the clicked button
  clickedButton.style.backgroundColor = "#b1f2ff";
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards());

// Detecting input in search box
document.getElementById("search-input").addEventListener("input", searchGames);

// changing color of filter buttons on click
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      changeFilterColor(this); // changing color of click button
    });
  });
});

//changing color of sort buttons
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".sort button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      changeSortColor(this); // changing color of click button
    });
  });
});