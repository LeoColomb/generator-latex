'use strict';
const htmlWiring = require('html-wiring');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('chapterNum', { type: Number, required: false });
    this.argument('chapterName', { type: String, required: false });
  };

  prompting() {
    if (this.options.chapterNum && this.options.chapterNum) {
      this.props = this.options;
      return;
    }

    let prompts = [{
      name: 'chapterNum',
      message: 'Chapter number',
      default: '1'
    },
    {
      name: 'chapterName',
      message: 'Chapter name',
      default: 'New Chapter'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  };

  configuring() {
    this.chapRoot = 'src/' + (this.props.chapterNum);
    this.chapFile = this.chapRoot + '/main.tex';

    mkdirp(this.chapRoot);
    this.fs.copyTpl(
      this.templatePath('chapter.tex'),
      this.destinationPath(this.chapFile),
      this.props
    );
  };

  writing() {
    let file = htmlWiring.readFileAsString('main.tex');

    let insertion = '\\input{' + this.chapFile + '}\n';
    let index = file.indexOf('% End of chapter files listing');

    file = [file.slice(0, index), insertion, file.slice(index)].join('');

    htmlWiring.writeFileFromString(file, 'main.tex');
  };
}
