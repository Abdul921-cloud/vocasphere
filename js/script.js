// Hero Slider Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('show');
    if (i === index) {
      slide.classList.add('show');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 4000);
showSlide(currentSlide);

// Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(course, price) {
  cart.push({ course, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${course} added to cart!`);
}

function displayCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalPriceContainer = document.getElementById('total-price');

  if (!cartContainer || !totalPriceContainer) return;

  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceContainer.textContent = '';
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<p>${item.course} - $${item.price}</p>`;
    cartContainer.appendChild(div);
    total += item.price;
  });

  totalPriceContainer.textContent = `Total: $${total}`;
}

function handlePayment(event) {
  event.preventDefault();
  alert("Payment Successful!");
  localStorage.removeItem('cart');
  window.location.href = 'success.html';
}

// Initialize cart if element is present
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('cart-items')) {
    displayCart();
  }

  const form = document.querySelector('form');
  if (form && window.location.pathname.includes("payment.html")) {
    form.addEventListener('submit', handlePayment);
  }
});
