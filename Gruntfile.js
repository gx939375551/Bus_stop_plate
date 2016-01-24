module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //编译less文件成为css文件
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false
                },
                files: {
                    "offline/css/index.css": "offline/less/index.less",
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 4 versions']
                    })
                ]
            },
            dist: {
                src: 'offline/css/*.css'
            }
        },
        //压缩css文件--优化
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'online/css/index.min.css': ['offline/css/index.css']
                }
            }
        },
        //监听index.less文件,执行编译，压缩;
        watch: {
            scripts: {
                files: ['offline/less/index.less'],
                tasks: ['less', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
        }
    });
    //编译less
    grunt.loadNpmTasks('grunt-contrib-less');
    //兼容
    grunt.loadNpmTasks('grunt-postcss');
    //压缩css
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //监听
    grunt.loadNpmTasks('grunt-contrib-watch');
    //注册
    grunt.registerTask('default', ['less', 'postcss:dist','cssmin', 'watch']);
};
