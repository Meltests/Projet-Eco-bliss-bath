<div align="center">

# OpenClassrooms - Eco-Bliss-Bath - Test automatisé Cypress
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

### Description du projet ###

Eco Bliss Bath est une start-up e-commerce spécialisée dans les produits 
de beauté éco-responsables, avec comme produit principal; le savon solide.  
Ce projet a pour but d'automatiser les tests suivants : 
- Tests d'API (Back-end)
- Smoke Tests
- Tests fonctionnels (front-end) 


### Prérequis ### 
Pour démarrer ce site, il faut les outils suivants:
- Docker
- NodeJs


### Installation et démarrage ### 
Clonez le projet pour le récupérer

1. Se rendre sur le terminal 
2. Faire cette commande : git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2

# Pour démarrer l'API #
1. docker compose up -d
2. docker compose down (pour l'arrêter)

# Pour démarrer le frontend #
1. Ouvrir le terminal
2. Acceder au dossier contenant le front-end du site: cd ./frontend
3. Installer les dépendances du projet : 

-npm i ou npm install (si vous préférez)
- npm start (pour le lancer)
- CTRL + C (pour arrêter)


# Installation et démarrage de Cypress #

1. Se rendre sur le chemin du front-end dans le terminal 
2. lancer la commande : npm install cypress --save-dev (pour l'installer)
3. npx cypress open (pour démarrer avec l'interface cypress)
4. npx cypress run (pour lancer les tests en mode headless). 
5. Configurer le E2e testing pour exécuter les tests.



### Usage ### 

Les tests sont exécutés via ces fichiers : 

- Api.cy.js : Tests des différents End-points
- Smoketest.cy.js : Tests de vérification de champs. 
- testsfonctionnels.cy.js : Test connexion et panier

### Support ### 

Le projet a été réalisé dans le cadre de la formation OpenClassrooms. 



