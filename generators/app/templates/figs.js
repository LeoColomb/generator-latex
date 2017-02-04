'use strict';

var glob = require('glob');
require('shelljs/global');

glob('**/*.svg', function (err, files) {
  files.forEach(function(filename) {
    filename = filename.replace('.svg','');
    var command = 'inkscape --file='       + '"' + filename + '.svg' + '"' +
                    ' --export-pdf=' + '"' + filename + '.pdf' + '"';

    exec(command, function(code, stdout, stderr) {
      console.log(command);
      console.log('Command exited with code: ', code);
      if (stderr) {
        console.log(stderr);
      }
    });
  });
});
