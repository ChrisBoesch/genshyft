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
      },
      screenshots: {
        options: {
          base: 'screenshots/',
          port: 5556,
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
      },
      screenshots: {
        path: 'http://0.0.0.0:5556'
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
          type: 'text-summary', // 'text', 'text-summary','html'
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
          'bower_components/angularjs-unstable/angular.js',
          'bower_components/angularjs-unstable/angular-cookies.js',
          'bower_components/angularjs-unstable/angular-resource.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'bower_components/angular-ui-ace/ui-ace.js',
          'bower_components/angular-leaflet-directive/src/angular-leaflet-directive.js',
          'bower_components/bootstrap-css/js/bootstrap.js'
        ]
      }
    },

    autoshot: {
      default_options: {
        options: {
          path: 'screenshots/',
          remote: {
            files: [
              {
                src: 'http://0.0.0.0:8888/app/index.html#/home',
                dest: 'home.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/quests',
                dest: 'quests.jpg',
                delay: 3000
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/practice',
                dest: 'practice.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/challenges',
                dest: 'challenges.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/profile',
                dest: 'profile.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/teach',
                dest: 'teach.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/storyboard',
                dest: 'storyboard.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/story',
                dest: 'story.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/challengestatistics',
                dest: 'challengestatistics.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/ranking',
                dest: 'ranking.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/registration',
                dest: 'registration.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/challengeCreator',
                dest: 'challengeCreator.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/challengeEdit',
                dest: 'challengeEdit.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/tournaments',
                dest: 'tournaments.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/roundranking',
                dest: 'roundranking.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/events',
                dest: 'events.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/eventsTable',
                dest: 'eventsTable.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/eventsManage',
                dest: 'eventsManage.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/eventsCreate',
                dest: 'eventsCreate.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/eventsEdit',
                dest: 'eventsEdit.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/create',
                dest: 'create.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/editproblem',
                dest: 'editproblem.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/editproblem/1234',
                dest: 'editproblem-details.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/videos',
                dest: 'videos.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/feedback',
                dest: 'feedback.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/schoolregistration',
                dest: 'schoolregistration.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/schoolregistrationstats',
                dest: 'schoolregistrationstats.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/schoolsmap',
                dest: 'schoolsmap.jpg',
                delay: 3000
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/mytournaments',
                dest: 'mytournaments.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/mytournaments-create',
                dest: 'mytournaments-create.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/mytournaments-manage',
                dest: 'mytournaments-manage.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/tournament-grpjoin',
                dest: 'tournament-grpjoin.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/tournament-grpplay',
                dest: 'tournament-grpplay.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/tournament-ranking',
                dest: 'tournament-ranking.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/ezwebdev',
                dest: 'ezwebdev.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/purposedriven',
                dest: 'purposedriven.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/purposedriven-play',
                dest: 'purposedriven-play.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/purposedriven-admin',
                dest: 'purposedriven-admin.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/ymbcoaching',
                dest: 'ymbcoaching.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/ymbcoaching-play',
                dest: 'ymbcoaching-play.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/ymbcoaching-cache',
                dest: 'ymbcoaching-cache.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/batpage',
                dest: 'batpage.jpg'
              },
              {
                src: 'http://0.0.0.0:8888/app/index.html#/home2',
                dest: 'home2.jpg'
              }
            ]
          },
          local: false,
          viewport: ['1024x655']
        }
      }
    },

    compress: {
      screenshots: {
        options: {
          archive: 'screenshots/screenshots.zip'
        },
        files: [{
          expand: true,
          src: ['screenshots/*.jpg'],
          dest: '/'
        }]
      }
    }

  });

  grunt.registerTask('travis_test', ['verbosity', 'develop:server', 'karma:unit_coverage']);
  
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

  //screenshots
  grunt.registerTask('screenshots', ['connect:devserver', 'autoshot',
    'compress:screenshots', 'connect:screenshots', 'open:screenshots']);

  // server daemon
  grunt.registerTask('serve', ['connect:webserver']);
};
