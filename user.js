class User {
    #readingList;

    constructor(){
        this.#readingList = [];
    }

    addToReadingList(bookToAdd){
        this.#readingList.push(bookToAdd);
    }

    displayReadingList(){
        console.log("\nYour reading list:");

        for(var i = 0; i < this.#readingList.length; ++i){
            console.log(this.#readingList[i]);
        }
        console.log("\nEnter a book you wish to search, or enter 'quit' to terminate");
    }
}

module.exports = User;