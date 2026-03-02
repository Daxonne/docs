import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Daxonne',
  tagline: 'Language-agnostic code generation from your database schema.',
  favicon: 'img/favicon.ico',

  url: 'https://daxonne.github.io',
  baseUrl: '/',

  organizationName: 'Daxonne',
  projectName: 'docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Daxonne/docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/daxonne-social.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Daxonne',
      logo: {
        alt: 'Daxonne Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/Daxonne/core',
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
            { label: 'Getting Started', to: '/getting-started' },
            { label: 'CLI Reference', to: '/cli/overview' },
            { label: 'Templates', to: '/templates/overview' },
            { label: 'Architecture', to: '/architecture' },
          ],
        },
        {
          title: 'Repositories',
          items: [
            { label: 'core', href: 'https://github.com/Daxonne/core' },
            { label: 'templates', href: 'https://github.com/Daxonne/templates' },
            { label: 'docs', href: 'https://github.com/Daxonne/docs' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Daxonne. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'go', 'csharp', 'typescript', 'java', 'python', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
