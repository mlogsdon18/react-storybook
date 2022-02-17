var path = require('path');
var sassTrue = require('sass-true');

var sassFile = path.join(__dirname, 'true-sass-tests/sass_tests.scss');
sassTrue.runSass({file: sassFile}, {describe, it});
