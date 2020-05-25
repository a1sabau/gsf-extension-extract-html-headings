import { IScenario, ExportType } from 'get-set-fetch-extension-commons';

import ExtractHeadingsPlugin from './plugins/ExtractHeadingsPlugin';

export default class ExtractHtmlHeadings implements IScenario {
  getPluginNames() {
    return [
      'SelectResourcePlugin',
      'FetchPlugin',
      'ExtractUrlsPlugin',
      'ExtractHeadingsPlugin',
      'InsertResourcesPlugin',
      'UpsertResourcePlugin',
    ];
  }

  getResultTableHeaders() {
    return [
      {
        label: 'Headings',
        render: row => (row.info ? row.info.content : ''),
      },
      {
        label: 'URL',
        render: row => (row.url),
      },
    ];
  }

  getResultExportOpts() {
    return [
      {
        type: ExportType.CSV,
        cols: [ 'url', 'content' ],
        fieldSeparator: ',',
        lineSeparator: '\n',
      },
      {
        type: ExportType.ZIP,
        cols: [ 'blob' ],
      },
    ];
  }
}

export const embeddedPlugins = {
  ExtractHeadingsPlugin,
};
