document.addEventListener("DOMContentLoaded", function () {
    // ==================== Comic-Reader ==================== //
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

    updateComic(); // Setzt die initiale Comic-Seite

    // ==================== Mobile Navigation (Hamburger-Menü) ==================== //
    const hamburger = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("open");
        });
    } else {
        console.warn("Hamburger menu or navigation links not found!");
    }
});