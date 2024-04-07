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
// Images of Video Games
import videoGames from "./data.js";

// This is an array of strings (Video Games objects)
let filteredGames = [];
let sort_genre = "";
let sort_order = "";
// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array

function showCards(games = videoGames) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const templateCard = document.querySelector(".card");

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
  cardDes[0].textContent = newTitle.release_date;
  cardDes[1].textContent = "Platform: " + newTitle.platform;
  cardDes[2].textContent = "Rating: " + newTitle.user_review;
  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards());

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
  filteredGames = [];
  if (platform == "ALL") return showCards();

  for (let i = 0; i < videoGames.length; i++) {
    if (videoGames[i].platform.includes(platform)) {
      filteredGames.push(videoGames[i]);
    }
  }
  if (sort_genre != "") return sortedCard(sort_genre, sort_order);

  return showCards(filteredGames);
};

window.sortedCard = function (category = "release", order = "descend") {
  sort_genre = category;
  sort_order = order;

  if (filteredGames.length == 0) filteredGames = videoGames;

  if (category == "rating") {
    filteredGames.sort(
      (a, b) => parseFloat(a.user_review) - parseFloat(b.user_review)
    );
  } else {
    videoGames.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
  }
  if (order == "descend") filteredGames.reverse();
  return showCards(filteredGames);
};

window.searchCard = function () {};