describe('Test API GET / POST ', () => {

    const apiOrders = `${Cypress.env("apiUrl")}/orders`;
    const apiLogin = `${Cypress.env("apiUrl")}/login`;
    const apiProducts = `${Cypress.env("apiUrl")}/products`;
    const apiReviews =  `${Cypress.env("apiUrl")}/reviews`;
    const apiOrdersAdd = `${apiOrders}/add`;


      //GET orders sans être connecté// 
    describe('Tester API Methode GET', () => {
        it('Impossible de récupérer les orders sans être authentifié', () => {
         cy.request({
            method: "GET", 
            url: apiOrders, 
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(401);
         }); 
        });
    });

    
    //GET retourner la liste des produits qui sont dans panier en étant connecté// 
        let token 
     
       it('Récupération du token pour récupérer les elements du panier', () => {

 
            cy.request('POST', apiLogin, {
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
                url: apiOrders,
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
                url: apiLogin, 
                body : {
                    username:'erreur@gmail.com', 
                    password: 'erreur00',
                },
                failOnStatusCode: false,
            }).then((response => {
                expect(response.status).to.eq(401);
            }))
        })

        

        it('Se connecte avec utilisateur connu', () => {
            cy.request({
                method: "POST", 
                url: apiLogin, 
                body : {
                username:'test2@test.fr', 
                password: 'testtest',
                },
            }).then((response => {
                expect(response.status).to.eq(200);
            })) 
        })



        it('Ajouter produit en stock dans panier', () => {
            cy.request({
                method: 'POST',
                url: apiOrdersAdd, 
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    productId: 5, 
                    qualtity : 1,
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })


        it('Ajouter produit en rupture', () => {
            cy.request({
                method: 'POST',
                url: apiOrdersAdd, 
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    productId: 7, 
                    qualtity : 1,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(['404', '400']);
            })
        })
        
        
        // Méthode PUT //

       it('Ajouter produit en stock dans panier avec méthode PUT', () => {
            cy.request({
                method: 'PUT',
                url: apiOrdersAdd,
                headers: { Authorization: `Bearer ${token}` },
                body: {
                product: 5,      
                quantity: 1
                }
            }).then((response) => {
                expect([200, 201]).to.include(response.status);
            });
        });



       it('Ajouter produit en rupture avec méthode PUT', () => {
            cy.request({
                method: 'PUT', 
                url: apiOrdersAdd,
                headers: { Authorization: `Bearer ${token}` },
                body: {
                product: 7,   
                quantity: 1
                },
                failOnStatusCode: false  
            }).then((response) => {
                expect([400, 404]).to.include(response.status);
            });
        });




    
    
        it('ajouter un avis', () => {
            cy.request({
                method: 'POST',
                url: apiReviews, 
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

