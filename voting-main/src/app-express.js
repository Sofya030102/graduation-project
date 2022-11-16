let uniqID = require('uniqid')
const fs = require('fs')
const express = require('express')
let exec = require('child_process').exec;
const app = express()
const port = 3001
let cors = require('cors');
let fileUpload = require('express-fileupload');
app.use(cors({origin: 'http://localhost:3000'}));
app.use(fileUpload({}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, function() {
    console.log('File manager app for Voting System listening on port 3001!');
});

app.post('/upload', function(req, res) {
  let newName = uniqID('','.'+req.files.photo.name.split('.').pop());
  req.files.photo.mv('public/imgs/'+ newName);
  res.end(newName);
  console.log(newName);
});

app.post('/delete', function(req, res) {
  let body_text = req.body;
  let pathToDelete = 'public/imgs/' + body_text.name;
  fs.unlink(pathToDelete, (err) => {
    if (err) console.log(err)
    else console.log(pathToDelete+ ' was deleted');
  });
});

let cmd = 'react-scripts --openssl-legacy-provider start'

exec(cmd, function(error, stdout, stderr) {
  if (stderr || error) {
    console.log({
      success: false,
      error: stderr || error,
      command: cmd,
      result: null
    })
  } else {
    console.log(stdout)
  }
})