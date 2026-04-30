// Theme toggle with localStorage persistence
function toggleMode() {
    document.documentElement.classList.toggle("light");
    const isLight = document.documentElement.classList.contains("light");
    localStorage.setItem('mind-log-theme', isLight ? 'light' : 'dark');
    document.getElementById("modeToggle").textContent = isLight ? "SYS.DARK_MODE" : "SYS.LIGHT_MODE";
}

// On load: sync button text with current theme state
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("modeToggle");
    if (btn) {
        const isLight = document.documentElement.classList.contains("light");
        btn.textContent = isLight ? "SYS.DARK_MODE" : "SYS.LIGHT_MODE";
    }

    // Terminal typing effect
    const terminal = document.getElementById("bootTerminal");
    if (terminal) {
        const lines = [
            "> Initializing node...",
            "> Establishing secure connection...",
            "> Loading logs...",
            "> Ready."
        ];

        let lineIndex = 0;
        let charIndex = 0;
        let p = document.createElement("p");
        terminal.appendChild(p);

        function typeLine() {
            if (lineIndex < lines.length) {
                if (charIndex < lines[lineIndex].length) {
                    p.innerHTML += lines[lineIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeLine, Math.random() * 50 + 20);
                } else {
                    p.innerHTML += "<br>";
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 300);
                }
            } else {
                p.innerHTML += '<span class="cursor"></span>';
            }
        }

        setTimeout(typeLine, 500);
    }

    // --- Phase 3 Enhancements ---

    // 1. Reading Progress Bar
    const article = document.querySelector("article");
    if (article) {
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        document.body.appendChild(progressBar);

        window.addEventListener("scroll", () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // 2. Scroll-Triggered Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("article p, article blockquote, .hero-image, .log-item, .controls").forEach(el => {
        el.classList.add("reveal-element");
        observer.observe(el);
    });

    // --- Phase 4 Enhancements ---

    // 1. Tag Filtering & Search (Index Page only)
    const logList = document.getElementById('logList');
    const searchInput = document.getElementById('searchInput');
    const tagButtons = document.querySelectorAll('.tag-filter');
    
    if (logList && searchInput && tagButtons.length > 0) {
        const logItems = logList.querySelectorAll('.log-item');
        let currentTag = 'all';

        function filterLogs() {
            const searchTerm = searchInput.value.toLowerCase();

            logItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                // tags are in the span "TAGS: AI, Data, Network"
                const tagsText = item.querySelector('.log-meta span:nth-child(2)').textContent.toLowerCase();
                
                const matchesSearch = text.includes(searchTerm);
                const matchesTag = currentTag === 'all' || tagsText.includes(currentTag.toLowerCase());

                if (matchesSearch && matchesTag) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        }

        // Event Listeners for Tags
        tagButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all
                tagButtons.forEach(b => b.classList.remove('active'));
                // Add to clicked
                e.target.classList.add('active');
                
                currentTag = e.target.getAttribute('data-tag');
                filterLogs();
            });
        });

        // Event Listener for Search Input
        searchInput.addEventListener('input', filterLogs);
    }

    // 2. Nav Scroll Arrows
    const navScroll = document.getElementById('navScroll');
    const navLeft = document.getElementById('navLeft');
    const navRight = document.getElementById('navRight');

    if (navScroll && navLeft && navRight) {
        navLeft.addEventListener('click', () => {
            navScroll.scrollBy({ left: -100, behavior: 'smooth' });
        });
        navRight.addEventListener('click', () => {
            navScroll.scrollBy({ left: 100, behavior: 'smooth' });
        });

        // Hide arrows if not needed
        const toggleArrows = () => {
            navLeft.style.display = navScroll.scrollLeft <= 0 ? 'none' : 'flex';
            navRight.style.display = navScroll.scrollLeft + navScroll.clientWidth >= navScroll.scrollWidth ? 'none' : 'flex';
        };

        navScroll.addEventListener('scroll', toggleArrows);
        window.addEventListener('resize', toggleArrows);
        toggleArrows(); // Initial check
    }
});
