const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

console.log(`Received file path: ${filePath}`);

if (!filePath) {
    console.log('Please provide a file path.');
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.log('The specified file does not exist.');
    process.exit(1);
}

console.log(`File exists: ${filePath}`);

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        process.exit(1);
    }

    console.log('File read successfully.');


    const words = data.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    console.log(`You have ${wordCount} words in this file.`);
});
