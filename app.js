require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
app.use(express.json());
const bookModel = require("./Model/book");

mongoose.connect(process.env.MONGOURL).then(() => console.log("MONGOBD connect"));

app.get("/",(req,res)=>{
    console.log("Simple Crud Opreation");
});

app.get("/bookDetails", async (req,res)=>{
    const details = await bookModel.find();

    if(details === 0){
        return res.json({data:"No Data Found"});
    }

    return res.json({data:details});
});

app.get("/bookDetails/:id", async (req,res)=>{
    const bId = req.params.id;
    const details = await bookModel.findOne(
        {book_id : bId}
    ); 

    if(details === 0){
        return res.json({data:"No Data Found"});
    }
    return res.json({data:details});
});

app.post("/addBook", (req,res)=>{
    const {addbook} = req.body;
    const addData = bookModel.create(addbook);
    if(addData){
        return res.json({data:"Add Book Details Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

app.put("/updateName", async (req,res)=>{
    const id = req.body.book_id;
    const name = req.body.name;

    const updateData = await bookModel.findOneAndUpdate(
        {book_id: id},
        {name : name},
        {new:true}
    ); 

    if(updateData){
        return res.json({data:"BookName Update Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

app.put("/updateAuthor", async (req,res)=>{
    const id = req.body.book_id;
    const author = req.body.author;

    const updateData = await bookModel.findOneAndUpdate(
        {book_id: id},
        {author : author},
        {new:true}
    ); 

    if(updateData){
        return res.json({data:"Author Name Update Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

app.delete("/deleteWithId/:id", async (req,res)=>{
    const bId = req.params.id;
    const deleteData = await bookModel.findOneAndDelete(
        {book_id : bId}
    );
    if(deleteData){
        return res.json({data:"Detele Data Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

app.delete("/deleteWithName/:name", async (req,res)=>{
    const bName = req.params.name;
    const deleteData = await bookModel.findOneAndDelete(
        {name : bName}
    );
    if(deleteData){
        return res.json({data:"Detele Data Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

app.listen(port , () => {console.log(`App Run On ${port}`);});