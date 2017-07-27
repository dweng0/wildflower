module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      main: {
        src: 'source/**/*.ts',
        dest: 'js/findem.js'
      }
    },
    exec:{
        compile:{
            command:"browserify "+__dirname+"/source/game.ts -p [ tsify --noImplicitAny ] > "+__dirname+"/lib/bundle.js",
            stdout:true,
            stderr:true
        },
        karma: {
            command:"karma start",
            stdout:true,
            stderr:true
        }
    },
    bump: {
    options: {
      files: ['package.json'],
      updateConfigs: [],
      commit: false,
      commitMessage: 'Release v%VERSION%',
      commitFiles: ['package.json'],
      createTag: true,
      tagName: 'v%VERSION%',
      tagMessage: 'Version %VERSION%',
      push: false,
      pushTo: 'origin',
      gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
      globalReplace: false,
      prereleaseName: "alpha",
      metadata: '',
      regExp: false
      }
    },
    
    watch: {
      scripts: {
        files: ['source/**/*.ts', 'test/**/*.ts'],
        tasks: ['exec', 'bump:prerelease']
    },
    }
  });
grunt.loadNpmTasks('grunt-exec');
grunt.loadNpmTasks('grunt-bump');
 grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-watch');
};