describe('Test API GET / POST ', () => {

    const apiOrders = `${Cypress.env("apiUrl")}/orders`;

      //GET orders sans être connecté// 
    describe('Tester API Methode GET', () => {
        it('Impossible de récupérer les orders sans être authentifié', () => {
         cy.request({
            method: "GET", 
            url: apiOrders, 
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(403);
         }); 
        });
    });

    
    //GET retourner la liste des produits qui sont dans panier en étant connecté// 
        let token = null 
     
       it('Récupération du token pour récupérer les elements du panier', () => {

 
            cy.request('POST', 'http://localhost:8081/login', {
            username: "test2@test.fr",
            password: "testtest"
             }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('token');
            token = response.body.token; 
            window.localStorage.setItem('user', token); //je récupére les valeurs du token sur le site//
         });
        });

        //

        it('Requête elements du panier quand on est connecté', () => {
            cy.request({
            method: 'GET',
            url: 'http://localhost:8081/orders',
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            expect(response.status).to.eq(200);
         });
        });


   
        it('Requête un element spécifique de la liste des produits', () => {
            cy.request({
            method: 'GET',
            url: 'http://localhost:8081/products/4', 
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', 4)
            })
        })
        
} 
)