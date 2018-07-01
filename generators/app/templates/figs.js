/* global exec */

const glob = require('glob');
require('shelljs/global');

glob('**/*.svg', (err, files) => {
  files.forEach((file) => {
    const filename = file.replace('.svg', '');
    const command = `inkscape --file="${filename}.svg" --export-pdf="${filename}.pdf"`;

    exec(command, (code, stdout, stderr) => {
      console.log(command);
      console.log('Command exited with code: ', code);
      if (stderr) {
        console.log(stderr);
      }
    });
  });
});
