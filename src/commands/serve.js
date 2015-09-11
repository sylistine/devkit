var BaseCommand = require('../util/BaseCommand').BaseCommand;

var ServeCommand = Class(BaseCommand, function (supr) {

  this.name = 'serve';
  this.description = 'starts the web simulator';

  this.init = function () {
    supr(this, 'init', arguments);

    this.opts
      .describe('port', 'port on which to run the DevKit server')
      .alias('port', 'p').default('port', 9200)
      .describe('single-port', 'host apps on same port as primary web server')
      .describe('separate-build-process',
                'spawn a new process for simulator builds')
      .describe('test-app',
                'broadcasts address using mdns for test app clients')
      .describe('debugger-port',
                'port for the debugger proxy to listen on')
      .default('debugger-port', 6000)
      .describe('external-debugger-port',
                'external port mapping for the debugger port (defaults to whatever debugger-port is)')
      .default('single-port', false);
  };

  this.exec = function () {
    var fs = require('fs');

    if (fs.existsSync('manifest.json')) {
      require('../apps').get('.');
    }

    var serve = require('../serve');
    var argv = this.opts.argv;

    serve.serveWeb({
      port: argv.port,
      debuggerPort: argv['debugger-port'],
      externalDebuggerPort: argv['external-debugger-port'] != null ? argv['external-debugger-port'] : argv['debugger-port'],
      singlePort: !!argv['single-port'],
      separateBuildProcess: !!argv['separate-build-process']
    });
  };
});

module.exports = ServeCommand;
