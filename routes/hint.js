var express = require('express');
var router = express.Router();

let hints = new Map();
hints.set("Hund", "Ein Hunde ist da um einen zu mögen.");
hints.set("Katze", "Eine Katze ist da um gemocht zu werden.");

/* GET hint information. */
//TODO: use POST
router.get('/', function(req, res, next) {
  var queryHint = req.query.hint;
  console.log(req.query);

  var hint = "Der Hinweis existiert nicht!";
  if (hints.has(queryHint)) {
    hint = hints.get(queryHint);
  }
  res.render('hint', { title: 'Hinweis' , hint: hint});
});

module.exports = router;
