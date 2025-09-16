document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const popup = document.getElementById('popup-message');
    const closePopupBtn = document.getElementById('close-popup');
    const feedback = document.getElementById('feedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Récupère les valeurs des champs
            const nom = document.getElementById('nom').value.trim();
            const prenom = document.getElementById('prenom').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Regex pour validation
            const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const messageRegex = /^.{10,}$/;
            const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

            // Validation des champs
            if (!nameRegex.test(nom)) {
                feedback.textContent = "Veuillez entrer un nom valide.";
                return;
            }
            if (!nameRegex.test(prenom)) {
                feedback.textContent = "Veuillez entrer un prénom valide.";
                return;
            }
            if (!emailRegex.test(email)) {
                feedback.textContent = "Veuillez entrer une adresse email valide.";
                return;
            }
            if (!messageRegex.test(message)) {
                feedback.textContent = "Votre message doit contenir au moins 10 caractères.";
                return;
            }
            if (scriptRegex.test(nom) || scriptRegex.test(prenom) || scriptRegex.test(message)) {
                feedback.textContent = "Les balises HTML ou scripts ne sont pas autorisés.";
                return;
            }

            feedback.textContent = "";

            // Envoi AJAX à FormSubmit.co
            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true") {
                    popup.classList.remove('hidden');
                    form.reset();
                } else {
                    feedback.textContent = "Erreur lors de l'envoi du formulaire.";
                }
            })
            .catch(() => {
                feedback.textContent = "Erreur réseau.";
            });
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            popup.classList.add('hidden');
        });
    }
});