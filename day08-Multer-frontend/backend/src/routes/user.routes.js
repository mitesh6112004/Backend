const express = require("express") ; 
const upload = require("../config/multer");

const router = express.Router() ;

router.post("/", upload.array("images") ,(req,res) => {
   try {
     const body = req.body;
     const file = req.files;

     console.log(body);
     console.log(file);

     res.status(200).json({
       messaage: "upload successfully...",
     });
    
   } catch (error) {
    return res.status(500).json({
        messaage : "Internal Server error"
    })
   }
})


module.exports = router ; 