let http = require('http');
let fs = require('fs');
let url = require('url');

// 获取轮播图 /sliders
let sliders = require('./sliders.js');

function read(cb) { // 封装一个方法用来读取数据，因为这个fs.readFile是异步的，所以要传入一个回调作为参数
    fs.readFile('./book.json', 'utf8', function(err, data) {
        if (err || data.length == 0) { // 如果有错误或者没有数据
            cb([]);
        } else {
            cb(JSON.parse(data)); // 将读出来的数据转化为对象
        }
    })
}

function write(data, cb) {
    fs.writeFile('./book.json', JSON.stringify(data), cb);
}

let pageSize = 5;

http.createServer((req, res) => {
    // 服务端设置跨域头
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1')
    if (req.method == 'OPTIONS') {
        // 要想出了问题的代码起的是什么作用？换相同作用的能够正常执行的代码
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
        return
    }

    let { pathname, query } = url.parse(req.url, true); // pathname不能随便改，true把query转化为对象
    if (pathname === '/sliders') {
        res.setHeader('Content-Type', 'application/json;charset=utf8');
        return res.end(JSON.stringify(sliders));
    }

    if (pathname === '/hot') {
        read(function(books) {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            let hot = books.reverse().slice(0, 6);
            setTimeout(() => {
                res.end(JSON.stringify(hot));
            }, 500);

        });
        return
    }

    if (pathname === '/page') {
        // 前端发送参数包括：当前已经到第几条；每次发送5条数据，这由后端决定，因此可以将其设置为一个变量
        let offset = parseInt(query.offset) || 0; // 取到这个参数，接着对json数据进行截取
        // 读取json数据
        read(function(books) {
            let hasMore = true;
            let result = books.reverse().slice(offset, offset + pageSize); // 每次截取区间为：当前条数，当前条数+偏移量
            if (offset + pageSize >= books.length) {
                hasMore = false;
            }
            // 后端返回对象有两个属性：是否还有更多，截取数据
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify({ hasMore, result }));
        });
        return;
        /*
            写代码思路很重要
            无论如何后端都会返回hasMore、result给前端
            之前自己写的一直卡在，如果hasMore为false，就不返回了
        */
    }

    if (pathname === '/book') { // 对书的增删改查
        let id = parseInt(query.id); // 取出的是字符串
        switch (req.method) { // ?id=1
            case 'GET':
                if (!isNaN(id)) {
                    read(function(books) {
                        let book = books.find(item => item.bookId === id);
                        if (!book) book = {}; // 如果没有找到，返回空对象
                        res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(book));
                    })
                } else { // 获取所有图书
                    read(function(books) {
                        res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(books.reverse()));
                    })
                }
                break;
            case 'POST':
                let postStr = '';
                req.on('data', chunk => {
                    postStr += chunk;
                });
                req.on('end', () => {
                    let book = JSON.parse(postStr);
                    read(books => {
                        book.bookId = books.length > 0 ? books[books.length - 1].bookId + 1 : 1;
                        books.push(book);
                        write(books, () => {
                            res.end(JSON.stringify(book));
                        });
                    });
                })
                break;
            case 'PUT': // 首先接收请求体
                let str = '';
                req.on('data', chunk => {
                    str += chunk;
                });
                req.on('end', () => {
                    let book = JSON.parse(str); // 用来修改图书的数据
                    // 通过id找出图书并修改，用数组的map方法，此方法不是变异方法，用新值覆盖旧值
                    read(function(books) {
                        books = books.map(item => {
                            if (item.bookId === id) {
                                return book;
                            }
                            return item;
                        });
                        write(books, () => { // 将修改的数据后台，要结束请求，不然一直是pending状态
                            res.end(JSON.stringify(book));
                        });
                    });
                });
                break;
            case 'DELETE':
                read(function(books) {
                    books = books.filter(item => item.bookId !== id);
                    write(books, function() {
                        res.end(JSON.stringify({
                            state: 200,
                        })); // 删除返回空对象
                    });
                });
                break;
        }
        return
    }
}).listen(3000);