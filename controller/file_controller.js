const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const File = require("../models/files");

module.exports.View = async function (req, res) {
  console.log(req.params.file);
  let filePATH = await File.findOne({ file: req.params.file });

  const results = [];
  const header = [];
  fs.createReadStream(filePATH.filePath)
    .pipe(csv())
    .on("headers", (headers) => {
      headers.map((head) => {
        header.push(head);
      });
    //   console.log(header);
    })
    .on("data", (data) => results.push(data))
   
    .on("end", () => {
      res.render("file", {
        title: filePATH.originalName,
        head: header,
        data: results,
        length: results.length,
      });
    });
    req.flash("success", "Home page");
};
