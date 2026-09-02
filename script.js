/* ==================================================
VELLORA FASHION HUB
MAIN JAVASCRIPT
================================================== */

/* ==================================================
SHOPPING CART
================================================== */

let cart = JSON.parse(
localStorage.getItem("velloraCart")
) || [];

/* ==================================================
SAVE CART
================================================== */

function saveCart() {

localStorage.setItem(
    "velloraCart",
    JSON.stringify(cart)
);

}

/* ==================================================
PRODUCT IMAGES
================================================== */

function getProductImage(productName) {

const images = {

    "Elegant Womens Dress":
        "images/women dress.jpg",

    "Mens Casual Shirt":
        "images/casual.jpg",

    "Womens Stylish Top":
        "images/stylish top.jpg",

    "Mens Classic Trousers":
        "images/classic trousers.jpg",

    "Classic Fashion Dress":
        "images/fashion dress.jpg",

    "Premium Unisex Shirt":
        "images/unisex shirt.jpg",

    "Womens Wide-Leg Trousers":
        "images/wide leg.jpg",
  
    "Fashion Accessories":
        "images/fashion-accessories.jpg",
      
    "Elegant Fashion Bags":
        "images/fashion bag.jpg",

    "Unisex Sneakers":
        "images/snickers.jpg",

    "Premium Unisex Designer Caps":
        "images/unisex face cap.jpg",
  
};

return images[productName] || "";

}

/* ==================================================
ADD TO CART
================================================== */

function addToCart(productName, productPrice) {

const existingProduct = cart.find(
    item => item.name === productName
);

if (existingProduct) {

    existingProduct.quantity++;

} else {

    cart.push({
        name: productName,
        price: productPrice,
        quantity: 1
    });

}

saveCart();
displayCart();
updateCartCount();

alert(
    productName +
    " has been added to your cart! 🛍️"
);

}

/* ==================================================
CART COUNT
================================================== */

function updateCartCount() {

const cartCount =
    document.getElementById("cart-count");

if (!cartCount) return;

const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
);

cartCount.textContent = totalItems;

}

/* ==================================================
DISPLAY CART
================================================== */

