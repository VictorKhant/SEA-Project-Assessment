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
const valurl =
  "https://m.media-amazon.com/images/M/MV5BNmNhM2NjMTgtNmIyZC00ZmVjLTk4YWItZmZjNGY2NThiNDhkXkEyXkFqcGdeQXVyODU4MDU1NjU@._V1_FMjpg_UX1000_.jpg";
const cs2url =
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRi3Y52UizXitbh4DWaEcY-QrweJJqBsSzWwnBJO-A4XLfrBRyIzHrryBFmPCZYboZhe-eHUg";
const owurl =
  "https://m.media-amazon.com/images/M/MV5BYjBkNTJkOWUtNTg1ZS00NGZhLWIxMGUtOWE0ZDA0NzRkODM3XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg";
const finalsurl =
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQIsJWvzMOrvU4CaqXGPsdEzyYJlMYidYBBnVn96eob7JOQCJe1Ze6vFq8v1v1MmHRmLWw3FA";
const dotaurl = 
  "https://m.media-amazon.com/images/M/MV5BZDQxMjVmMjYtZTU4OC00MzRhLTljNTgtMTAwMDg3YzhlY2M4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg";
const lolurl =
  "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S2_1200x1600-905a96cea329205358868f5871393042";
const smiteurl =
  "https://image.api.playstation.com/vulcan/ap/rnd/202301/2322/CM072lQwXunn2Z23lGXtpw4A.png";

  // These are the objects of video games
let valorant = {
  name: "Valorant",
  image: valurl,
  release: "June 2020",
};
let cs2 = {
  name: "Counter-Strike 2",
  image: cs2url,
  release: "September 2023",
};
let overwatch = {
  name: "Overwatch 2",
  image: owurl,
  release: "October 2022",
};
let thefinals = {
  name: "The Finals",
  image: finalsurl,
  release: "December 2023",
};
let dota = {
  name: "Dota 2",
  image: dotaurl,
  release: "July 2013",
};
let league = {
  name: "League of Legends",
  image: lolurl,
  release: "October 2009",
};
let smite = {
  name: "Smite",
  image: smiteurl,
  release: "March 2014",
};

// This is an array of strings (Video Games objects)
let fpsGames = [valorant, cs2, overwatch, thefinals];
let mobaGames = [dota, league, smite];

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function showFpsCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  const bullet1 = document.getElementById("bullet-1");
  bullet1.innerHTML = "";
  for (let i = 0; i < fpsGames.length; i++) {
    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    let imageURL = fpsGames[i].image;
    let title = fpsGames[i].name;
    let date = fpsGames[i].release;
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title, imageURL, date); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}
function showMobaCards() {
  const cardContainer = document.getElementById("card-container2");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  const bullet2 = document.getElementById("bullet-2");
  bullet2.innerHTML = "";
  for (let i = 0; i < mobaGames.length; i++) {
    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    let imageURL = mobaGames[i].image;
    let title = mobaGames[i].name;
    let date = mobaGames[i].release;
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title, imageURL, date); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle, newImageURL, newReleaseDate) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

  const cardBullet = card.querySelector("ul");
  cardBullet.textContent = "Release Date: " + newReleaseDate;

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showFpsCards);
document.addEventListener("DOMContentLoaded", showMobaCards);

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  fpsGames.pop(); // Remove last item in titles array
  showFpsCards(); // Call showCards again to refresh
}
