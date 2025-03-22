const TwitterSvg =
  '<svg style="fill: #1DA1F2; vertical-align: middle;" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>';

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
    metadata: [{name: 'keywords', content: 'ipxe, netbootxyz, pxe, linux, os, operating system, install, installer, netboot, netboot.xyz'}],
    prism: {
      additionalLanguages: ['bash', 'yaml'],
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
      content: `If you like netboot.xyz, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/netbootxyz/netboot.xyz">GitHub</a>⭐️, follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/netbootxyz" >Twitter</a> ${TwitterSvg} and join our <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/An6PA2a">Discord</a>!`,
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
    },
    algolia: {
      appId: "BMY28LDVW4",
      apiKey: "51b51a157c47742003b8943f2c5acc09",
      indexName: "netboot",
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
