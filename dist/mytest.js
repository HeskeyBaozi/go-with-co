'use strict';

const co = require('./go-with-co.min.js');
var assert = console.log;

const delayRes = (res, time)=> {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve(res);
        }, time);
    });
};

const readFail = (msg, time)=> {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            reject(msg);
        }, time);
    });
};

co(function *(num) {
    try {
        var msg = yield readFail('read file fail!!!!!', 500);
    } catch (e) {
        assert(`inner error:${e}`);
    }

    let res = yield delayRes(num, 500);
    assert(`msg = ${msg}, test res === 62 ${res}`);

    assert('after fail'); // ignore
}, 62).catch(str=> {
    assert(`outter error : ${str}`);
});