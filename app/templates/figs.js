var glob = require('glob');
           require('shelljs/global');

glob("**/*.svg", function (err, files) {
  files.forEach(function(filename) {
    filename = filename.replace('.svg','');
    command = 'inkscape --file='       + '"' + filename + '.svg' + '"'
                    + ' --export-pdf=' + '"' + filename + '.pdf' + '"'

    exec(command, function(code, stdout, stderr) {
      console.log(command);
      console.log('Command exited with code: ', code);
    });
  });
})
