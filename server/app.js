const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { mongodbURI } = require("./config");
const loginRoutes = require("./routes/loginRoutes");
const jwt = require("jsonwebtoken");
const app = express();
// allow cross-origin requests
// app.use(cors());
// app.use('/', express.static(path.join(__dirname, '../client/public')))
// app.use('/static', express.static('../client/public'))
console.log("path is ", __dirname);
app.use("/login", loginRoutes);
// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect(mongodbURI);
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});
// app.use('/',(req,res,next)=>res.send())
const SECRET = "somesuperdupersecret"
// const authMiddleware = jwt({
//   secret: "somesuperdupersecret"
// });
const authMiddleware = async (req) => {
  // const token = req.headers.authorization;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZmtAZ2RtYWlsLmNvbSIsImlhdCI6MTU0OTA4MjQzMywiZXhwIjoxNTgwNjQwMDMzfQ.-umfJM9vYCNPN-MK8nOYyYQxR8EltfiebsOdMlUzYvk"
  try {
    const  user  = await jwt.verify(token, SECRET);
    user ? console.log('in app user is ',user): console.log('user is not present')
    req.user = user;
  } catch (err) {
    console.log('I am error ',err);
  }
  req.next();
};

// app.use(authMiddleware)
// bind express with graphql
app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP((req,res) => ({
    schema,
    graphiql: true,
    context: {
      // models,
      SECRET,
      user: req.user,
      res
    },
  }))
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
