document.addEventListener("DOMContentLoaded", function () {
    // Comic-Reader
    const totalPages = 23; // Anzahl der Comic-Seiten (kann angepasst werden)
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

    function goToNextPage() {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateComic();
        }
    }

    // Klicke auf das Comic-Bild, um zur nächsten Seite zu gelangen
    comicPage.addEventListener("click", goToNextPage);

    // Behalte weiterhin den Button für die Navigation
    nextButton.addEventListener("click", goToNextPage);

    updateComic();
 
    // Zurück zu Seite 1, wenn auf "Chapter 1" geklickt wird
    const chapter1Link = document.querySelector(".chapter-nav a[href='#']");
    if (chapter1Link) {
        chapter1Link.addEventListener("click", function (event) {
            event.preventDefault();
            currentPage = 0;
            updateComic();
        });
    }
    document.addEventListener("DOMContentLoaded", function () {
    // Zurück zu Seite 1 von Kapitel 2, wenn auf "Chapter 2: Service Call" geklickt wird
    const chapter2Link = document.querySelector(".chapter-nav a[href='#chapter-2']");
    if (chapter2Link) {
        chapter2Link.addEventListener("click", function (event) {
            event.preventDefault();
            currentPage = 0; // Setzt die Seite zurück
            pages.length = 0; // Leert das aktuelle Seiten-Array

            // Füllt das Array mit den Seiten von Kapitel 2
            const totalPagesChapter2 = 33; // Anzahl der Seiten in Kapitel 2 anpassen
            for (let i = 1; i <= totalPagesChapter2; i++) {
                pages.push(`comics/chapter-02/page-${String(i).padStart(2, '0')}.jpg`);
            }

            updateComic();
        });
    }
});
 
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

// ========== KOMMENTARFUNKTION ========== //
document.addEventListener("DOMContentLoaded", function () {
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

function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1); // Entferne den Kommentar an der gegebenen Position
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments(); // Kommentare neu laden
}