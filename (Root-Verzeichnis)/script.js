document.addEventListener("DOMContentLoaded", function () {
    // Comic-Reader
    let currentChapter = "chapter-01"; // Standardmäßig Kapitel 1
    let totalPages = 23; // Standard: Kapitel 1 hat 23 Seiten

    function getPages(chapter, total) {
        return Array.from({ length: total }, (_, i) => `comics/${chapter}/page-${String(i + 1).padStart(2, '0')}.jpg`);
    }

    let pages = getPages(currentChapter, totalPages);
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

    function goToNextPage() {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateComic();
        }
    }

    comicPage.addEventListener("click", goToNextPage);
    nextButton.addEventListener("click", goToNextPage);

    updateComic();

    // Kapitel-Navigation für Kapitel 1-8
    document.querySelectorAll(".chapter-nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const chapter = this.getAttribute("href").replace("#", "");

            if (chapter === "chapter-01") {
                currentChapter = "chapter-01";
                totalPages = 23;
            } else if (chapter === "chapter-02") {
                currentChapter = "chapter-02";
                totalPages = 33; // Falls Kapitel 2 z. B. 33 Seiten hat
            } else if (chapter === "chapter-03") {
                currentChapter = "chapter-03";
                totalPages = 30; // Platzhalter für Kapitel 3
            } else if (chapter === "chapter-04") {
                currentChapter = "chapter-04";
                totalPages = 28; // Platzhalter für Kapitel 4
            } else if (chapter === "chapter-05") {
                currentChapter = "chapter-05";
                totalPages = 35; // Platzhalter für Kapitel 5
            } else if (chapter === "chapter-06") {
                currentChapter = "chapter-06";
                totalPages = 27; // Platzhalter für Kapitel 6
            } else if (chapter === "chapter-07") {
                currentChapter = "chapter-07";
                totalPages = 32; // Platzhalter für Kapitel 7
            } else if (chapter === "chapter-08") {
                currentChapter = "chapter-08";
                totalPages = 29; // Platzhalter für Kapitel 8
            }

            pages = getPages(currentChapter, totalPages);
            currentPage = 0;
            updateComic();
        });
    });

    // ======= MENÜ-BUTTON FÜR MOBILE NAVIGATION ======= //
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

    // ======= KOMMENTARFUNKTION ======= //
    const commentForm = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    // Kommentare aus LocalStorage laden
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        commentList.innerHTML = "";
        const urlParams = new URLSearchParams(window.location.search);
        const isAdmin = urlParams.has("admin");

        comments.forEach((comment, index) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.text}`;

            // Nur Admin sieht den Lösch-Button
            if (isAdmin) {
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-comment");
                deleteButton.dataset.index = index;
                deleteButton.innerHTML = "🗑️";
                deleteButton.addEventListener("click", function () {
                    deleteComment(index);
                });
                commentElement.appendChild(deleteButton);
            }

            commentList.appendChild(commentElement);
        });
    }

    // Kommentar absenden
    if (commentForm) {
        commentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("commentName").value.trim();
            const text = document.getElementById("commentText").value.trim();
            if (name && text) {
                const newComment = { name, text };
                const comments = JSON.parse(localStorage.getItem("comments")) || [];
                comments.push(newComment);
                localStorage.setItem("comments", JSON.stringify(comments));
                document.getElementById("commentName").value = "";
                document.getElementById("commentText").value = "";
                loadComments();
            }
        });
    }

    loadComments(); // Initial Kommentare laden
});

// Funktion zum Löschen von Kommentaren
function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1); // Entferne den Kommentar an der gegebenen Position
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments(); // Kommentare neu laden
}