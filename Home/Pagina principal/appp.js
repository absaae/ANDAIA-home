
function changeQuantity(productId, type, listCart) {
    switch (type) {
        case '-':
            listCart[productId].quantity--;
            if (listCart[productId].quantity <= 0) {
                delete listCart[productId];
            }
            break;
        case '+':
            listCart[productId].quantity++;
            break;
        default:
            break;
    }
    saveCart(listCart);
    addCartToHTML(listCart);
}


document.addEventListener('DOMContentLoaded', function() {
    let iconCart = document.querySelector('.iconCart');
    let cart = document.querySelector('.cart');
    let container = document.querySelector('.container');
    let close = document.querySelector('.close');
    let products = null;
    let listCart = [];

    iconCart.addEventListener('click', toggleCart);
    close.addEventListener('click', toggleCart);

    // Fetch product data
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });

    function toggleCart() {
        if (cart.style.right === '-100%') {
            cart.style.right = '0';
            container.style.transform = 'translateX(-400px)';
        } else {
            cart.style.right = '-100%';
            container.style.transform = 'translateX(0)';
        }
    }

    function addDataToHTML() {
        let listProductHTML = document.querySelector('.listProduct');
        listProductHTML.innerHTML = '';

        if (products !== null) {
            products.forEach((product, index) => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.innerHTML =
                    `<img src="${product.image}">
                    <h2>${product.name}</h2>
                    <div class="precio">$${product.price}</div>
                    <button class="add-to-cart-btn">Agregar al carrito</button>`; // Give the button a class
                listProductHTML.appendChild(newProduct);

                // Dynamically attach event listener to each button
                newProduct.querySelector('.add-to-cart-btn').addEventListener('click', function() {
                    addCart(index);
                });
            });
        }
    }

    function addCart(productIndex) {
        if (!listCart[productIndex]) {
            let dataProduct = products[productIndex]; // Access product from the array
            if (dataProduct) {
                listCart[productIndex] = { ...dataProduct, quantity: 1 };
            }
        } else {
            listCart[productIndex].quantity++;
        }

        saveCart();
        addCartToHTML();
    }

    function saveCart() {
        let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
        document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/;";
    }

    function addCartToHTML() {
        let listCartHTML = document.querySelector('.listCart');
        listCartHTML.innerHTML = '';
    
        let totalHTML = document.querySelector('.totalQuantity');
        let totalQuantity = 0;
    
        if (listCart) {
            Object.values(listCart).forEach((product, index) => {
                if (product) {
                    let newCart = document.createElement('div');
                    newCart.classList.add('item');
                    newCart.innerHTML =
                        `<img src="${product.image}">
                        <div class="content">
                            <div class="name">
                                ${product.name}
                            </div>
                            <div class="price">
                                $${product.price}
                            </div>
                        </div>
                        <div class="quantity">
                            <button onclick="changeQuantity(${product.id}, '-', listCart)">-</button>
                            <span class="value">${product.quantity}</span>
                            <button onclick="changeQuantity(${product.id}, '+', listCart)">+</button>
                        </div>`;
                    listCartHTML.appendChild(newCart);
                    totalQuantity += product.quantity;
                }
            });
        }
    
        totalHTML.innerText = totalQuantity;
    }

    // Initialize cart HTML
    addCartToHTML();
});
