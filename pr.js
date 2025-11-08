// 50 product images from Unsplash (free to hotlink)
const imageUrls = [
  "https://i.pinimg.com/736x/86/45/58/864558f0ec6fecb4341dc983474001cb.jpg",
  "https://i.pinimg.com/1200x/38/c6/15/38c61509a5c47fa32db9570a57e554d8.jpg",
  "https://i.pinimg.com/736x/3d/6c/49/3d6c49e818e9150e6d17b46d3b924ef2.jpg",
  "https://i.pinimg.com/1200x/5e/61/d8/5e61d80c51fab5dc4616bea9069f5904.jpg",
  "https://i.pinimg.com/736x/62/96/04/6296049c42425972f21d41eec5d6d90b.jpg",
  "https://i.pinimg.com/1200x/db/ac/90/dbac9078ffbd7222172a4c43cfd49bd0.jpg",
  "https://i.pinimg.com/1200x/ab/b9/a8/abb9a8c685a711e5e1ff4c716394b7c2.jpg",
  "https://i.pinimg.com/736x/e8/0d/ec/e80decbeb3655078b07d30bc66066c85.jpg",
  "https://i.pinimg.com/1200x/88/2b/79/882b7982ea4f482613f35d849c075edd.jpg",
  "https://i.pinimg.com/736x/62/96/04/6296049c42425972f21d41eec5d6d90b.jpg",

];

// Generate 50 products
const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: ["Classic Brown Shades","Modern Gold Frames","Round Beige Glasses","Matte Black Vision","Vintage Coffee Look","Amber Square Glasses"][i % 6] + " " + (i + 1),
  price: (29 + Math.floor(Math.random() * 120)).toFixed(2),
  color: ["beige","brown","gold","black"][i % 4],
  img: imageUrls[i % imageUrls.length],
  desc: "High‑quality designer sunglasses that combine fashion and comfort."
}));

// DOM Elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const modal = new bootstrap.Modal(document.getElementById('productModal'));
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalAddBtn = document.getElementById('modalAddBtn');

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeColor = "all";
let currentModalProduct = null;

// Render Products
function renderProducts(list){
  productGrid.innerHTML = '';
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="product-info">
        <h5>${product.name}</h5>
        <p class="product-price">${product.price}</p>
        <button class="btn-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);

    card.querySelector("img").addEventListener("click", ()=>openModal(product));
    card.querySelector("h5").addEventListener("click", ()=>openModal(product));
    card.querySelector(".btn-cart").addEventListener("click", ()=>addToCart(product));
  });
}

// Modal
function openModal(product){
  currentModalProduct = product;
  modalTitle.textContent = product.name;
  modalImg.src = product.img;
  modalPrice.textContent = "" + product.price;
  modalDesc.textContent = product.desc;
  modalAddBtn.onclick = () => addToCart(product);
  modal.show();
}

// Cart
function addToCart(product){
  const existing = cart.find(item => item.id === product.id);
  if(existing) existing.qty++;
  else cart.push({...product, qty:1});
  saveCart();
  updateCartUI();
}

function removeItem(id){
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI(){
  cartCount.textContent = cart.reduce((total,item)=>total+item.qty,0);
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="">
      <div>
        <h6>${item.name}</h6>
        <p>$${item.price} × ${item.qty}</p>
        <button class="btn btn-sm btn-outline-danger">Remove</button>
      </div>
    `;
    div.querySelector("button").addEventListener("click", ()=>removeItem(item.id));
    cartItemsContainer.appendChild(div);
  });
  cartTotal.textContent = totalPrice.toFixed(2);
}

// Checkout
checkoutBtn.addEventListener("click", ()=>{
  cart = [];
  saveCart();
  updateCartUI();
  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("cartOffcanvas"));
  offcanvas.hide();
  alert("Checkout successful! Returning to home page.");
});

// Filters
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeColor = btn.dataset.color;
    applyFilters();
  });
});

searchInput.addEventListener('input', applyFilters);
function applyFilters(){
  let filtered = products;
  if(activeColor !== "all"){
    filtered = filtered.filter(p => p.color.toLowerCase() === activeColor.toLowerCase());
  }
  const query = searchInput.value.toLowerCase();
  if(query){
    filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
  }
  renderProducts(filtered);
}

// Initial render
renderProducts(products);
updateCartUI();
