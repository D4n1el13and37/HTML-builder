const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

//path to file with writen text by console 
const WRITE_PATH = path.join(__dirname, 'output.txt');
//create stream for save into file 
const output = fs.createWriteStream(WRITE_PATH);

stdout.write('Greeting, dear friend!\n');

//event listener on input
stdin.on('data', (data) => {
  //convert data into string
  const stringData = data.toString().trim();

  //if 'exit' was input in console
  if (stringData.toLowerCase() === 'exit') {
    //terminate the app with msg from 'exit' process
    exit();
  } else {
    //write inputed data into file
    output.write(stringData + '\n');
  }
});

//listener for exit method
process.on('exit', (err) => {
  //error output (if it is)
  if(err) return console.error(err.message);
  //bye message
  stdout.write('Exiting the program. Goodbye!');
})

//listener  for ctrl+c 
process.on("SIGINT", () => {
  //output exit msg and terminate programm
  exit();
})