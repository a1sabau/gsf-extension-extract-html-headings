import { IScenario, ExportType, IPluginDefinition, IEnhancedJSONSchema } from 'get-set-fetch-extension-commons';

import ConfigFormSchema from '../resources/config-form-schema';
import ExtractHeadingsPlugin from './plugins/ExtractHeadingsPlugin';

export default class ExtractHtmlHeadings implements IScenario {
  getConfigFormSchema() {
    return ConfigFormSchema as IEnhancedJSONSchema;
  }

  getConfigFormUISchema() {
    return ConfigFormSchema as IEnhancedJSONSchema;
  }

  getPluginDefinitions(scenarioProps) {
    const pluginDefinitions: IPluginDefinition[] = [
      {
        name: 'SelectResourcePlugin',
      },
      {
        name: 'FetchPlugin',
      },
      {
        name: 'ExtractUrlsPlugin',
      },
      {
        name: 'ExtractHeadingsPlugin',
      },
      {
        name: 'UpdateResourcePlugin',
      },
      {
        name: 'InsertResourcePlugin',
      },
    ];

    return pluginDefinitions;
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
        cols: [ 'url', 'info.content' ],
        fieldSeparator: ',',
        lineSeparator: '\n',
      },
    ];
  }
}

export const embeddedPlugins = {
  ExtractHeadingsPlugin,
};
