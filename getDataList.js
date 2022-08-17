const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

router.get("/", function (req, res, next) {
    const id = process.env.surveyid;
    axios
    .get(`https://kobo.humanitarianresponse.info/assets/${id}/submissions/?format=json`, {
      headers: {
        Authorization: `Token ${process.env.token}`,
      },
    })
    .then((d) => {
      const indicatorList = [... new Set(d.data.map(el => el['sdgs_name/indicator']))]
      res.json(indicatorList);          
    })
    .catch((error) => res.json({ error: error.message }));
});

module.exports = router;