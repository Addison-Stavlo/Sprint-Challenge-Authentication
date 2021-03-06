const axios = require("axios");
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const { authenticate, generateToken } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const userInfo = req.body;
  userInfo.password = bcrypt.hashSync(userInfo.password, 12);

  db("users")
    .insert(userInfo)
    .then(ids => {
      db("users")
        .where({ username: userInfo.username })
        .first()
        .then(user => {
          let token = generateToken(user);
          res.status(201).json({ message: `user created`, token });
        });
    })
    .catch(err => res.status(500).json({ error: err }));
}

function login(req, res) {
  // implement user login
  db("users")
    .where({ username: req.body.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = generateToken(user);
        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: `YOU SHALL NOT... pass...` });
      }
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
