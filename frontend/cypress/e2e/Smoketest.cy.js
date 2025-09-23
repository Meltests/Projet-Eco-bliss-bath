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
} 
)
