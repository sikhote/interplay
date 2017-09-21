const spawnSync = require('child_process').spawnSync;
const { name } = require('../../package.json');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      sync: {
        usage: 'Deploys the `app` directory to your bucket',
        lifecycleEvents: ['sync']
      }
    };

    this.hooks = {
      'sync:sync': this.sync.bind(this)
    };
  }

  sync() {
    const args = [
      's3',
      'sync',
      'build/',
      `s3://${name}/`
    ];
    const result = spawnSync('aws', args);
    const stdout = result.stdout.toString();
    const sterr = result.stderr.toString();
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
