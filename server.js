const express = require('express');
const app = express();
const port = 3000;

app.get('/hello', (req, res) => {
    res.send('Hi there');
});

// launch the server and listen only when running as a standalone process
if (!module.parent) {
      // start listening iff all good... we get here only if the database exists
      // and proxy user is either created anew or already exists.
      app.listen(port, async () => {
        console.log(
          `Conduits API server is listening on port ${port}`
        );
      });
    
}
  
module.exports = { app, port }; // testing purpose