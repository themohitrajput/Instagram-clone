const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const ensureDirExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Local storage configuration for avatar uploads
const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/profiles';
        ensureDirExistence(dir);
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Local storage configuration for post uploads
const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/posts';
        ensureDirExistence(dir);
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
    }
});

exports.uploadAvatar = multer({
    storage: avatarStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB limit
    }
});

exports.uploadPost = multer({
    storage: postStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB limit
    }
});

// Deleting a locally stored file
exports.deleteFile = async (fileuri) => {
    const filePath = path.join(__dirname, '..', fileuri); // Adjust this path based on your folder structure
    try {
        fs.unlinkSync(filePath);
        return { message: 'File deleted successfully' };
    } catch (err) {
        return { error: 'File deletion failed', details: err };
    }
};
