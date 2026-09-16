document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const likesCountSpan = document.querySelector(".like-count");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    if (!likeBtn) return;

    const likeSvg = likeBtn.querySelector("svg");

    let baseLikes = 0; // Começa em 0 conforme solicitado
    let isLiked = false;

    // Formatação de números (Ex: 1200 -> 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Animação visual do SVG
    function triggerBounce(svgElement) {
        if (!svgElement) return;
        svgElement.style.transform = "scale(1.4)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    // Função central para adicionar curtida
    function addLike() {
        baseLikes++;
        isLiked = true;
        likeBtn.classList.add("liked");
        
        if (likesCountSpan) {
            likesCountSpan.textContent = formatLikes(baseLikes);
        }
        triggerBounce(likeSvg);
    }

    // Função central para remover curtida (com trava em 0)
    function removeLike() {
        isLiked = false;
        baseLikes = Math.max(0, baseLikes - 1);
        likeBtn.classList.remove("liked");
        
        if (likesCountSpan) {
            likesCountSpan.textContent = formatLikes(baseLikes);
        }
        triggerBounce(likeSvg);
    }

    // Evento de clique no BOTÃO DE CORAÇÃO (Alterna entre curtir e descurtir)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isLiked) {
            removeLike();
        } else {
            addLike();
        }
    });

    // Evento de clique na IMAGEM PRINCIPAL (Sempre adiciona curtida)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);
            
            const bookmarkSvg = bookmarkBtn.querySelector("svg");
            triggerBounce(bookmarkSvg);
        });
    }
});