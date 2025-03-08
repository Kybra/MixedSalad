document.addEventListener("DOMContentLoaded", function() {
    const pages = [
        "comics/chapter-01/page-01.jpg",
        "comics/chapter-01/page-02.jpg",
        "comics/chapter-01/page-03.jpg"
    ];

    let currentPage = 0;

    const comicPage = document.getElementById("comicPage");
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");

    function updateComic() {
        comicPage.src = pages[currentPage];

        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === pages.length - 1;
    }

    prevButton.addEventListener("click", function() {
        if (currentPage > 0) {
            currentPage--;
            updateComic();
        }
    });

    nextButton.addEventListener("click", function() {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateComic();
        }
    });

    updateComic(); // Set initial page
});