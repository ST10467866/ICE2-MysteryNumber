# Mystery Number Game

## Group Information:

**Group members:** 
* Leah Naiker ST10467866

* Tshiamo Nkge ST10473572 
                    
**GitHub Repository URL:** https://github.com/ST10467866/ICE2-MysteryNumber.git

## Application Details

### Description

The **Mystery Number Game** is a simple, interactive React Native application where the user tries to guess a randomly generated number between 1 and 100.

The app provides immediate feedback on whether the user's guess is **too high**, **too low**, or **correct**. It also displays the total number of attempts made and allows the user to restart the game at any time.

## Application Features

* **Random Number Generation:**
  Generates a random number between 1 and 100 at the start of the game or after restarting.

* **User Input:**
  Users can input their guesses using a `TextInput` field.

* **Feedback System:**
  Displays real-time feedback:

  * "Too low! Try again."
  * "Too high! Try again."
  * "Congratulations! You've guessed the correct number!"

* **Guess Counter:**
  Shows the number of guesses taken in the current game.

* **Restart Game Button:**
  Resets the game by generating a new number and resetting the guess counter to zero.

* **Responsive UI:**
  The interface is styled with `StyleSheet` to ensure proper usability on mobile devices.

## Pseudocode 

0. Start
1. Declarations
   
	num intSecretNum

	num intGuess

	num intGuessCount

	string strPlayAgain

2. output "Welcome to the mystery number challenge!" + "Guess the secret number (between 1 and 10)"
   
3. output "Enter your guess (-1 to exit) :"
   
4. input intGuess

5. while strPlayAgain = "yes"
   
	intGuessCount = 0

	intSecretNum = random (1,10) 

6. while intGuess <> intSecretNum AND intGuess <> -1
    
	intGuessCount = intGuessCount + 1

		if intGuess < intSecretNum then

			output "Too low! Try again"
   
		else

			intGuess > intSecretNum then
   
			output "Too high! Try again"
   
		end if

		  output "Enter your next guess (-1 to exit)

   end while

7. if intGuess = -1 then
    
	  output "You chose to exit the game, Goodbye!"

   end if

8. if intGuessCount = intGuessCount + 1
    
   	output "Congratulations! You've guessed correctly"
    
  	output "Total guesses:" + intGuessCount

   	output "Would you like to play again? (yes/no)"
    
   	input strPlayAgain

9. output "Thanks for playing the mystery number challenge"

10. Stop 
		
## Screenshots



## Flow of the Application

1. **Game Starts:**

   * A random number between 1 and 100 is generated.
   * The user is prompted to enter their guess.

2. **User Makes a Guess:**

   * User enters a number and clicks **Submit Guess**.
   * The app checks the guess:

     * Too low → Displays: "Too low! Try again."
     * Too high → Displays: "Too high! Try again."
     * Correct → Displays: "Congratulations! You've guessed the correct number!"

3. **Guess Count:**

   * The total number of attempts is updated and displayed on-screen.

4. **Restarting the Game:**

   * Clicking **Restart Game** resets the number, the guess counter, and feedback.

## App Experience Description

### How the Game Was Designed

We began by writing pseudocode to outline the main steps of the game logic: generating a number, comparing user input, and providing feedback. From there, we implemented the logic in React Native using hooks and modular components to maintain clean, readable code.

### Challenges and Solutions

* **Challenge:** Resetting the game state without issues.
  **Solution:** We used `useState` to store the secret number and guess count and created a dedicated restart function that updates both states properly.
* **Challenge:** Handling invalid user input.
  **Solution:** We added input validation to ensure that only numbers within the valid range are processed.

### Reflection

The project was a great learning experience. Collaboration was smooth, and using GitHub for version control helped track changes and avoid conflicts. In the future, we would like to add additional features like difficulty levels and a timer for a more engaging gameplay experience.

