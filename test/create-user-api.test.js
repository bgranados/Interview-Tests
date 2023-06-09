const { expect } = require("chai");

const token = "bee47dc252fdb871aa7b3899e4cd9dff1ab2607891298226c0a69eedfeb5a651";

const headers={
    'Authorization': `Bearer ${token}`
}
// fetch is natively supported by Node to make HttpRequests
// https://developer.mozilla.org/en-US/docs/Web/API/fetch
// https://javascript.info/fetch for examples
describe('User API ', ()=>{
    const usersApi = 'https://gorest.co.in/public/v2/users';

    
    // NOTE: GET does not require any headers for this API.

    it('GET can get user list without header', async ()=>{
        await fetch('https://gorest.co.in/public/v2/users').then(async response => {
            console.log(response.status),
            expect(response.status).to.be.equal(200);
            var responseJson = await response.json()          
            console.log('response body is ', JSON.stringify(responseJson))
            expect(responseJson[0].id).to.exist;  //return at least one user
        })
    })
    
    it('Create User, missing header with POST, returns 401', async () => {
        await fetch(usersApi, {method: 'POST'}).then(response => {
            expect(response.status).to.be.equal(401)
        })
    })

    // PAGE NOT FOUND
    it('Create User, page not found for method PUT, returns 404', async () => {
        await fetch(usersApi, {method: 'PUT'}).then(response => {
            expect(response.status).to.be.equal(404)
        })
    })

    it('Create User, page not found for method DELETE, returns 404', async () => {
        await fetch(usersApi, {method: 'DELETE'}).then(response => {
            expect(response.status).to.be.equal(404)
        })
    })


    // Create new user
    const testUser = {
        'name':'TestUser', 
        'gender':'male', 
        'email':'bg@15ce.com', 
        'status':'active'
    }

    var headersToAddContent =
     {
        "Authorization": `Bearer ${token}`,
        "Accept":"application/json", 
        "Content-Type":"application/json"
    }

    // TBD: this test would work exactly 1x, need to randomize email
    it('Create User, creates a user with POST, returns 200', async () => {
        await fetch(usersApi, {headers: headersToAddContent, method: 'POST', body: JSON.stringify(testUser)}).then(async response => {
            var responseJson = await response.json()               
            console.log(responseJson)
            expect(response.status).to.be.equal(201);              
        })
    })

    it('Create user, POST fails to create user with no email, returns 422', async () => {
        const testUserMissingEmail = {
            'name':'TestUser', 
            'gender':'male', 
            'email':'', 
            'status':'active'
        }

        await fetch(usersApi, {headers: headersToAddContent, method: 'POST', body: JSON.stringify(testUserMissingEmail)})
            .then(async response => {
                var responseJson = await response.json();
                console.log(responseJson[0])
                expect(responseJson[0]).to.have.property('message')
                expect(responseJson[0].message).contains("can't be blank")
                expect(responseJson[0]).to.have.property('field')
                expect(responseJson[0].field).contains('email')
                expect(response.status).to.be.equal(422)
        })
    })
})