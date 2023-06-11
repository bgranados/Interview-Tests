describe('User on Amazon', () => {
    const product = 'Kindle Paperwhite';

    // Kindle Paperwhite was last released in 2022, so I think the All-New tag has been removed by Amazon.
    // tests proceed with shopping for the latest Kindle

    it('can shop for Kindle Paperwhite and add to cart', () => {
        //arrange
        
        cy.visit('/');
        
        
        // would prefer a unique data attribute for test
        // do not prefer to use id since Amazon could change that.
        // force here is to ignore the sign-in pop-up
        cy.get('#twotabsearchtextbox', {timeout: 10000}).type("Kindle", {force: true}) 

        cy.get('[id="nav-search-submit-button"]').click({waitForAnimations:false})

        // would prefer to know what request gets results, and wait on that
        // using cy.intercept
        // otherwise, wait up to 10 seconds to look for it on results page
        cy.contains('Results').should('exist');
        cy.contains('Kindle Paperwhite', {timeout: 10000}).click();

        cy.get('#add-to-cart-button').should('be.visible').click({force:true});

        //act
        //assert

/*        search results contain the product name in the title “All-new Kindle Paperwhite”
        While on the same page click on the listing for the product ““All-new Kindle Paperwhite” and check if it takes you to the product page
        On the product page select “Kindle Paperwhite” and select “Without Kindle Unlimited” and “Without Ads”. Add this item to the cart. Verify if the item is added to the cart.*/

    // There is a popup that sometimes appears for additional insurance. 
    // Best practice is for us to know the name of our app's pop-up, modal, know the conditions it will appear,
    // and listen for the popup. This is a third party site with limited ability to influence, so workaround is click the cart button 
    // around the popup with force

    /**
     https://stackoverflow.com/questions/38376701/jquery-if-body-contains-exact-string-then-make-variable-true
     */

     //Cypress conditional https://docs.cypress.io/guides/core-concepts/conditional-testing
     // Best practice is to know when the popup would appear
     // Current state of Amazon UI seems that popup will not appear on subsequent add to cart
     cy.get('body').then(($body) => {
        if($body.text().includes('Accident Protection Plan')){
            console.log('found protection plan');
            if($body.text().includes("No thanks")){
                
            // Would prefer to look just for visibility of No thanks, but it is covered by input.
            // Workaround: look for close button, then click.
            // This area can be improved
            cy.get('.a-button-close', {timeout: 20000}).should('be.enabled').click();
            //cy.get('.a-button-close').should(click();
            //cy.contains('No thanks').should('be.visible');
            cy.contains('No thanks').click({force: true});
            }
        }
     })

       cy.get('#nav-cart', {timeout: 10000}).click(); 
       cy.contains('Shopping Cart', {timeout: 10000});
       cy.contains('Kindle Paperwhite');
    })

})