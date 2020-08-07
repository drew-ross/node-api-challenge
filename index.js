const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./projects/projectRouter');

const server = express();

server.use(helmet());
server.use(express.json());


server.use('/projects', projectRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: "API running." });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});