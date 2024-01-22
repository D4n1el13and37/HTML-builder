const fs = require('fs/promises');
const path = require('path');

//path to folder with css files (.css extention)
const stylesFolder = path.join(__dirname, 'styles');
//path to ouput folder where we create a bundle.css  
const outputFolder = path.join(__dirname, 'project-dist');
//naming and path to bundle.css file
const outputFile = path.join(outputFolder, 'bundle.css');

async function mergeStyle() {
  //get all files from folder
  const files = await fs.readdir(stylesFolder);
  //filter all files by file extention and save .css files into array
  const cssFilesArray = files.filter((file) => path.extname(file) === '.css');

  const dataArray = [];

  for (const file of cssFilesArray) {
    //create path to each css file
    const filePath = path.join(stylesFolder, file);
    //get data from file 
    const data = await fs.readFile(filePath, 'utf-8');

    //push data into array
    dataArray.push(data);
  }

  //join content of all css files into one variable
  const cssBundleContent = dataArray.join('\n');

  //write(create) file with content cssBundleContent
  await fs.writeFile(outputFile, cssBundleContent, 'utf-8');
  console.log('Bundle created successfully');
}

mergeStyle();