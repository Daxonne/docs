import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    { type: 'doc', id: 'intro', label: 'Introduction' },
    { type: 'doc', id: 'getting-started', label: 'Getting Started' },
    {
      type: 'category',
      label: 'CLI Reference',
      collapsed: false,
      items: ['cli/overview', 'cli/init', 'cli/pull', 'cli/add', 'cli/generate'],
    },
    { type: 'doc', id: 'configuration', label: 'Configuration' },
    {
      type: 'category',
      label: 'Database Plugins',
      collapsed: false,
      items: ['plugins/overview', 'plugins/oracle', 'plugins/postgres', 'plugins/mysql'],
    },
    {
      type: 'category',
      label: 'Templates',
      collapsed: false,
      items: [
        'templates/overview',
        'templates/csharp-dapper',
        'templates/typescript-prisma',
        'templates/java-jpa',
        'templates/python-sqlalchemy',
        'templates/create-your-own',
      ],
    },
    { type: 'doc', id: 'type-mapping', label: 'Type Mapping' },
    { type: 'doc', id: 'architecture', label: 'Architecture' },
  ],
};

export default sidebars;
