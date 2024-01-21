const fs = require('fs/promises');
const path = require('path');

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
  console.log(`Directory was copied`);
}

const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

copyDir(srcFolder, destFolder);
