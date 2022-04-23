// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

const jestGlobalSetup = () => {
  console.log('jestSetup');

  if (process.env.CI !== 'true') {
    const out = execSync('docker compose -p cuenta-coins-testing -f docker-compose-test.yml up -d');
    console.log(out.toString('utf-8'));
  }
};

module.exports = jestGlobalSetup;
