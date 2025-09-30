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

      it('Diminution du stock après ajout au panier', () => {
  
        let initialStock;

        cy.connexionCompte();

        
        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(7).click();

        
        cy.getBySel('detail-product-stock').should('be.visible').should(($el) => {
          expect($el.text()).to.match(/\d+/);
        }).invoke('text').then((text) => {
           initialStock = parseInt(text.match(/\d+/)[0], 10);
           expect(initialStock).to.be.greaterThan(1);
          });

        
        cy.getBySel('detail-product-add').click();
        cy.getBySel('nav-link-cart').click();
        cy.getBySel('cart-line-name').contains('Aurore boréale').should('be.visible');

        
        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(7).click();

        
        cy.getBySel('detail-product-stock').should('be.visible').should(($el) => {
          expect($el.text()).to.match(/\d+/);
        }).invoke('text').then((newText) => {
           const newStock = parseInt(newText.match(/\d+/)[0], 10);
           expect(newStock).to.eq(initialStock - 1);
        });
      });




   

      it('ajouter au panier nombre negatif', () => {

        cy.connexionCompte();
      
        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(3).should('be.visible').click();

        cy.getBySel('detail-product-quantity').clear().type(-15);
        cy.getBySel('detail-product-add').click();
        cy.getBySel('cart-line-name').should('not.exist');
      })




      it('ajouter au panier nombre supérieur à 20', () => {

        cy.connexionCompte();
      
        cy.getBySel("nav-link-products").click();
        cy.getBySel('product-link').eq(6).should('be.visible').click();

        cy.getBySel('detail-product-quantity').clear().type(23);
        cy.getBySel('detail-product-add').click();
        cy.wait(3000);
        cy.getBySel('cart-line-name').should('not.exist');
      })

   

    // Ajout produit au panier et vérification appel API//

    it.only('ajoute un produit au panier et vérifier via API', () => {
    
      const productName = 'Poussière de lune';
      cy.intercept('GET', '**/orders').as('getOrders');

      cy.connexionCompte();

      cy.getBySel('nav-link-products').click();
      cy.getBySel('product').contains(productName).parents('[data-cy=product]').within(() => {
          cy.getBySel('product-link').click();
        });

      cy.getBySel('detail-product-add').should('be.enabled').click();
     
    
      cy.getBySel('nav-link-cart').click();
      cy.getBySel('cart-line-name').should('contain', productName);

      // Vérification L'appel API//
    cy.wait('@getOrders').its('response').should((response) => {
      expect(response.statusCode).to.eq(200);

      const lines = response.body.orderLines || [];
      const productAdded = lines.find(line => line.product.name === productName);
      expect(productAdded.product.name).to.eq(productName);

      // Vérifier la quantité disponible //
      expect(productAdded).to.have.property('quantity');
      expect(productAdded.quantity).to.be.greaterThan(0);
    });
    });

 
    // TEST FONCTIONNEL : FAILLE XSS //

    it('faille XSS dans les avis', () => {
        
        cy.connexionCompte();

        cy.url().should('not.include', '/login');
      
        cy.getBySel("nav-link-reviews").click();

       cy.getBySel("review-input-title").type('<script>alert("XSS");</script>');
       cy.getBySel("review-input-comment").type('Merci beaucoup');
       cy.getBySel("review-submit").click();

       cy.on('window:alert', () => {
    throw new Error('Une fenêtre d\'alerte s\'est affichée !');
     });
    });

} 
)



    

    