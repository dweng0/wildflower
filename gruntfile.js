module.exports = function(grunt) {

  grunt.initConfig({
    exec:{
        compile:{
            command:"tsc",
            stdout:true,
            stderr:true
        }
    },
    bump: {
    options: {
      files: ['package.json'],
      updateConfigs: [],
      commit: true,
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
        files: ['source/**/*.ts'],
        tasks: ['exec', 'bump:prerelease']
    },
    }
  });
grunt.loadNpmTasks('grunt-exec');
grunt.loadNpmTasks('grunt-bump');
grunt.loadNpmTasks('grunt-contrib-watch');
};