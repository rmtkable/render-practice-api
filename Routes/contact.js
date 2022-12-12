const router = require("express").Router();
let Contact = require("../Models/ContactSchema");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;


  const newContact = new Contact({
    name,
    email,
    message,
  });
  newContact
    .save()
    .then(() => {
      console.log(req.body);
      res.json("Contact Added");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
