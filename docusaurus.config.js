const XSvg =
  '<svg style="fill: #000000; vertical-align: middle;" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>';

module.exports = {
  title: "netboot.xyz",
  tagline: "your favorite operating systems in one place",
  url: "https://netboot.xyz",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "netbootxyz",
  projectName: "netboot.xyz",
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    metadata: [
      {name: 'keywords', content: 'ipxe, netbootxyz, pxe, linux, os, operating system, install, installer, netboot, netboot.xyz, network boot, tftp, uefi'},
      {name: 'description', content: 'Network boot your favorite operating systems, installers and utilities from one menu over the network with iPXE'},
      {name: 'author', content: 'netboot.xyz team'},
      {property: 'og:type', content: 'website'},
      {property: 'og:image', content: 'https://netboot.xyz/img/nbxyz_logo_name.png'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@netbootxyz'}
    ],
    prism: {
      additionalLanguages: ['bash', 'yaml', 'json', 'nginx', 'ini', 'powershell', 'python'],
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    docsSideNavCollapsible: true,
    image: 'img/nbxyz_logo_name.png',
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    announcementBar: {
      id: "announcementBar-1", // Increment on change
      content: `If you like netboot.xyz, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/netbootxyz/netboot.xyz">GitHub</a>⭐️, follow us on <a target="_blank" rel="noopener noreferrer" href="https://x.com/netbootxyz">${XSvg}</a> and join our <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/An6PA2a">Discord</a>!`,
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
    },
    algolia: {
      appId: "BMY28LDVW4",
      apiKey: "51b51a157c47742003b8943f2c5acc09",
      indexName: "netboot",
      contextualSearch: true,
      searchParameters: {
        facetFilters: [],
      },
      searchPagePath: 'search',
    },
    navbar: {
      title: "netboot.xyz",
      logo: {
        alt: "netboot.xyz",
        src: "img/nbxyz-logo.svg",
        srcDark: "img/nbxyz-logo-dark.svg",
      },
      items: [
        {
          to: "docs",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "downloads",
          activeBasePath: "downloads",
          label: "Downloads",
          position: "left",
        },
        {
          to: "blog",
          label: "Blog",
          position: "left",
        },
        {
          href: "https://store.netboot.xyz",
          label: "Store",
          position: "left",
        },
        {
          href: "https://github.com/sponsors/netbootxyz",
          label: "Donate",
          position: "left",
        },       
        {
          href: "https://github.com/netbootxyz/netboot.xyz",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Documentation",
              to: "docs",
            },
            {
              label: "Downloads",
              to: "downloads",
            },
            {
              label: "Blog",
              to: "blog",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/An6PA2a",
            },
            {
              label: "Discussions",
              href: "https://github.com/orgs/netbootxyz/discussions",
            },
            {
              label: "X",
              href: "https://x.com/netbootxyz",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Donate",
              href: "https://opencollective.com/netbootxyz/donate",
            },
            {
              label: "GitHub",
              href: "https://github.com/netbootxyz/netboot.xyz",
            },
            {
              label: "Status",
              href: "https://status.netboot.xyz",
            },
            {
              label: "Store",
              href: "https://store.netboot.xyz",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} netboot.xyz`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/netbootxyz/netboot.xyz-docs/edit/master/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/netbootxyz/netboot.xyz-docs/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-VBSC8VX50S",
        },
      },
    ],
  ],
};
