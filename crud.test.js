const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');

const expect = chai.expect;
chai.use(chaiHttp);

const apiServer = server.app.listen(server.port);
const Api = () => chai.request(apiServer);

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
});