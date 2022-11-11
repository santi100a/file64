import { Command } from "commander";
import { textSync } from "figlet";
import { promises as FSPromises, type PathLike } from "node:fs";

const VERSION = 'v1.0.1';
const CLI_NAME = 'File to Base64';
const program = new Command()
.version(VERSION)
.description('Encodes a file in Base64 format.')
.option('-p, --picture [image-type]', 'If the file is an image, specify image format. Default is JPEG.')
.argument('<filename> [output]', 'Filename to encode, and output file (default is stdout).')
.parse(process.argv);

console.clear();
console.log('\x1b[32m%s\x1b[0m', textSync(CLI_NAME));
const options = program.opts();
async function read(filename: PathLike, encoding?: BufferEncoding): Promise<
[string | Buffer, null] | [null, Error]
> {
    try {
        return [await FSPromises.readFile(filename, encoding), null];
    } catch (error) {
        return [null, error as Error];
    }
}
(async function () {
    const [ filename, output ] = program.args;
    const [ file, error ] = await read(filename, 'utf8');
    

    if (error) {
        if (error.message.includes('no such file or directory')) {
            console.log('\x1b[31m%s\x1b[0m', `✗ File doesn't exist.`);
            process.exit(1);
        } 
        console.log('\x1b[31m%s\x1b[0m', `✗ An error has ocurred while reading the file. ${error}.`);
        process.exit(1);
    }

    if (options.picture) {
        const base64 = 
        `data:image/${options.picture || 'jpeg'};base64,${Buffer.from(file).toString('base64')}.`;
        console.log('Encoded file is: %s', base64);
        process.exit(0);
    }
    const base64 = Buffer.from(file).toString('base64');
    if (output) {
        async function writeFile(filename: PathLike, encoding?: BufferEncoding): Promise<Error | null> {
            try {
                await FSPromises.writeFile(filename, encoding || 'utf8');
                return null;
            } catch (err) {
                return err as Error;
            }
        }
        const err = await writeFile(filename.concat('-base64'));
        if (err) {
            console.log('\x1b[31m%s\x1b[0m', `✗ An error has ocurred while writing the file. ${error}.`);
            process.exit(1);
        }
    }

    console.log('Encoded file is: %s', base64);
})();
