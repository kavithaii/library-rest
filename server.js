const express = require('express');
const app = express();
const port = 3000;

const books = [
    { id: 23, author: "Orange", title: "The book tour", isbn: "978-3-16-148410-0", releaseDate: "12-09-2000" },
    { id: 12, author: "Shay", title: "Coin-up", isbn: "978-1-60309-427-6", releaseDate: "26-01-2006" },
    { id: 103, author: "Hila", title: "The Dragon", isbn: "978-1-60309-057-5", releaseDate: "04-05-2010" },
];

app.get('/hello', (req, res) => {
    res.send('Hi there');
});

app.get("/books", (req, res) => {
    res.json(books);
});
  
app.get("/books/:id", (req, res) => {
    const { id } = req.params;
   
    const oneBook = books.filter(
      item => item.id === (+id)
    );
    // console.log(oneBook.length);

    if (oneBook.length === 0) {
        return res.sendStatus(404);
    }

    res.json(oneBook);
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
   
    const findBook = books.findIndex(
      item => item.id === (+id)
    );

    if (findBook < 0) {
        return res.sendStatus(404);
    }
    
    let deleteBook = books.splice(findBook, 1);
  
    res.sendStatus(200);
});

// launch the server and listen only when running as a standalone process
if (!module.parent) {
      // start listening if all good... 
      app.listen(port, async () => {
        console.log(
          `API server is listening on port ${port}`
        );
    });
    
}
  
module.exports = { app, port }; // testing purpose