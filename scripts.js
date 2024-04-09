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

// This is an array of strings (Video Games objects)

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array

function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  const clicked_filter = document.querySelector(".filter");
  const filter_type = clicked_filter.querySelector(".clicked").textContent;
  filteredGames = filterCards(videoGames, filter_type);

  const clicked_sort = document.querySelector(".sort");
  const sort_type = clicked_sort.querySelector(".clicked").textContent;
  filteredGames = sortCards(filteredGames, sort_type);

  const searchText = document.getElementById("search-input").value;
  filteredGames = searchCards(filteredGames, searchText);

  for (let i = 0; i < filteredGames.length; i++) {
    let title = filteredGames[i];
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



// filtering games by platform
function filterCards(gameArr, clicked)
{
  if(clicked =="ALL")
    return gameArr;
  return gameArr.filter(game =>game.platform.toLowerCase().includes(clicked.toLowerCase()));
}

// sorting game by rating or release date
function sortCards(gameArr, clicked)
{
  const splittedStr=clicked.split(" "); 
  if(splittedStr[0].toLowerCase()== "rating")
    gameArr.sort((a,b)=>parseFloat(a.user_review) - parseFloat(b.user_review));
  else
    gameArr.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  if(splittedStr[1]=="high-low" ||splittedStr[1]=="new-old")
    gameArr.reverse();
  return gameArr;
}

// searching game by user input on the search bar
function searchCards(gameArr, user_input){
  if (user_input.length==0)
  return gameArr;
  return gameArr.filter((game) =>game.name.toLowerCase().includes(user_input.toLowerCase()));
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
  clickedButton.style.backgroundColor = "#67cde1";
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
  clickedButton.style.backgroundColor = "#67cde1";
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards());

// Detecting input in search box
document.getElementById("search-input").addEventListener("input",function() {
  showCards()});

//detecting filter button clicked
let filterbtns = document.querySelectorAll(".filter button");
filterbtns.forEach(function(button) {
  button.addEventListener('click', function() {
      document.querySelector('.filter .clicked').classList.remove('clicked');
      button.classList.add('clicked');
      changeFilterColor(this);
      showCards(); //refresh the cards
  });
});

//detecting sort button clicked
let sortbtns = document.querySelectorAll(".sort button");
sortbtns.forEach(function(button) {
  button.addEventListener('click', function() {
      document.querySelector('.sort .clicked').classList.remove('clicked');
      button.classList.add('clicked');;
      changeSortColor(this);
      showCards(); //refresh the cards
  });
});

/*
// Select all elements with the 'detail' class within cards
const detailLinks = document.querySelectorAll('.card .detail');
// Add click event listeners to each detail link
detailLinks.forEach(link => { 
    link.addEventListener('click', function(event) {
      // Access information about the card
      const cardName = this.parentNode.querySelector('.card-content h2').textContent;
      const cardPlatform = this.parentNode.querySelector('.card-content li').textContent.replace("Platform: ","");
      const foundGame=findGame(cardName,cardPlatform);

      // Create pop up 
      showModalFunction(foundGame);
    });
});*/

//detecting if specific card is clicked
const cardContainer = document.getElementById('card-container');
cardContainer.addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    if (card) {
        const cardTitle = card.querySelector('h2').textContent;
        const cardPlatform = card.querySelector('li').textContent.replace("Platform: ",""); // Assuming there's a <p> with summary
        const foundGame=findGame(cardTitle,cardPlatform);

    // Create pop up 
    showModalFunction(foundGame);
    }
});

function findGame(name, platform) {
  return videoGames.find(game => 
      game.name == name && 
      game.platform == platform);
}

function showModalFunction(card) {
  // Get the modal elements
  let modal = document.getElementById("myModal");
  const modalImage = document.querySelector(".modal-content img");
  let modalTitle = document.getElementById("modalTitle");
  let modalBody = document.getElementById("modalBody");
  let span = document.getElementsByClassName("close")[0];

  // Set the content of the modal
  modalImage.src = card.image;
  modalImage.alt = card.name + " Poster";

  modalTitle.textContent = card.name;
  modalBody.textContent = card.summary;

  // Display the modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}

/*
window.addGame = function(){
  const newName = document.getElementById("newName").value;
  const newPlatform = document.getElementById("newPlatform").value;
  const newRelease_date = document.getElementById("newRelease_date").value;
  const newImage= document.getElementById("newImg").value;
  const newRating= document.getElementById("newRating").value;
  const newSummary= document.getElementById("newSummary").value;
  console.log("here");
  if(newName=="" || newPlatform=="" || newRelease_date==""){
    alert("Error! All the fields must be filled.");
    return;
  }

  const newCard= {name: newName, image: newImage, platform: newPlatform, release_date: newRelease_date, summary: newSummary, user_review: newRating};
  videoGames.push(newCard);
}*/
