
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function setEc(valu) {
    localStorage.setItem('explicit', valu);
}

function setSwi(swii) {
    localStorage.setItem('swipenext', swii);
}

function setSwif(swiii) {
    localStorage.setItem('swipenextfull', swiii);
}

function setOl(walu) {
    localStorage.setItem('old', walu);
}



function keepTheme() {
    if (localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-dark');
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTheme('theme-light')
        } else if (localStorage.getItem('theme') === 'theme-blur') {
            setTheme('theme-blur')
        }
    } else {
        setTheme('theme-dark')
    }
}


module.exports = {
    setTheme,
    keepTheme,
    setEc,
    setSwi,
    setSwif,
    setOl
}
