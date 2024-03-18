let cart = [];

    function addToCart() {
        const foodSelect = document.getElementById('food');
        const food = foodSelect.options[foodSelect.selectedIndex].text;
        const quantity = parseInt(document.getElementById('quantity').value);

        const existingItemIndex = cart.findIndex(item => item.food === food);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ food, quantity });
        }

        displayCart();
    }

    function displayCart() {
        const cartDiv = document.getElementById('cart');
        cartDiv.innerHTML = '';

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = 1;
            quantityInput.addEventListener('input', (event) => {
                item.quantity = parseInt(event.target.value);
            });

            const itemName = document.createElement('span');
            itemName.textContent = item.food;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.food !== item.food);
                displayCart();
            });

            cartItemDiv.appendChild(quantityInput);
            cartItemDiv.appendChild(itemName);
            cartItemDiv.appendChild(removeButton);

            cartDiv.appendChild(cartItemDiv);
        });

        showPaymentForm();
    }

    function showPaymentForm() {
        const paymentForm = document.querySelector('.payment-form');
        paymentForm.style.display = cart.length > 0 ? 'block' : 'none';
    }

    function calculateChange() {
        const cashInput = document.getElementById('cash');
        const cash = parseFloat(cashInput.value);
        const total = calculateTotal();

        if (isNaN(cash) || cash < total) {
            alert('Insufficient cash!');
            return;
        }

        const change = cash - total;
        const changeMessage = `Change: ${change.toFixed(2)} pesos`;

        document.getElementById('changeMessage').textContent = changeMessage;
        document.getElementById('overlay').style.display = 'flex';

        localStorage.setItem('paymentPopupShown', 'true');
    }

    function closePaymentPopup() {
        document.getElementById('overlay').style.display = 'none';
        clearCart();
    }

    function calculateTotal() {
        let total = 0;
        cart.forEach(item => {
            total += getItemPrice(item.food) * item.quantity;
        });
        return total;
    }

    function getItemPrice(item) {
        switch (item) {
            case 'Burger - 60 pesos':
                return 60;
            case 'Fries - 50 pesos':
                return 50;
            case 'Fishbol - 20 pesos':
                return 20;
            case 'Kikiam - 25 pesos':
                return 25;
            default:
                return 0;
        }
    }

    function clearCart() {
        cart = [];
        displayCart();
        
    }