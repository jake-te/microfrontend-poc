const childProcess = require('child_process');

module.exports = {
    getCurrentShortGitRevision
};

function getCurrentShortGitRevision() {
    return childProcess
            .execSync('git rev-parse --short HEAD')
            .toString()
            .trim();
}
