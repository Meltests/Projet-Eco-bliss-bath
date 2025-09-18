describe('contact page', () => {
   
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

    
} 
)

