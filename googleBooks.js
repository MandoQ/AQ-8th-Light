function fetchBooks(){
    const https = require('https');
   
    https.get('https://www.googleapis.com/books/v1/volumes?q=handmaid', (res) => {
        var body = '';
        res.on('data', chunk => {
            body += chunk;
        });

        res.on('end', () => {
            console.log(JSON.parse(body));
        });
    });
}

function getUserQuery(){
    console.log("Enter a book you wish to search");
    process.stdin.on('data', userInput => {
        let query = userInput.toString();
        console.log(query);
    });
}

//getUserQuery();
fetchBooks();