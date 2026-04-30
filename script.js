function toggleMode() {
    document.body.classList.toggle("light");
    const btn = document.getElementById("modeToggle");
    if (document.body.classList.contains("light")) {
        btn.textContent = "SYS.DARK_MODE";
    } else {
        btn.textContent = "SYS.LIGHT_MODE";
    }
}

// Terminal typing effect
document.addEventListener("DOMContentLoaded", () => {
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
                    setTimeout(typeLine, Math.random() * 50 + 20); // typing speed
                } else {
                    p.innerHTML += "<br>";
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 300); // pause between lines
                }
            } else {
                p.innerHTML += '<span class="cursor"></span>';
            }
        }
        
        setTimeout(typeLine, 500);
    }
    
    // Inject Progress Bar for articles
    if (document.querySelector('article')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressContainer.appendChild(progressBar);
        document.body.prepend(progressContainer);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // Generate random hex strings for data banners
    const banners = document.querySelectorAll('.data-banner span');
    banners.forEach(banner => {
        let hexString = '';
        for (let i = 0; i < 200; i++) {
            hexString += Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase() + ' ';
        }
        banner.textContent = 'DATA.STREAM_INIT:: ' + hexString;
    });
});
