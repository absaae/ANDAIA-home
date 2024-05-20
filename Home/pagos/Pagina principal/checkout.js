document.addEventListener('DOMContentLoaded', function() {
    let listCart = [];

    // Function to update the cart contents
    function updateCart() {
        // Your code to update the cart contents, e.g., adding/removing items
        // and saving the updated cart to localStorage or cookies
        // This might involve adding event listeners to the "Add to Cart" and "Remove from Cart" buttons
        // For simplicity, I'll provide a dummy implementation here
        // This function should be customized based on how you manage your cart data
        listCart = [
            { name: "Product 1", price: 100, quantity: 2 },
            { name: "Product 2", price: 50, quantity: 1 }
        ];
        saveCart(); // Assuming you have a function to save the cart to localStorage or cookies
        updatePaymentSection();
    }

    // Function to recalculate the total quantity and price of items in the cart
    function calculateCartTotal() {
        let totalQuantity = 0;
        let totalPrice = 0;
        listCart.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });
        return { totalQuantity, totalPrice };
    }

    // Function to update the payment section
    function updatePaymentSection() {
        let { totalQuantity, totalPrice } = calculateCartTotal();
        let totalQuantityHTML = document.querySelector('.totalQuantity');
        let totalPriceHTML = document.querySelector('.totalPrice');
        totalQuantityHTML.innerText = totalQuantity;
        totalPriceHTML.innerText = `$${totalPrice}`;
    }

    // Function to check cart from cookies
    function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row=> row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
    }

    // Initialize cart and payment section
    checkCart();
    updatePaymentSection();

    // Example: Add event listener to update cart (dummy implementation)
    let addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Dummy implementation to add item to cart
            updateCart();
        });
    }

    function displayProducts() {
        let listHTML = document.querySelector('.returnCart .list');
        listHTML.innerHTML = '';

        listCart.forEach(product => {
            let productHTML = `
                <div class="item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>
                </div>
            `;
            listHTML.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    
    function validateForm() {
        var fullName = document.getElementById('fullName').value;
        var phoneNumber = document.getElementById('phoneNumber').value;
        var address = document.getElementById('address').value;
        var state = document.getElementById('state').value;
        var city = document.getElementById('city').value;

        if (fullName === '' || phoneNumber === '' || address === '' || state === '' || city === '') {
            alert('Por favor, complete todos los campos antes de proceder al pago.');
            return false; // Prevent form submission
        }

        return true; // Allow form submission
    }

    // Add this function to your button's onclick event
    function redirectToPayment() {
        if (validateForm()) {
            window.location.href = 'https://www.paypal.com/ncp/payment/ZCUQ7LYTNZRUS'; // Redirect to payment page
        }
    }

    // Display products when the page loads
    displayProducts();
});
