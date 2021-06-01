const fs = require("fs");
const data = require("../db/db.json");

module.exports = function(app){
    function writeToDB(notes){
        notes = JSON.stringify(notes);
        console.log (notes);
        
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

     app.get("/api/notes", function(req, res){
        res.json(data);
    });

    
    app.post("/api/notes", function(req, res){

        if (data.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(data[data.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);
        data.push(req.body);

     
        writeToDB(data);
        console.log(data);

      
        res.json(req.body);
    });

    // DELETE Method to delete note//
    app.delete("/api/notes/:id", function(req, res){
        
      
        let id = req.params.id.toString();
        console.log(id);

        
        for (i=0; i < data.length; i++){
           if (data[i].id == id){
                console.log("delete");
                res.send(notesData[i]);
                notesData.splice(i,1);
                break;
            }
        }
         writeToDB(notesData);
 });
};