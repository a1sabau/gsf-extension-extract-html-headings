import { crawlProjectBaseSuite, ICrawlDefinition } from 'get-set-fetch-extension-test-utils';


const crawlDefinitions: ICrawlDefinition[] = [
  {
    title: 'default maxDepth = -1',
    project: {
      name: 'projA',
      description: 'descriptionA',
      url: 'https://scrape.site.com/index.html',
      scenario: 'gsf-extension-extract-html-headings',
      plugins: [],
    },
    expectedResourceFields: [ 'url', 'mediaType', 'content' ],
    expectedResources: [
      {
        url: 'https://scrape.site.com/index.html',
        mediaType: 'text/html',
        content: {
          h1: [
            'Main Header 1',
          ],
        },
      },
      {
        url: 'https://scrape.site.com/pageA.html',
        mediaType: 'text/html',
        content: {
          h1: [
            'PageA Heading Level 1',
          ],
          h2: [
            'PageA Heading Level 2',
          ],
        },
      },
      {
        url: 'https://scrape.site.com/pageB.html',
        mediaType: 'text/html',
        content: {
          h1: [
            'PageB Heading Level 1',
          ],
          h3: [
            'PageB Heading Level 3',
          ],
        },
      },
    ],
    expectedCsv: [
      'url,content.h1,content.h2,content.h3',
      '"https://scrape.site.com/index.html","Main Header 1","",""',
      '"https://scrape.site.com/pageA.html","PageA Heading Level 1","PageA Heading Level 2",""',
      '"https://scrape.site.com/pageB.html","PageB Heading Level 1","","PageB Heading Level 3"',
    ],
    csvLineSeparator: '\n',
  },
];

crawlProjectBaseSuite('Extract Html Headings', crawlDefinitions);
