const path = require('path');
const fs = require('fs/promises');

const FOLDER_PATH = path.join(__dirname, '/secret-folder');

async function fileInfoDisplay() {
  //Read the contents of the specified folder with file details
  const files = await fs.readdir(FOLDER_PATH, { withFileTypes: true });

  for (const file of files) {
    //check file is file (not folder)
    if (file.isFile()) {
      const filePath = path.join(FOLDER_PATH, file.name); //create full path to the file
      const stats = await fs.stat(filePath); //get file stats to get its size

      const fileName = path.parse(file.name).name; //get filename without extantion
      const fileExtantion = path.extname(file.name).slice(1); //remove dot from extantion
      const fileSize = stats.size;

      //display file info to the console
      console.log(`${fileName} - ${fileExtantion} - ${fileSize} b`);
    }
  }
}

//call function for display info
fileInfoDisplay();
