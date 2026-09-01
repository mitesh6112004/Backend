const imagekit = require('../config/imageKit.config');

const  create = async (req,res) => {

    const file = req.file; 

    try {
        const uploadedFile = await imagekit.upload({
            file : file.buffer ,
            fileName : file.originalname,
            folder : 'uploads'
        })

        res.status(201).json({
            message : "file uploaded successfully",
            imageUrl : uploadedFile.url
        })
        
    } catch (error) {
        
        res.status(500).json({
            message : "Internal Server error..."
        })

    }
}

module.exports =  create  ; 