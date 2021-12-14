const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//Swagger initialization
const swaggerOptions={
  swaggerDefinition:{
      info:{
          title: 'LaunchPrj',
          description: 'LaunchPrj Backend Documentation',
          contact: {
              name: "Oyesters Training",
          },
          servers: [`http://localhost:${port}`]
      }
  },
  apis: ["index.js"]
}

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs-launchprj", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Swagger definition

/**
 * @swagger
 * /register:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Registering user (Just to ease insertion...not final route...)
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Registering student
 *        required: true
 *    responses:
 *      '200':
 *        description: Successfully registered
 *      '400':
 *        description: All inputs are mandatory
 *      '409':
 *        description: User already exist. Please Login
 * 
 */


/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *      - login
 *    summary: Login user
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Login user
 *        required: true
 *        example: {"values":{"user_email_id":"test","user_password":"test"}}
 *    responses:
 *      '200':
 *        description: Successfully registered
 *      '400':
 *        description: Check all credentials
 */

/**
 * @swagger
 * /welcome:
 *  post:
 *    tags:
 *      - home
 *    summary: Home Page
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        description: Login user
 *        required: true
 *    responses:
 *      '200':
 *        description: Successful login
 */




// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});