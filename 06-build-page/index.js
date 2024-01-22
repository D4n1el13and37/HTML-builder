const fs = require('fs/promises');
const path = require('path');

const pageFolder = path.join(__dirname, 'project-dist');

async function createPageFolder() {
  await fs.mkdir(pageFolder, { recursive: true });
}

createPageFolder();


//function for create index.html file, with changed {tags} to code from components folder
async function buildStaticPage() {
  //create path to index.html
  const indexHTMLPath = path.join(pageFolder, "index.html");

  //path to template file with {tags}
  const templatePath = path.join(__dirname, 'template.html');
  
  //path to folder with components which shouod be insterted to index.html
  const componentsFolder = path.join(__dirname, 'components');

  //read the content of template file
  const templateData = await fs.readFile(templatePath, 'utf-8');

  //read components folder
  const files = await fs.readdir(componentsFolder);

  //filter files by extension(.html)
  const htmlFiles = files.filter((file) => path.extname(file) === '.html');

  //initialize template variable to build the index.html content
  let template = templateData;
  
  //iterate through each html file in components folder
  for (const file of htmlFiles) {
    const filePath = path.join(componentsFolder, file);
    const fileName = path.parse(filePath).name;
    
    //get data from file which we will pass instead tag
    const data = await fs.readFile(filePath, 'utf-8');

    //pass instead {{tag}} in template data from file 
    template = template.replace(`{{${fileName}}}`, `${data}`);
  }
  //write the modified template to the index.html file 
  await fs.writeFile(indexHTMLPath, template, 'utf-8');
}



async function mergeStyle() {
  const stylesFolder = path.join(__dirname, 'styles');
  const outputFile = path.join(pageFolder, 'style.css');


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
  const generalStyleFile = dataArray.join('\n');

  //write(create) file with content cssBundleContent
  await fs.writeFile(outputFile, generalStyleFile, 'utf-8');
  console.log('Style.css created successfully');
}


async function copyDir(srcDir, destDir) {
  //remove folder if it's exist
  await fs.rm(destDir, { recursive: true, force: true });
  //create folder
  await fs.mkdir(destDir);

  //read content from source directory
  const files = await fs.readdir(srcDir, { withFileTypes: true });

  for (const file of files) {
    const srcPath = path.join(srcDir, file.name);
    const destPath = path.join(destDir, file.name);

    //check is file a folder(directory) ?
    if (file.isDirectory()) {
      //inplement recursive
      copyDir(srcPath, destPath);
    } else {
      //if it is a file we just copy it into destination
      await fs.copyFile(srcPath, destPath);
    }
  }
  // console.log(`Directory was copied`);
}

const srcFolder = path.join(__dirname, 'assets');
const destFolder = path.join(pageFolder, 'assets');

buildStaticPage();
mergeStyle();
copyDir(srcFolder, destFolder);