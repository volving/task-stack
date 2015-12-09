/**
 * Created by volving on 12/10/15.
 */
/*jshint
    node: true,
    devel: true, indent: 2, maxerr: 10,
    newcap: true, nomen: true, plusplus: true,
    regexp: true
*/


module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var config = {
    	_node_modules: 'node_modules',
        _vendor_src: 'bower_components',
        _vendor_dist: 'public/vendors',
        _public: 'public',
        _tmp: 'tmp',
        _uglified: 'tmp/uglified',
        _lessed: 'tmp/lessed',
        _prefixed: 'tmp/prefixed',
        _cssmined: 'tmp/cssmined',
        _fe: 'fe',
        _src: 'fe/src',
        _js_src: 'fe/js',
        _css_src: 'fe/css',
        _dist: 'public/dist',
        _js_dist: 'public/javascripts',
        _css_dist: 'public/stylesheets',
        _assets_src: 'fe/assets',
        _assets_dist: 'public',
        _img: 'fe/assets/img'
    };
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,
        clean: {
            tmp: {
                src: '<%= config._tmp %>/*'
            },
            publics: {
                src: '<%= config._public %>/*'
            },
            vendors: {
                src: '<%= config._vendor_dist %>/*'
            },
            upload:{
            	src: ['<%= config._vendor_src %>','<%= config._node_modules %>', '<%= config._tmp %>']
            }
        },
        jshint: {
            // options here to override JSHint defaults
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                undef: true,
                unused: true,
                debug: true,
                predef: ['$', 'console'],
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    nodejs: true,
                    require: true,
                    Map: true,
                },
                ignores: [],
                force: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            sources: {
                src: ['<%= config._js_src %>/**/*.js']
            }
        },
        uglify: {
            targets: {
                files: [{
                    expand: true,
                    cwd: '<%= config._js_src %>',
                    src: '**/*.js',
                    dest: '<%= config._uglified %>',
                    ext: '.js',
                    extDot: 'last'
                }],
            }
        },
        less: {
            targets: {
                options: {
                    compress: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= config._css_src %>',
                    src: '**/*.*ss',
                    dest: '<%= config._lessed %>',
                    ext: '.css',
                    extDot: 'last'
                }],
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1% in US', 'last 5 versions', 'IE 9', 'IE 10']
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config._lessed %>',
                    src: '**/*.css',
                    dest: '<%= config._prefixed %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        cssmin: {
            targets: {
                files: [{
                    expand: true,
                    cwd: '<%= config._prefixed %>',
                    src: '**/*.css',
                    dest: '<%= config._prefixed %>',
                    ext: '.css',
                    extDot: 'last'
                }],
            }
        },
        copy: {
            // ico: {
            //     files: [{
            //         expand: true,
            //         cwd: '<%= config._fe %>/',
            //         src: 'favicon.ico',
            //         dest: '<%= config._public %>/'
            //     }]
            // },
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= config._assets_src %>/',
                    src: '**/*',
                    dest: '<%= config._assets_dist %>/',
                }]
            },
            vendors: {
                files: [{
                    expand: true,
                    cwd: '<%= config._vendor_src %>/',
                    src: '**/dist/**/*',
                    filter: function(dirName) {
                        if (dirName.indexOf('src') > -1 || dirName.indexOf('node_modules') > -1) {
                            return false;
                        }
                        return true;
                    },
                    dest: '<%= config._vendor_dist %>/'
                }]
            },
            serve_js: {
                files: [{ //js
                    expand: true,
                    cwd: '<%= config._uglified %>',
                    src: '**/*.js',
                    dest: '<%= config._js_dist %>',
                    ext: '.js',
                    extDot: 'last'
                }]
            },
            serve_css: {
                files: [{ //css
                    expand: true,
                    cwd: '<%= config._cssmined %>',
                    src: '**/*.css',
                    dest: '<%= config._css_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            serve: {
                files: [{ //js
                    expand: true,
                    cwd: '<%= config._uglified %>',
                    src: '**/*.js',
                    dest: '<%= config._js_dist %>',
                    ext: '.js',
                    extDot: 'last'
                }, { //css
                    expand: true,
                    cwd: '<%= config._cssmined %>',
                    src: '**/*.css',
                    dest: '<%= config._css_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }],

            },
            dev_js: {
                files: [{ //js
                    expand: true,
                    cwd: '<%= config._js_src %>',
                    src: '**/*.js',
                    dest: '<%= config._js_dist %>',
                    ext: '.js',
                    extDot: 'last'
                }]
            },
            dev_css: {
                files: [{ //css
                    expand: true,
                    cwd: '<%= config._prefixed %>',
                    src: '**/*.css',
                    dest: '<%= config._css_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            dev: {
                files: [{ //js
                    expand: true,
                    cwd: '<%= config._js_src %>',
                    src: '**/*.js',
                    dest: '<%= config._js_dist %>',
                    ext: '.js',
                    extDot: 'last'
                }, { //css
                    expand: true,
                    cwd: '<%= config._prefixed %>',
                    src: '**/*.css',
                    dest: '<%= config._css_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }

        },
        watch: {
            options: {
                reload: false,
                livereload: true,
                spawn: true
            },
            gruntfile: {
                options: {
                    reload: true
                },
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile']
            },
            vendors: {
                files: '<%= config._vendor_src %>/*',
                tasks: 'newer:copy:vendors'
            },
            assets: {
                files: '<%= config._assets_src %>',
                tasks: 'newer:copy:assets'
            },
            jses: {
                options: {
                    reload: true,
                },
                files: '<%= config._js_src %>',
                tasks: ['newer:jshint:sources', 'newer:copy:dev_js']
            },
            less: {
                options: {
                    reload: true,
                },
                files: '<%= config._css_src %>',
                tasks: ['newer:less', 'newer:autoprefixer', 'newer:copy:dev_css']
            },
            all: {
                options: {
                    events: ['remove']
                },
                files: '<%= config._public %>/**/*'
            }
        }
    });
    grunt.registerTask('common_step', ['jshint', 'less', 'autoprefixer']);
    grunt.registerTask('copy_static', ['copy:assets', 'copy:vendors']);
    grunt.registerTask('dev', ['copy_static', 'common_step', 'copy:dev', 'watch']);
    grunt.registerTask('serve', ['copy_static', 'common_step', 'uglify', 'cssmin', 'copy:serve']);
    grunt.registerTask('default', ['watch']);

};
