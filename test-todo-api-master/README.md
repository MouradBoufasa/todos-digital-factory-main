
# FACTORY DIGITALE TEST
[![Factory digitale logo](assets/logo.svg)](https://factorydigitale.tech/)
## TODOs API
Ce projet est l'api à utiliser pour le test de récrutement de developpeurs front de factory digitale.
l'api en question offre un ensemble de enpoints pour permettre la construction de l'application de gestion des Todos celon les spécifications définis au niveau du test.
## Installation 
le server d'api requiert [Node.js](https://nodejs.org/) pour fonctionner
Importer le projet, installer les dépendances, puis lancer le server en local:
```sh
cd TEST-TODO-API
npm i
npm start
```
L'api sera accéssible depuis le port 3001
Le numéro du port peut étre changé, via le fichier server.js
## FEATURES 
Dans ce qui suit, la description de l'ensemble des fonctionnalités offertes par l'api permettant de répondre aux specifications du test.
Ne pas hésiter à tester les endpoints avec des clients http telque  [postman](https://www.postman.com/downloads/) par exemple.

### GESTION DE L’AUTHENTIFICATION: 
L’api comporte 10 utilisateurs:

- Pour simuler l’authentification, envoyer l’a requête:
GET  ```http://localhost:3000/authentification?email=user1@gmail.com ```
    - Le query param email contient l’email de l’utilisateur qui désire se connecter
    - En réponse, on reçoit :
        - Un tableau contenant un objet  qui renferme  l’email ainsi que le id du user id qui permet de récupérer ses todos
        ```[{"id": 1, "email": "user1@gmail.com"}]```
- Pour consulter la list des utilisateurs existants au niveau de l’application, :
    - Requête GET ```http://localhost:3000/authentification```
    - En réponse, un tableau d’objet contenant les deux attributs email et id:
        ``` [ { "id": 1, "email": "user1@gmail.com" },  { "id": 2, "email": "user2@gmail.com" }] ```
- Pour ajouter un nouvelle utilisateur:
    - Requête POST ```http://localhost:3000/authentification```
        - Le body de la requête devra contenir l’email uniquement 
        - le id de l’utilisateur: id, est généré automatiquement par l’api
        - En cas de succès de création une réponse avec un status 201 vous sera envoyé avec comme body l’objet créer: ``` { "id": 22, "email": "user22@gmail.com" } ```

### GESTION DES TODOS: 
Chaque utilisateurs possède des todos (20 par utilisateurs à l'initialisation)
- l’api permet de récupérer l’ensemble tes todos d’un utilisateur, de créer un todo pour un utilisateur, de modifier et de supprimer un todo
- Pour récupérer la liste des todos d’un utilisateur:
    - GET ```http://localhost:3000/todos?userId= {userid} ```, ou userid est le id de l’utilisateur :
        - Exemple: ```http://localhost:3000/todos?userId=2```
- Pour ajouter un todo pour un utilisateur donné:
    - POST ``` http://localhost:3000/todos ```
        - Le body de la requête POST devra contenir l’objet todo à ajouter:
            - Exemple: ``` { "userId": 1, "title": "todo", "completed": false, "endDate": "05/01/2023", "pos": 1, "description": "call the client" } ```
            - userId: le id de l’utilisateur ayant créé la todo (int)
            - title: le titre de la todo (string)
            - description: la description de la todo (string)
            - endDate: la date d’échange pour la réalisation de la todo (date)
            - completed: attribut boolean qui définit si un todo a été réalisé ou pas (boolean)
            - pos: attribut qui définit l’ordre d’affichage du todo (int)
        - Le id de la todo est généré automatiquement par l’api et retourné dans la réponse du POST:
            - Exemple: ```{  "userId": 1, "title": "todo", "completed": false, "endDate": "05/01/2023", "pos": 1, "description": "call the client" , "id": 201 } ```
- Pour modifier une partie des informations d’un todo
    - PATCH ``` http://localhost:3000/todos/:id ``` ou id est l'identifiant de la todo à modifier
        - Exemple: http://localhost:3000/todos/201
    - Dans le body, mettre les attributs à modifier avec leurs  nouvelles valeurs:
        - Exemple: mise à jour de l’attribut completed ``` {"completed": true} ```
    - En cas de succès, status 200,  la réponse retourne un objet contenant le todo modifié
- Pour supprimer un todo:
    - DELETE ``` http://localhost:3000/todos/:id ``` ou id est le id du todo à supprimer:
        - Exemple: http://localhost:3000/todos/201
        - En cas de succès, status 200, un objet vide est retourné 

### GESTION DES NESTED TODOS (TODOS IMBRIQUES)
Chaque todo peut avoir une liste de todos imbriqués
- Creer un todo imbriqué d’un todo donné:
    - POST ```http://localhost:3000/nestedTodos```
    - Le body de la requête contient les informations du nested  todo
        - Exemple: ```{ "todoId": 1, "title": "delectus aut autem", "description": "quis ut nam facilis et officia qui", "completed": true, "endDate": "25/10/2021"}```
        - todoId: le id du todo parent (auquel on veut ajouter le nested todo) (int)
        - title: le titre du nested todo (string)
        - description: la description du nested l todo (string)
        - endDate: la date d’échange pour la réalisation de la todo (date)
        - Completed: attribut boolean qui définit si un todo a été réalisé ou pas (boolean)
    - le id du nested todo est généré par l’api lors de la création, et retourné dans la réponse du POST en cas de succès : ```{ "todoId": 1, "title": "delectus aut autem", "description": "quis ut nam facilis et officia qui", "completed": true, "endDate": "25/10/2021", "id": 16 }```
- Récupérer l’ensemble des nested todos d’un todo:
    - GET ```http://localhost:3000/nestedTodos?todoId= {id}``` ou id est l’identifiant du todo (le todo parent) dont on veut récupérer les nested todos
        - Exemple: ```http://localhost:3000/nestedTodos?todoId=1```
    - En cas de succès (status 200), la requête retourne un tableau contenant les nested todos:
        - Exemple: ```[ { "todoId": 1, "id": 1, "title": "delectus aut autem", "description": "quis ut nam facilis et officia qui", "completed": false, "endDate": "05/01/2023" } ]```
- Pour modifier une partie des informations d’un nested todo
    - PATCH ```http://localhost:3000/nestedTodo/:id```  ou id est le id du nested todo à modifier
        - Exemple: ```http://localhost:3000/nestedTodos/1```
    - Dans le body, mettre les attributs à modifier avec leurs  nouvelles valeurs:
        - Exemple: mise à jour de l’attribut completed ```{"completed": true}```
    - En cas de succès, status 200,  la réponse retourne un objet contenant le nested todo modifié
- Pour supprimer un nested todo:
    - DELETE ```http://localhost:3000/nestedTodos/:id```  ou id est le id du nested todo à supprimer:
        - Exemple: ```http://localhost:3000/nestedTodos/201```
        - En cas de succès, status 200, un objet vide est retourné 
 
