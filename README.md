Repository du front-end de Twister

## Projet

Twister est un mini réseau social copié à l'identique sur Twitter, dans le but d'élargir mes compétences sur une stack MERN (Mongo, Express, React, Node).
L'ensemble des fonctionnalités présentes dessus sont prises de Twitter.
Ce projet n'est pas à but lucratif, et n'est en aucun cas affilié à Twitter.
En cas de questions, suggestions ou remarques, merci de me contacter par mail : marc_charpentier@hotmail.fr

### Lancer le projet

- npm install, pour installer les dépendences
- npm start, pour lancer le serveur et le client
- Se rendre sur http://localhost:3000

### Fonctionnalités

Un utilisateur peut :

- s'inscrire<br/>
- se connecter<br/>
- écrire un tweet<br/>
- suivre des personnes<br/>
- modifier sa biographie, son nom, sa photo de profil et sa bannière<br/>
- retweeter des tweets<br/>
- liker des tweets<br/>
- protéger ses tweets<br/>
- épingler un de ses tweets<br/>
- suppimer un de ses tweets<br/>
- consulter des suggestions de personnes à suivre<br/>
- consulter des pages statiques (A propos, Contact...)<br/>

(A venir :

- échanger des messages privés avec une autre personne<br/>
- supprimer son compte<br/>
- voir les messages likés d'un autre utilisateur<br/>
- créer des listes d'utilisateurs<br/>
- consulter les Trending Topics<br/>
  )

#### Langages

Javascript<br/>
Front-end : React, Redux, MaterializeCSS<br/>
Back-end : NodeJS, ExpressJS<br/>
ORM : Mongoose<br/>
Base de données : MongoDB (Atlas pour le Cloud, Compass pour l'interface graphique)<br/>

#### Packages notables

axios, pour les requêtes HTTP<br/>
bcryptjs, pour le cryptage de mots de passe<br/>
cors, pour l'autorisation de partages de ressource entre divers domaines<br/>
helmet, pour l'utilisation de middlewares préconçus pour la sécurité du backend<br/>
morgan, pour des logs concis à chaque requête effectuée au back-end<br/>
moment, pour le formattage des dates<br/>
react-redux, redux & redux-thunk, pour la gestion du state global de l'application<br/>
socket.io & socket.io-client, pour l'utilisation de web sockets<br/>
validator, pour la vérification du contenu des données des formulaires<br/>
