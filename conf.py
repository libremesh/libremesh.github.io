# Data about this site
BLOG_AUTHOR = "LibreMesh"
BLOG_TITLE = "The LibreMesh project"
# This is the main URL for your site. It will be used
# in a prominent link
SITE_URL = "https://libremesh.org/"
BLOG_EMAIL = "info@libremesh.org"
BLOG_DESCRIPTION = "This is a LibreMesh website."

#
# Some things in the middle you don't really need to change...
#

# you can also keep the current content of POSTS if you want a blog with your site
POSTS = (
    ("posts/*.asc", "posts", "post.tmpl"),
    ("posts/*.rst", "posts", "post.tmpl"),
    ("posts/*.md", "posts", "post.tmpl"),
    ("posts/*.txt", "posts", "post.tmpl"),
    ("posts/*.html", "posts", "post.tmpl"),
)
# remove destination directory to generate pages in the root directory
PAGES = (
    ("pages/*.asc", "", "story.tmpl"),
    ("pages/*.md", "", "story.tmpl"),
    ("pages/*.rst", "", "story.tmpl"),
    ("pages/*.txt", "", "story.tmpl"),
    ("pages/*.html", "", "story.tmpl"),
)

# And to avoid a conflict because blogs try to generate /index.html
INDEX_PATH = "blog"

DEFAULT_LANG = "en"

TRANSLATIONS = {
    DEFAULT_LANG: "en",
    "es": "./es",
}

TRANSLATIONS_PATTERN = "{path}.{lang}.{ext}"

COMPILERS = {
    "asciidoc": ('.asc',),
    "rest": ('.rst', '.txt'),
    "markdown": ('.md', '.mdown', '.markdown'),
    "textile": ('.textile',),
    "txt2tags": ('.t2t',),
    "bbcode": ('.bb',),
    "wiki": ('.wiki',),
    "ipynb": ('.ipynb',),
    "html": ('.html', '.htm'),
}

WRITE_TAG_CLOUD = False

LOCALES = {}

IMAGE_FOLDERS = {'images': 'images'}

FILES_FOLDERS = {'files': 'files'}

NAVIGATION_LINKS = {
    DEFAULT_LANG: (
        ('/en/news.html', 'News'),
        ('/en/communication.html', 'Communication'),
        ('/en/getit.html', 'Get it!'),
        ('/en/howitworks.html', 'How it works'),
        ('/en/development.html', 'Development'),
        ('/en/docs/', 'Documentation'),
        ('/en/about.html', 'About'),
        # ((('/foo', 'FOO'),
        #   ('/bar', 'BAR')), 'BAZ'),
    ),
}

# FAVICONS contains (name, file, size) tuples.
# Used to create favicon link like this:
# <link rel="name" href="file" sizes="size"/>
# FAVICONS = (
#     ("icon", "/favicon.ico", "16x16")
# )
