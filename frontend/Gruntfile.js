'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/**/*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
          '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
          '<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
          'test/**/*.js'
        ]
      },
      js: {
        files: [
          '<%= yeoman.app %>/scripts/**/*.js',
          '<%= yeoman.app %>/test/**/*.js'
        ],
        tasks: ['jshint'],
        options: { livereload: true }
      },
      test: {
        files: [
          '<%= yeoman.app %>/scripts/**/*.js',
          'test/**/*.js'
        ],
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
            lrSnippet,
            mountFolder(connect, '.tmp'),
            mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              mountFolder(connect, 'test'),
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= yeoman.app %>/scripts/**/*.js',
        '!<%= yeoman.app %>/scripts/vendor/**/*',
        'test/spec/**/*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= yeoman.app %>/img',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    requirejs: {
      dist: {
        options: {
          baseUrl: '<%= yeoman.app %>/scripts',
          optimize: 'none',
          paths: {
            'templates': '../../.tmp/scripts/templates',
            'jquery': '../../<%= yeoman.app %>/bower_components/jquery/dist/jquery',
            'underscore': '../../<%= yeoman.app %>/bower_components/underscore/underscore',
            'backbone': '../../<%= yeoman.app %>/bower_components/backbone/backbone',
            'foundation': '../../<%= yeoman.app %>/bower_components/foundation/js/foundation.min',
            'backbone-route-filter': '../../<%= yeoman.app %>/bower_components/backbone-route-filter/backbone-route-filter'
          },
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true
        }
      }
    },
    useminPrepare: {
      html: ['<%= yeoman.app %>/index.html'],
      options: { dest: '<%= yeoman.dist %>' }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: { dirs: ['<%= yeoman.dist %>'] }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/**/*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: { removeComments: true },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'index.html',
            '**/*.{ico,txt}',
            '**/*.htaccess',
            'img/**/*',
            'config/**/*',
            'styles/fonts/**/*',
            'bower_components/font-awesome/fonts/**/*'
          ]
        }]
      }
    },
    bower: {
      all: { rjsConfig: '<%= yeoman.app %>/scripts/main.js' }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/**/*.css'
          ]
        }
      }
    }
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'connect:test',
        'open:test',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'compass:server',
      'connect:livereload',
      'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'compass:dist',
    'useminPrepare',
    'requirejs',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'rev',
    'usemin',
    'htmlmin'
  ]);
};
