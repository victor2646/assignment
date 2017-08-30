var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var mimeTypes = {
           "html": "text/html",
           "jpeg": "image/jpeg",
           "jpg": "image/jpeg",
           "png": "image/png",
           "js": "text/javascript",
           "css": "text/css"};
var databaseUrl = "test"; 
var collections = ["testData"]
//var db = require("mongojs").connect(databaseUrl, collections);
var mongojs = require('mongojs');
var db = mongojs('databaseUrl', collections);


var server = http.createServer(function onRequest(req, res) {    
	var action, form, formData, msg, publicPath, urlData;
    urlData = url.parse(req.url, true);
    action = urlData.pathname;
    publicPath = __dirname + "\\public\\";
   console.log(req.url);
	if (action === "/favourite") {
     
      if (req.method === "POST") {
        console.log('asdads');
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          console.log(data)
          formData += data;
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Content-Length": msg.length
            });
            return res.end(msg);
          });
        });
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "favourite.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }
    }
	
    if (action === "/Signup") {
     
      if (req.method === "POST") {
        console.log('asdads');
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          console.log(data)
          formData += data;
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Content-Length": msg.length
            });
            return res.end(msg);
          });
        });
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "signup.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }
    }
	var urlParts = url.parse(req.url);
       var fullPath = urlParts.pathname;
       //var page = 'pages' + urlParts.pathname;
  var page = './' + urlParts.pathname;
  console.log(fullPath);
       var jsonUserOject = '';
       if (fullPath == "/post") {
         console.log("post call");
            var userName = '';
               req.on('data', function(chunk) {
               jsonUserObject = JSON.parse(chunk.toString());
               userName = jsonUserObject.name;
               userEmail = jsonUserObject.email;
               db.testData.insert({name: userName, email: userEmail}, function(err, testData) {
                   if( err || !testData) console.log("Unable to add user");
                   });
               });
       } else{
		// Get
		fs.readFile("./" + req.url, function (err, data) {
			var dotoffset = req.url.lastIndexOf(".");
			var mimetype = dotoffset == -1
				? "text/plain"
				: {
					".html": "text/html",
					".ico" : "image/x-icon",
					".jpg" : "image/jpeg",
					".png" : "image/png",
					".gif" : "image/gif",
					".css" : "text/css",
					".js"  : "text/javascript"
				}[req.url.substr(dotoffset)];
			if (!err) {
				//res.setHeader("Content-Type", mimetype);
				//res.end(data);
				console.log(req.url, mimetype);
			} else {
				res.writeHead(302, {"Location": "http://assignment2-victor2646569854.codeanyapp.com:3300/index.html"});
				res.end();
			}
		});
    }
    var mimeType = mimeTypes[path.extname(page).split(".")[1]];
    fs.exists(page, function fileExists(exists) {
              if (exists) {
                   res.writeHead(200, mimeType);
                   fs.createReadStream(page).pipe(res);
              } else {
                   res.write('Page Not Found');
                   res.end();
              }
    });
}).listen(3300);