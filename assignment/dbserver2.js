var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var qs = require('querystring');
//fs.readFile('./dbajax.html', function (err, html) 
//{
    //if (err) throw err; 

    http.createServer(function (request,response)
    {   
      if (request.url === "/mydb")
        {
           console.log("mydb");
           fs.readFile('./dbajax.html', function (err, html) 
          {
           response.writeHeader(200, {"Content-Type": "text/html"});  
           response.write(html);  
           response.end();
        }
                    )
        MongoClient.connect("mongodb://localhost:27017/mydb", function (err, db) {
    
             db.collection('contact', function (err, collection) {

                   collection.find().toArray(function(err, items) {
                      if(err) throw err;    
                      console.log(items);    
                      response.writeHead(200, {"Content-Type:": "application/json"}); 
                      var submittedPost = {};
                      submittedPost['message'] = 'Proof that Node and Mongo are working..';
                      response.write( "_wrapper('" );
                      response.write( JSON.stringify(items) );
                      response.write( "')");              
                      response.end();
                      });
             });

         }); 
     }
   if (request.url === "/signuppage") {
     var action, form, formData, msg, publicPath, urlData;
     form = "signup.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            response.writeHead(200, {
              "Content-Type": "text/html"
            });
            return response.end(contents);
          } else {
            response.writeHead(500);
            return response.end;
          }
        });
   }
     
      if (request.method === "POST") {
        
        formData = '';
        msg = '';
        return request.on('data', function(data) {
          console.log(data);
          formData += data;
          return request.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
            response.writeHead(200, {
              "Content-Type": "application/json",
              "Content-Length": msg.length
            });
            return response.end(msg);
          });
        });
      } 
    
       
      if (request.url === "/callapiweather") 
       {
          form = "callapiweather.html";
         return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            response.writeHead(200, {
              "Content-Type": "text/html"
            });
            return response.end(contents);
          } else {
            response.writeHead(500);
            return response.end;
          }
        });
       }
      
       if (request.url === "/callyoutube") 
       {
          form = "callyoutube.html";
         return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            response.writeHead(200, {
              "Content-Type": "text/html"
            });
            return response.end(contents);
          } else {
            response.writeHead(500);
            return response.end;
          }
        });
       }
      
      if (request.url === "/callcar") 
       {
          form = "callcar.html";
         return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            response.writeHead(200, {
              "Content-Type": "text/html"
            });
            return response.end(contents);
          } else {
            response.writeHead(500);
            return response.end;
          }
        });
       }
              
        //response.end(); 
    }).listen(9004); 
 