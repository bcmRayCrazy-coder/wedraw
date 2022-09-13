import { PNG } from 'pngjs';
import fs from 'fs-extra';
import { ask, askColor } from '../ask';
import RGBAColor from '../../class/RGBAColor';

class ImageEditor {
    imagePath: string;
    png: PNG | undefined;

    constructor(imagePath: string) {
        this.imagePath = imagePath;
    }

    load(): Promise<PNG> {
        return new Promise(
            (resolve: (v: PNG) => void, reject: (r: Error) => void) => {
                fs.createReadStream(this.imagePath).pipe(
                    new PNG({ filterType: 4 })
                        .on('parsed', function () {
                            resolve(this);
                        })
                        .on('error', reject)
                );
            }
        );
    }

    async initImage() {
        const color: RGBAColor = await askColor(
            'Please select background color'
        );
    }
}

export default ImageEditor;
