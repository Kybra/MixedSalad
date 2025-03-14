document.addEventListener("DOMContentLoaded", function () {
    const chapterSelect = document.getElementById("chapterSelect");
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
        if (!comicPage) return;
        
        comicPage.src = ""; // Bild erst leeren, um ein Neuladen zu vermeiden
        comicPage.loading = "lazy"; // Lazy Loading aktivieren
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
        } else {
            // Automatischer Wechsel zum nächsten Kapitel
            if (currentChapter === "chapter-01") {
                currentChapter = "chapter-02";
                totalPages = 33; // Falls Kapitel 2 z. B. 33 Seiten hat
            } else if (currentChapter === "chapter-02") {
                currentChapter = "chapter-03";
                totalPages = 30; // Falls Kapitel 3 existiert
            } else if (currentChapter === "chapter-03") {
                currentChapter = "chapter-04";
                totalPages = 28;
            } else if (currentChapter === "chapter-04") {
                currentChapter = "chapter-05";
                totalPages = 35;
            } else if (currentChapter === "chapter-05") {
                currentChapter = "chapter-06";
                totalPages = 27;
            } else if (currentChapter === "chapter-06") {
                currentChapter = "chapter-07";
                totalPages = 32;
            } else if (currentChapter === "chapter-07") {
                currentChapter = "chapter-08";
                totalPages = 29;
            } else if (currentChapter === "chapter-08") {
                currentChapter = "chapter-09"; // Buch 2, Kapitel 1
                totalPages = 30; // Beispiel für Kapitel 9
            } else {
                return; // Letztes Kapitel erreicht, keine weitere Aktion
            }
    
            // Neues Kapitel laden
            pages = getPages(currentChapter, totalPages);
            currentPage = 0; // Erste Seite des neuen Kapitels setzen
        }
        
        updateComic();
    }

    comicPage.addEventListener("click", goToNextPage);
    nextButton.addEventListener("click", goToNextPage);
    
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            if (currentPage > 0) {
                currentPage--;
                updateComic();
            }
        } else if (event.key === "ArrowRight") {
            goToNextPage();
        }
    });
    
    updateComic();

    if (chapterSelect) {
        chapterSelect.addEventListener("change", function () {
            const selectedChapter = chapterSelect.value;
            
            if (selectedChapter === "chapter-01") {
                currentChapter = "chapter-01";
                totalPages = 23;
            } else if (selectedChapter === "chapter-02") {
                currentChapter = "chapter-02";
                totalPages = 33;
            } else if (selectedChapter === "chapter-03") {
                currentChapter = "chapter-03";
                totalPages = 30;
            } else if (selectedChapter === "chapter-04") {
                currentChapter = "chapter-04";
                totalPages = 28;
            } else if (selectedChapter === "chapter-05") {
                currentChapter = "chapter-05";
                totalPages = 35;
            } else if (selectedChapter === "chapter-06") {
                currentChapter = "chapter-06";
                totalPages = 27;
            } else if (selectedChapter === "chapter-07") {
                currentChapter = "chapter-07";
                totalPages = 32;
            } else if (selectedChapter === "chapter-08") {
                currentChapter = "chapter-08";
                totalPages = 29;
            } else if (selectedChapter === "chapter-09") {
                currentChapter = "chapter-09"; // Buch 2, Kapitel 1
                totalPages = 30; // Beispiel für Kapitel 9
            }

            // Seiten neu laden
            pages = getPages(currentChapter, totalPages);
            currentPage = 0;
            updateComic();
        });

        chapterSelect.value = currentChapter;
    }

    // Kapitel-Navigation für Kapitel 1-9
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
            } else if (chapter === "chapter-09") {
                currentChapter = "chapter-09"; // Buch 2, Kapitel 1
                totalPages = 30; // Beispiel für Kapitel 9
            }

            pages = getPages(currentChapter, totalPages);
            currentPage = 0;
            updateComic();
        });
    });

    // ========== FIREBASE INITIALISIEREN ========== //
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
    import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

    // Firebase-Konfiguration
    const firebaseConfig = {
      apiKey: "AIzaSyCDzLXC2BJ_flsuldJvkSwUTHTrmCOvo7w",
      authDomain: "mixedsaladcomments.firebaseapp.com",
      projectId: "mixedsaladcomments",
      storageBucket: "mixedsaladcomments.firebasestorage.app",
      messagingSenderId: "299213994977",
      appId: "1:299213994977:web:85408e5e0f534828be70a0"
    };

    // Firebase initialisieren
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // ========== KOMMENTARFUNKTION MIT FIRESTORE ========== //
    const commentForm = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    async function loadComments() {
        if (!commentList) return;
        commentList.innerHTML = "";

        try {
            const q = query(collection(db, "comments"), orderBy("timestamp"));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const comment = doc.data();
                if (comment.chapter === currentChapter) {
                    const commentElement = document.createElement("div");
                    commentElement.classList.add("comment");
                    commentElement.innerHTML = `<strong>${comment.name}</strong>: ${comment.text}`;
                    commentList.appendChild(commentElement);
                }
            });
        } catch (error) {
            console.error("Fehler beim Laden der Kommentare: ", error);
        }
    }

    if (commentForm) {
        commentForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const name = document.getElementById("commentName").value.trim();
            const text = document.getElementById("commentText").value.trim();
            if (name === "" || text === "") return;

            try {
                await addDoc(collection(db, "comments"), {
                    name: name,
                    text: text,
                    chapter: currentChapter,
                    timestamp: new Date()
                });

                document.getElementById("commentForm").reset();
                loadComments();
            } catch (error) {
                console.error("Fehler beim Speichern des Kommentars: ", error);
            }
        });
    }

    loadComments(); // Initial Kommentare laden

    // Lazy Loading für alle Comic-Seiten aktivieren
    function lazyLoadImages() {
        const images = document.querySelectorAll(".comic-container img");
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Lade das Bild nur, wenn es sichtbar ist
                    observer.unobserve(img); // Beobachtung beenden, sobald das Bild geladen wurde
                }
            });
        });

        images.forEach(img => {
            img.dataset.src = img.src;
            img.src = ""; // Verhindert initiales Laden
            observer.observe(img);
        });
    }

    document.addEventListener("DOMContentLoaded", lazyLoadImages);
});

// Funktion zum Löschen von Kommentaren
function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1); // Entferne den Kommentar an der gegebenen Position
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments(); // Kommentare neu laden
}
