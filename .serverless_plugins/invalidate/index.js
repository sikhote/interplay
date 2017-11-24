const spawnSync = require('child_process').spawnSync;

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      invalidate: {
        usage: 'Invalidates CloudFront distribution to clear cache',
        lifecycleEvents: ['invalidate']
      }
    };

    this.hooks = {
      'invalidate:invalidate': this.invalidate.bind(this)
    };
  }

  invalidate() {
    // Allow AWS in preview mode
    spawnSync('aws', [
      'configure',
      'set',
      'preview.cloudfront',
      'true'
    ]);

    const listArgs = ['cloudfront', 'list-distributions'];
    const provider = this.serverless.getProvider('aws');
    const alias = provider.serverless.service.custom.homepage;
    const listResult = JSON.parse(spawnSync('aws', listArgs).stdout.toString());

    // Find match based on Alias
    const item = listResult.DistributionList.Items.find(listItem => {
      return listItem.Aliases.Items.find(aliasItem => aliasItem === alias)
    });

    const invalidateArgs = [
      'cloudfront',
      'create-invalidation',
      '--distribution-id',
      item.Id,
      '--paths',
      '/'
    ];

    const invalidateResult = spawnSync('aws', invalidateArgs);
    const stdout = invalidateResult.stdout.toString();
    const sterr = invalidateResult.stderr.toString();

    if (stdout) {
      this.serverless.cli.log(stdout);
    }

    if (!sterr) {
      this.serverless.cli.log('Successfully invalidated');
    } else {
      this.serverless.cli.log(sterr);
      process.exit(1);
    }
  }
}

module.exports = ServerlessPlugin;
