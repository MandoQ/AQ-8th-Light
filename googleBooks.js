const https = require('https');
const querystring = require('querystring');
const User = require("./user");

var user = new User();

/*
    This method starts the program. It asks for the user input. The user can either 
    view their reading list, terminate the program, or search for a book.
*/
function getUserQuery(){
    console.log("Enter a book you wish to search, Enter 'Reading List' to view your list, or enter 'quit' to terminate ");
   
    process.stdin.on('data', userInput => {
        let query = userInput.toString().toLowerCase().trim();
        console.log("");

        if(query === "reading list"){
            user.displayReadingList();
        }else if(query === "quit"){
            process.exit();
        }else if(didEnterInteger(query)){
            console.log("\nPlease enter a new query");
        }else{
            fetchBooks(query);
        }
    });
}

getUserQuery();

/*
    Given a query, I make an api call with the parameters of the query 
    and a startIndex of 0 for the given query and a max Results of 5.
    After the GET request is made, I check for a 400 status, print any results using
    the DisplayBookInformation method, and lastly ask the user to add any books to their 
    reading list via the AddToReadingList method 
*/
function fetchBooks(query){
    const parameters = {
        q: query, 
        startIndex: 0,
        maxResults: 5
    };

    const request_params = querystring.stringify(parameters);

    https.get('https://www.googleapis.com/books/v1/volumes?' + request_params, (res) => {
    
        if(res.statusCode === 400){
            console.log("\nPlease enter a query, or enter 'reading list' or 'quit'");
            return;
        }

        var body = '';
        res.on('data', chunk => {
            body += chunk;
        });
        
        res.on('end', () => {
            let jsonResponse = JSON.parse(body);

            if(jsonResponse.totalItems == 0){
                console.log("\nNo books found with your query. Enter a new query, or enter 'reading list' or 'quit'");
            }else{
                let apiResults = parseApiResponse(jsonResponse);
                printBookInformation(apiResults);
                toggleReadingListMenu(jsonResponse.items);
            }
        });
    });
}

/*
    Given the jsonResponse from the api call, I am storing the relevant 
    information into a 2D array where it can be printed by the printBookInformation method
*/
function parseApiResponse(jsonResponse){
    var results = [];
    let bookList = jsonResponse.items;

    for(var i = 0; i < bookList.length; ++i){
        var publisher = bookList[i].volumeInfo.publisher;
        var authors = bookList[i].volumeInfo.authors;

        if(!publisher){
            publisher = "n/a";
        }

        if(!authors){
            authors = "n/a";
        }
        results.push([bookList[i].volumeInfo.title, authors, publisher]);
    }
    return results;
}

/* Loops through the results array that was created above 
   and simply prints them.
*/
function printBookInformation(results){
    console.log("Results: \n");

    for(var i = 0; i < results.length; ++i){
        for(var l = 0; l < results[i].length; ++l){
            switch(l){
                case 0:
                    console.log("Title: " + results[i][0]);
                    break;
                case 1:
                    printAuthors(results[i][1]);
                    break;
                case 2:
                    console.log("Publisher: " + results[i][2]);
                    break;
            }
        }
        console.log("");
    }
}

/* A Helper function that prints out the authors of 
   each book in the given list of authors
*/
function printAuthors(authors){
    if(authors.length === 1){
        console.log("Author: " + authors[0]);
    }else{
        var authorsString = "";

        for(var i = 0; i < authors.length; ++i){
            authorsString += authors[i] + ", ";
        }
        console.log("Authors: " + authorsString.slice(0, -2)); //slice to remove the last ", "
    }
}

/*  
    Given a list of books from the api, I ask the user to enter a number 
    Between 1 and bookList.length. That number corresponds to a book
    that will be added to their reading list. If not, the user can 
    search a new book, view their reading list, or quit
*/
function toggleReadingListMenu(bookList){
    console.log("Enter any digit 1 - " + (bookList.length) + " to add that title to your list or search for a new book");
    console.log("Or you can enter a new query, or enter 'reading list' or 'quit'");

    process.stdin.once('data', input => {
        let userInput = parseInt(input.toString());

        if(validReadingListInput(userInput, bookList.length)){
            let correctedUserInput = userInput - 1; //Must subtract by 1 to match the array indices.
            user.addToReadingList(bookList[correctedUserInput].volumeInfo.title);
            console.log(bookList[correctedUserInput].volumeInfo.title + " was added to your reading list!");
        }
    });
}

/* Helper function that checks if the user's input is 
   vaid (must be between 1 and the total number of books in the list)
*/
function validReadingListInput(userInput, bookListLength){
    if(userInput >= 1 && userInput <= bookListLength){
        return true;
    }else{
        return false;
    }
}

/*
    This method checks to see if a single integer was entered. This way 
    a new query will not be displayed when trying to add to the reading list.
    Returns true if an integer was entered, returns false otherwise.
*/
function didEnterInteger(userInput){
    if(userInput.charCodeAt(0) >= 48 && userInput.charCodeAt(0) <= 57){
        return true;
    }else{
        return false;
    }
}