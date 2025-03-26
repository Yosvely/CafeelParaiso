// Función para actualizar el carrito
function updateCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    const cartItemsModal = document.getElementById("cart-items-modal");
    const totalPriceModal = document.getElementById("total-price-modal");
    
    // Mostrar la cantidad de productos en el carrito
    cartCount.textContent = cart.length;

    // Mostrar los productos en el modal
    cartItemsModal.innerHTML = ""; // Limpiar el contenido del modal
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        // Nombre y precio del producto
        itemElement.innerHTML = `
            <span>${item.name} - RD$ ${item.price}</span>
            <button class="remove-item" data-index="${index}">Eliminar</button>
        `;
        cartItemsModal.appendChild(itemElement);

        totalPrice += item.price;
    });

    totalPriceModal.innerHTML = `<strong>Total: RD$ ${totalPrice.toFixed(2)}</strong>`;

    if (cart.length === 0) {
        cartCount.textContent = "0";
    }
}

// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Eliminar el producto en el índice dado
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Función para agregar eventos a los botones de "Agregar al Carrito"
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const productName = e.target.getAttribute("data-product");
        const productPrice = parseFloat(e.target.getAttribute("data-price"));
        addToCart(productName, productPrice);
    });
});

// Función para agregar eventos a los botones de "Eliminar" dentro del modal
document.getElementById("cart-items-modal").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const index = e.target.getAttribute("data-index");
        removeFromCart(index); // Llamar la función para eliminar el producto
    }
});

// Inicializar el carrito al cargar la página
window.onload = updateCart;
