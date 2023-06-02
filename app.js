const path = require('node:path');
// const fs = require('node:fs');
const fs = require('node:fs/promises');

// for (let i = 1; i <= 5; i++) {
//     fs.mkdir(path.join(__dirname, `folder_${i}`, `helper_${i}`), {recursive: true}, (err, string) => {
//         if (err) throw new Error(err.message);
//         fs.writeFile(path.join(string, `text_${i}.json`), `Hallow, I am number ${i}`, (err, data) => {
//             if (err) throw new Error(err.message);
//         })
//     });
// }

const create = async () => {
    const base_folder_path = path.join(process.cwd(), 'base_folder');

    await fs.mkdir(base_folder_path);
    const files = ['file_1', 'file_2', 'file_3', 'file_4', 'file_5', 'file_6'];

    const folders = ['folder_1', 'folder_2', 'folder_3', 'folder_4', 'folder_5'];

    await Promise.all(folders.map(async (folder) => {
        const folder_path = path.join(base_folder_path, folder);

        await fs.mkdir(folder_path);

        await Promise.all(files.map(async (file) => {
            await fs.writeFile(path.join(folder_path, `${file}.txt`), `I am ${file} 😜`);
        }));
    }));
};

create().then();

// const create = async () => {
//     const base_folder_path = path.join(process.cwd(), 'base_folder');
//
//     await fs.mkdir(base_folder_path, {recursive: true});
//
//     const files = ['file_1', 'file_2', 'file_3', 'file_4', 'file_5'];
//
//     const folders = ['folder_1', 'folder_2', 'folder_3', 'folder_4', 'folder_5'];
//
//     // await Promise.all(
//     //     folders.map(async (folder) => {
//     //         await fs.mkdir(path.join(base_folder_path, folder));
//     //     }));
//     //
//     //
//     // await Promise.all(files.map(async (file) => {
//     //     await fs.writeFile(path.join(base_folder_path, `${file}.json`), `{\n "name": "${file}",\n "status": "finished"\n}`);
//     // }));
//
//     // const readDir = await fs.readdir(base_folder_path, {withFileTypes:true});
//     // readDir.map(file => {
//     //    console.log(file, ':', file.isFile() ? 'file' : 'directory')
//     // });
//
//     const readDir = await fs.readdir(base_folder_path);
//     readDir.map(async (file) => {
//         const stats = await fs.stat(path.join(base_folder_path, file));
//         console.log(file, ':', stats.isFile() ? 'file' : 'directory')
//     });
// };
//
// create().then();
