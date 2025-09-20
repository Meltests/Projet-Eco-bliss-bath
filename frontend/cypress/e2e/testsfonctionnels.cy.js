describe('tests fonctionnels', () => {
   
    beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  // TEST FONCTIONNEL : CONNEXION //
    
    it('consulter la page de connexion', () => {
        cy.getBySel('nav-link-login').click();
    })

    it('Vérifier existance des champs',() => {
        cy.visit('/#/login');
        cy.getBySel('login-input-username').should('be.visible');
        cy.getBySel('login-input-password').should('be.visible');
        cy.getBySel('login-submit').should('be.visible');
    })

    it('Valider les données dans les champs et se connecter',() => {
        cy.visit('/#/login');
        cy.getBySel('login-input-username').should('be.visible').type('test2@test.fr');
        cy.getBySel('login-input-password').should('be.visible').type('testtest');
        cy.getBySel('login-submit').click();
        cy.getBySel('nav-link-cart').should('be.visible');
    })

     it('Empecher la connexion mauvais identifiants',() => {
        cy.visit('/#/login');
        cy.getBySel('login-input-username').should('be.visible').type('erreur@test.fr');
        cy.getBySel('login-input-password').should('be.visible').type('erreur00');
        cy.getBySel('login-submit').click();
        cy.getBySel('nav-link-cart').should('not.exist');
    })

    // TEST FONCTIONNEL : PANIER //
        
    it.only('acceder aux produits', () => {
       cy.visit("/#/login");
        cy.getBySel('login-input-username').type("test2@test.fr");
        cy.getBySel('login-input-password').type("testtest");
        cy.getBySel('login-submit').click(); 
        cy.wait(8000);
      
        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(2).should('be.visible').click();
        cy.getBySel('detail-product-add').should('be.visible').click();
        cy.getBySel('nav-link-cart').click();
        cy.getBySel('cart-line-name').contains('Poussière de lune').should('be.visible');
        cy.getBySel('nav-link-products').click();
        cy.getBySel('product-link').eq(2).click();
    })
     
 
    // TEST FONCTIONNEL : FAILLE XSS //

    it('faille XSS dans les avis', () => {
       cy.visit("/#/login");
        cy.getBySel("login-input-username").type("test2@test.fr");
        cy.getBySel("login-input-password").type("testtest");
        cy.getBySel("login-submit").click();

        cy.url().should('not.include', '/login');
      
        cy.getBySel("nav-link-reviews").click();

    
        //cy.getBySel('review-input-rating-images').find('span').eq(4).click();
       cy.getBySel("review-input-title").type('<script>alert("XSS");</script>');
       cy.getBySel("review-input-comment").type('Merci beaucoup');
       cy.getBySel("review-submit").click();

       cy.on('window:alert', () => {
    throw new Error('Une fenêtre d\'alerte s\'est affichée !');
     });

    });
    

} 
)



    

    