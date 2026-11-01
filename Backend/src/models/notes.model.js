const mongoose= require('mongoose');

const fileschema= new mongoose.Schema({
    "title":String,
    "description":String
})

const notesmodel= mongoose.model("notes",fileschema)

module.exports= notesmodel;
