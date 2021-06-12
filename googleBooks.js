var readingListCollection = [];

/*  
    Given a list of books from the api, I ask the user to enter a number 
    Between 0 and bookList.length - 1. That number corresponds to a book
    that will be added to their reading list. If not, the user can 
    search a new book, view their reading list, or quit
*/
function addToReadingList(bookList){
    console.log("Enter any digit 0 - " + (bookList.length - 1) + " to add that title to your list or search for a new book");
    console.log(" Or you can enter a new query, or enter 'reading list' or 'quit'");

    process.stdin.on('data', input => {
        let userInput = parseInt(input.toString());

        if(userInput >= 0 && userInput < bookList.length){
            readingListCollection.push(bookList[userInput].volumeInfo.title);
        }
    });
}

/*
    This method just loops through the users local reading list collection
    and prints it out
*/
function viewReadingList(){
    console.log("Enter a book you wish to search, or enter 'quit' to terminate ");
    console.log("Your reading list: ");

    for(i = 0; i < readingListCollection.length; ++i){
        console.log(readingListCollection[i]);
    }
}

/*
    Given a query, I make an api call with the parameters of the query 
    and a startIndex of 0 for the given query and a max Results of 5.
    After the GET request is made, I check for a 400 status, print any results using
    the DisplayBookInformation method, and lastly ask the user to add any books to their 
    reading list via the AddToReadingList method 
*/
function fetchBooks(query){
    const https = require('https');
    const querystring = require('querystring');

    const parameters = {
        q: query, 
        startIndex: 0,
        maxResults: 5
    };

    const request_params = querystring.stringify(parameters);

    https.get('https://www.googleapis.com/books/v1/volumes?' + request_params, (res) => {
    
        if(res.statusCode === 400){
            console.log("Please enter a search query or enter 'quit' to exit");
            return;
        }

        var body = '';
        res.on('data', chunk => {
            body += chunk;
        });
        
        res.on('end', () => {
            let jsonResponse = JSON.parse(body);

            if(jsonResponse.totalItems == 0){
                console.log("No books found with your query. Enter a new query, or enter 'reading list' or 'quit'");
            }else{
                displayBookInformation(jsonResponse);
                addToReadingList(jsonResponse.items);
            }
        });
    });
}

/*
    Given the jsonResponse from the api call, I loop through the 
    given bookList and start accessing the relevant information to display
    while checking if those pieces of information exist.
*/

function displayBookInformation(jsonResponse){
    var result = '';
    let bookList = jsonResponse.items;

    for(var i = 0; i < bookList.length; ++i){
        let publisher = bookList[i].volumeInfo.publisher;
        let authors = bookList[i].volumeInfo.authors;
        result += "Title: " + bookList[i].volumeInfo.title + " Author(s): ";
    
        if(authors && authors.length == 1){
            result += authors[0];
        }else if(authors){
            for(var l = 0; l < authors.length; ++l){
                result += " " + authors[l];
            }
        }else{
            result += " n/a";
        }
        
        if(publisher){
            result += " Publisher: " + publisher;
        }else{
            result += " Publisher: n/a";
        }

        console.log(result);
        result = '';
    }
}

/*
    This method starts the program. It asks for the user input. The user can either 
    view their reading list, terminate the program, or search for a book.
*/

function getUserQuery(){
    console.log("Enter a book you wish to search, Enter 'Reading List' to view your list, or enter 'quit' to terminate ");
   
    process.stdin.on('data', userInput => {
        let query = userInput.toString().toLowerCase().trim();
        
        if(query === "reading list"){
            viewReadingList();
        }else if(query === "quit"){
            process.exit();
        }else{
            fetchBooks(query);
        }
    });
}

getUserQuery();