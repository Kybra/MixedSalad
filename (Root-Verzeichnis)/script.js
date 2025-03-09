document.addEventListener("DOMContentLoaded", function () {
    // Comic-Reader
    const totalPages = 20; // Anzahl der Comic-Seiten (kann angepasst werden)
    const pages = Array.from({ length: totalPages }, (_, i) => `comics/chapter-01/page-${String(i + 1).padStart(2, '0')}.jpg`);

    let currentPage = 0;
    const comicPage = document.getElementById("comicPage");
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");

    function updateComic() {
        comicPage.src = pages[currentPage];
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === pages.length - 1;
    }

    prevButton.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
            updateComic();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateComic();
        }
    });

    updateComic();

    // Menü-Button für Mobile Navigation
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function (event) {
            navLinks.classList.toggle("show");
            event.stopPropagation(); // Verhindert, dass das Menü sich sofort wieder schließt
        });

        // Schließe das Menü, wenn außerhalb geklickt wird
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
                navLinks.classList.remove("show");
            }
        });
    } else {
        console.warn("Menu button or navigation links not found!");
    }
});