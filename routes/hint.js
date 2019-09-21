const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const hints = require('../includes/hints.json').hints;

const hashedHintToContent = new Map();
const knownHints = new Set();

for (hint of hints) {
  const hasher = crypto.createHash('sha256');
  hasher.update(hint.hint);

  hashedHintToContent.set(hasher.digest('hex'), hint.content);
  knownHints.add(hint.hint);
}

/* Shows pieces of information to a given hint. */
router.get('/:hintHash', (req, res) => {
  let hintHash = req.params.hintHash;

  // if no hint is supplied, prompt the user to enter one
  if (hintHash === void 0) {
    res.redirect('/');
    return;
  }

  hintHash = String(hintHash).trim();

  res.render('hint', {
    title: 'Hinweis',
    hint: hashedHintToContent.get(hintHash) || "Dieser Hinweis existiert nicht"
  });
});

router.post('/', (req, res) => {
  // if no hint is given, prompt the user to enter one
  if (req.body.hint === void 0) {
    res.redirect('/');
    return;
  }

  const hint = req.body.hint;

  // transform hint to a code
  if (!hashedHintToContent.has(hint) && knownHints.has(hint)) {
    const hasher = crypto.createHash('sha256');
    res.redirect(302, `/hint/${hasher.update(hint).digest('hex')}`);
    return;
  }

  // invalid code given, redirect the user to give one again
  res.redirect('/');
});

// forward get requests to the input screen
router.get('/', (req, res) => res.redirect('/'));

module.exports = router;
