import {useEffect, useState} from "react";
import React from "react";

const API = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/2022-01-25/`
// const API = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/`
// const API = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/today/`

export const FetchCurrency = ({fooP}) => {
    const [currency, setCurrency] = useState(false);
    useEffect(() => {
        fetch(API).then( resp => {
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

    if (!currency) {
        return <div>Setting exchange rate...</div>
    } else {
        return (
            <>
                <div>Kurs waluty: {currency.rates[0].mid} z dnia {currency.rates[0].effectiveDate} tabela {currency.rates[0].no}</div>
            </>
            )
    }
}