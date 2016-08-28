'use strict';

co.wrap = function () {
    return function () {

    };
};

function co(gen, ...args) {
    return new Promise((resolve, reject) => {
        // if gen is a generator function, call it and get it pointer
        if (typeof gen === 'function') {
            gen = gen(...args);
        }

        const next = state => {
            if (state.done === false) {
                state.value
                    .then(onFulfilled)
                    .catch(onRejected);
            } else {
                resolve(state.value);
            }
        };

        /**
         * 推动一次yield到下一次yield之间的函数执行
         * 并把下一次包含yieldable对象的状态交给next处理
         * @param promiseValue
         */
        const onFulfilled = promiseValue => {
            let state;
            try {
                state = gen.next(promiseValue);
            } catch (error) {
                reject(error);
                return;
            }
            next(state);
        };

        const onRejected = promiseValue => {
            let state;
            try {
                // 注意, 如果gen 有内层捕获异常, 则catch语句不会执行
                // throw 也有类似next推进函数的作用, 直接到下一个yield或return语句
                state = gen.throw(promiseValue);

            } catch (error) {
                reject(error);
                return;
            }
            // 这里处理的是下一个yield语句或者return语句右边的状态
            next(state);
        };

        onFulfilled(undefined);
    });
}

module.exports = co['default'] = co.co = co;