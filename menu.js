document.addEventListener("DOMContentLoaded", function () {
    console.log("🍽️ Gestion des menus chargée...");

    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuCategories = document.querySelectorAll(".menu-category");

    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener("click", function () {
                let category = tab.getAttribute("data-category");

                menuCategories.forEach(menu => {
                    if (menu.id === category) {
                        menu.style.display = "block";
                    } else {
                        menu.style.display = "none";
                    }
                });
            });
        });
    }
});

