const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
} = require('customize-cra');
const path = require('path');

module.exports = override(
  addDecoratorsLegacy(),
  addWebpackAlias({
    '@shared': path.resolve(__dirname, 'src/shared'),
    '@modules': path.resolve(__dirname, 'src/modules'),
    '@globalComponents': path.resolve(__dirname, 'src/shared/components'),
    '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
    '@assets': path.resolve(__dirname, 'src/assets'),
  }),
);
