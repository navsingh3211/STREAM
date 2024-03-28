const axios = require('axios');
const fs = require('fs');
const archiver = require('archiver');
const sharp = require('sharp');

// Function to download an image
async function downloadImage(url, filename) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'arraybuffer'
    });

    fs.writeFileSync(filename, response.data);
}

// Function to compress an image
async function compressImage(inputPath, outputPath) {
    await sharp(inputPath)
        .resize({ width: 800 }) // Resize to desired dimensions
        .toFile(outputPath);
}

// List of image URLs to download
const imageUrls = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    // Add more image URLs here...
];

// Directory to store downloaded images
const downloadDir = './downloads';
if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}

// Download and compress images
Promise.all(imageUrls.map(async (url, index) => {
    const filename = `${downloadDir}/image${index + 1}.jpg`;
    await downloadImage(url, filename);
    await compressImage(filename, `${downloadDir}/compressed_image${index + 1}.jpg`);
})).then(() => {
    // Create a zip file
    const output = fs.createWriteStream('compressed_images.zip');
    const archive = archiver('zip', {
        zlib: { level: 9 } // Set compression level
    });

    output.on('close', () => {
        console.log('All images compressed and added to compressed_images.zip');
    });

    archive.pipe(output);

    // Add compressed images to the zip file
    archive.directory(downloadDir, false);

    // Finalize the zip file
    archive.finalize();
}).catch(err => {
    console.error('Error:', err);
});