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
    cy.get('body').filter(':contains("Accident Protection Plan")').then((res) => {
        console.log( "found", res.length)
        if(res.length > 0){
            cy.contains('No thanks', {timeout: 15000}).should('exist')
           // cy.contains('No thanks').click({force: true});
           cy.get('span').contains('No thanks').click({force:true})
        }
    })
       cy.get('a').contains('cart').click({force:true}); 
       cy.contains('Shopping Cart');
       cy.contains('Kindle Paperwhite');
    })

})