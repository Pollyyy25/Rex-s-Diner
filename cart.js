let cart = []; // 🛒 Déclaré globalement pour être accessible partout

document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-toggle");
    const closeButton = document.querySelector(".close-cart");
    const cartSidebar = document.getElementById("cart-sidebar");

    if (cartButton) {
        cartButton.addEventListener("click", function () {
            cartSidebar.classList.toggle("open"); // Ajoute ou enlève la classe 'open'
        });    
    } else {
        console.error("⚠️ Bouton 'Voir le panier' introuvable !");
    }

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            cartSidebar.classList.remove("open"); // Ferme le panier en supprimant 'open'
        });
    } else {
        console.error("⚠️ Bouton 'Fermer le panier' introuvable !");
    }
});


    function updateCart() {
        let cartContent = document.getElementById("cart-content");
        let clientInfo = document.getElementById("client-info");

        cartContent.innerHTML = "";

        if (cart.length === 0) {
            cartContent.innerHTML = "<p>🛒 Votre panier est vide.</p>";
            if (clientInfo) clientInfo.style.display = "none";
            return;
        }

        if (clientInfo) clientInfo.style.display = "block";

        let total = 0;
        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartContent.innerHTML += `
                <div class="cart-item">
                    <p>${item.name} x${item.quantity} - ${itemTotal}$</p>
                      <button class="remove-btn" onclick="removeFromCart('${item.name}')">🗑️</button>
                </div>
            `;
        });

        cartContent.innerHTML += `<p><strong>Total : ${total}$</strong></p>`;

        // Ajout des événements de suppression
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let name = this.getAttribute("data-name");
                removeFromCart(name);
            });
        });
    }
    window.updateCart = updateCart;

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        console.log(`🗑️ Suppression de ${name} du panier`);
        updateCart();
    }
    window.removeFromCart = removeFromCart;

    function addToCart(name, price, quantity) {
        price = parseFloat(price) || 0;
        quantity = parseInt(quantity) || 1;

        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCart();
    }
    window.addToCart = addToCart;

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            let item = event.target.closest(".item");
            let name = event.target.getAttribute("data-name");
            let price = parseFloat(event.target.getAttribute("data-price")) || 0;

            let quantityInput = item.querySelector(".quantity");
            let quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

            console.log(`🛒 Ajout au panier : ${name} | Prix : ${price}$ | Quantité : ${quantity}`);
            addToCart(name, price, quantity);
        }
    });

// ------------------- Gestion du bouton "Valider la commande" -------------------

document.addEventListener("DOMContentLoaded", function () {
    const validateButton = document.getElementById("validate-order");

    if (validateButton) {
        validateButton.addEventListener("click", function () {
            console.log("✅ Bouton 'Valider la commande' cliqué !");

            if (cart.length === 0) {
                console.warn("⚠️ Le panier est vide, commande annulée !");
                alert("Votre panier est vide !");
                return;
            }

            const clientName = document.getElementById("client-name").value.trim();
            const clientPhone = document.getElementById("client-phone").value.trim();
            const clientAvailability = document.getElementById("client-availability").value.trim();

            if (!clientName || !clientPhone || !clientAvailability) {
                alert("Veuillez remplir toutes les informations client avant de valider !");
                return;
            }

            let orderDetails = cart.map(item => `**${item.name}** x${item.quantity} → **${item.price * item.quantity}$**`).join("\n");
            let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const webhookURL = "https://discord.com/api/webhooks/1344864067772350495/S9ecFQn1zDWrtOvbatmtfaREkItNaHX4YEUFDLmyfYzTefBuuXOyLV-eJnuYvKXLnb8M";

            const embedMessage = {
                embeds: [{
                    title: "📦 Nouvelle Commande",
                    color: 0xff66cc, // Rose flashy
                    fields: [
                        { name: "👤 **Client**", value: `**Nom** : ${clientName}\n📞 **Téléphone** : ${clientPhone}\n⏳ **Disponibilité** : ${clientAvailability}`, inline: false },
                        { name: "🛍️ **Commande**", value: orderDetails, inline: false },
                        { name: "💰 **Total**", value: `**${total}$**`, inline: true }
                    ],
                    footer: {
                        text: "Commande envoyée depuis le site Rex's Diner",
                        icon_url: "https://files.catbox.moe/ho4ue3.png"
                    },
                    timestamp: new Date().toISOString()
                }]
            };

            fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(embedMessage)
            })
            .then(response => {
                if (response.ok) {
                    console.log("✅ Commande envoyée à Discord !");
                    alert("Commande envoyée avec succès !");
                    cart = [];
                    updateCart();
                } else {
                    console.error("❌ Erreur lors de l'envoi à Discord :", response.status);
                    alert("Erreur lors de l'envoi de la commande !");
                }
            })
            .catch(error => {
                console.error("❌ Erreur réseau :", error);
                alert("Erreur de connexion !");
            });
        });
    } else {
        console.error("⚠️ Bouton 'Valider la commande' introuvable !");
    }
}); 
