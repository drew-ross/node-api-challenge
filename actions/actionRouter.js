const express = require('express');

const actionModel = require('../data/helpers/actionModel');

const router = express.Router();

//Middleware

//Endpoints
router.get('/', (req, res) => {
  actionModel.get()
    .then(actions => res.status(200).json(actions))
    .catch(error => res.status(500).json({ message: 'There was an issue getting the actions', error }));
});

module.exports = router;