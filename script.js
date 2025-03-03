document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script chargé pour : ", window.location.pathname);

    let menuToShow;

    // Vérifie sur quelle page on est pour afficher la bonne catégorie par défaut
    if (window.location.pathname.includes("yellowjack.html")) {
        menuToShow = document.querySelector(".menu-category.plats"); // Afficher "Plats" par défaut sur YellowJACK
    } else {
        menuToShow = document.querySelector(".menu-category.veggie"); // Afficher "Veggie" par défaut sur Rex's
    }

    // Vérifie que l'élément existe avant de modifier son style
    if (menuToShow) {
        menuToShow.style.display = "block";
    } else {
        console.error("❌ ERREUR : La catégorie par défaut est introuvable !");
    }

    // Gestion du changement de catégorie via les boutons
    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuCategories = document.querySelectorAll(".menu-category");

    menuTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            let category = tab.getAttribute("data-category");

            menuCategories.forEach(menu => {
                if (menu.classList.contains(category)) {
                    menu.style.display = "block";
                } else {
                    menu.style.display = "none";
                }
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire pour tester

        const username = document.getElementById("username-input").value.trim();
        const password = document.getElementById("password-input").value.trim();

        // Liste des identifiants et mots de passe valides
        const USERS = {
            "unicorn": "1458",       
            "rex": "admin2024",    
            "yellowjack": "YellowJACK",
            "riverside": "1642,
            "pacificb" : "8623",
           "esthgs": "5481",
           "esthvp": "3614",
           "esthvn": "8951"
        "esthsd": "3652"
        
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
