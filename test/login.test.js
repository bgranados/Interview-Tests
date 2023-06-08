const { expect } = require("chai");

const token = "bee47dc252fdb871aa7b3899e4cd9dff1ab2607891298226c0a69eedfeb5a651";

const headers={
    'Authorization': `Bearer ${token}`
}
// fetch is natively supported by Node to make HttpRequests
// https://developer.mozilla.org/en-US/docs/Web/API/fetch
// https://javascript.info/fetch for examples
describe('user can login', ()=>{
    it('can login with token', async ()=> {
        await fetch('https://google.com').then(response => {
        expect(response.status).to.be.equal(200)
       })
    })
    it('can add header and pass', async ()=>{
        await fetch('https://gorest.co.in/public/v2/users').then(async response => {
            console.log(response.status)
            expect(response.status).to.be.equal(200);
            console.log('headers are ', headers)
            var responseJson = await response.json()          
            console.log('response body?', JSON.stringify(responseJson))
        })
    })
})