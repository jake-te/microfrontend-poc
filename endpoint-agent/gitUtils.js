const childProcess = require('child_process');

module.exports = {
    getCurrentGitRevision,
    getCurrentShortGitRevision
};


function getCurrentGitRevision() {
    return childProcess
            .execSync('git rev-parse HEAD')
            .toString()
            .trim();
}

function getCurrentShortGitRevision() {
    return childProcess
            .execSync('git rev-parse --short HEAD')
            .toString()
            .trim();
}
