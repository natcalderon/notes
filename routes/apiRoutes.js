const fs = require("fs");


module.exports = function(app){
    const data = require("../db/db.json")

    app.get("/api/notes", (req, res) =>{
        return res.json(data);
    })

    function dbArray(notes){
        notes = JSON.stringify(notes);
        console.log (notes);
        
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

    
    app.post("/api/notes", (req, res) =>{

        if (data.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(data[data.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);
        data.push(req.body);

     
        dbArray(data);
        res.json(req.body);
    });
};