const express = require('express');

const projectModel = require('../data/helpers/projectModel');

const router = express.Router();

//Middleware
const validateProjectId = (req, res, next) => {
  projectModel.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: `We couldn't find a project with that ID.` });
      }
    })
    .catch(error => res.status(500).json({ message: 'There was an issue getting the project', error }));
};
//Endpoints
router.get('/', (req, res) => {
  projectModel.get()
    .then(projects => res.status(200).json(projects))
    .catch(error => res.status(500).json({ message: 'There was an issue getting the projects', error }));
});

router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});


module.exports = router;