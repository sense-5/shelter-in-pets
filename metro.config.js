module.exports = {
  resolver: {
    // Change 2 (add 'bin' to assetExts)
    assetExts: ['bin', 'txt', 'jpg', 'png', 'ttf'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    // Change 3 (add platform_node to blacklist)
  },
};
