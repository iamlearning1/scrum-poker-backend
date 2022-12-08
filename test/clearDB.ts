const path = require('path');
const fs = require('fs');

(() => {
  fs.unlinkSync(path.join(__dirname, '..', 'test.sqlite'));
})();
