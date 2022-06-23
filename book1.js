const express = require ('express');
const app = express();

const mysql= require('mysql2');
app.listen(801,()=>{
    console.log("listening to port 800");
});

app.use (express.static ("sf"));


let dbparams={
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'omprakash',
	port:3306}

const conn= mysql.createconnection(dbparams);
app.get('/getbookid',(req,resp)=>{
    console.log("bookid")
    let bookid =req.query.bookid;
    console.log(bookid);

    let output={status :false,bookid:0,bookname:"",price:0}}

    conn.query('select * from book where bookid =?',[bookid],
    (error,rows)=>{
        if(error){
            console.log("some error"+error);

        }
        else{
            if(rows.length>0){
                output.status= true;
                output.bookid =rows[0];
            }
            else{
                console.log("book not found");
            }
        }
        resp.send(output);
    });
});

app.get('/update',(req,resp)=>{
    console.log (" inside book table");
    let book={bookid:req.query.bookid, bokname:req.query.bookname,price:req.query.price}
let output={status:false}

conn.query('update book set bookid=?, bookname=?,price=?'[book.bookid,book.bookname,book.price],
(error,res)=>{
    if(error){
        console.log(error);

    }
    else{
        if(res.affectedRows>0){
            console.log("update successful");
            output.status=true;

        }
        else{
            console.log("update failed");
        }
    }
    resp.send(output);

});
});

