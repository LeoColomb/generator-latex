
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const yosay = require('yosay');

const docClasses = [
  'report', 'article', 'book', 'slides', 'beamer', 'lettre', 'memoir',
];
const languages = [
  'english', 'afrikaans', 'ancientgreek', 'arabic', 'armenian', 'assamese',
  'basque', 'bengali', 'bokmal', 'bulgarian', 'catalan', 'coptic', 'croatian',
  'czech', 'danish', 'dutch', 'esperanto', 'estonian', 'farsi', 'finnish',
  'french', 'galician', 'german', 'german-x-2013-05-26', 'greek', 'gujarati',
  'hindi', 'hungarian', 'icelandic', 'indonesian', 'interlingua', 'irish',
  'italian', 'kannada', 'kurmanji', 'latin', 'latvian', 'lithuanian',
  'malayalam', 'marathi', 'mongolian', 'mongolianlmc', 'monogreek', 'ngerman',
  'ngerman-x-2013-05-26', 'nynorsk', 'oriya', 'panjabi', 'pinyin', 'polish',
  'portuguese', 'romanian', 'russian', 'sanskrit', 'serbian', 'slovak',
  'slovenian', 'spanish', 'swedish', 'swissgerman', 'tamil', 'telugu',
  'turkish', 'turkmen', 'ukenglish', 'ukrainian', 'uppersorbian',
  'usenglishmax', 'welsh',
];

module.exports = class extends Generator {
  prompting() {
    const extensionName = require('lodash').kebabCase(this.appname);

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Latex generator!'));

    const prompts = [{
      name: 'projectName',
      message: 'Project Name',
      default: extensionName,
      filter(input) {
        return input.replace(/^latex[\-_]?/, '').replace(/[\-_]?latex/, '');
      },
    },
    {
      name: 'projectDesc',
      message: 'Project Description',
      default: 'My new LaTex book.',
    },
    {
      name: 'version',
      message: 'Project version',
      default: '0.0.1',
      validate(input) {
        return /^[0-9]\.[0-9](\.[0-9])?$/.test(input);
      },
    },
    {
      name: 'projectUrl',
      message: 'Project homepage',
    },
    {
      name: 'license',
      message: 'License',
      default: 'MIT',
    },
    {
      name: 'authorName',
      message: 'Author name',
      default: this.user.git.username,
      validate(input) {
        return !!input;
      },
    },
    {
      type: 'list',
      choices: docClasses,
      name: 'docClass',
      message: 'Choose your document class',
      default: docClasses[0],
    },
    {
      type: 'list',
      choices: languages,
      name: 'language',
      message: 'Choose your language for Babel',
      default: languages[0],
    },
    {
      type: 'confirm',
      name: 'bib',
      message: 'Do you need a bibliography?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'glossary',
      message: 'Do you need a glossary?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'figs',
      message: 'Do you need to generate .pdf figures from .svg automatically?',
      default: false,
    }];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.projectNameSlug = require('lodash').kebabCase(props.projectName);
    });
  }

  configuring() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props,
    );
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig'),
    );
  }

  writing() {
    mkdirp('dist/');

    this.fs.copyTpl(
      this.templatePath('Gruntfile.js'),
      this.destinationPath('Gruntfile.js'),
      this.props,
    );
    this.fs.copyTpl(
      this.templatePath('main.tex'),
      this.destinationPath('main.tex'),
      this.props,
    );

    if (this.props.bib) {
      this.fs.copyTpl(
        this.templatePath('src/references.bib'),
        this.destinationPath('src/references.bib'),
        this.props,
      );
    }
    if (this.props.glossary) {
      this.fs.copyTpl(
        this.templatePath('src/glossary.tex'),
        this.destinationPath('src/glossary.tex'),
        this.props,
      );
    }
    if (this.props.figs) {
      this.fs.copy(
        this.templatePath('src/figure.svg'),
        this.destinationPath('src/assets/figure.svg'),
      );
      this.fs.copy(
        this.templatePath('figs.js'),
        this.destinationPath('figs.js'),
      );
    }
  }

  install() {
    this.installDependencies();
  }

  end() {
    this.composeWith(require.resolve('../chapter'), {
      chapterNum: '1',
      chapterName: 'First Chapter',
    });
  }
};
