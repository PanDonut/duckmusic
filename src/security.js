
<style>
    @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap');
</style>

const warningTitleCSS = 'color:red; font-family: "Mochiy Pop P One", sans-serif; font-size: 60px; letter-spacing: 6px; word-spacing: -5px; font-weight: 800; text-decoration: overline solid rgb(68, 68, 68); font-style: normal; font-variant: small-caps; text-transform: uppercase;';

const warningDescCSS = 'font-size: 20px;';

const infoDescCSS = 'color:gray; font-family: "Arial Black", Gadget, sans-serif; font-size: 16px; font-weight: 100; font-style: normal;';

const infobtnCSS = 'color:white; font-family: "Arial Black", Gadget, sans-serif; font-size: 16px; font-weight: 100; font-style: normal; background-color: #000000; padding: 10px 20px; border-radius: 5px;';

console.log('%cUwaga!', warningTitleCSS);
console.log("%cJeżeli ktoś powiedział Ci żeby coś tu wkleić to na 99.9% próbuje Cię oszukać. Wklejając tu coś ktoś może uzyskać dostęp do twojego konta lub urządzenia.", warningDescCSS);
console.log("%cJeżeli doskonale wiesz co robisz dołącz do TheDuck Studios 😃", infoDescCSS);
console.log("%cOdwiedź naszą stronę", infobtnCSS);

window.setInterval(function () {
    console.log('%cUwaga!', warningTitleCSS);
    console.log("%cJeżeli ktoś powiedział Ci żeby coś tu wkleić to na 99.9% próbuje Cię oszukać. Wklejając tu coś ktoś może uzyskać dostęp do twojego konta lub urządzenia.", warningDescCSS);
    console.log("%cJeżeli doskonale wiesz co robisz dołącz do TheDuck Studios 😃", infoDescCSS);
    console.log("%cOdwiedź naszą stronę", infobtnCSS);
}, 10000); // 10000 milisekund (10 sekund)
