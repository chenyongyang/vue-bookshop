const mutations = {
    addCart(state, book) {
        let product = state.cartList.find(item => item.bookId === book.bookId);
        if (product) {
            product.bookCount += 1;
            state.cartList = [...state.cartList];
        } else {
            book.bookCount = 1;
            state.cartList = [...state.cartList, book];
        }
    },
    addCount(state, book) {
        let b = state.cartList.find(item => item.bookId === book.bookId);
        if (b) {
            b.bookCount++;
            state.cartList = [...state.cartList];
        }
    },
    minisCount(state, book) {
        let b = state.cartList.find(item => item.bookId === book.bookId);
        if (b) {
            b.bookCount--;
            state.cartList = [...state.cartList];
        }
    },
    del(state, book) {
        state.cartList = state.cartList.filter(item => {
            return item.bookId != book.bookId;
        });
    },
    clearAll(state) {
        state.cartList = [];
    }
};

export default mutations;