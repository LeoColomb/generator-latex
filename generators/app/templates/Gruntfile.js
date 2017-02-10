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
      }<% } %>
    },
    shell: {<% if (glossary) { %>
      glossary: {
        command: 'makeglossaries -d ./dist <%= projectName %>'
      },<% } %> <% if (figs) { %>
      figs: {
        command: function() {
          return 'inkscape --file="' + grunt.config('shell.figs.src') + '" --export-pdf="' + grunt.config('shell.figs.src').replace('.svg', '.pdf') + '"';
        },
        src: '**/*.svg'
      }, <% } %>
    },
    execute: {<% if (figs) { %>
  		figs: {
  			src: ['figs.js']
  		} <% } %>
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
        tasks: ['latex', 'shell:glossary', 'latex:pdf']
      },<% if (bib) { %>
      bibtex: {
        files: '**/*.bib',
        tasks: ['latex:bib', 'latex:pdf']
      }, <% } %> <% if (figs) { %>
      svgs: {
        files: '**/*.svg',
        tasks: ['shell:figs'],
        options: {
          spawn: false
        }
      }, <% } %>
      livereload: {
        options: {
          livereload: true
        },
        files: ['dist/<%= projectName %>.pdf'],
      },
    }
  });

  <% if (figs) { %>
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('shell.figs.src', filepath);
  });
  <% } %>

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-latex');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-execute');

  // Default task
  grunt.registerTask('default', [<% if (figs) { %>'execute:figs', <% } %>'connect', 'watch']);
};
