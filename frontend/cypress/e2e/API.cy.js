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
                window.localStorage.setItem('user', token);
            });
        });



        it('Requête elements du panier quand on est connecté', () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8081/orders',
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('orderLines');
            expect(response.body.orderLines).to.be.an('array');   
            
            response.body.orderLines.forEach(line => {
            expect(line).to.have.property('product');
            expect(line.product).to.have.property('id').that.is.a('number');
            expect(line.product).to.have.property('name').that.is.a('string');
            expect(line.product).to.have.property('price').that.is.a('number');
            expect(line).to.have.property('quantity').that.is.a('number');
            }); 
         
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




    // PARTIE 2 : METHODE POST // 
    it('Se connecte avec utilisateur inconnu', () => {
        cy.request({
            method: "POST", 
            url: "http://localhost:8081/login", 
            body : {
                username:'erreur@gmail.com', 
                password: 'erreur00',
            },
            failOnStatusCode: false,
        }).then((response => {
            expect(response.status).to.eq(401);
        }))
    })

    

    it.only('Se connecte avec utilisateur connu', () => {
        cy.request({
            method: "POST", 
            url: "http://localhost:8081/login", 
            body : {
            username:'test2@test.fr', 
            password: 'testtest',
            },
        }).then((response => {
            expect(response.status).to.eq(200);
        })) 
    })



    it.only('Ajouter produit en stock dans panier', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/orders/add', 
            headers: { Authorization: `Bearer ${token}` },
            body: {
                productId: 9, 
                qualtity : 1,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })


    it('Ajouter produit en rupture', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/orders/add', 
            headers: { Authorization: `Bearer ${token}` },
            body: {
                productId: 7, 
                qualtity : 1,
            }
        }).then((response) => {
            expect(response.status).to.eq(['404', '400']);
        })
    })
    
    
    
    it('ajouter un avis', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/reviews', 
            headers: { Authorization: `Bearer ${token}` },
            body: {
                title: 'bravo',
                comment: 'beau travail',
                rating: 5,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('title', 'bravo'); 
            expect(response.body).to.have.property('comment', "beau travail");
            expect(response.body).to.have.property('rating', 5);
        })
    })
} 
)

