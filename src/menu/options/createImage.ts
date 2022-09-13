import { ask, askNumber } from '../../lib/void/ask';

import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';
import ImageEditor from '../../lib/void/editor/ImageEditor';
import { PNG } from 'pngjs';

async function checkFileAndDir(
    imagePath: string,
    fullPath: string
): Promise<boolean> {
    if (!(await fs.pathExists(imagePath))) {
        console.error(chalk.red('Path not exists'));
        return false;
    }

    if (fs.existsSync(fullPath)) {
        console.error(chalk.red('File already exists'));
        return false;
    }
    return true;
}

export default async function (): Promise<boolean> {
    var imageName =
        (await ask('Please enter the image name', undefined, '.png')) + '.png';
    var imagePath = await ask('Please enter the path to save image');

    var fullPath = path.join(imagePath, imageName);
    if (!(await checkFileAndDir(imagePath, fullPath))) return false;
    
    new PNG({
        width: await askNumber("Please enter the width of image"),
        height:await askNumber("Please enter the width of image"),
        bgColor:{
            red:0,
            green:0,
            blue:0
        },
    }).pack().pipe(fs.createWriteStream(fullPath));

    var editor: ImageEditor = new ImageEditor(fullPath);
    await editor.load();
    await editor.initImage();

    return true;
}
