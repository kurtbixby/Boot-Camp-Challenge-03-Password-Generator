const DEBUG = false;

function myLog(message, value) {
  if (DEBUG)
    console.log(message + ": " + value);
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (!password) {
    return;
  }

  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Character classes used in password generation
var specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var numericCharacters = "0123456789";
var letters = "abcdefghijklmnopqrstuvwxyz";

// Main wrapper function used to generate a password
// Returns null on failure
// Returns a string upon on success
function generatePassword() {
  var length = askForLength(8, 128);
  // Invalid length
  if (!length) {
    return null;
  }

  var lowercase = askForCharacter("lowercase letters");
  var uppercase = askForCharacter("uppercase letters");
  var numbers = askForCharacter("numeric characters");
  var special = askForCharacter("special characters");

  // No character sets
  if (!(lowercase || uppercase || numbers || special)) {
    window.alert("Invalid password format. Please try again and select at least one character class for your password.");
    return null
  }

  var generatedPassword = passwordGeneration(length, lowercase, uppercase, numbers, special);
  return generatedPassword;
}

// Function that asks the user for the desired password length and checks for validity
// Alerts the user to try again with a different response and returns null upon failure
// Returns a number on success
function askForLength(minLength, maxLength) {
  var lengthInput = window.prompt("How long would you like your password? (Between " + minLength + " and " + maxLength +  " characters)");
  // Validate input can be a number
  if (isNaN(lengthInput)) {
    window.alert(lengthInput + " is not a number. Please try again and enter a number.")
    return null;
  }
  var numInput = Number(lengthInput);

  // Validate input is an integer
  if (!Number.isInteger(numInput)) {
    window.alert(numInput + " is not an integer. Please try again and enter an integer.")
    return null;
  }
  var inputInt = Number.parseInt(lengthInput);
  // Input is an integer

  // Validate length
  if (inputInt < minLength) {
    window.alert(inputInt + " is smaller than " + minLength + ". Please try again and enter a number between " + minLength + " and " + maxLength + ".");
    return null;
  }
  if (maxLength < inputInt) {
    window.alert(inputInt + " is larger than " + maxLength + ". Please try again and enter a number between " + minLength + " and " + maxLength + ".");
    return null;
  }

  return inputInt;
}

// Prompt the user to include a certain character class
// Uses character type in the message to be displayed.
// Return a boolean
function askForCharacter(characterType) {
  return window.confirm("Include " + characterType + "? (OK for yes, Cancel for no)");
}

// Main password generation engine
// Arguments: a length number and a series of booleans representing each character class
// Returns: a string of the generated password
function passwordGeneration(length, lowercase, uppercase, numbers, special) {
  var myCharacters = "";
  var characterCount = 0;

  // Create a character class to hold all the chosen characters
  var allCharacters = "";

  // Grab a character, increment the count, add that class to our complete set
  // Made this a lambda for code reuse
  let chooseFromCharacterSet = (charSet) => {
    myCharacters += getCharacter(charSet);
    characterCount++;
    allCharacters += charSet;
  }

  // For every character class
  if (lowercase) {
    chooseFromCharacterSet(letters);
  }
  if (uppercase) {
    chooseFromCharacterSet(letters.toUpperCase());
  }
  if (numbers) {
    chooseFromCharacterSet(numericCharacters);
  }
  if (special) {
    chooseFromCharacterSet(specialCharacters);
  }

  // Fill out remaining characters with random characters from the set we've built
  while (characterCount < length) {
    myCharacters += getCharacter(allCharacters);
    characterCount++;
  }

  return shuffleCharacters(myCharacters);
}

// Returns a random character from a given string
function getCharacter(characterSet) {
  var charIndex = Math.floor(Math.random() * characterSet.length);
  return characterSet.charAt(charIndex);
}

// Returns a new string made from shuffled characters of an original string
function shuffleCharacters(characterSet) {
  var finalPassword = "";

  var characterArray = Array.from(characterSet);
  while (characterArray.length != 0) {
    var charIndex = Math.floor(Math.random() * characterArray.length);
    finalPassword += characterArray[charIndex];
    characterArray.splice(charIndex, 1);
  }

  return finalPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
