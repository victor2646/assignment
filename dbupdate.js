var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function (err, db) {
    
    db.collection('contact', function (err, collection) {
        
        collection.update({id: 1}, { $set: { name: 'James Gosling' ,  
                                            email: 'victosdfasdfasdf@ymail.com' , 
                                            tel: [ '12345678','87654321' ]
                                           } }, {w:1},
                          function(err, result)
                          {
                            if(err) throw err;    
                            console.log('Document Updated Successfully');
                          });
      
        

        collection.remove({id:2}, {w:1}, function(err, result) {
        
            if(err) throw err;    
        
            console.log('Document Removed Successfully');
        });

    });
                
});