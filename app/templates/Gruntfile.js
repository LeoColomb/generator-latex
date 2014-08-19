/*
 * <%= projectName %>
 * <%= projectUrl %>
 * Licensed under <%= license %> License
 */
module.exports = function (grunt) {
  'use strict';
  // Project configuration
  grunt.initConfig({
    latex: {
      pdf: {
        src: 'main.tex',
        options: {
          outputDirectory: 'dist/',
          jobname: '<%= projectName %>'
        }
      }<% if (bib) { %>,
      bib: {
        src: 'dist/<%= projectName %>.aux',
        options: {
          engine: 'bibtex',
          interaction: false
        }
      }<% } %><% if (gloss) { %>,
      gloss: {
        src: 'dist/<%= projectName %>.aux',
        options: {
          engine: 'makeglossaries',
          interaction: false
        }
      }<% } %>
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          base: 'dist',
          open: 'http://localhost:8000/<%= projectName %>.pdf'
        }
      }
    },
    watch: {
      latex: {
        files: '**/*.tex',
        tasks: ['latex', 'latex:pdf']
      },<% if (bib) { %>
      bibtex: {
        files: '**/*.bib',
        tasks: ['latex:bib', 'latex:pdf']
      },<% } %>
      livereload: {
        options: {
          livereload: true
        },
        files: ['dist/<%= projectName %>.pdf'],
      },
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-latex');

  // Default task
  grunt.registerTask('default', ['connect', 'watch']);
};
