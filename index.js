var spdx = require('spdx');

var uses = ['use', 'link', 'modify'];

var endOfLine = /\r?\n/;
var comment = /^#/;
var empty = /^\s*$/;
var rule = new RegExp('^(' + uses.join('|') + '): (.+)$');

var allowAnyLicense = function() {
  return true;
};

module.exports = function(fileContent) {
  var returned = {};

  uses
    .forEach(function(use) {
      returned[use] = allowAnyLicense;
    });

  fileContent
    .split(endOfLine)
    .forEach(function(line) {
      if (!empty.test(line) && !comment.test(line)) {
        var match = rule.exec(line);
        if (match) {
          var use = match[1];
          var expression = match[2];
          if (uses.indexOf(use) < 0) {
            throw new Error('Invalid use, "' + use + '"');
          }
          returned[use] = function(argument) {
            return spdx.satisfies(argument, expression);
          };
        } else {
          throw new Error('Invalid line: "' + line + '"');
        }
      }
    });

  return returned;
};

module.exports.implementationVersion = '0.1.0';
module.exports.specificationVersion = '0.0.0-prerelease';
