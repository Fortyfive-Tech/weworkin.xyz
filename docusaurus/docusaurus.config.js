module.exports = {
  title: 'WeWorkIn.xyz',
  tagline: 'Open source talent board software',
  url: 'https://weworkin.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'Fortyfive-Tech', // Usually your GitHub org/user name.
  projectName: 'WeWorkIn.xyz', // Usually your repo name.
  themeConfig: {
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
            {
              label: 'How it works',
              to: 'docs/how-it-works/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Fortyfive Tech',
              href: 'https://fortyfive.tech',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fortyfive Tech. Built with Docusaurus.`,
    },
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
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
