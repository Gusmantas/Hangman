# Hangman game

### Tools and techniques used
* Node Express
* SQLite 3
* Vue 3 CLI with JavaScript
* SCSS
* Vuex
* Vue Router


### Installation
* Clone or download project
* In terminal of root folder of the application run `cd api`
* `npm install`
* `node index` or if you use nodemon `nodemon index`
* Server is now running
* Open another terminal and run `cd client`
* `npm install`
* `npm run serve` 
* Client is now running
* Navigate to `http://localhost:8080/` and you should see the aplication running.


### Documentation
* User is promted to enter player name. This is required to save status of last user round
* Clicking `SUBMIT` redirects user to next step
* Here is user prompted to either enter his/hers own word (with optional hint) or choose an existing word to play for.
* After making a choice and clicking `PLAY` button the game starts and user entered word together with the hint (if there is any word) is saved in database.
* User has 10 tries to guess right letters.
* Independing if player wins or loses the status of this round (won or lost) is saved in database.
* Player is then asked to `PLAY AGAIN?` to start a new round
* Player has a possibility to see scores of last 10 games of other players.
