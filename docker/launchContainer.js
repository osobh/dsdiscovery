var express = require('express');
var router = express.Router();

var dockerCLI = require('docker-cli-js');
var Docker = dockerCLI.Docker;
var docker = new Docker();

var hostURL = process.env.HOST_URL;
var hostStorageDir = process.env.USER_STORAGE;
var userNickname = 'osobh';
var notebookStorageDir = '/home/jovyan/work';
var notebookMinPort = 8080;
var notebookMaxPort = 9999;
var hostPort = 8888;
var containerImage = 'jupyter/datascience-notebook';
var launchContainerCommand = `run -d -v /${hostStorageDir}/${userNickname}:${notebookStorageDir} -e GRANT_SUDO=yes -p ${notebookMinPort}-${notebookMaxPort}:${hostPort} ${containerImage}`;

router.get('/', function(req, res){
  docker.command(launchContainerCommand).then(function (data) {
    console.log('data = ', data);
    var containerId = data.containerId;
    var inspectContainerCommand = `inspect ${containerId}`;
    docker.command(inspectContainerCommand).then(function (results) {
      var notebookPort = results.object[0].NetworkSettings.Ports[`${hostPort}/tcp`][0].HostPort;
      res.json({
        notebookPort: notebookPort,
        hostURL: hostURL
      });
    });
  });
});

module.exports = router;
