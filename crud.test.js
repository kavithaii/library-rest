const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');

const expect = chai.expect;
chai.use(chaiHttp);

const apiServer = server.app.listen(server.port);
const Api = () => chai.request(apiServer);

const books = [
    { id: 23, author: "Orange", title: "The book tour", isbn: "978-3-16-148410-0", releaseDate: "12-09-2000" },
    { id: 12, author: "Shay", title: "Coin-up", isbn: "978-1-60309-427-6", releaseDate: "26-01-2006" },
    { id: 103, author: "Hila", title: "The Dragon", isbn: "978-1-60309-057-5", releaseDate: "04-05-2010" },
];

describe('unit test library REST API', () => {
    before(async () => {
      console.log(`API server is listening on port ${server.port}`);
    });
  
    after(async () => {
      console.log('Shutting down app server');
      apiServer.close();
    });

    context('test the welcome end point GET', () => {
        it('should GET welcome message', async function () {
            const res = await Api().get('/hello');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Hi there');
        });
    });

    context('test the rest end points', () => {
        it('should GET list of all available books in library', async function () {
            const res = await Api().get('/books');
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(books.length);
        });

        it('should GET a book from library using id', async function () {
            const id = 23;
            const res = await Api().get(`/books/${id}`);
            expect(res.status).to.equal(200);
        });

        it('should not GET a non existing book from library', async function () {
            const id = 44;
            const res = await Api().get(`/books/${id}`);
            expect(res.status).to.equal(404);
        });
    });
});