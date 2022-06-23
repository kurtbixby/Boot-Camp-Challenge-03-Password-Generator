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

var specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
var numericCharacters = "0123456789";
var letters = "abcdefghijklmnopqrstuvwxyz";

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
    window.alert("Invalid password format. Please select at least one character class for your password.");
    return ""
  }

  var generatedPassword = passwordGeneration(length, lowercase, uppercase, numbers, special);
  return generatedPassword;
}

function askForLength(minLength, maxLength) {
  var lengthInput = window.prompt("How long would you like your password? (Between " + minLength + " and " + maxLength +  " characters)");
  if (typeof lengthInput !== 'string') {
    window.alert(lengthInput + " is not a number. Please enter a number.")
    return null;
  }

  var numInput = Number(lengthInput);
  if (!Number.isInteger(numInput)) {
    window.alert(numInput + " is not an integer. Please enter an integer.")
    return null;
  }

  var inputInt = Number.parseInt(lengthInput);
  // Input is an integer
  if (inputInt < minLength) {
    window.alert(inputInt + " is smaller than " + minLength + ". Please enter a number between " + minLength + " and " + maxLength + ".");
    return null;
  }
  if (maxLength < inputInt) {
    window.alert(inputInt + " is larger than " + maxLength + ". Please enter a number between " + minLength + " and " + maxLength + ".");
    return null;
  }

  return inputInt;
}

function askForCharacter(characterType) {
  return window.confirm("Do you want to include " + characterType + "?");
}

function passwordGeneration(length, lowercase, uppercase, numbers, special) {
  var myCharacters = "";
  var characterCount = 0;

  // Create a character class to hold all the chosen characters
  var allCharacters = "";

  // For every character class, grab a character, increment the count, add that class to our complete set
  if (lowercase) {
     myCharacters += getCharacter(letters);
     characterCount++;

     allCharacters += letters;
  }
  if (uppercase) {
    myCharacters += getCharacter(letters.toUpperCase());
    characterCount++;

    allCharacters += letters.toUpperCase();
  }
  if (numbers) {
    myCharacters += getCharacter(numericCharacters);
    characterCount++;

    allCharacters += numericCharacters;
  }
  if (special) {
    myCharacters += getCharacter(specialCharacters);
    characterCount++;

    allCharacters += specialCharacters;
  }

  myLog("Chosen length", length);
  myLog("Character count", characterCount);
  myLog("My chosen characters", myCharacters);

  while (characterCount < length) {
    myCharacters += getCharacter(allCharacters);
    characterCount++;
  }

  var characterArray = Array.from(myCharacters);
  var finalPassword = "";
  while (characterArray.length != 0) {
    var charIndex = Math.floor(Math.random() * characterArray.length);
    finalPassword += characterArray[charIndex];
    characterArray.splice(charIndex, 1);
  }

  return finalPassword;
}

function getCharacter(characterSet) {
  var charIndex = Math.floor(Math.random() * characterSet.length);
  return characterSet.charAt(charIndex);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
