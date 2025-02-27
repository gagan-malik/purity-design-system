const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Read package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const package = require(packagePath);

// Get version bump type from command line argument
const bumpType = process.argv[2] || 'patch'; // default to patch
const validBumpTypes = ['major', 'minor', 'patch'];

if (!validBumpTypes.includes(bumpType)) {
  console.error('Invalid bump type. Use: major, minor, or patch');
  process.exit(1);
}

// Parse current version
const [major, minor, patch] = package.version.split('.').map(Number);

// Calculate new version
let newVersion;
switch (bumpType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// Update package.json
package.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');

console.log(`Version bumped to ${newVersion}`);

try {
  // Run rollup build
  console.log('Running rollup build...');
  execSync('npm run rollup', { stdio: 'inherit' });

  // Publish to npm
  console.log('Publishing to npm...');
  execSync('npm publish', { stdio: 'inherit' });

  console.log('✨ Package published successfully!');
} catch (error) {
  console.error('Error during build or publish:', error.message);
  process.exit(1);
} 