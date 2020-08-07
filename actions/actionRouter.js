const express = require('express');

const actionModel = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel');

const router = express.Router();

//Middleware
const validateActionId = (req, res, next) => {
  actionModel.get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: `We couldn't find an action with that ID.` });
      }
    })
    .catch(error => res.status(500).json({ message: 'There was an issue getting the project', error }));
};

const validateAction = (req, res, next) => {
  const { description, notes } = req.body;
  if (notes && description) {
    req.body.project_id = req.project.id;
    next();
  } else {
    res.status(400).json({ message: 'Please include notes and description fields.' });
  }
};

//Endpoints
router.get('/', (req, res) => {
  projectModel.getProjectActions(req.project.id)
    .then(actions => res.status(200).json(actions))
    .catch(error => res.status(500).json({ message: 'There was an issue getting the actions', error }));
});

router.post('/', validateAction, (req, res) => {
  actionModel.insert(req.body)
    .then(newAction => res.status(200).json(newAction))
    .catch(error => res.status(500).json({ message: 'There was an issue creating the action', error }));
});

module.exports = router;