function getUserQuery(){
    console.log("Enter a book you wish to search");
    process.stdin.on('data', userInput => {
        let query = userInput.toString();
        console.log(query);
    });
}

getUserQuery();