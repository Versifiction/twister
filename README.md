## Projet

Twister est un mini réseau social copié à l'identique sur Twitter, dans le but d'élargir mes compétences sur une stack MERN (Mongo, Express, React, Node).
L'ensemble des fonctionnalités présentes dessus sont prises de Twitter.
Ce projet n'est pas à but lucratif, et n'est en aucun cas affilié à Twitter.
En cas de questions, suggestions ou remarques, merci de me contacter par mail : marc_charpentier@hotmail.fr

### Lancer le projet

- npm install, pour installer les dépendences
- npm start, pour lancer le serveur et le client
- Se rendre sur http://localhost:3000

### Technologies utilisées

#### Langages

Javascript
Front-end : React, Redux, MaterializeCSS
Back-end : NodeJS, ExpressJS
ORM : Mongoose
Base de données : MongoDB (Atlas pour le Cloud, Compass pour l'interface graphique)

#### Packages notables

axios, pour les requêtes HTTP
bcryptjs, pour le cryptage de mots de passe
cors, pour l'autorisation de partages de ressource entre divers domaines
helmet, pour l'utilisation de middlewares préconçus pour la sécurité du backend
morgan, pour des logs concis à chaque requête effectuée au back-end
moment, pour le formattage des dates
react-redux, redux & redux-thunk, pour la gestion du state global de l'application
socket.io & socket.io-client, pour l'utilisation de web sockets
validator, pour la vérification du contenu des données des formulaires
