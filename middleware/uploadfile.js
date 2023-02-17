import multer  from 'multer';

const storage1 = multer.diskStorage({
    destination: './uploads/files',
    filename: (req, file, cb) => {   
        cb(null, '' + Date.now() + '.' + file.originalname);
    }

});

export const uploadfiles = multer({
    storage: storage1,
    limits: {
        fileSize: 100000 * 1024 
    },
    fileFilter: (req, file, cb) => {
        cb(null, true);       
    }
})

