if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);

    }

    var likecolor = document.getElementsByClassName('fa fa-heart');
    for (var i = 0; i < likecolor.length; i++) {
        var heartItem = likecolor[i];
        heartItem.addEventListener('click', HeartClicked);
    }

    var addToCartButtons = document.getElementsByClassName('Cartbtn');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    var ButtonPlus = document.getElementsByClassName('plus');
    for (var i = 0; i < ButtonPlus.length; i++) {
        var btnp = ButtonPlus[i];
        btnp.addEventListener('click', AddQty);

    }

    var ButtonMinus = document.getElementsByClassName('minus');
    for (var i = 0; i < ButtonMinus.length; i++) {
        var btnm = ButtonMinus[i];
        btnm.addEventListener('click', SubQty);
    }
}

function AddQty(event) {
    var btn = event.target;
    btn.previousElementSibling.value++;
    quantityChangedPlus();

}

function SubQty(event) {
    var sub = event.target;
    sub.previousElementSibling.previousElementSibling.value--;
    quantityChangedMoin();

}

function HeartClicked(event) {
    var Heart = event.target;
    Heart.classList.toggle("mystyle");

}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

function quantityChangedPlus(event) {
    var btn = event.target;
    /*var input = btn.previousElementSibling.value;*/
    if (btn.previousElementSibling.value == 0 || btn.previousElementSibling.value <= 0) {
        alert('you can not choose below 1');
        return btn.previousElementSibling.value = 1;
    }
    updateCartTotal();
}

function quantityChangedMoin(event) {
    var btn = event.target;
    /*var input2 = btn.previousElementSibling.previousElementSibling.value;*/
    if (btn.previousElementSibling.previousElementSibling.value == 0 || btn.previousElementSibling.previousElementSibling.value <= 0) {
        alert('you can not choose below 1');
        return btn.previousElementSibling.previousElementSibling.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('itemName')[0].innerText;
    var price = shopItem.getElementsByClassName('cartprice')[0].innerText;
    var imgSrc = shopItem.getElementsByClassName('pic')[0].src;
    addItemToCart(title, price, imgSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('bodycart');
    var CartItems = document.getElementsByClassName('bodycart')[0];
    var cartItemsNames = CartItems.getElementsByClassName('Nametag');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('this item is already added to the cart');
            return;
        }
    }
    var CartRowContents = `<div class="cartproduct">
    <div class="cart_image">
        <a href="#0">
            <img src="${imgSrc}"
                alt="placeholder" width="200px">
        </a>
    </div>
    <div class="cartdetails">
        <h3 class="Nametag">${title}</h3>
    </div>
    <div class="Pricedetails">${price}
    </div>
    <input class="quantity" type="number" value="1" id='QTY'>
    <button class="plus" id="pls">+</button>
    <button class="minus" id="min">-</button>
    <button class="remove" id="rmv">Remove</button>
</div>`
    cartRow.innerHTML = CartRowContents;
    CartItems.append(cartRow);
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('plus')[0].addEventListener('click', AddQty);
    cartRow.getElementsByClassName('minus')[0].addEventListener('click', SubQty);
    cartRow.getElementsByClassName('plus')[0].addEventListener('click', quantityChangedPlus);
    cartRow.getElementsByClassName('minus')[0].addEventListener('click', quantityChangedMoin);

}

function updateCartTotal() {
    var cartitemContainer = document.getElementsByClassName('bodycart')[0];
    var cartrows = cartitemContainer.getElementsByClassName('cartproduct');
    var total = 0;
    for (var i = 0; i < cartrows.length; i++) {
        var cartrow = cartrows[i];
        var priceElement = cartrow.getElementsByClassName('Pricedetails')[0];
        var quantityElemet = cartrow.getElementsByClassName('quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('DT', ''));
        var quantity = quantityElemet.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    var totalP = document.getElementsByClassName('totalPrice')[0].innerText = total + ' DT';
    totalP.classList.add('totalPrice');
    return totalP;

}