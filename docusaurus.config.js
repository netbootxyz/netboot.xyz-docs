module.exports = {
  title: 'netboot.xyz',
  tagline: 'your favorite operating systems in one place',
  url: 'https://netboot.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'netbootxyz',
  projectName: 'netboot.xyz',
  themeConfig: {
    hideableSidebar: true,
    docsSideNavCollapsible: true,
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true
    },
    gtag: {
      trackingID: 'UA-68807-15',
    },
    navbar: {
      title: 'netboot.xyz',
      logo: {
        alt: 'netboot.xyz',
        src: 'img/nbxyz-logo.svg',
      },
      items: [
	      {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'downloads/',
          activeBasePath: 'downloads',
          label: 'Downloads',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/netbootxyz/netboot.xyz',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: 'docs/',
            },
            {
              label: 'Downloads',
              to: 'downloads/',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/An6PA2a',
            },
            {
	      label: 'Discussions',
	      href: 'https://github.com/netbootxyz/netboot.xyz/discussions',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/netbootxyz',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'Donate',
              href: 'https://opencollective.com/netbootxyz/donate',
            },
            {
              label: 'Status',
              href: 'https://status.netboot.xyz',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/netbootxyz/netboot.xyz',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} netboot.xyz`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/netbootxyz/netboot.xyz-docs/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/netbootxyz/netboot.xyz-docs/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
