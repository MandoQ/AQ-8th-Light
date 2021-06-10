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
        var body = '';
        res.on('data', chunk => {
            body += chunk;
        });
        
        res.on('end', () => {
            displayBookInformation(body);
        });
    });
}

function displayBookInformation(data){
    var result = '';
    let jsonResponse = JSON.parse(data);
    let bookList = jsonResponse.items;
    var publisher = '';

    for(var i = 0; i < bookList.length; ++i){
        result += "Title: " + bookList[i].volumeInfo.title + " Author(s): ";
        let authors = bookList[i].volumeInfo.authors;

        if(authors.length == 1){
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
}

function getUserQuery(){
    console.log("Enter a book you wish to search");
    process.stdin.on('data', userInput => {
        let query = userInput.toString();
        fetchBooks(query);
    });
}

getUserQuery();