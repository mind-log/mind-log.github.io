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
});
