const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItensContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// abrir modal do carrinho
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
});

// fechar modal qdo clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none";
    }
});

// fechar modal pelo borão fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none";
})

// coletar os dados quando clica no produto
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn");
    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        // adicionar ao carrinho
        addToCart(name,price)
    }
})

// função para adicionar ao carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)
    if(existingItem){ 
        existingItem.quantity +=1; // se o item existe aumenta a qtd ao inves d duplicar
    } else{ // se não entrar vai apenas adicionar mais um item
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal();
}

//função para atualizar o carrinho
function updateCartModal(){
    cartItensContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
            <div>
                <div>
                    <p>${item.name}</p>
                    <p>${item.quantity}</p>
                    <p>R$${item.price}</p>
                </div>
                <div>
                    <button>Remover</button>
                </div>
            </div>
        `;
        cartItensContainer.appendChild(cartItemElement); /* cartItensContainer.appendChild(cartItemElement); -- prepend*/
    });
}