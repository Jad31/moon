/* eslint-disable sort-keys */
// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	docs: [
		'intro',
		{
			type: 'category',
			label: 'How it works',
			collapsed: true,
			collapsible: true,
			items: ['how-it-works/languages', 'how-it-works/project-graph', 'how-it-works/dep-graph'],
			link: {
				type: 'generated-index',
				title: 'How it works',
				slug: '/how-it-works',
				keywords: [
					'how',
					'works',
					'mental-model',
					'languages',
					'project-graph',
					'dep-graph',
					'dependency-graph',
				],
			},
		},
		{
			type: 'category',
			label: 'Getting started',
			collapsed: false,
			collapsible: true,
			items: [
				'install',
				'setup-workspace',
				'setup-toolchain',
				'create-project',
				'create-task',
				'run-task',
				'migrate-to-moon',
			],
		},
		{
			type: 'category',
			label: 'Concepts',
			items: [
				'concepts/cache',
				'concepts/file-group',
				'concepts/file-pattern',
				'concepts/query-lang',
				'concepts/project',
				'concepts/target',
				'concepts/task',
				'concepts/token',
				'concepts/toolchain',
				'concepts/workspace',
			],
			link: {
				type: 'generated-index',
				title: 'Concepts',
				slug: '/concepts',
				keywords: ['concepts'],
			},
		},
		{
			type: 'category',
			label: 'Config files',
			items: [
				'config/workspace',
				'config/toolchain',
				'config/tasks',
				'config/project',
				'config/template',
			],
			link: {
				type: 'generated-index',
				title: 'Config files',
				slug: '/config',
				keywords: ['config'],
			},
		},
		{
			type: 'category',
			label: 'Editors',
			items: ['editors/vscode'],
			link: {
				type: 'generated-index',
				title: 'Editors',
				slug: '/editors',
				keywords: ['editors', 'vscode'],
			},
		},
		{
			type: 'category',
			label: 'Commands',
			items: [
				'commands/overview',
				'commands/bin',
				'commands/ci',
				'commands/check',
				'commands/clean',
				'commands/completions',
				'commands/dep-graph',
				{
					type: 'category',
					label: 'docker',
					items: ['commands/docker/prune', 'commands/docker/scaffold', 'commands/docker/setup'],
					link: {
						type: 'generated-index',
						title: 'docker',
						description: 'Operations for integrating with Docker and Dockerfiles.',
						slug: '/commands/docker',
						keywords: ['cli', 'commands', 'docker'],
					},
				},
				'commands/generate',
				'commands/init',
				{
					type: 'category',
					label: 'migrate',
					items: ['commands/migrate/from-package-json', 'commands/migrate/from-turborepo'],
					link: {
						type: 'generated-index',
						title: 'migrate',
						description: 'Operations for migrating existing projects to moon.',
						slug: '/commands/migrate',
						keywords: ['cli', 'commands', 'migrate'],
					},
				},
				'commands/project',
				'commands/project-graph',
				{
					type: 'category',
					label: 'query',
					items: [
						'commands/query/hash',
						'commands/query/hash-diff',
						'commands/query/projects',
						'commands/query/tasks',
						'commands/query/touched-files',
					],
					link: {
						type: 'generated-index',
						title: 'query',
						description:
							'Query information about moon, its projects, their tasks, the environment, the pipeline, and many other aspects of the workspace.',
						slug: '/commands/query',
						keywords: ['cli', 'commands', 'query'],
					},
				},
				'commands/run',
				'commands/setup',
				{
					type: 'category',
					label: 'sync',
					items: ['commands/sync/codeowners', 'commands/sync/hooks', 'commands/sync/projects'],
					link: {
						type: 'generated-index',
						title: 'sync',
						description: 'Operations for syncing the workspace to a healthy state.',
						slug: '/commands/sync',
						keywords: ['sync', 'codeowners', 'projects'],
					},
				},
				'commands/task',
				'commands/teardown',
				'commands/upgrade',
			],
			link: {
				type: 'generated-index',
				title: 'Commands',
				slug: '/commands',
				keywords: ['cli', 'commands'],
			},
		},
		'cheat-sheet',
		'comparison',
		'terminology',
		'faq',
		{
			type: 'link',
			label: 'Changelog',
			href: 'https://github.com/moonrepo/moon/releases',
		},
	],

	guides: [
		'guides/ci',
		'guides/codegen',
		'guides/codeowners',
		'guides/docker',
		'guides/offline-mode',
		'guides/open-source',
		'guides/profile',
		'guides/remote-cache',
		'guides/root-project',
		'guides/sharing-config',
		'guides/webhooks',
		'guides/vcs-hooks',
		{
			type: 'html',
			value: '<hr />',
			defaultStyle: true,
		},
		{
			type: 'category',
			label: 'JavaScript',
			collapsed: false,
			items: [
				'guides/javascript/deno-handbook',
				'guides/javascript/node-handbook',
				'guides/javascript/typescript-project-refs',
				{
					type: 'category',
					label: 'Examples',
					collapsed: true,
					collapsible: true,
					items: [
						'guides/examples/angular',
						'guides/examples/astro',
						'guides/examples/eslint',
						'guides/examples/jest',
						'guides/examples/nest',
						'guides/examples/next',
						'guides/examples/nuxt',
						'guides/examples/packemon',
						'guides/examples/prettier',
						'guides/examples/react',
						'guides/examples/remix',
						'guides/examples/solid',
						'guides/examples/storybook',
						'guides/examples/sveltekit',
						'guides/examples/typescript',
						'guides/examples/vite',
						'guides/examples/vue',
					],
					link: {
						type: 'generated-index',
						title: 'Node.js examples',
						slug: '/guides/node/examples',
						keywords: ['node', 'javascript', 'typescript', 'guides', 'examples', 'tools'],
					},
				},
			],
		},
		{
			type: 'html',
			value: '<hr />',
			defaultStyle: true,
		},
		{
			type: 'category',
			label: 'Rust',
			collapsed: false,
			items: ['guides/rust/handbook'],
		},
	],

	proto: [
		'proto/index',
		'proto/install',
		'proto/detection',
		'proto/config',
		'proto/tools',
		'proto/plugins',
		'proto/faq',
		{
			type: 'category',
			label: 'Commands',
			items: [
				'proto/commands/alias',
				'proto/commands/bin',
				'proto/commands/clean',
				'proto/commands/completions',
				'proto/commands/global',
				'proto/commands/install',
				'proto/commands/install-global',
				'proto/commands/list',
				'proto/commands/list-global',
				'proto/commands/list-remote',
				'proto/commands/local',
				'proto/commands/run',
				'proto/commands/setup',
				'proto/commands/unalias',
				'proto/commands/uninstall',
				'proto/commands/upgrade',
				'proto/commands/use',
			],
		},
	],
};

// eslint-disable-next-line import/no-commonjs
module.exports = sidebars;
