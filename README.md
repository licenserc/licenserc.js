licenserc.js
============

[![npm version](https://img.shields.io/npm/v/licenserc.svg)](https://www.npmjs.com/package/licenserc)
[![licenserc specification version](https://img.shields.io/badge/licenserc-0.0.0--prerelease-blue.svg)](http://licenserc.org)
[![license](https://img.shields.io/badge/license-Apache--2.0-303284.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![build status](https://img.shields.io/travis/licenserc/licenserc.js.svg)](http://travis-ci.org/licenserc/licenserc.js)

Check project licenses against [.licenserc](http://licenserc.org) rules.

```js
var licenserc = require('licenserc');
var assert = require('assert')

var rules = licenserc([
  '# A comment',
  'link: (ISC OR Apache-2.0)',
  // A line full of whitespace
  '    ',
  'modify: (MIT OR ISC)',
  // An empty line
  '',
  'use: (MIT OR GPL-1.0+)',
  // Only this last "link" rule applies.
  'link: (MIT OR ISC OR Apache-2.0)'
].join('\n'));

rules.link('MIT'); // => true
rules.link('GPL-3.0'); // => false
assert.throws(
  function() {
    rules.link('Invalid License Identifier');
  }
);

assert.equal(licenserc.implementationVersion, '0.1.0');
assert.equal(licenserc.specificationVersion, '0.0.0-prerelease');
```
