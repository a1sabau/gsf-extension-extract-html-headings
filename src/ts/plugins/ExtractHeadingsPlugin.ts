import { ISite, IResource, BasePlugin, IEnhancedJSONSchema } from 'get-set-fetch-extension-commons';

export default class ExtractHeadingsPlugin extends BasePlugin {
  getOptsSchema(): IEnhancedJSONSchema {
    return {
      $id: 'a1sabau/extract-html-headings.schema.json',
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'ExtractHeadingsPlugin',
      type: 'object',
      properties: {
        domRead: {
          type: 'boolean',
          const: true,
        },
      },
    };
  }

  test(site: ISite, resource: IResource) {
    return (/html/i).test(resource.mediaType);
  }

  apply(site: ISite, resource: IResource) {
    const content = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ].reduce(
      (content, selector) => {
        const txtVals: string[] = Array.from(document.querySelectorAll(selector)).map(heading => (heading as HTMLHeadingElement).innerText);

        if (txtVals.length > 0) {
          return Object.assign(content, { [selector]: txtVals });
        }

        return content;
      },
      {}
    );

    return {
      content,
    };
  }
}
