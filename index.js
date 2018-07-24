// Libs
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
var cors = require('cors');
var request = require('request');
var fileDownload = require('js-file-download');
var docxConverter = require('docx-pdf');
var fs = require('fs');

// Parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
app.use(express.static('pdfs'))

// Global Vars
var docx;
var pdf;


// Mongoose
app.post('/convertDocx-Pdf', (req, res)=>{
    docx = req.body.path;
    pdf = docx.replace('.docx','.pdf');
    pdfName = pdf.replace('./', '');
    

    console.log("works");
    console.log(docx);
    docxConverter(docx, "./pdfs/"+ pdf,function(err,result){
        
        if(err){
          console.log(err);
          res.send(err);
        }else{
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
        }
      });
});

app.get('/downloadPdf', function (req, res) {
    //res.header('Content-Type', 'text/html');
    res.header('Content-disposition', 'inline; filename=' + 'dmeo.pdf');
    res.header('Content-type', 'application/pdf');
    request('http://localhost:3000/essay.pdf').pipe(res);
});

//Sets Port
const port = '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));