import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000'; //增加默认的请求路径

// 写一个axios的拦截器， 将获取的数据再做一层处理
axios.interceptors.response.use(function(res) {
    return res.data; // 在这里统一拦截结果，把结果处理成res.data
});
// 获取轮播图数据
export let getSliders = () => {
    return axios.get('/sliders'); // 写了拦截器以后，返回的就是data了
};
// 获取热门图书接口
export let getHotBook = () => {
    return axios.get('/hot');
};

// 获取全部图书
export let getBooks = () => {
    return axios.get('/book');
}

// 获取某一本图书
export let getOneBook = (id) => {
    return axios.get(`/book?id=${id}`);
}

// 删除某一本图书
export let removeBook = (id) => {
    return axios.delete(`/book?id=${id}`); // 浏览器发送的是OPTIONS方法
}

// 提交修改信息
export let modify = (id, data) => {
    return axios.put(`/book?id=${id}`, data);
}

// 添加图书
export let addBook = (data) => {
    return axios.post('/book', data);
}

export let getAll = () => {
    return axios.all([getSliders(), getHotBook()]);
}

// 分页接口
export let pagination = (offset) => { // 前端需要告诉后端从哪一条开始
    return axios.get(`/page?offset=${offset}`);
}