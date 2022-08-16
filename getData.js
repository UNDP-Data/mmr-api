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
      const dataFiltered = d.data.filter(el => el['sdgs_name/indicator'] === req.query.indicator)
      const dataFormated = []
      dataFiltered.forEach(el => {        
        const periodKeys = Object.keys(el).filter(key => key.includes('rperiod') && key !== 'rperiod/reporting_type' && key !== 'rperiod/reporting_format');
        el.splitindicators?.forEach(si => {
          si['splitindicators/arearepeatsplit'].forEach(area => {
            const keys = Object.keys(area).filter(key => key.includes('reportinglevelssplit'));
            const value = {
              sdg: `SDG ${el.sdg}: ${el.sdgx}`,
              target: `Target ${el.target}: ${el.targetx}`,
              indicator: el['sdgs_name/indicator'],
              reporting_type: el['rperiod/reporting_type'],
              indicator_split: si['splitindicators/indxsplit'],
              area: area['splitindicators/arearepeatsplit/areaxsplit'],
              unit: area['splitindicators/arearepeatsplit/observationssplit/unitsplit'],
            }
            periodKeys?.forEach(key => {
              if(key.split(`/`)[key.split(`/`).length - 1] === 'cyear' || key.split(`/`)[key.split(`/`).length - 1] === 'year')
                value[key.split(`/`)[key.split(`/`).length - 1]] = 2012 + parseInt(el[key], 10);
              else
                value[key.split(`/`)[key.split(`/`).length - 1]] = el[key], 10;
            })
            value.overall_value = area['splitindicators/arearepeatsplit/observationssplit/overallindicatorvaluesplit'];
            keys?.forEach(key => {
              value[key.split(`/`)[key.split(`/`).length - 1]] = area[key]
            })
            dataFormated.push(value)
          })
        })
        el.arearepeat?.forEach(area => {
          const keys = Object.keys(area).filter(key => key.includes('reportinglevels'));
          const value = {
            sdg: `SDG ${el.sdg}: ${el.sdgx}`,
            target: `Target ${el.target}: ${el.targetx}`,
            indicator: el['sdgs_name/indicator'],
            reporting_type: el['rperiod/reporting_type'],
            area: area['arearepeat/areax'],
            unit: area['arearepeat/observations/unit'],
          }
          periodKeys?.forEach(key => {
            if(key.split(`/`)[key.split(`/`).length - 1] === 'cyear' || key.split(`/`)[key.split(`/`).length - 1] === 'year')
              value[key.split(`/`)[key.split(`/`).length - 1]] = 2012 + parseInt(el[key], 10);
            else
              value[key.split(`/`)[key.split(`/`).length - 1]] = el[key], 10;
          })
          value.overall_value = area['arearepeat/observations/overallindicatorvalue'];
          keys?.forEach(key => {
            value[key.split(`/`)[key.split(`/`).length - 1]] = area[key]
          })
          dataFormated.push(value)
        })
      })
      res.json(dataFormated);          
    })
    .catch((error) => res.json({ error: error.message }));
});

module.exports = router;