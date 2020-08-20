# -*- encoding: utf-8 -*-
{
    'name': 'Instagram Feed Snippet',
    'category': 'Website',
    'version': '13.0.1.1.0',
    'summary': 'Responsive instgram feed snippet with comments and likes + '
    'supported in Odoo v10, v11, v12, v13',
    'description': """
        Responsive instgram feed snippet with comments and likes +
        supported in Odoo v10, v11, v12, v13
    """,
    'depends': ['base', 'web', 'web_editor', 'website', ],
    'data': [
        'views/res_config_settings_views.xml',
        'views/snippets.xml',
    ],
    'demo': [],
    'price': 32.00,
    'currency': 'EUR',
    'support': 'business@axistechnolabs.com',
    'author': 'Axis Technolabs',
    'website': 'http://www.axistechnolabs.com',
    'installable': True,
    'license': 'AGPL-3',
    'images': ['static/description/images/main_screenshot.png'],
}
