Check project licenses against [.licenserc](http://licenserc.org) rules.

```javascript
var licenserc = require('licenserc')
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
  'link: (MIT OR ISC OR Apache-2.0)' ]
  .join('\n'))

assert(rules.link('MIT'))
assert(!rules.link('GPL-3.0'))
assert.throws(
  function() {
    rules.link('Invalid License Identifier') })

assert.equal(licenserc.implementationVersion, '0.1.0')
assert.equal(licenserc.specificationVersion, '0.0.0-prerelease')
```
