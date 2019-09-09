import path from 'path';
import { TgzHelper } from 'get-set-fetch-extension-test-utils';
import shell from 'shelljs';

// copy dist over the uncompressed package dir
const distPath = path.join(process.cwd(), 'dist');
const npmPkgPath = path.join(process.cwd(), 'test', 'resources', 'sites', 'registry.npmjs.org', 'gsf-extension-extract-html-headings', '-', 'package');

shell.rm('-rf', npmPkgPath);
shell.mkdir(npmPkgPath);
shell.cp('-r', distPath, npmPkgPath);

// tar and zip the npm package
const npmPkgParentPath = path.join(process.cwd(), 'test', 'resources', 'sites', 'registry.npmjs.org', 'gsf-extension-extract-html-headings', '-');
const tgzPath = path.join(process.cwd(), 'test', 'resources', 'sites', 'registry.npmjs.org', 'gsf-extension-extract-html-headings', '-');
const tgzName = 'gsf-extension-extract-html-headings-0.1.0';
TgzHelper.tgz(npmPkgParentPath, tgzPath, tgzName);
