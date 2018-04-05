const spawnSync = require('child_process').spawnSync;
const { aws } = require('../../package.json');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      sync: {
        usage: 'Deploys the `build` directory to your bucket',
        lifecycleEvents: ['sync']
      }
    };

    this.hooks = {
      'sync:sync': this.sync.bind(this)
    };
  }

  sync() {
    let args;
    let result;
    let stdout;
    let sterr;

    // Remove previous files
    args = [
      's3',
      'rm',
      '--recursive',
      `s3://${aws}/`
    ];
    result = spawnSync('aws', args);
    stdout = result.stdout.toString();
    sterr = result.stderr.toString();
    if (stdout) {
      this.serverless.cli.log(stdout);
    }
    if (sterr) {
      this.serverless.cli.log(sterr);
    }
    if (!sterr) {
      this.serverless.cli.log('Successfully removed files from S3 bucket');
    }

    // Upload files
    args = [
      's3',
      'sync',
      'build/',
      `s3://${aws}/`
    ];
    result = spawnSync('aws', args);
    stdout = result.stdout.toString();
    sterr = result.stderr.toString();
    if (stdout) {
      this.serverless.cli.log(stdout);
    }
    if (sterr) {
      this.serverless.cli.log(sterr);
    }
    if (!sterr) {
      this.serverless.cli.log('Successfully synced to the S3 bucket');
    }
  }
}

module.exports = ServerlessPlugin;
