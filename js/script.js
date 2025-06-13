// Hero Slider + Cart Logic
document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-bg .slide');

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

  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000);
  }

  // ✅ Cart Logic
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  window.addToCart = function(course, price) {
    cart.push({ course, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${course} added to cart!`);
  };

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

    cart.forEach(item => {
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

  // Initialize Cart on Cart Page
  if (document.getElementById('cart-items')) {
    displayCart();
  }

  // Handle Payment Submission
  const form = document.querySelector('form');
  if (form && window.location.pathname.includes("payment.html")) {
    form.addEventListener('submit', handlePayment);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const animatedSections = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.2 });

  animatedSections.forEach(section => {
    observer.observe(section);
  });
});