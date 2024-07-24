const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
  myName: {type: String, required: true},
  mySID: {type: String, required:true} 
});

// Create a Model object
const Student = mongoose.model('s24students', studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const URL = req.body.myuri;

  // connect to the database and log the connection

  mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongooseDB');
    })
    .catch((error) => {
        console.log(error);
    });


  // add the data to the database

  const myName = 'Christian Elena Villanueva';
  const mySID = '300379992';

  const newStudent = new Student({
    myName, mySID
  });

  newStudent
      .save()
      // send a response to the user
      .then(() => res.send(`<h1>Document Added</h1>`))
      // send an error
      .catch((error) => res.send(`<h1>Error: ${error}</h1>`));
 
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
