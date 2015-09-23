module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            'my_target': {
                'files': {
                    'dest/libs.min.js': ['src/modernizr.custom.js', 'src/classie.js', 'src/modalEffects.js'],
                    'dest/personal.min.js': ['src/jquery.codetker.windowScroll.js', 'src/jquery.codetker.boxScroll.js', 'src/ready.js', 'src/datafix.js', 'src/search.js'],
                    'dest/token.min.js': ['src/token.js']
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'dest/style.min.css': ['style/style.css']
                }
            }
        },
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    pngquant: true
                },
                files: [{
                    expand: true,
                    src: ['images/*.{png,jpg,jpeg,gif,webp,svg}'],
                    dest: 'dest/'
                }]
            }
        },
        usemin: {
            html: 'dest/*.html'
        },
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'dest/',
                    src: ['*.html'],
                    dest: 'dest/'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['cssmin', 'uglify', 'imagemin', 'usemin', 'htmlmin']);

};