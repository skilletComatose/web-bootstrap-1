module.exports = function (grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    grunt.initConfig({
        sass: {
            dist:{
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            files: ['scss/*.scss'],
            tasks: ['css']
        },

        browserSync: {
            dev: {
                bsFiles: {//browser files
                    src: ['css/*.css', '*.html', 'js/*.js']
                },
                options: {
                    watchTask: true,
                    server:{
                        baseDir: './' //directorio base para el servidor
                    }
                }

            }
        },
        
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'img/*.{png,gif,jpg,jpeg}',
                    dest: 'dist'
                }]
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [
                    {
                        //front font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/open-iconic/font',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }
                ]
            }
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        cssmin:{
            dist:{}
        },

        ugligy:{
            dist:{}
        },

        filerev:{
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                //filerev:release hashes(md5)
                // in dist directory
                files: [{
                    src: ['dist/js/*.js', 'dist/css/*.css']
                }]
            }
        },

        concat: {
            options: { separator: ';'},
            dist: {}
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html', 'about.html', 'precios.html', 'contact.html']
            },

            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    posts: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },

        usemin: {
            html: ['dist/index.html', 'dist/about.html', 'dist/precios.html', 'dist/contact.html'],
            options: {
                assetsDir: ['dist/index.html', 'dist/css','dist/js']
            }
        }
    });

    /*grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');  estos ya no se usarán porque se hizo la configuración con el require*/

    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync', 'watch']);
    grunt.registerTask('img:compress',['imagemin']);
    grunt.registerTask('build',['clean', 'copy', 'imagemin', 'useminPrepare','concat', 'cssmin', 'uglify', 'filerev', 'usemin']); /*esta linea registra las tareas de la confi */

};