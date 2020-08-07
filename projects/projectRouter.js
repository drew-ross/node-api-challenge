const express = require('express');

const projectModel = require('../data/helpers/projectModel');

const router = express.Router();

//Middleware

//Endpoints
router.get('/', (req, res) => {
  projectModel.get()
    .then(projects => res.status(200).json(projects))
    .catch(error => res.status(500).json({ message: 'There was an issue getting the projects', error }));
});

module.exports = router;