function displayCart() {

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

if (!cartItems || !cartTotal) return;

cartItems.innerHTML = "";

let total = 0;

if (cart.length === 0) {

    cartItems.innerHTML =
        "<p>Your cart is empty.</p>";

    cartTotal.textContent = "0";

    return;
}

cart.forEach((item, index) => {

    const itemTotal =
        item.price * item.quantity;

    total += itemTotal;

    const cartItem =
        document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

        <div class="cart-product">

            <img
                src="${getProductImage(item.name)}"
                alt="${item.name}"
                class="cart-product-image"
            >

            <div class="cart-product-info">

                <h3>${item.name}</h3>

                <p>
                    Price:
                    ₦${item.price.toLocaleString()}
                </p>

                <p>
                    Quantity:
                    ${item.quantity}
                </p>

                <p class="cart-subtotal">
                    Subtotal:
                    ₦${itemTotal.toLocaleString()}
                </p>

            </div>

        </div>

        <div class="cart-controls">

            <button onclick="decreaseQuantity(${index})">
                −
            </button>

            <span>
                ${item.quantity}
            </span>

            <button onclick="increaseQuantity(${index})">
                +
            </button>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>

        </div>
    `;

    cartItems.appendChild(cartItem);

});

cartTotal.textContent =
    total.toLocaleString();

displayCheckoutSummary();

}

/* ==================================================
QUANTITY
================================================== */

function increaseQuantity(index) {

if (!cart[index]) return;

cart[index].quantity++;

saveCart();
displayCart();
updateCartCount();

}

function decreaseQuantity(index) {

if (!cart[index]) return;

if (cart[index].quantity > 1) {

    cart[index].quantity--;

} else {

    cart.splice(index, 1);

}

saveCart();
displayCart();
updateCartCount();

}

/* ==================================================
REMOVE
================================================== */

function removeFromCart(index) {

if (!cart[index]) return;

cart.splice(index, 1);

saveCart();
displayCart();
updateCartCount();

}

/* ==================================================
CLEAR CART
================================================== */

function clearCart() {

if (cart.length === 0) {

    alert("Your cart is already empty.");

    return;
}

const confirmClear =
    confirm(
        "Are you sure you want to clear your cart?"
    );

if (!confirmClear) return;

cart = [];

saveCart();
displayCart();
updateCartCount();

alert("Your cart has been cleared.");

}

/* ==================================================
CHECKOUT
================================================== */

function checkout() {

if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
}

const form =
    document.getElementById("checkout-form");

if (!form) return;

form.style.display = "block";

displayCheckoutSummary();

form.scrollIntoView({
    behavior: "smooth",
    block: "start"
});

}

/* ==================================================
CHECKOUT SUMMARY
================================================== */

function displayCheckoutSummary() {

const container =
    document.getElementById(
        "checkout-order-items"
    );

const totalElement =
    document.getElementById(
        "checkout-total"
    );

if (!container || !totalElement) return;

container.innerHTML = "";

let total = 0;

cart.forEach(item => {

    const itemTotal =
        item.price * item.quantity;

    total += itemTotal;

    const itemElement =
        document.createElement("div");

    itemElement.className =
        "checkout-summary-item";

    itemElement.innerHTML = `

        <div>
            <strong>${item.name}</strong>
            <br>
            <small>
                ₦${item.price.toLocaleString()}
                × ${item.quantity}
            </small>
        </div>

        <strong>
            ₦${itemTotal.toLocaleString()}
        </strong>

    `;

    container.appendChild(itemElement);

});

totalElement.textContent =
    total.toLocaleString();

}

/* ==================================================
WHATSAPP CHECKOUT
================================================== */

function sendOrderToWhatsApp() {

if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
}

const name =
    document.getElementById(
        "customer-name"
    ).value.trim();

const phone =
    document.getElementById(
        "customer-phone"
    ).value.trim();

const address =
    document.getElementById(
        "customer-address"
    ).value.trim();

const city =
    document.getElementById(
        "customer-city"
    ).value.trim();

const payment =
    document.getElementById(
        "payment-method"
    ).value;


if (!name || !phone || !address || !city) {

    alert(
        "Please complete all your details."
    );

    return;
}


let message =
    "✨ *VELLORA FASHION HUB* ✨\n\n" +

    "🛍️ *NEW ORDER*\n\n" +

    "👤 *CUSTOMER DETAILS*\n" +

    "Name: " + name + "\n" +

    "Phone: " + phone + "\n" +

    "Address: " + address + "\n" +

    "City: " + city + "\n" +

    "Payment: " + payment + "\n\n" +

    "📦 *ORDER DETAILS*\n\n";


let total = 0;


cart.forEach((item, index) => {

    const itemTotal =
        item.price * item.quantity;

    total += itemTotal;

    message +=

        (index + 1) +
        ". *" +
        item.name +
        "*\n" +

        "Quantity: " +
        item.quantity +
        "\n" +

        "Price: ₦" +
        item.price.toLocaleString() +
        "\n" +

        "Subtotal: ₦" +
        itemTotal.toLocaleString() +
        "\n\n";

});


message +=

    "━━━━━━━━━━━━━━━━━━\n" +

    "💰 *TOTAL: ₦" +
    total.toLocaleString() +
    "*\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Thank you for shopping with " +
    "*Vellora Fashion Hub*! 🤎";


/*
   VELLORA WHATSAPP NUMBER

   08164812401
   International format:
   2348164812401
*/

const phoneNumber =
    "2348164812401";


const whatsappURL =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    encodeURIComponent(message);


/*
   Keep cart until WhatsApp opens.
*/

window.open(
    whatsappURL,
    "_blank"
);

}

/* ==================================================
MOBILE MENU
================================================== */

function toggleMenu() {

const navLinks =
    document.getElementById("navLinks");

if (!navLinks) return;

navLinks.classList.toggle("active");

}

/* CLOSE MOBILE MENU */

document.addEventListener(
"DOMContentLoaded",
function () {

    const navLinks =
        document.getElementById("navLinks");

    if (!navLinks) return;

    const links =
        navLinks.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "active"
                );

            }
        );

    });

}

);

/* ==================================================
PRODUCT DETAILS
================================================== */

function showProductDetails(
productName,
image,
description,
price
) {

const details =
    document.getElementById(
        "product-details"
    );

/*
   Create modal if it does not already exist.
*/

if (!details) {

    createProductModal();

}

const modal =
    document.getElementById(
        "product-details"
    );

const detailsImage =
    document.getElementById(
        "details-image"
    );

const detailsName =
    document.getElementById(
        "details-name"
    );

const detailsDescription =
    document.getElementById(
        "details-description"
    );

const detailsPrice =
    document.getElementById(
        "details-price"
    );

const cartButton =
    document.getElementById(
        "details-cart-button"
    );


detailsImage.src = image;

detailsImage.alt = productName;

detailsName.textContent =
    productName;

detailsDescription.textContent =
    description;

detailsPrice.textContent =
    "₦" + price.toLocaleString();


cartButton.onclick = function () {

    addToCart(
        productName,
        price
    );

    closeProductDetails();

};


modal.classList.add("active");

}

/* ==================================================
CREATE PRODUCT MODAL
================================================== */

function createProductModal() {

const modal =
    document.createElement("div");

modal.id = "product-details";

modal.className =
    "product-details";

modal.innerHTML = `

    <div class="details-content">

        <button
            class="close-details"
            onclick="closeProductDetails()">
            ×
        </button>

        <img
            id="details-image"
            src=""
            alt="Product">

        <div class="details-info">

            <h2 id="details-name"></h2>

            <p id="details-description"></p>

            <h3 id="details-price"></h3>

            <button
                id="details-cart-button"
                class="details-cart-btn">

                Add to Cart 🛍️

            </button>

        </div>

    </div>
`;

document.body.appendChild(modal);

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeProductDetails();
        }

    }
);

}

/* ==================================================
CLOSE PRODUCT DETAILS
================================================== */

function closeProductDetails() {

const details =
    document.getElementById(
        "product-details"
    );

if (!details) return;

details.classList.remove("active");

}

/* ==================================================
SEARCH
================================================== */

function searchProducts() {

const searchInput =
    document.getElementById(
        "product-search"
    );

if (!searchInput) return;

const searchText =
    searchInput.value
        .toLowerCase()
        .trim();

const products =
    document.querySelectorAll(
        ".product-card"
    );

products.forEach(product => {

    const name =
        product.querySelector("h3");

    const description =
        product.querySelector("p");

    if (!name) return;

    const searchableText =
        (
            name.textContent +
            " " +
            (description
                ? description.textContent
                : "")
        ).toLowerCase();

    product.style.display =
        searchableText.includes(searchText)
            ? ""
            : "none";

});

}

/* ==================================================
CATEGORY FILTER
================================================== */

function filterProducts(category) {

const products =
    document.querySelectorAll(
        ".product-card"
    );

products.forEach(product => {

    const productCategory =
        product.getAttribute(
            "data-category"
        );

    if (
        category === "all" ||
        productCategory === category
    ) {

        product.style.display = "";

    } else {

        product.style.display = "none";

    }

});


const searchInput =
    document.getElementById(
        "product-search"
    );

if (searchInput) {
    searchInput.value = "";
}

}

/* ==================================================
BACK TO TOP
================================================== */

window.addEventListener(
"scroll",
function () {

    const button =
        document.getElementById(
            "back-to-top"
        );

    if (!button) return;

    if (window.scrollY > 500) {

        button.classList.add("show");

    } else {

        button.classList.remove("show");

    }

}

);

function scrollToTop() {

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

/* ==================================================
INITIALIZE
================================================== */

document.addEventListener(
"DOMContentLoaded",
function () {

    displayCart();
    updateCartCount();

}

);

/* ==================================================
LOADING SCREEN
================================================== */

function hideLoadingScreen() {

const loadingScreen =
    document.getElementById(
        "loading-screen"
    );

if (!loadingScreen) return;

loadingScreen.classList.add("hidden");

setTimeout(
    function () {

        if (
            loadingScreen &&
            loadingScreen.parentNode
        ) {

            loadingScreen.remove();

        }

    },
    600
);

}

window.addEventListener(
"load",
function () {

    setTimeout(
        hideLoadingScreen,
        500
    );

}

);

/* SAFETY FALLBACK */

setTimeout(
hideLoadingScreen,
5000
);
