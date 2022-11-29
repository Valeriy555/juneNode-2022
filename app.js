const fs = require('fs');

// fs.readFile('./text.txt',  (err, data) => {  // прочитать файл
//     console.log(err, 'ERR');
//
//     console.log(data);
//
//     console.log(data.toString()); // данные перевели в стрингу
// });

// fs.appendFile('./text.txt', 'HELLO CHAT \n',  (err) => { // добавляет в фаил данные
//     console.log('ERR',err);
// });
//
// fs.writeFile('./text.txt', 'WRITE FILE', (err) => { // перезаписывает данные в файле
//     console.log('ERR',err);
// })

// fs.readFile('./text.txt',  (err, data) => { // читает файл
//     fs.appendFile('./copy.txt', data, () => {}) // копирует данные в этот файл с предыдущего
// })


fs.mkdir('./students',  (err) => { // создали новую директорию 'students'
    console.log(err);
})