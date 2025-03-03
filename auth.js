document.addEventListener("DOMContentLoaded", function () {
    console.log("🔒 Vérification de l'authentification...");

    // Vérifie si l'utilisateur est authentifié
    if (!localStorage.getItem("authenticated")) {
        console.log("⛔ Accès refusé. Redirection vers login.html");
        window.location.href = "login.html";
    } else {
        console.log("✅ Accès autorisé !");
    }

    try {
        const logoutButton = document.getElementById("logout-button");

        if (logoutButton) {
            logoutButton.addEventListener("click", function () {
                console.log("🚪 Déconnexion en cours...");
                localStorage.removeItem("authenticated");
                window.location.href = "login.html";
            });
        }
    } catch (error) {
        console.warn("⚠️ Erreur capturée : ", error);
    }
    console.clear(); // Efface la console pour éviter les messages inutiles
});
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire pour tester

        const username = document.getElementById("username-input").value.trim();
        const password = document.getElementById("password-input").value.trim();

        // Liste des identifiants et mots de passe valides
        const USERS = {
            "admin": "1234",       // Identifiant "admin" avec mot de passe "1234"
            "rex": "admin2024",    // Identifiant "rex" avec mot de passe "admin2024"
            "yellowjack": "YellowJACK" // Identifiant "yellowjack" pour accès spécial
        };

        if (USERS[username] && USERS[username] === password) {
            alert("Connexion réussie !");
            
            // Gestion des redirections selon l'utilisateur
            if (username === "yellowjack") {
                window.location.href = "yellowjack.html#plats";
            } else {
                window.location.href = "Rex's.html";
            }
        } else {
            alert("Identifiant ou mot de passe incorrect !");
        }
    });

    // Gestion du bouton pour afficher/masquer le mot de passe
    document.getElementById("toggle-password").addEventListener("click", function () {
        let passwordInput = document.getElementById("password-input");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.textContent = "🙈"; // Change l'icône
        } else {
            passwordInput.type = "password";
            this.textContent = "👁️"; // Rechange l'icône
        }
    });
});
