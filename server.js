const express = require('express');
const path = require('path');
// instantiate the server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send('Welcome to the notetaker')
// })

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// method to make erver listen
app.listen(PORT, function() {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
  