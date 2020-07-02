module.exports = {
    locales: {
        '/': {
            lang: 'en-US',
            title: "GXChain Docs",
            description: "The Technical Docs of GXChain"
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'GXChain文档',
            description: 'GXChain技术文档'
        }
    },
    head: [
        ['link', {rel: 'icon', href: `/logo.png`}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#21a4e7'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', {rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png`}]
    ],
    serviceWorker: true,
    themeConfig: {
        repo: 'gxchain/docs',
        sidebarDepth: 5,
        editLinks: true,
        docsDir: 'docs',
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                nav: [
                    {
                        text: 'Guide',
                        link: '/guide/',
                    },
                    {
                        text: 'Advanced',
                        link: '/advanced/',
                    },
                    {
                        text: 'Smart Contract',
                        link: '/contract/',
                    },
                    {
                        text: 'FAQs',
                        link: '/faq/',
                    },
                    {
                        text: 'Ecosystem',
                        link: '/ecosystem/',                    }
                ],
                sidebar: {
                    '/guide/': genSidebarConfig ('guide', 'Guide'),
                    '/advanced/': genSidebarConfig ('advanced', 'Advanced'),
                    '/contract/': genSidebarConfig ('contract', 'Smart Contract'),
                    '/faq/': genSidebarConfig ('faq', 'FAQ'),
                    '/ecosystem/': genSidebarConfig ('ecosystem', "Ecosystem")
                }
            },
            '/zh/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用",
                        buttonText: "刷新"
                    }
                },
                nav: [
                    {
                        text: '指南',
                        link: '/zh/guide/',
                    },
                    {
                        text: '高级教程',
                        link: '/zh/advanced/',
                    },
                    {
                        text: '智能合约',
                        link: '/zh/contract/'
                    },
                    {
                        text: '常见问题',
                        link: '/zh/faq/',
                    },
                    {
                        text: '生态系统',
                        link: '/zh/ecosystem/'
                    }
                ],
                sidebar: {
                    '/zh/guide/': genSidebarConfig ('guide', '指南'),
                    '/zh/advanced/': genSidebarConfig ('advanced', '高级教程'),
                    '/zh/faq/': genSidebarConfig ('faq', '常见问题'),
                    '/zh/contract/': genSidebarConfig ('contract', '智能合约'),
                    '/zh/ecosystem/': genSidebarConfig ('ecosystem','生态系统')
                }
            }
        }
    }
};

function genSidebarConfig (module, title) {
    if (module === 'guide') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    '',
                    'clients',
                    'apis'
                ]
            }
        ];
    }
    if (module === 'advanced') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    '',
                    'keypair',
                    'signature',
                    'send_transaction',
                    'confirm_transaction',
                    'deal_with_memo',
                    'asset',
                    'trustnode',
                    'api_server',
                    'snapshot',
                    'testnet',
                    'private_chain',
                    'block_operation_object',
                    'account_rule',
                    'cli_wallet',
                    'witness_node',
                    'mul_sign',
                    'plugin_txid',
                    'plugin_fullnode',
                    'staking',
                    'plugin_account_history_leveldb'
                ]
            }
        ];
    }
    if (module === 'faq') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    ''
                ]
            }
        ];
    }
    if (module === 'contract') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    '',
                    'develop',
                    'deploy',
                    'debug',
                    'question',
                    'error_collection',
                    'abi',
                    'movetable',
                    'contractfee'
                ]
            }
        ];
    }

    if (module === 'ecosystem') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    '',
                    'des',
                    'baas_storage'
                ]
            }
        ];
    }
}
