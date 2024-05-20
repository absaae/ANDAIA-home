

document.addEventListener('DOMContentLoaded', function() {
    let iconCart = document.querySelector('.iconCart');
    let cart = document.querySelector('.cart');
    let container = document.querySelector('.container');
    let close = document.querySelector('.close');
    let products = null;
    // Initialize listCart with the data from localStorage if it exists, otherwise initialize it as an empty object
    let listCart = localStorage.getItem('listCart');
    if (listCart) {
        listCart = JSON.parse(listCart);
    } else {
        listCart = {};
    }

    iconCart.addEventListener('click', toggleCart);
    close.addEventListener('click', toggleCart);

    // Fetch product data
    fetch('productosA.json')
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

     // Select the clear cart button
     let clearCartBtn = document.querySelector('.clear-cart-btn');

     // Add event listener to the clear cart button
     clearCartBtn.addEventListener('click', function() {
         // Call a function to clear the cart
         clearCart();
     });
 
     // Function to clear the cart
    function clearCart() {

         // Clear the listCart object
         listCart = {};
         // Save the empty cart to localStorage
         saveCart();
         // Update the cart displayed on the HTML
         addCartToHTML();
    }
    
    function saveCart() {
        // Convert the listCart object to a JSON string
        let listCartString = JSON.stringify(listCart);
        // Store the JSON string in the localStorage under the key 'listCart'
        localStorage.setItem('listCart', listCartString);
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
                            <span class="value">${product.quantity}</span>
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
