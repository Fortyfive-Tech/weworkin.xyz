module.exports = {
  title: 'WeWorkIn.xyz | Open Source Talent Board Software',
  tagline: 'Open source talent board software',
  url: 'https://weworkin.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'Fortyfive-Tech', // Usually your GitHub org/user name.
  projectName: 'WeWorkIn.xyz', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'getting-started',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/Fortyfive-Tech/weworkin.xyz/tree/master/docusaurus',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
