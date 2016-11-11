var express = require('express');
var router = express.Router();

var dockerCLI = require('docker-cli-js');
var Docker = dockerCLI.Docker;
var docker = new Docker();

var hostURL = process.env.HOST_URL;
var hostStorageDir = process.env.USER_STORAGE;
var userNickname = 'osobh';
var notebookStorageDir = '/home/jovyan/work';
var notebookPort = 8902;
var hostPort = 8888;
var containerImage = 'jupyter/datascience-notebook';
var launchContainerCommand = `run -d -v /${hostStorageDir}/${userNickname}:${notebookStorageDir} -e GRANT_SUDO=yes -p ${notebookPort}:${hostPort} ${containerImage}`;

router.get('/', function(req, res){
  docker.command(launchContainerCommand).then(function (data) {
    console.log('data = ', data);
    res.json({
      notebookPort: notebookPort,
      hostURL: hostURL
    });
  });
});

module.exports = router;
