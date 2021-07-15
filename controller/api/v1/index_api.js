const File = require("../../../models/files");

// ***************upload api***********************************
module.exports.Upload = function (req, res) {
  try {
    //Use for uploading file with note
    File.uploadedFile(req, res, function (err) {
      if (err) {
        console.log("multer Error", err);
      }
      console.log(req.file);
      if (
        (req.file && req.file.mimetype == "application/vnd.ms-excel") ||
        (req.file && req.file.mimetype == "text/csv")
      ) {
        console.log("true");
        console.log(req.file);
        File.create(
          {
            filePath: req.file.path,
            originalName: req.file.originalname,
            file: req.file.filename,
          },
          function (err) {
            if (err) {
              console.log(err);
              return res.status(400).json({
                message: "Error in creating Note or Uploading File",
              });
            }
            res.status(200).json({
              message: "File Uploaded",
            });
          }
        );
      } else {
        console.log("Please Upload CSV Format file");

        // todo add alert
        res.status(200).json({
          message: "please upload csv file",
        });
      }
    });
  } catch (err) {
    console.log("errot", er);
    return res.json(500, {
      message: "interna server",
    });
  }
};

// ************* delete api ******************************************************************
module.exports.delete = async function (req, res) {
  try {
    const filename = await req.params.file;

    let isFile = await File.findOne({ file: filename });

    await File.deleteOne({ file: filename });

    return res.status(200).json({
      message: "deleted successfully ",
      filename: filename,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// **************all files show *********************

module.exports.allfiles = async function (req, res) {
  try {
    let files = await File.find({});
    return res.status(200).json({
      message: "all files ",
      files: files,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


module.exports.update= async  function(req,res)
{
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unathorized');
    // }

    if((req.user.id==req.params.id)){

        try{

            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                    if(err)
                    {
                        console.log('****multer error',err);
                     
                    }
                   user.name=req.body.name;
                   user.email=req.body.email;
                   if(req.file){

                    if(user.avatar )
                    {
                          fs.unlinkSync(path.join(__dirname+"..",user.avatar));
                    }
                    else
                    {
                            return res.redirect('back');
                    }

                       //this is the saving path of the uploads
                       user.avatar=User.avatarPath+'/'+req.file.filename;
                   }
                   user.save();
                   return res.redirect('back');
            });

        }catch{
            req.flash('error', err);
        return res.redirect('back');
        }



    }else{
        req.flash('error','unathorized');
        return res.status(401).send('Unathorized');

    }
}
