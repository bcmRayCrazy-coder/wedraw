import { askNumber } from '../../src/lib/void/ask';
async function main() {
    console.log(await askNumber("number question",100));
}
main();