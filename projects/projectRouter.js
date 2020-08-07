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

const validateProject = (req, res, next) => {
  const { name, description } = req.body;
  if (name, description) {
    next();
  } else {
    res.status(400).json({ message: "Please include name and description fields." });
  }
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

router.post('/', validateProject, (req, res) => {
  projectModel.insert(req.body)
    .then(newProject => res.status(201).json(newProject))
    .catch(error => res.status(500).json({ message: "There was a problem creating the project.", error }));
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  projectModel.update(req.params.id, req.body)
    .then(updatedProject => res.status(200).json(updatedProject))
    .catch(error => res.status(500).json({ message: "There was a problem updating the project.", error }));
});


module.exports = router;