'use strict';

const {readFileSync, writeFileSync, existsSync} = require('fs');
const {dirname} = require('path');
const {execSync} = require('child_process');
const pkg = require('../package.json');

const outputPackageFile =
  '../../build/oss-stable-semver/eslint-plugin-react-hooks/package.json';

if (existsSync(outputPackageFile)) {
  const outputPackage = JSON.parse(readFileSync(outputPackageFile, 'utf8'));
  outputPackage.name = `@tiny-codes/${pkg.name}`;
  outputPackage.version = pkg.version;
  writeFileSync(outputPackageFile, JSON.stringify(outputPackage, null, 2));

  const outputPackageDir = dirname(outputPackageFile);
  execSync(`npm publish`, {
    cwd: outputPackageDir,
    stdio: 'inherit',
  });
} else {
  // eslint-disable-next-line react-internal/warning-args, react-internal/no-production-logging
  console.error(`Output package file ${outputPackageFile} does not exist.`);
  process.exit(1);
}
