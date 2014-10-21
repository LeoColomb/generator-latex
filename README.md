![LaTeX](https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/220px-LaTeX_logo.svg.png)

Generator LaTeX
===============
[![Latest Release](https://img.shields.io/npm/v/generator-latex.svg?style=flat)](https://www.npmjs.org/package/generator-latex)
[![Build Status](https://img.shields.io/travis/LeoColomb/generator-latex.svg?style=flat)](https://travis-ci.org/LeoColomb/generator-latex)
[![Yeoman](https://img.shields.io/badge/generator-yeoman-5aadbb.svg?style=flat)](http://yeoman.io)

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy! Take a look at [yeoman.io](http://yeoman.io).

### What will be created?

#### Structure

This generator will be perfect for every type of LaTeX document.
It helps you to create a solid structure of your project.

Take a look at this final structure:

```
│- .editorconfig
│- Gruntfile.js        # The compilator launcher file
│- main.tex            # The global file
│- package.json
│
└── src
    │- glos.tex        # The glossary file
    │- refs.bib        # The reference file
    │- ...
    │
    └── 1
        │- main.tex    # First chapter global file
        │- ...

    └── 2
        │- main.tex    # Second chapter global file
        │- ...

    └── ...

└── dist
    │- [PROJECT].pdf   # The final PDF file output
    │- ...             # Some files used for compilation
```

#### Tools

It import for you some tools, with their own features such as:
* [Grunt](http://gruntjs.com/) engine, for easy tasks running and managing.
* Complete and structured compilation command without opening terminal.
* Automatic compilation at file changes.
* Full and automatic PDF view in your browser.

After generation, keeping your work up-to-date during your writting is easy:

```bash
$ grunt
```

That's it! :sparkles:

### Can I test compilation?

Yes! The generator will create a compatible project for LaTeX CI builds,
without any configuration.

For CI Server, see for example [ShareLaTeX](https://www.sharelatex.com/github/).

## Generator Usage

### Create the LaTeX project

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

Adding a chapter is a repetitive task. To keep them organized, the Chapter Sub-Generator creates a chapters directory, and lets you create sub-directories for each chapter.

To run it:
```bash
$ yo latex:chapter
```

or directly to bypass questions:

```bash
$ yo latex:chapter 1 Introduction
```

Will create `src/1/main.tex`.  
The title of this chapter will be `Introduction`.

It also adds to `./main.tex`, inserting an `\include` just before it sees `% End of chapter files listing`.

## 


## License

MIT © [Léo Colombaro](http://colombaro.fr)
