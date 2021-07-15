/****************IMPORTING PACKAGE/MODELS*************************/
const File = require("../models/files");

const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");



module.exports.Upload = function (req, res) {
  try {
   
    File.uploadedFile(req, res, function (err) {
      if (err) {
        console.log("multer Error");
      }
      console.log(req.file);
      if (
        (req.file && req.file.mimetype == "application/vnd.ms-excel") ||
        (req.file && req.file.mimetype == "text/csv")
      ) {
       
     
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
            req.flash("success", "Successfully added in database")
            return res.redirect("/");
          },
         
        );
      } else {
        console.log("Please Upload CSV Format file");
        req.flash("error", "Please Upload CSV file format");
       
        return res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
