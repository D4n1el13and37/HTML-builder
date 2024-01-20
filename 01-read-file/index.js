const fs = require('fs');
const path = require('path');

//create path to file, use __dirname to get path to this directory
const READ_PATH = path.join(__dirname, 'text.txt');

//create stream-read with encoding utf-8
const stream = fs.createReadStream(READ_PATH, 'utf-8');

//var to save data from file
let data = '';

//event listener of data, called when new data arrives from a file
stream.on('data', (chunk) => {
  //add chunk of data to data variable
  data += chunk; 
});

//output the complete data when reading is done
stream.once('end', () => console.log(data));

// Handle and log any errors that occur during reading
stream.on('error', (err) => console.error(err.message));
