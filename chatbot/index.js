const express = require('express');
const ejs = require('ejs');
const port = 8080;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

app.get('/',(req,res)=>{

    res.render('pages/index')
});