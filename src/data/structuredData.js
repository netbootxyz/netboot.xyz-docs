// Schema.org structured data (JSON-LD) for netboot.xyz.
//
// Emitted via the <StructuredData> component. Helps search engines build
// entity/knowledge-graph signals and helps AI/LLM search parse the project.
// Keep facts here conservative and true — no invented versions or claims.

const SITE_URL = 'https://netboot.xyz';
const LOGO = `${SITE_URL}/img/nbxyz_logo_name.png`;

const DESCRIPTION =
  'netboot.xyz is an open-source iPXE bootloader that opens to a menu of ' +
  'network installers, live distros, and rescue utilities, fetched from ' +
  'upstream over the network so there is no install media to manage.';

export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'netboot.xyz',
  url: SITE_URL,
  logo: LOGO,
  description: DESCRIPTION,
  sameAs: [
    'https://github.com/netbootxyz/netboot.xyz',
    'https://x.com/netbootxyz',
    'https://discord.gg/An6PA2a',
    'https://opencollective.com/netbootxyz',
  ],
};

export const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'netboot.xyz',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const SOFTWARE_APPLICATION = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'netboot.xyz',
  description: DESCRIPTION,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'BIOS, UEFI (x86_64, arm64)',
  url: SITE_URL,
  downloadUrl: `${SITE_URL}/downloads`,
  isAccessibleForFree: true,
  offers: {'@type': 'Offer', price: '0', priceCurrency: 'USD'},
};

// Curated, evergreen subset of docs/faq.md. Keep concise answers in sync with
// the FAQ page; question text must match what the page renders.
const FAQ_ENTRIES = [
  {
    q: 'What is netboot.xyz?',
    a: 'netboot.xyz is a tool that allows you to boot your favorite operating system installers or various utilities over the network, all from a single menu system. The bootloader is very lightweight — under 1MB — which makes it quick to write to a USB key.',
  },
  {
    q: 'How does netboot.xyz work?',
    a: 'netboot.xyz uses the open-source iPXE project. The bootloader calls a webserver that hosts iPXE source files containing menus and logic for various installers. When you select an operating system, netboot.xyz retrieves the images from the project directory or trusted mirrors, and always displays where the file is being pulled from.',
  },
  {
    q: 'What is PXE Booting?',
    a: 'PXE stands for Pre-Boot eXecution Environment. It has been used for years to let clients boot from a server over the network, allowing automation inside the BIOS before a system boots off its hard drive. Its most common use is automating the installation of bare metal or virtual machines.',
  },
  {
    q: 'Can I create my own configurations?',
    a: 'Yes. You can fork netboot.xyz-custom and create your own menu, then set your GitHub user from the Utility menu so your menu shows up in the main menu. You can also custom-compile the netboot.xyz iPXE code with your github_user baked in.',
  },
  {
    q: 'Does netboot.xyz support Secure Boot?',
    a: 'Yes. netboot.xyz provides pre-built Secure Boot compatible images that use a Microsoft-trusted shim to chainload a signed iPXE binary, so you can network boot without disabling Secure Boot. End-to-end Secure Boot installation is currently limited to a subset of distributions (Debian, Devuan, and Kali Linux).',
  },
  {
    q: 'How does netboot.xyz keep OS versions up to date?',
    a: 'A CI/CD system monitors upstream projects for new releases. For releases without hosted installer kernels, it downloads the ISO, extracts it, repackages it with the needed iPXE files, and pushes the release to the endpoints.yml file that drives the menu options.',
  },
];

export const FAQ_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ENTRIES.map(({q, a}) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {'@type': 'Answer', text: a},
  })),
};
