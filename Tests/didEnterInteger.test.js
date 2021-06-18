const googleBooks = require('../googleBooks');

test('User input of 0, results in true', () => {
    expect(googleBooks.didEnterInteger("4")).toBeTruthy();
});

test('User input of 9, results in true', () => {
    expect(googleBooks.didEnterInteger("9")).toBeTruthy();
});

test('User input of 10, results in true', () => {
    expect(googleBooks.didEnterInteger("10")).toBeTruthy();
});

test("User input of 4testing', results in false", () => {
    expect(googleBooks.didEnterInteger("4testing")).toBeFalsy();
});

test("User input of 'testing 4 user input', results in false", () => {
    expect(googleBooks.didEnterInteger("testing 4 user input")).toBeFalsy();
});