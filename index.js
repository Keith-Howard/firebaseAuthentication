const express = require("express");
const admin = require("./admin");
const PORT = 8080;
const app = express();

// Serve static files
app.use(express.static("public"));

//Open route
app.get("/open", (req, res) => res.send("Open Route"));

//Authenticated route
app.get("/auth", (req, res) => {
  const idToken = req.headers.authorization;
  console.log("header:", idToken);

  //Verify token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      console.log("decoded token:", decodedToken);
      res.send("Authentication success");
    })
    .catch((e) => {
      console.log("error:", e);
      res.send("Authentication failed");
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
