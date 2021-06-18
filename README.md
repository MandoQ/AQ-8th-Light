# Armando Quintana-8th-Light

Start the program with node googleBooks.js

# Submission 2:

## Changes Done Based on Feedback:

1. Changed the 0-4 to 1-5. This is user friendly. I had to check if the user's input was in between 1 and the api book list length. If so, I simply just 
    subtract 1 from the user's input. This way the user's input is corrected in terms of the array index. I also improved the UI for displaying 
    the book results. Instead of the title, authors, and publisher being on one line, they all have their own lines.
2. I created a user class. This class has a private member variable (reading list collection) and has some member functions. This allows the application
   to be expandable. Now, many users can be created, and if scaled up, these users can be stored in a data base. Also, the user class can be modified to contain
   more member variables or methods, leaving room for more features.
3. I tested two functions with Jest. These functions take in user input and check if it is an integer or if it is a valid entry to add to their reading list.
   I am not sure if my tests were created well or had good coverage, but I had a fun time learning something new.
4. For the displayBookInformation function, I ended up spliting the parsing and printig to two separate functions. One that strictly parses the relevant information. The information is placed in a 2D array. The other function takes the 2D array and prints the information. I think this makes the including a web client problem better. The CLI can send the api results to the client and we can have the client print out the results. 

Things I could have improved upon:

I think my googleBooks.js file became very large (180 lines). I would want to look into what is the best way to arrange the code or even move out some of 
the helper functions to a new file. However, for the purpose of this task, I simply arranged the code by importance. I also would've wanted to include all
of the pieces of information in the reading list. However, for the time I have left, I thought only displaying the title was fine. Lastly, I think I could've created more 
tests. I tested the most "obvious" testable functions. However, I would have loved to learn more about Jest and testing in general. 

# Submission 1:

## Process and Approach:

I created a develop branch to start this project. You can find the commits there, but It will be merged to main. 
I started off this project by creating subproblems. 

1. I started by figuring out how to get user input and convert it to a useable string
2. Created a basic google books api call with no user input. I wanted to make sure the api call was correct and fullfilled the requirements 
3. Combined both the user input and the api call so that I could make custom api calls
4. Started covering edge cases for both user input and any api calls (400 error, no books found, missing fields)
5. Implemented the add to reading list and view the reading list 
6. Focused on giving user output, letting them know their options and providing feedback based on their input/decisions.
7. Finally, cleaned up code and looked for any edge cases or bad inputs that I may have missed

## Testing:

Unfortunately, I did not include any tests with this iteration. In college, I was never taught how to create tests, and I wasn't sure how to test user
inputs. I figured I could test the api calls. I mainly focused on manual testing and fixing any errors or edges cases through that testing. 
If there are any resources for learning and creating tests that you suggest, please feel free to include them in the feedback!
