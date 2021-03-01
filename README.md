Coinbase Gains – TamperMonkey User Script
===========================================

**This is a user script for Coinbase.com, a cryptocurrency broker/exchange, to show one's gain in green or loss (if it comes to that) in red, on both the Portfolio/account and Home/dashboard pages.**

It has been tested in TamperMonkey, will probably also work in Violentmonkey, might also work with old GreaseMonkey, probably with tweaks, and maybe also in Safari Userscripts, but has not been tested with those as of this version.

It uses JSON to track changes in investment level, too if your browser permits TamperMonkey (or whatever) to save local data.

Usage
-----

These instructions are for TamperMonkey, though the process will be similar in other user-script extensions:

1. Install.  In TamperMonkey's browser extension config page there's an option to import from URL, and you can do that via the URL of [this raw script page](https://raw.githubusercontent.com/SMcCandlish/Coinbase_Gains_TamperMonkey_Script/master/CoinbasePortfolioGains.user.js) (which Github goes out of its way to prevent the display of when this README.md is read on Github itself, grrr...). Depending on how your browser is set up, clicking that might import it directly into TamperMonkey for you.
2. Edit script in TamperMonkey:
3. Change `totalInvestment` to the amount (in your currency) that you've invested. Just numerals and `.`, no currency symbols, e.g.: `1234.56`
4. Change `currencySymbol` to whatever you want for your currency, such as: `US$`, `USD`, `£`, `GBP`, or whatever. It defaults to: `$`.  This is a literal string; you do not have to escape `$`, and you can't use HTML or other code in it (e.g. for coloring).
5. Save, via TamperMonkey's File menu.  Click the "Install" button above the script.
6. Make sure the script is enabled in TamperMonkey, in the "Installed Userscripts" tab.
7. Go to <https://www.Coinbase.com> and log in.
8. Click TamperMonkey's browser icon and make sure this script is actually enabled for this site, and that TamperMonkey is allowed to affect this site.
9. If you don't see the gains display, reload the page.  If you still don't, it's possible Coinbase changed HTML elment classes and the script will need to be updated.

Credit, Changes, and Other Notes
--------------------------------

This is almost entirely the work of [kevduc](https://github.com/kevduc/userscripts/edit/master/README.md).  All I did:

* Made currency symbol easy to set.
* Moved the display to top center, away from current portfolio value amount, and make it slightly smaller. I find this less visually confusing than having it immediately next to the portfolio value.
* Made it work on the Home/dashboard page as well as the Portfolio/account page.
* Made it an `h2` heading. For semantic sensibility, a page should only have one `h1`, or at least not competing ones in the same section of the document.  I'm not even sure this really logically qualifies as a heading; `div` might be better.
* Wrote documentation.

Of course, kevduc is welcome to adapt some of this back into his own version.  One could also expand on it further, e.g. with different positioning options via a new constant defined at the top of the script. In addition to this centered version, I actually experimented with other layouts, including right-justified (under the timespan selector), and the original left version, and a left version underneath the current portfolio amount line.
