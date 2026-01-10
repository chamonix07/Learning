# Start-up Match-making

A JavaScript program that implements startup team formation and member matching based on encrypted job characters.

## Overview

This project provides functionality to:

- Split names and job characters from encoded strings
- Reverse encrypted job character sequences
- Decrypt job characters
- Form dream teams from startup members
- Validate team composition

## Functions

### `splitJobCharacters(str)`

Splits an input string into an array of names and job characters.

**Example:**

```javascript
splitJobCharacters("idaz-sfmutvi,anggara-sfutqji,dear-sfldbi");
// Returns: [ 'idaz', 'sfmutvi', 'anggara', 'sfutqji', 'dear', 'sfldbi' ]
```

### `reverseJobCharacters(arr)`

Reverses the job character strings within an array.

### `decryptJobCharacters(arr)`

Decrypts the reversed job characters.

### `makingDreamTeam(arr)`

Forms a 2D array representing the dream team with names and job characters.

### `startUpMatchMaking(str)`

Main function that orchestrates the entire process using the functions above.

## Usage

Run the script using Node.js:

```bash
node start-up-match-making.js
```

## Link Video

## Author

**ilkham navy** - 10/01/2025

## Notes

- Team must have a minimum of 3 members
- Job characters are encrypted and must be decrypted for proper assignment
