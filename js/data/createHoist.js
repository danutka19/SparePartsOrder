import React from "react";

export const createHoist = function (data, callback) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('!!Mam Promis, ale jak go użyć?!!:', data, callback);
            resolve(data, callback);
        }, 1000);

    })
}

const getNames = function () {
    const names = ["Jan", "Piotr", "Anna"];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(names);
        }, 2000);
    });

};