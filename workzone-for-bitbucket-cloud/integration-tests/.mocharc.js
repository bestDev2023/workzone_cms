module.exports = {
  "require": ["ts-node/register", "./runner/hooks.ts"],
  "extensions": ["ts", "tsx"],
  "spec": "./specs/*.spec.ts",
  "no-package": true,
  "slow": 9000,
  "timeout": 0,
}
