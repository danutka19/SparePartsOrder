import React from "react";

export const createHoist = function (data, callback) {

    return new Promise((resolve, reject) => {
        console.log('Mamy wynik z Promise:', data, callback);
        resolve(data, callback);
    })
}