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

      it.only('vérifier changement stock après mise au panier', () => {
        let stockavant;
        let stockapres;

        cy.intercept('POST', '**/login').as('connexion');
        cy.visit("/#/login");
        cy.getBySel('login-input-username').type("test2@test.fr");
        cy.getBySel('login-input-password').type("testtest");
        cy.getBySel('login-submit').click(); 
        cy.wait('@connexion');

        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(2).should('be.visible').click();

        cy.getBySel('detail-product-stock').invoke('text').then((text) => {
          stockavant = Number(text.split(" ")[0]);
        });

        cy.getBySel('detail-product-add').should('be.visible').click();
        cy.getBySel('nav-link-cart').click();
        cy.getBySel('cart-line-name').contains('Poussière de lune').should('be.visible');
        cy.getBySel('nav-link-products').click();
        cy.getBySel('product-link').eq(2).click();

        cy.getBySel('detail-product-stock').invoke('text').then((text) => {
          stockapres = Number(text.split(" ")[0]); 
          expect(stockapres).to.be.lessThan(stockavant);   
          //expect(stockapres < stockavant);
        });
    
      });





      it('ajouter au panier nombre negatif', () => {

        cy.intercept('POST', '**/login').as('connexion');
        cy.visit("/#/login");
        cy.getBySel('login-input-username').type("test2@test.fr");
        cy.getBySel('login-input-password').type("testtest");
        cy.getBySel('login-submit').click(); 
        cy.wait('@connexion');
      
        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(3).should('be.visible').click();

        cy.getBySel('detail-product-quantity').clear().type(-15);
        cy.getBySel('detail-product-add').click();
        cy.getBySel('cart-line-name').should('not.exist');
      })


      it('ajouter au panier nombre supérieur à 20', () => {

        cy.intercept('POST', '**/login').as('connexion');
        cy.visit("/#/login");
        cy.getBySel('login-input-username').type("test2@test.fr");
        cy.getBySel('login-input-password').type("testtest");
        cy.getBySel('login-submit').click(); 
        cy.wait('@connexion');
      
        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(6).should('be.visible').click();

        cy.getBySel('detail-product-quantity').clear().type(23);
        cy.getBySel('detail-product-add').click();
        cy.wait(3000);
        cy.getBySel('cart-line-name').should('not.exist');
      })


      it('Ajoutez un élément au panier', () => {

        cy.intercept('POST', '**/login').as('connexion');
        cy.visit("/#/login");
        cy.getBySel('login-input-username').type("test2@test.fr");
        cy.getBySel('login-input-password').type("testtest");
        cy.getBySel('login-submit').click(); 
        cy.wait('@connexion');

        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(6).should('be.visible').click();

        cy.intercept('GET', '**/orders').as('panier');
        cy.getBySel('detail-product-add').click();
        cy.wait('@panier').then((interceptionPanier) => {
          cy.expect(interceptionPanier.response.statusCode).to.be(200);
         // cy.expect(interceptionPanier.response.body).should.have.property('')
        
        })
      })



 
    // TEST FONCTIONNEL : FAILLE XSS //

    it('faille XSS dans les avis', () => {
       cy.visit("/#/login");
        cy.getBySel("login-input-username").type("test2@test.fr");
        cy.getBySel("login-input-password").type("testtest");
        cy.getBySel("login-submit").click();

        cy.url().should('not.include', '/login');
      
        cy.getBySel("nav-link-reviews").click();

    
      //cy.getBySel('review-input-rating-images')
       cy.getBySel("review-input-title").type('<script>alert("XSS");</script>');
       cy.getBySel("review-input-comment").type('Merci beaucoup');
       cy.getBySel("review-submit").click();

       cy.on('window:alert', () => {
    throw new Error('Une fenêtre d\'alerte s\'est affichée !');
     });

    });
    

} 
)



    

    