import gulp from 'gulp';
import mocha from 'gulp-mocha';
import plumber from 'gulp-plumber';
import env from 'gulp-env';
import gulpBabel from 'gulp-babel';
import pm2 from 'pm2';
import path from 'path';
import del from 'del';

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**'],
    tests: ['./server/test/**/*.test.js']
};

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });


// Clean up dist directory
function clean(cb) {
    del.sync(['dist/**']);
    cb();
}

// Compile all Babel Javascript into ES5 and put it into the dist dir
function babel() {
    return gulp.src(paths.js, { base: '.' })
        .pipe(gulpBabel())
        .pipe(gulp.dest('dist'));
}

// Set environment variables
function setEnv(cb) {
    env({
        vars: {
            NODE_ENV: 'test'
        }
    });
    cb();
}

// triggers mocha tests
function test(cb) {
    let exitCode = 0;
    return gulp.src(paths.tests, { read: false })
        .pipe(plumber())
        .pipe(mocha({
            reporter:'spec',
            ui: 'bdd',
            timeout: 2000,
            require: ['@babel/register'],
            exit: true
        }))/*
        .once('error', (err) => {
            console.log(err);
            exitCode = 1;
        })
        .once('end', () => {
            console.log('_________________HERE: 55________________________', exitCode);
            // process.exit(exitCode);
            cb();
        })*/;
}

// pm2 connect
function pm2Start(cb) {
    pm2.connect(err => {
        if (err)
            console.log('gulpfile.babel.js :27', err);
        pm2.restart({
            script: path.join('dist', 'index.js')
        }, err => {
            if (err)
                console.log('gulpfile.babel.js :35', err);
            return cb();
        })
    })
}

gulp.task('mocha', gulp.series(clean, babel, setEnv, test, done => done()));

gulp.task('watch', () => {
    gulp.watch(paths.js, gulp.series(babel, pm2Start));
});



// // Clean up dist directory
// gulp.task('clean', (cb) => {
//     console.log('_________________HERE: 20________________________');
//     return del('dist/**');
//     // cb();
// });
//
// // Set environment variables
// gulp.task('set-env', (cb) => {
//     env({
//         vars: {
//             NODE_ENV: 'test'
//         }
//     });
//     console.log('_________________HERE: 29________________________');
//     cb();
// });
//
// // Compile all Babel Javascript into ES5 and put it into the dist dir
// gulp.task('babel', () => {
//     console.log('_________________HERE: 36________________________');
//     return gulp.src(paths.js, { base: '.' })
//         .pipe(babel())
//         .pipe(gulp.dest('dist'));
// });
//
// // triggers mocha tests
// gulp.task('test', gulp.series('set-env', (cb) => {
//     let exitCode = 0;
//
//     console.log('_________________HERE: 45________________________');
//     return gulp.src([paths.tests], { read: false })
//         .pipe(plumber())
//         .pipe(mocha({
//             reporter:'spec',
//             ui: 'bdd',
//             timeout: 2000
//         }))
//         .once('error', (err) => {
//             console.log(err);
//             exitCode = 1;
//         })
//         .once('end', () => {
//             cb();
//             process.exit(exitCode);
//         });
// }));
//
// gulp.task('pm2', cb => {
//     pm2.connect(err => {
//         if (err)
//             console.log('gulpfile.babel.js :27', err);
//         pm2.restart({
//             script: path.join('dist', 'index.js')
//         }, err => {
//             if (err)
//                 console.log('gulpfile.babel.js :35', err);
//             return cb();
//         })
//     })
// });
//
// gulp.task('mocha', gulp.series('clean', 'babel', 'test', done => {
//     done();
// }));
//
// gulp.task('watch', () => {
//     gulp.watch(paths.js, gulp.series('babel', 'pm2'));
// });