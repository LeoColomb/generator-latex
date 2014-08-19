![LaTeX](https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/220px-LaTeX_logo.svg.png)

Generator LaTeX
===============
[![Latest Release](https://img.shields.io/npm/v/generator-latex.svg?style=flat)](https://www.npmjs.org/package/generator-latex)
[![Build Status](https://img.shields.io/travis/LeoColomb/generator-latex.svg?style=flat)](https://travis-ci.org/LeoColomb/generator-latex)
[![Yeoman](https://img.shields.io/badge/generator-yeoman-5aadbb.svg?style=flat)](http://yeoman.io)

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy! Take a look at [yeoman.io](http://yeoman.io).

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install `generator-latex` from [npm](https://www.npmjs.org/), run:

```bash
$ npm install -g generator-latex
```

Finally, initiate the generator:

```bash
$ yo latex
```

### Chapter Sub-Generator

Adding a chapter is a repetitive task. To keep them organized, the Chapter Sub-Generator creates a chapters directory, and lets you create sub-directories for each chapter. For example:

```bash
$ yo latex:chapter 01 Introduction
```

Will create the chapters/01 directory structure. Within chapters/01, it will create chapter.tex and a media/ folder. The title of this chapter will be Introduction.

It also adds to main.tex, inserting an \include just before it sees % end chapters.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## License

MIT © [Léo Colombaro](http://colombaro.fr)
