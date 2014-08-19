'use strict';
var yeoman = require('yeoman-generator');

var ChapterGenerator = yeoman.generators.NamedBase.extend({
  _askFor: function () {
    var done = this.async();

    var prompts = [{
      name: 'chapterNum',
      message: 'Chapter number',
      default: 1,
      validate: function (input) {
        var done = this.async();
        setTimeout(function () {
          if (typeof input !== 'number') {
            done('You need to provide a number');
            return;
          }
          done(true);
        }, 3000);
      }
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

  init: function () {
    if (!arguments[1]) {
      this._askFor();
    } else {
      this.chapterName = arguments[1];
    }
    this.chapRoot = 'src/' + (this.chapterNum || arguments[0]);
    this.chapFile = this.chapRoot + '/main.tex';
  },

  directories: function () {
    this.mkdir(this.chapRoot);
    this.copy('chapter.tex', this.chapFile);
  },

  fileIO: function () {
    var path = 'main.tex',
    file = this.readFileAsString(path);

    var insertion = '\\input{' + this.chapFile + '}\n';
    var index = file.indexOf('% End of chapter files listing');

    file = [file.slice(0, index), insertion, file.slice(index)].join('');

    this.writeFileFromString(file, path);
  }
});

module.exports = ChapterGenerator;
