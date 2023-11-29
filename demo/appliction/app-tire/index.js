const message = require('./message');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
const fetch = require('node-fetch');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ROUTES FOR OUR API
// =======================================================

//Health Checking
app.get('/health',(req,res)=>{
    res.json("This is the health check");
});

// ADD TRANSACTION
app.post('/messages', (req,res)=>{
    var response = "";
    try{
        console.log(req.body);
        console.log(req.body.name);
        console.log(req.body.chat);
        var success = transactionService.addTransaction(req.body.name,req.body.chat);
        if (success = 200) res.json({ message: 'added message successfully'});
    }catch (err){
        res.json({ message: 'something went wrong', error : err.message});
    }
});

// GET ALL MESSAGES
app.get('/messages',(req,res)=>{
    try{
        var messagesList = [];
       message.getAllMessages(function (results) {
            console.log("we are in the call back:");
            for (const row of results) {
                messagesList.push({ "id": row.id, "name": row.name, "description": row.chat });
            }
            console.log(messagesList);
            res.statusCode = 200;
            res.json({"result":messagesList});
        });
    }catch (err){
        res.json({message:"could not get all messages",error: err.message});
    }
});

//DELETE ALL MESSAGES
app.delete('/messages',(req,res)=>{
    try{
        message.deleteAllMessages(function(result){
            res.statusCode = 200;
            res.json({message:"delete function execution finished."})
        })
    }catch (err){
        res.json({message: "Deleting all messages may have failed.", error:err.message});
    }
});

//DELETE ONE MESsaGeS
app.delete('/messages/id', (req,res)=>{
    try{
        //probably need to do some kind of parameter checking
        message.deleteMessagesById(req.body.id, function(result){
            res.statusCode = 200;
            res.json({message: `message with id ${req.body.id} seemingly deleted`});
        })
    } catch (err){
        res.json({message:"error deleting message", error: err.message});
    }
});

//GET SINGLE message
app.get('/messages/id',(req,res)=>{
    //also probably do some kind of parameter checking here
    try{
        message.findMessagesById(req.body.id,function(result){
            res.statusCode = 200;
            var id = result[0].id;
            var amt = result[0].name;
            var desc= result[0].chat;
            res.json({"id":id,"name":nme,"chat":chat});
        });

    }catch(err){
        res.json({message:"error retrieving message", error: err.message});
    }
});

  app.listen(port, () => {
    console.log(`AB3 backend app listening at http://localhost:${port}`)
  })