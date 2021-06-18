const googleBooks = require('../googleBooks');

/*
    first two tests shows that the function is valid for any 
    user inputs within the 1 - book list length
*/
test('Book list length 5, user input 1, results to true', () => {
    expect(googleBooks.validReadingListInput(1, 5)).toBeTruthy();
});

test('Book list length 5, user input 5, results to true', () => {
    expect(googleBooks.validReadingListInput(5, 5)).toBeTruthy();
});

/*
    The last 3 tests shows that the method will reject any user input
    that is not within the 1 - book list length 
*/

test('book list length 5, user input 0, results to false', () => {
    expect(googleBooks.validReadingListInput(0, 5)).toBeFalsy();
});

test('book list length 5, user input 6, results to false', () => {
    expect(googleBooks.validReadingListInput(6, 5)).toBeFalsy();
});

test('book list length 10, user input 11, results to false', () => {
    expect(googleBooks.validReadingListInput(11, 10)).toBeFalsy();
});

test('book list length 10, user input 11, results to false', () => {
    expect(googleBooks.validReadingListInput('User input', 10)).toBeFalsy();
});