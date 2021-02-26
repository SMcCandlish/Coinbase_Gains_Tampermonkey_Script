// ==UserScript==
// @name         Coinbase Portfolio Gains
// @version      1.1.1.2021-02-26
// @description  Shows Coinbase portfolio gain/loss
// @author       KevDuc; tweaked by SMcCandlish
// @namespace    https://github.com/SMcCandlish/Coinbase_Gains_TamperMonkey_Script
// @homepageURL  https://github.com/SMcCandlish/Coinbase_Gains_TamperMonkey_Script
// @downloadURL  https://raw.githubusercontent.com/SMcCandlish/Coinbase_Gains_TamperMonkey_Script/master/CoinbasePortfolioGains.user.js
// @updateURL    https://raw.githubusercontent.com/SMcCandlish/Coinbase_Gains_TamperMonkey_Script/master/CoinbasePortfolioGains.user.js
// @supportURL   https://github.com/SMcCandlish/Coinbase_Gains_TamperMonkey_Script/issues
// @match        https://www.coinbase.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
// Based on original at: https://github.com/kevduc/userscripts

(function() {
    'use strict';

    const totalInvestment = 1324.62; // Change this to the total amount you invested (in your local currency)
    const currencySymbol = `$`; // Change this to whatever you need, like £.

    // Helper functions
    const pause = (milli) => new Promise((resolve, reject) => setTimeout(resolve, milli));

    const waitForTruthy = async (func, milli = 200) => {
        let result;
        while(!(result = func())) await pause(milli);
        return result;
    }

    document.querySelectorWhenLoaded = async (query) => await waitForTruthy(() => document.querySelector(query));

    // -------------------------

    let totalInvestmentHistory = JSON.parse(localStorage.getItem('totalInvestmentHistory'));

    // No previous investment
    if (totalInvestmentHistory === null) totalInvestmentHistory = [];

    const previousTotalInvestment = totalInvestmentHistory[0];

    // totalInvestment value changed
    if (totalInvestment !== 0 && totalInvestment !== previousTotalInvestment) {
        totalInvestmentHistory.unshift(totalInvestment);
        localStorage.setItem('totalInvestmentHistory', JSON.stringify(totalInvestmentHistory));
    }

    const invested = totalInvestmentHistory[0] || 0;

    function updateROI(balance, roi) {
        const value = parseFloat(balance.innerText.replace(/[$£€,]/g,''));
        const profit = value - invested;
        roi.style.color = profit > 0 ? 'green' : 'red';
        roi.innerText = `${profit > 0 ? '+' : '-'}${currencySymbol}${Math.abs(profit).toFixed(2)} (${(100*profit/invested).toFixed(2)}%)`;
    }

    async function init() {
        const balance = await document.querySelectorWhenLoaded('h1[class*="Balance__BalanceHeader"], h1[class*="Balance__BalanceHeader-ek4zs2-3"]');

        const roi = document.createElement('h1');
        roi.className = balance.className;
        roi.style = `font-size: large; text-align: center;`;
        roi.id = "balanceROI-tampermonkey";

        const periodSelector = await document.querySelectorWhenLoaded('div[class*="PeriodSelector__SelectorContainer-sc-1w75yzt-0"]');
        periodSelector.insertAdjacentElement('beforebegin', roi);

        const balanceTextNode = balance.firstChild;

        const update = () => updateROI(balance, roi);
        const observer = new MutationObserver(update);
        observer.observe(balanceTextNode, { characterData: true });

        update();
    }

    init();
})();
