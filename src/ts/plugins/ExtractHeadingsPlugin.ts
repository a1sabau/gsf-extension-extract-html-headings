import { SchemaHelper, IPlugin, ISite, IResource } from 'get-set-fetch-extension-commons';

export default class ExtractHeadingsPlugin implements IPlugin {
  opts: {
    runInTab: boolean;
    selectors: string;
  };

  constructor(opts) {
    this.opts = SchemaHelper.instantiate(ExtractHeadingsPlugin.OPTS_SCHEMA, opts);
  }

  static get OPTS_SCHEMA() {
    return {
      $id: 'a1sabau/extract-html-headings.schema.json',
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'ExtractHeadingsPlugin',
      type: 'object',
      properties: {
        runInTab: {
          type: 'boolean',
          default: true,
        },
      },
    };
  }

  test(resource: IResource) {
    return (/html/i).test(resource.mediaType);
  }

  apply(site: ISite, resource: IResource) {
    const headings = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ].reduce((headings, selector) => headings.concat(
      Array.from(document.querySelectorAll(selector)).map(heading => (heading as HTMLHeadingElement).innerText),
    ), []);

    return {
      info: {
        content: headings,
      },
    };
  }
}
