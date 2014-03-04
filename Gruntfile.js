module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    shell: {
      options: {
        stdout: true
      },
      npm_install: {
        command: 'npm install'
      },
      bower_install: {
        command: './node_modules/.bin/bower install'
      }
    },

    connect: {
      options: {
        base: '.',
        hostname: '0.0.0.0'
      },
      webserver: {
        options: {
          port: 8888,
          keepalive: true
        }
      },
      devserver: {
        options: {
          port: 8888
        }
      },
      testserver: {
        options: {
          port: 9999
        }
      },
      coverage: {
        options: {
          base: 'coverage/',
          port: 5555,
          keepalive: true
        }
      }
    },

    open: {
      devserver: {
        path: 'http://localhost:8888'
      },
      coverage: {
        path: 'http://localhost:5555'
      }
    },

    develop: {
      server: {
        file: 'server.js'
      }
    },

    verbosity: {
      server: {
        tasks: ['karma:e2e']
      }
    },

    karma: {
      unit: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: true,
      },
      midway: {
        configFile: './test/karma-midway.conf.js',
        autoWatch: false,
        singleRun: true
      },
      midway_auto: {
        configFile: './test/karma-midway.conf.js'
      },
      e2e: {
        configFile: './test/karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true
      },
      e2e_auto: {
        configFile: './test/karma-e2e.conf.js'
      },
      unit_coverage: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/js/controllers.js': ['coverage']
        },
        coverageReporter: {
          type: 'html',
          dir: 'coverage/'
        }
      }
    },

    watch: {
      options: {
        livereload: 7777
      },
      'source': {
        files: ['app/css/**/*.css', 'app/js/**/*.js'],
        tasks: ['concat']
      }
    },

    clean: {
      assets: ["assets/css", "assets/js", "assets/font", "assets/images", "assets/img"],
    },

    copy: {
      'jquery-ui': {
        expand: true,
        cwd: 'bower_components/jquery-ui/themes/ui-lightness/',
        src: 'images/*',
        dest: 'app/assets/'
      },
      'font-awesome': {
        expand: true,
        cwd: 'bower_components/components-font-awesome/',
        src: ['font/*', 'css/*'],
        dest: 'app/assets/'
      },
      'bootstrap': {
        expand: true,
        cwd: 'bower_components/bootstrap-css/',
        src: 'img/*',
        dest: 'app/assets/'
      },
      'fancybox': {
        expand: true,
        cwd: 'bower_components/fancybox/source/',
        src: ['*.gif', '*.png'],
        dest: 'app/assets/css/'
      },
      'leaflet': {
        expand: true,
        cwd: 'bower_components/leaflet-dist',
        src: ['images/*'],
        dest: 'app/assets/css/'
      },
      'ico': {
        src: 'app/img/ico/favicon.ico',
        dest: 'app/assets/ico/favicon.ico'
      },
      'ace': {
        expand: true,
        cwd: 'bower_components/ace-builds/src',
        src: '*.js',
        dest: 'app/assets/js/ace/'
      }
    },


    concat: {
      options: {
        process: function(src, filepath) {
          return '// Source: ' + filepath + '\n' + src;
        },
        nonull: true
      },
      styles: {
        dest: './app/assets/css/app.css',
        src: [
          'bower_components/bootstrap-css/css/bootstrap.css',
          'bower_components/bootstrap-datepicker/css/datepicker.css',
          'bower_components/bootstrap-css/css/bootstrap-responsive.css',
          'bower_components/jquery-ui/themes/ui-lightness/jquery-ui.css',
          'bower_components/fancybox/source/jquery.fancybox.css',
          'bower_components/leaflet-dist/leaflet.css',
        ]
      },

      scripts: {
        options: {
          separator: ';'
        },
        dest: './app/assets/js/app.js',
        src: [
          'bower_components/jquery/jquery.js',
          'bower_components/underscore/underscore.js',
          'bower_components/jquery-ui/ui/jquery-ui.js',
          'bower_components/fancybox/source/jquery.fancybox.js',
          'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
          'bower_components/ace-builds/src/ace.js',
          'bower_components/leaflet-dist/leaflet-src.js',
          'bower_components/unstable-angular-complete/angular.js',
          'bower_components/unstable-angular-complete/angular-cookies.js',
          'bower_components/unstable-angular-complete/angular-resource.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'bower_components/angular-ui-ace/ui-ace.js',
          'bower_components/angular-leaflet-directive/src/angular-leaflet-directive.js',
          'bower_components/bootstrap-css/js/bootstrap.js'
        ]
      }
    }
  });

  grunt.registerTask('test', ['verbosity', 'develop:server', 'karma:unit', 'karma:midway', 'karma:e2e']);
  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:midway', ['verbosity', 'develop:server', 'karma:midway']);
  grunt.registerTask('test:e2e', ['verbosity', 'develop:server', 'karma:e2e']);

  // coverage testing
  grunt.registerTask('test:coverage', ['karma:unit_coverage']);
  grunt.registerTask('coverage', ['karma:unit_coverage', 'open:coverage', 'connect:coverage']);

  // installation-related
  grunt.registerTask('install', ['shell:npm_install', 'shell:bower_install', 'build']);

  // build assets
  grunt.registerTask('build', ['clean', 'concat', 'copy']);

  // defaults
  grunt.registerTask('default', ['dev']);

  // development
  grunt.registerTask('dev', ['install', 'build', 'connect:devserver', 'watch']);

  // server daemon
  grunt.registerTask('serve', ['connect:webserver']);
};
