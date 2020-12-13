const multer = require('multer');
const path=require('path');

const diskStorage = multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,path.join(__dirname,"../public/uploads/imgs"));
    },
    filename:(req,file,callback)=> {
        let extensionFile;
        if(file.mimetype==='image/png') {
            extensionFile='png';
        }else{
            extensionFile='jpg';
        }
        const filename = `${Date.now()}.${extensionFile}`;
        callback(null,filename);
    }
})

const fileFilter = (req, file, cb) => {
	if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
		cb(new Error('File is not supported'), false);
	}
	cb(null, true);
};

module.exports = multer({
	storage: diskStorage,
	fileFilter: fileFilter,
});