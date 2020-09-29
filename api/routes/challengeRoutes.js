const express = require('express');
const challengeController = require('./../controllers/challengeController');

const router = express.Router();


router
  .route('/')
  .get(challengeController.getAllChallenges)
  .post(challengeController.createChallenge);

router
  .route('/:id')
  .get(challengeController.getChallenge)
  .patch(challengeController.updateChallenge)
  .delete(challengeController.deleteChallenge);

module.exports = router;