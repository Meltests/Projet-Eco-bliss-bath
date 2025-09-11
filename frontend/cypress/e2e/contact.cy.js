describe('contact page', () => {
   
    beforeEach(() => {
    cy.visit('http://localhost:4200');
  });
    
    it('consulter la page de connexion', () => {
        cy.get('[data-cy="nav-link-login"]').click();
    })

    it('Vérifier existance des champs',() => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').should('be.visible');
        cy.get('[data-cy="login-input-password"]').should('be.visible');
    })

    it('Valider les données dans les champs et se connecter',() => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').should('be.visible').type('test2@test.fr');
        cy.get('[data-cy="login-input-password"]').should('be.visible').type('testtest');
        cy.get('[data-cy="login-submit"]').click();
        cy.get('[data-cy="nav-link-cart"]').should('be.visible');
    })

     it('Empecher la connexion mauvais identifiants',() => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').should('be.visible').type('erreur@test.fr');
        cy.get('[data-cy="login-input-password"]').should('be.visible').type('erreur00');
        cy.get('[data-cy="login-submit"]').click();
        cy.get('[data-cy="nav-link-cart"]').should('not.exist');
    })
} 
)
