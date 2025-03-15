const { createClient } = window.supabase;

const supabaseUrl = "https://xpgvpcrwjdccfxhrrtrw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZ3ZwY3J3amRjY2Z4aHJydHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMjU4NDAsImV4cCI6MjA1NzYwMTg0MH0.sF5VuiihuukiH7YlbXKTRzScEKTLgrI4MOXQ4O6RWYg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);document.addEventListener("DOMContentLoaded", function () {
   

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
            updateComic();
            loadComments(currentChapter); // Jetzt lädt es direkt die passenden Kommentare
        }
        
        updateComic();
    }

    comicPage.addEventListener("click", goToNextPage);
    nextButton.addEventListener("click", goToNextPage);
    
    // Touch-Steuerung für Mobile: Swipe-Gesten
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }
    
    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].clientX;
        let swipeDistance = touchStartX - touchEndX;
    
        if (swipeDistance > 50) {
            // Swipe nach links -> Nächste Seite
            goToNextPage();
        } else if (swipeDistance < -50) {
            // Swipe nach rechts -> Vorherige Seite
            if (currentPage > 0) {
                currentPage--;
                updateComic();
            }
        }
    }
    
    if (comicPage) {
        comicPage.addEventListener("touchstart", handleTouchStart);
        comicPage.addEventListener("touchend", handleTouchEnd);
    }
    
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
            
            if (selectedChapter !== currentChapter) {
                currentChapter = selectedChapter;
                totalPages = getTotalPagesForChapter(currentChapter);
                pages = getPages(currentChapter, totalPages);
                currentPage = 0;
                updateComic();
                loadComments(currentChapter); // Jetzt lädt es direkt die passenden Kommentare
            }
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
            loadComments(currentChapter); // Kapitelwechsel ruft die richtigen Kommentare auf
            updateComic();
        });
    });

    // ======= MENÜ-BUTTON FÜR MOBILE NAVIGATION ======= //
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function (event) {
            navLinks.classList.toggle("nav-active");
            event.stopPropagation(); // Verhindert, dass das Menü sich sofort wieder schließt
        });

        // Schließe das Menü, wenn außerhalb geklickt wird
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
                navLinks.classList.remove("nav-active");
            }
        });
    } else {
        console.warn("Menu button or navigation links not found!");
    }

    // ======= KOMMENTARFUNKTION ======= //

    const commentForm = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    // Kommentarformular-Handling
    commentForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("commentName").value.trim();
        const text = document.getElementById("commentText").value.trim();

        if (name === "" || text === "") return;

        const comment = {
            name: name,
            text: text,
            comic_id: currentChapter, // Speichert das Kapitel
            timestamp: new Date().toISOString()
        };

        // Save comment to Supabase
        const { data, error } = await supabase
        .from('MixedSaladComicComments') // Replace with your table name
            .insert([comment]);

        if (error) {
            console.error('Error saving comment:', error);
        } else {
            console.log('Comment saved successfully:', data);
            document.getElementById("commentForm").reset();
            loadComments(currentChapter); // Reload comments after saving
        }
    });

    // Kommentare laden für das aktuelle Kapitel
    async function loadComments(comicId) {
        const commentList = document.getElementById("commentList");
        if (!commentList) return;
        
        commentList.innerHTML = "";

        const { data, error } = await supabase
        .from("MixedSaladComicComments") // Replace with your table name
            .select("*")
            .eq("comic_id", comicId) // Filter by current chapter
            .order("timestamp", { ascending: false }); // Sort by newest first

        if (error) {
            console.error("Fehler beim Abrufen der Kommentare:", error);
            return;
        }

        data.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `
                <strong>${comment.name}</strong>: ${comment.text}
                <small>${new Date(comment.timestamp).toLocaleString()}</small>
                <button onclick="deleteComment('${comment.id}')">🗑</button>
            `;
            commentList.appendChild(commentElement);
        });
    }

    loadComments(currentChapter); // Initial Kommentare laden

    // Real-Time Updates (Optional)
    const commentsSubscription = supabase
        .channel('MixedSaladComicComments')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'MixedSaladComicComments' }, payload => {
            if (payload.new.comic_id === currentChapter) {
                loadComments(currentChapter);
            }
        })
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'MixedSaladComicComments' }, payload => {
            if (payload.old.comic_id === currentChapter) {
                loadComments(currentChapter);
            }
        })
        .subscribe();

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
async function deleteComment(commentId) {
    const { error } = await supabase
        .from('MixedSaladComicComments')
        .delete()
        .eq('id', commentId);

    if (error) {
        console.error("Fehler beim Löschen:", error);
    } else {
        loadComments(currentChapter);
    }
}
