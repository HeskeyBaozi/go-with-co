'use strict';

const co = require('co');
const fs = require('fs');

const convert = fn => {
    return function () {
        let args = Array.from(arguments);
        return callback=> {
            args.push(callback);
            return fn.apply(this, args);
        };
    };
};
