var express = require("express");
var router = express.Router();
const axios = require("axios");

require("dotenv").config();

router.get("/", function (req, res, next) {
    const id = req.query.id;
    axios
    .get(`https://kobo.humanitarianresponse.info/assets/${id}/submissions/?format=json`, {
      headers: {
        Authorization: `Token ${process.env.token}`,
      },
    })
    .then((d) => {
      res.json(d.data);          
    })
    .catch((error) => res.json({ error: error.message }));
});
module.exports = router;