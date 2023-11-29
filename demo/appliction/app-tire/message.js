const dbcreds = require('./DbConfig');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});

function addMessages(name,chat){
    var mysql = `INSERT INTO \`messages\` (\`name\`, \`description\`) VALUES ('${name}','${chat}')`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log("Adding to the table should have worked");
    }) 
    return 200;
}

function getAllMessages(callback){
    var mysql = "SELECT * FROM messages";
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log("Getting all messages...");
        return(callback(result));
    });
}

function findMessagesById(id,callback){
    var mysql = `SELECT * FROM messages WHERE id = ${id}`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`retrieving messages with id ${id}`);
        return(callback(result));
    }) 
}

function deleteAllMessages(callback){
    var mysql = "DELETE FROM messages";
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log("Deleting all messages...");
        return(callback(result));
    }) 
}

function deleteMessagesById(id, callback){
    var mysql = `DELETE FROM messages WHERE id = ${id}`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`Deleting messages with id ${id}`);
        return(callback(result));
    }) 
}


module.exports = {addMessages ,getAllMessages, deleteAllMessages, deleteAllMessages, findMessagesById, deleteMessagesById};