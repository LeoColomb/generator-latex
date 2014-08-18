'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ChapterGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
  	this.chapRoot = 'chapters/'+arguments[0];
  	this.chapterName = arguments[1];

    console.log('You called the chapter subgenerator with the argument ' + this.name + '.');
  },

  directories: function() {
  	console.log('making directories');
  	this.mkdir(this.chapRoot);
  	this.mkdir(this.chapRoot+'/media');

  },

  files: function () {
  	console.log('making files');
    this.copy('chapter.tex', this.chapRoot+'/chapter.tex');
  },

  fileIO: function() {
  	console.log('editing files');

  	var path = "main.tex",
    file = this.readFileAsString(path);

    var insertion = "\\input{"+this.chapRoot+"/chapter.tex}\n"

    var index = file.indexOf("% end chapters");

    file = [file.slice(0, index), insertion, file.slice(index)].join('');


	this.write(path, file);
  }
});

module.exports = ChapterGenerator;