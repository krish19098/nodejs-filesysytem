const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const folderPath = path.join(__dirname, "text-files");

// Create a text file with the current timestamp
app.post("/create-file", (req, res) => {
  const filename =
    new Date().toISOString().replace(/\..+/, "").replace(/:/g, "-") + ".txt";
  const filepath = path.join(folderPath, filename);
  const content = new Date().toISOString();

  fs.writeFile(filepath, content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating file");
    } else {
      res.status(201).send("File created successfully");
    }
  });
});
// Retrieve all the text files in the folder
app.get("/get-files", (req, res) => {
  const files = fs.readdirSync(folderPath);
  const textFiles = files.filter((file) => path.extname(file) === ".txt");

  res.status(200).json(textFiles);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// Ensure the text-files folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}
