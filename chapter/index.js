'use strict';
var htmlWiring = require('html-wiring');
var mkdirp = require('mkdirp');

module.exports = require('yeoman-generator').Base.extend({
  init: function () {
    if (this.options.chapterName) {
      this.chapterName = this.options.chapterName;
    } else if (arguments[1]) {
      this.chapterName = arguments[1];
    } else {
      this._askFor();
    }
  },

  _askFor: function () {
    var done = this.async();

    var prompts = [{
      name: 'chapterNum',
      message: 'Chapter number',
      default: '1'
    },
    {
      name: 'chapterName',
      message: 'Chapter name',
      default: 'New Chapter'
    }];

    this.prompt(prompts, function (props) {
      this.chapterNum = props.chapterNum;
      this.chapterName = props.chapterName;

      done();
    }.bind(this));
  },

  content: function () {
    this.chapRoot = 'src/' + (this.options.chapterNum || arguments[0] || this.chapterNum);
    this.chapFile = this.chapRoot + '/main.tex';

    mkdirp(this.chapRoot);
    this.copy('chapter.tex', this.chapFile);
  },

  fileIO: function () {
    var path = 'main.tex',
    file = htmlWiring.readFileAsString(path);

    var insertion = '\\input{' + this.chapFile + '}\n';
    var index = file.indexOf('% End of chapter files listing');

    file = [file.slice(0, index), insertion, file.slice(index)].join('');

    htmlWiring.writeFileFromString(file, path);
  }
});
