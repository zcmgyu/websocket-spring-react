## Spring Boot Websocket + React: user notifications with web socket ##

This example will shows how to send notifications, via web socket, to specific logged-in users (definded by access_token).

Could be useful, for example, if you are trying to implement a real-time user notification system with ReactJS.

### Build and run

#### Configurations
1. Backend
Open the `application.properties` file in *websocket-spring* and set your own database (in my case I'm using MongoDB). You can change User collect to Entity and repository like your project.

#### Prerequisites

- Java 8
- Maven > 3.0

#### From terminal
1. Start mongodb database
    ```
    $ mongod
    ```
2. Go on the project's *websocket-spring* folder, then type:
    ```
    $ mvn spring-boot:run
    ```
3. Go on project:s *websocket-react* folder, then type:
    ```
    $ npm install
    $ npm start
    ```
    or
    ```
    $ yarn install
    $ yarn start
    ```
    
### Usage

- Launch the application and login into it with one of the following credentials (Username / Password):
    * user1 / user1
    * user2 / user2

- Keep a window open on the index and login by user1
- Open a new private/incognito windows of your web browser and login with *user2*
- From this web browser specify *target user* and click the button to send a fake action: **target user** will be notified.
