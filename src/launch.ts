import { program } from 'commander';

import fs from 'fs-extra';
import path from 'path';

interface Package {
    name: string;
    version: string;
    description: string;
    repository: string;
    author: string;
    license: string;
    scripts: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
}

const packageInfo: Package = fs.readJsonSync(path.join(__dirname,'../', 'package.json'));

// for cli

program
    .version(packageInfo.version)
    .description(packageInfo.description)
    .name(packageInfo.name);

program.parse();