const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dbConnection = require("./config/dbConnection");
const { graphqlHTTP } = require("express-graphql");
const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");

// mongoDB connection
dbConnection();

// express app
const app = express();

// apply cors middleware
app.use(cors());

// apply morgan middleware in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// apply graphql middleware
app.use("/graphql", graphqlHTTP({
  schema: typeDefs,
  rootValue: resolvers,
  graphiql: true
}))

// app.get("/", (req, res) => {
//   res.send("Hello World");
// })

// server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App listening on port: ${port}`.yellow.underline.bold)
  console.log(`Mode: ${process.env.NODE_ENV ? process.env.NODE_ENV : "Not Specified"}`.magenta.underline.bold)
})

// unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error --> ${err.name} : ${err.message}`.bgRed.underline.bold)
  server.close(() => { 
      console.error("Shutting down App ...".red.underline.bold)
      process.exit(1)
  })
})