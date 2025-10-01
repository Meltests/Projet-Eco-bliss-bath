describe('smoke test', () => {
   
    //Partie 1 du Smoke test : Vérifier la présence des champs et boutons de connexion//
    beforeEach(() => {
    cy.visit('/#/login');
  });
    
    it('consulter la page de connexion', () => {
        cy.getBySel('nav-link-login').click();
    })

    it('Vérifier existance des champs',() => { 
        cy.getBySel('login-input-username').should('be.visible');
        cy.getBySel('login-input-password').should('be.visible');
        cy.getBySel('login-submit').should('be.visible');
    })



    //Partie 2 du Smoke test : Vérifier la présence du bouton d’ajout au panier après connexion //

  it('Présence du bouton panier après connexion',() => {
        cy.getBySel('login-input-username').should('be.visible').type('test2@test.fr');
        cy.getBySel('login-input-password').should('be.visible').type('testtest');
        cy.getBySel('login-submit').click();
        cy.getBySel('nav-link-cart').should('be.visible');
    })


      // FAILLE XSS //

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
