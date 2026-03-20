// NavBar & Footer

fetch("navbar.html").then(r => r.text()).then(h => navbar.innerHTML = h);
fetch("footer.html").then(r => r.text()).then(h => footer.innerHTML = h);
