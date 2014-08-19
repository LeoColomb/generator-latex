'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ChapterGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('reading arguments');
    this.chapRoot = 'src/chapters/' + arguments[0];
    this.chapterName = arguments[1];
  },

  directories: function() {
    console.log('making directories');
    this.mkdir(this.chapRoot);
  },

  files: function () {
    console.log('making files');
    console.log(this.chapterName);
    this.copy('src/chapter.tex', this.chapRoot + '/chapter.tex');
  },

  fileIO: function() {
    console.log('editing files');
    var path = "main.tex",
    file = this.readFileAsString(path);

    var insertion = "\\input{" + this.chapRoot + "/chapter.tex}\n"

    var index = file.indexOf("% end chapters");

    file = [file.slice(0, index), insertion, file.slice(index)].join('');

    // force a re-write of main.tex without requiring user input
    this.conflicter.force = true;
    this.write(path, file);
  }
});

module.exports = ChapterGenerator;