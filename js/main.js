document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------
    // 1. Préchargement des Actifs Critiques (Images, etc.)
    // Cela aide à améliorer la vitesse de chargement perçue.
    // -----------------------------------------------------
    const preloadImages = ['icons/github.svg', 'icons/linkedin.svg'];
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // -----------------------------------------------------
    // 2. Défilement Fluide pour la Navigation
    // -----------------------------------------------------
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Supprimer la classe active de tous et l'ajouter à l'élément cliqué
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            // Vérifier si la cible existe avant de défiler
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Section cible non trouvée pour : ${targetId}`);
            }
        });
    });

    // Optionnel : Ajouter la classe active lors du défilement
    const sections = document.querySelectorAll('main section');
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // Déclencher quand 50% de l'élément est visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // -----------------------------------------------------
    // 3. Logique de la Fenêtre Modale des Projets
    // -----------------------------------------------------
    const projectModal = document.getElementById('project-detail-modal');
    const closeButton = projectModal.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-project-title');
    const modalTech = document.getElementById('modal-project-tech');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalLiveLink = document.getElementById('modal-live-link');
    const modalGithubLink = document.getElementById('modal-github-link');

    // Données de projet fictives (dans une vraie application, cela proviendrait d'une API ou d'un fichier JSON)
    // Assurez-vous que 'liveLink' et 'githubLink' sont des URL réelles ou des chaînes vides si non disponibles.
    const projectsData = {
        'logiciel-de-comptabilité': {
            title: 'Logiciel de comptabilité',
            tech: 'Java SE',
            description: 'Mon logiciel de comptabilité, développé en Java, est une solution robuste et fiable conçue pour simplifier la gestion financière des entreprises et des indépendants. Axé sur la stabilité et la performance, il offre une interface intuitive pour une prise en main rapide tout en intégrant les fonctionnalités essentielles pour une comptabilité rigoureuse et conforme.',
            liveLink: '#', // Exemple de lien réel
            githubLink: 'https://github.com/TechNerdSam/BeyahCompta' // Exemple de lien réel
        },
        'réseau-social-de-gameur': {
            title: 'Réseau social de Gameur',
            tech: 'HTML/CSS/JS et Gsap/GreenSock/Jakarta EE/Spring Boot',
            description: 'Développé avec une architecture robuste mêlant le dynamisme du HTML5, CSS3, et JavaScript pour une interface utilisateur fluide et réactive (enrichie par les animations immersives de GSAP/GreenSock), et la puissance du Jakarta EE / Spring Boot côté serveur, Gamers Hub est le réseau social nouvelle génération dédié aux joueurs.',
            liveLink: '#', // Pas de lien live pour celui-ci
            githubLink: 'https://github.com/TechNerdSam/Reseau_social2gamers'
        },
        // Ajoutez d'autres données de projet ici en suivant la même structure
    };

    document.querySelectorAll('.view-project-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.dataset.id;
            const project = projectsData[projectId];

            if (project) {
                modalTitle.textContent = project.title;
                modalTech.textContent = `Technologies: ${project.tech}`;
                modalDesc.textContent = project.description;
                
                // Définir et afficher le lien live
                if (project.liveLink) {
                    modalLiveLink.href = project.liveLink;
                    modalLiveLink.style.display = 'inline-block';
                } else {
                    modalLiveLink.style.display = 'none';
                }

                // Définir et afficher le lien GitHub
                if (project.githubLink) {
                    modalGithubLink.href = project.githubLink;
                    modalGithubLink.style.display = 'inline-block';
                } else {
                    modalGithubLink.style.display = 'none';
                }

                projectModal.style.display = 'flex'; // Utiliser flex pour centrer
                projectModal.setAttribute('aria-hidden', 'false'); // Pour l'accessibilité
                modalTitle.focus(); // Déplacer le focus vers le titre de la modale
            } else {
                console.error(`Données de projet non trouvées pour l'ID : ${projectId}`);
            }
        });
    });

    closeButton.addEventListener('click', () => {
        projectModal.style.display = 'none';
        projectModal.setAttribute('aria-hidden', 'true'); // Pour l'accessibilité
    });

    // Fermer la modale si cliqué en dehors du contenu
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
            projectModal.setAttribute('aria-hidden', 'true');
        }
    });

    // Fermer la modale avec la touche Échap
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal.style.display === 'flex') {
            projectModal.style.display = 'none';
            projectModal.setAttribute('aria-hidden', 'true');
        }
    });

    // -----------------------------------------------------
    // 4. Animer les Barres de Compétences au Défilement (Intersection Observer)
    // -----------------------------------------------------
    const skillSection = document.getElementById('skills');
    const skillBarContainers = document.querySelectorAll('.progress-bar-container');

    const skillObserverOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // Déclencher quand 50% de l'élément est visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBarContainers.forEach(container => {
                    const progressBar = container.querySelector('.progress-bar');
                    // Obtenir la largeur cible à partir du style inline défini en HTML
                    const targetWidth = progressBar.style.width;
                    // Appliquer la largeur pour déclencher la transition CSS
                    progressBar.style.width = targetWidth;

                    // Mettre à jour la valeur ARIA
                    const ariaValue = container.getAttribute('aria-valuenow');
                    container.setAttribute('aria-valuenow', ariaValue);
                });
                observer.unobserve(entry.target); // Cesser d'observer une fois animé
            }
        });
    }, skillObserverOptions);

    if (skillSection) {
        skillObserver.observe(skillSection);
    }


    // -----------------------------------------------------
    // 5. Soumission du Formulaire de Contact
    // (Exemple - à remplacer par une logique backend réelle)
    // -----------------------------------------------------
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        formStatus.textContent = 'Envoi du message...';
        formStatus.className = 'status-message'; // Réinitialiser la classe
        formStatus.classList.add('info'); // Ajouter une classe pour le statut info

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Validation basique côté client
        if (!data.name || !data.email || !data.message) {
            formStatus.textContent = 'Erreur : Tous les champs sont obligatoires.';
            formStatus.classList.add('error');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(data.email)) {
            formStatus.textContent = 'Erreur : Veuillez entrer une adresse email valide.';
            formStatus.classList.add('error');
            return;
        }

        // Simuler un appel API
        try {
            // !!! IMPORTANT : Remplacez ceci par votre véritable point de terminaison backend !!!
            // Pour un site en production, vous avez BESOIN d'un script côté serveur pour gérer l'envoi d'e-mails.
            // Exemple pour un point de terminaison réel :
            // const response = await fetch('VOTRE_ENDPOINT_API_BACKEND', {
            const response = await fetch('/api/contact', { // Ce chemin est un placeholder pour votre serveur
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                formStatus.textContent = 'Message envoyé avec succès ! Attendez la confirmation de transmission.';
                formStatus.classList.remove('info', 'error');
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                // Tenter d'analyser le message d'erreur du corps de la réponse
                const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
                formStatus.textContent = `Erreur : ${errorData.message || 'Échec de l\'envoi du message. Veuillez réessayer.'}`;
                formStatus.classList.remove('info', 'success');
                formStatus.classList.add('error');
            }
        } catch (error) {
            console.error('Erreur de soumission :', error);
            formStatus.textContent = 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.';
            formStatus.classList.remove('info', 'success');
            formStatus.classList.add('error');
        } finally {
            // Effacer le statut après 5 secondes
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'status-message';
            }, 5000);
        }
    });
});