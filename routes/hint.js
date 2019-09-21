var express = require('express');
var router = express.Router();

let hints = new Map(
  [
    ["Hund", "Ein Hund ist da um einen zu mögen."],
    ["Katze", "Eine Katze ist da um gemocht zu werden."]
  ]
);

/* Shows pieces of information to a given hint. */
router.post('/', (req, res) => {
  res.render('hint', { title: 'Hinweis', hint: hints.get(req.body.hint) || "Dieser Hinweis existiert nicht" });
});

module.exports = router;
