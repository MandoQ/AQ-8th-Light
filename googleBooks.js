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
            console.log(JSON.parse(body));
        });
    });
}

function getUserQuery(){
    console.log("Enter a book you wish to search");
    process.stdin.on('data', userInput => {
        let query = userInput.toString();
        fetchBooks(query);
    });
}

getUserQuery();