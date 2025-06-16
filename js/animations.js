document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------
    // 1. Lumière d'Arrière-plan Subtile basée sur le Mouvement de la Souris
    // -----------------------------------------------------
    const systemContainer = document.querySelector('.system-container');

    // Utiliser requestAnimationFrame pour une animation plus fluide
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    systemContainer.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 à 1
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 à 1
    });

    function animateGlow() {
        targetX += (mouseX - targetX) * 0.1; // Amortissement doux
        targetY += (mouseY - targetY) * 0.1;

        // Ajuster l'intensité en fonction de la distance de la souris par rapport au centre
        const intensity = Math.min(Math.sqrt(targetX * targetX + targetY * targetY), 1); // 0 à 1

        const glowOffsetX = targetX * 15; // Décalage max 15px
        const glowOffsetY = targetY * 15; // Décalage max 15px

        systemContainer.style.boxShadow = `
            ${glowOffsetX}px ${glowOffsetY}px ${30 * intensity + 10}px rgba(0, 255, 0, ${0.1 * intensity}),
            ${-glowOffsetX}px ${-glowOffsetY}px ${30 * intensity + 10}px rgba(0, 255, 255, ${0.1 * intensity}),
            0 0 ${50 * intensity + 5}px rgba(0, 255, 0, ${0.05 * intensity})
        `;
        requestAnimationFrame(animateGlow);
    }
    animateGlow(); // Démarrer la boucle d'animation


    // -----------------------------------------------------
    // 2. Effet de frappe pour le Message de Statut de l'En-tête
    // -----------------------------------------------------
    const statusMessageElement = document.querySelector('.status-message');
    if (statusMessageElement) {
        const originalText = statusMessageElement.textContent;
        statusMessageElement.textContent = ''; // Effacer pour l'effet de frappe

        let charIndex = 0;
        const typingSpeed = 50; // millisecondes par caractère

        function typeWriter() {
            if (charIndex < originalText.length) {
                statusMessageElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        // Appeler après un court délai pour simuler le démarrage
        setTimeout(typeWriter, 1000);
    }

    // -----------------------------------------------------
    // 3. Effet Glitch sur les Éléments de Navigation au Survol
    // -----------------------------------------------------
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Ajouter une classe pour activer le CSS glitch
            item.classList.add('glitch-text-active');
            // Définir les variables CSS pour des décalages glitch aléatoires
            item.style.setProperty('--glitch-offset-x', `${(Math.random() * 20 - 10)}px`); // -10 à 10px
            item.style.setProperty('--glitch-offset-y', `${(Math.random() * 20 - 10)}px`); // -10 à 10px
        });

        item.addEventListener('mouseleave', () => {
            // Supprimer la classe pour arrêter l'animation glitch
            item.classList.remove('glitch-text-active');
        });
    });

    // -----------------------------------------------------
    // 4. (Optionnel Avancé) Arrière-plan de Particules
    // Envisagez d'intégrer une bibliothèque comme particles.js ou de construire une animation canvas
    // si vous voulez un arrière-plan vraiment dynamique. Ceci est juste une note conceptuelle.
    // Exemple :
    // import 'particles.js/particles';
    // particlesJS.load('particles-js', 'particlesjs-config.json', function() {
    //   console.log('configuration de particles.js chargée');
    // });
    // Vous auriez besoin d'une div en HTML : <div id="particles-js"></div>
    // Et d'un fichier particlesjs-config.json.
    // -----------------------------------------------------
});