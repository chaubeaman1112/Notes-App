require('dotenv').config();
const server = require("express");
const notesmodel = require("./models/notes.model");
const app = server();
const cors= require('cors');

const myData = [];
app.use(server.json());
app.use(cors())
app.post("/inputdata", async (req, res) => {
  const data = req.body;
  await notesmodel.create(data);

  res.status(200).json({
    message: "message sent successfully",
  });
});

app.get("/getnotes", async (req, res) => {
  const data = await notesmodel.find();

  res.status(200).json({
    message: "Data fetched successfully",
    Datas: data,
  });
});

app.delete('/:id', async(req,res)=>{
    const id= req.params.id;
    const data= await notesmodel.findByIdAndDelete(id);

    res.status(200).json({
        message:"notes deleted successfully",
        Data:data
    })
})

app.patch('/:id',async(req, res)=>{
   const id= req.params.id;
  const description= req.body.description;
  const title= req.body.title;

    const data= await notesmodel.findByIdAndUpdate(id, {
        description:description,
        title:title
    })

  res.status(200).json({
    message:"notes updated successfully",
    data
  })
})

module.exports = app;
