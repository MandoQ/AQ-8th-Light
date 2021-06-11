var readingListCollection = [];

function readingList(bookList){
    // console.log("Do you want to add any of these books to your reading list? Enter 'Yes' or 'No'");
    // 'If so, there are ' + bookList.length + ' to choose from. Enter 0 - ' + (bookList.length - 1) + 
    // ' to add to your list!');
}

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
                console.log('No books found with your query');
                return;
            }else{
                displayBookInformation(jsonResponse);
                readingList(jsonResponse.items);
            }
        });
    });
}

function displayBookInformation(jsonResponse){
    var result = '';
    let bookList = jsonResponse.items;
    var publisher = '';

    for(var i = 0; i < bookList.length; ++i){
        result += "Title: " + bookList[i].volumeInfo.title + " Author(s): ";
        let authors = bookList[i].volumeInfo.authors;

        if(authors && authors.length == 1){
            result += authors[0];
        }else{
            for(var l = 0; l < authors.length; ++l){
                result += " " + authors[l];
            }
        }
        
        if(bookList[i].volumeInfo.publisher){
            publisher = "Publisher: " + bookList[i].volumeInfo.publisher;
        }else{
            publisher = "Publisher: n/a";
        }

        console.log(result + " " + publisher);
        result = '';
    }
    return console.log(bookList.length);
}

function printReadingList(){
    for(i = 0; i < readingListCollection.length; ++i){
        console.log(readingListCollection[i]);
    }
}

function getUserQuery(){
    console.log("Enter a book you wish to search. Enter 'Reading List' to view your list ");
   
    process.stdin.on('data', userInput => {
        let query = userInput.toString().toLowerCase();
     
        if(query.trim() === "reading list"){
            printReadingList();
        }else if(query.trim() === "quit"){
            process.exit();
        }else{
            fetchBooks(query);
        }
    });
}

getUserQuery();