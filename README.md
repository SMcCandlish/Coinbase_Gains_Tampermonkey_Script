# Coinbase Gains TamperMonkey User Script
This is a user script for TamperMonkey (might also work with old GreaseMonkey, probably with tweaks), to show one's gains in green or losses in red at Coinbase.com, on the Portfolio/account and Home/dashboard pages. It uses JSON to track changes in investment level, too (if your browser permits TamperMonkey to save local data).

Usage:
1. Install.  In TamperMonkey's browser extension config page there's an option to import from URL, and you can do that via the URL of [this raw script page](https://raw.githubusercontent.com/SMcCandlish/Coinbase_Gains_TamperMonkey_Script/master/CoinbasePortfolioGains.user.js) (which Github goes out of its way to prevent the display of when this README.md is read on Github itself, grrr...). Depending on how your browser is set up, clicking that might import it directly into TamperMonkey for you.
2. Edit script in TamperMonkey:
3. Change `totalInvestment` to the amount (in your currency) that you've invested. Just numerals and `.`, no currency symbols, e.g.: `1234.56`
4. Change `currencySymbol` to whatever you want for your currency, such as: `US$`, `USD`, `£`, `GBP`, or whatever. It defaults to: `$`.  This is a literal string; you do not have to escape `$`, and you can't use HTML or other code in it (e.g. for coloring).
5. Save, via TamperMonkey's File menu.
6. Make sure the script is enabled in TamperMonkey.
7. Go to <https://www.Coinbase.com> and log in.
8. Click TamperMonkey's browser icon and make sure this script is actually enabled for this site, and that TamperMonkey is allowed to affect this site.
9. If you don't see the gains display, reload the page.  If you still don't, it's possible Coinbase changed HTML elment classes and the script will need to be updated.

Credit: This is almost entirely the work of [kevduc](https://github.com/kevduc/userscripts/edit/master/README.md).  All I did:
* Made currency symbol easy to set.
* Moved the display to top center, away from current portfolio value amount, and make it slightly smaller. I find this less visually confusing than having it immediately next to the portfolio value.
* Made it work on the Home/dashboard page as well as the Portfolio/account page.
