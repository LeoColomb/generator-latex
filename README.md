![LaTeX](https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/220px-LaTeX_logo.svg.png)

# Generator LaTeX

> Yeoman Generator for LaTeX up-to-date documents Edit

[![Build Status](https://travis-ci.org/LeoColomb/generator-latex.svg?branch=master)](https://travis-ci.org/LeoColomb/generator-latex)
[![Latest Release](https://img.shields.io/npm/v/generator-latex.svg?style=flat)](https://www.npmjs.org/package/generator-latex)[![Yeoman](https://img.shields.io/badge/generator-yeoman-5aadbb.svg?style=flat)](http://yeoman.io)

## Why

* [Grunt](https://gruntjs.com/) engine, for easy tasks running and managing.
* Complete and structured generation process.
* Automatic compilation at file changes.
* Full and automatic PDF view in your browser.

After generation, keeping your work up-to-date during your writting require only one command:

```bash
$ grunt
```

That's it! :sparkles:

## Install

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install `generator-latex` from [npm](https://www.npmjs.org/), run:

```bash
$ npm install -g generator-latex
```

## Usage

### New project

```bash
$ yo latex
```

### New chapter

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

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy! Take a look at [yeoman.io](http://yeoman.io).

### What will be created?

This generator is designed to cover any type of LaTeX document.
It helps you to create a solid structure of your project.

Take a look at this final structure:

```
project/
├── Gruntfile.js            # → The compilator tasks file
├── main.tex                # → The project-root file
├── package.json            # → Preparator dependencies
│
├── src/
│   ├── glossary.tex        # → The glossary file
│   ├── references.bib      # → The reference file
│   ├── ...
│   │
│   ├── 1/
│   │   ├── main.tex        # → First chapter global file
│   │   └── ...
│   │
│   ├── 2/
│   │   ├── main.tex        # → Second chapter global file
│   │   └── ...
│   │
│   ├── assets/
│   │   ├── figures.svg     # → Optionnal figures files
│   │   └── ...
│   │
│   └── ...
│
└── dist/
    ├── [PROJECT].pdf       # → The final PDF file output
    └── ...                 # → Files generated during the compilation
```

### Regarding glossary

In order for the glossary generation to work, you need to ensure the `makeglossaries` command is available system-wide.

A quick way to check if the command is available is to invoke it from any terminal.

```
makeglossaries
```

On Windows, it is mandatory to add the folder `C:\\...\MiKteX X.X\miktex\bin` to the `PATH`, otherwise the command will not be available.

Latex code sample to insert a glossary entry:
```
\gls{computer}
```

### Regarding graphics

Figures in `svg` format can be automatically converted to `pdf` upon changes.
This provides a robust and easy way to import vector graphics in latex.

A specific grunt task can be run to refresh all figures, although the `grunt` command will start by regenerating all figures.

```
grunt execute:figs
```

Latex code sample to insert a `.pdf` graphic generated from `.svg`:

```
\begin{figure}[h]
  \centering
  \includegraphics{src/assets/figure.pdf}
  \caption{Figure example of an imported pdf generated from an svg file (drawn with inkscape)}
  \label{figure_example}
\end{figure}
```

### Regarding bibliography

When the bibliography is modified, it is properly reflected in the document **two** refresh later. This is due to how latex and bibtex interact.
If you see some undefined references (displayed as `[??]`), simply let grunt perform a second refresh by modifying and saving any `.tex` file.

Latex code sample to insert a reference:
```
\cite{Perrin}.
```

## License

MIT © [Léo Colombaro](https://colombaro.fr)
