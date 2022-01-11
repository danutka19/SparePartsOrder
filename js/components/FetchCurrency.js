import {useEffect, useState} from "react";
import React from "react";

// const API = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/today/`
const API = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/2022-01-10/`
// const nbp = `http://api.nbp.pl/api/`
// const API = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/`


export const FetchCurrency = ({fooP}) => {
    const [currency, setCurrency] = useState(false);

    useEffect(() => {
        fetch(API, {
            method: "GET",
        }).then( resp => {
            if (resp.ok)
                return resp.json();
            else
                throw new Error('Błąd sieci!');
        }).then( currency => {
            console.log('Kurs waluty:', currency);
            setCurrency(currency);
            fooP(currency);
        }).catch( err => {
            console.log('Błąd!', err);
        });
    }, []);

    if (currency === false) {
        return <div>Setting exchange rate...</div>
    } else {
        // return <div>Kurs waluty: {parseFloat(currency.slice(111, 117)).toFixed(2)} zł/eur</div>
        return (
            <>
                <div>Kurs waluty: {currency.rates[0].mid} z dnia {currency.rates[0].effectiveDate} tabela {currency.rates[0].no}</div>
            </>

            )


    }
}