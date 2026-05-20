/* ============================================
   VinayakVision - Main Application JS
   Core: Nav, Cart, Wishlist, Search, Animations
   ============================================ */

// --- State ---
let cart = JSON.parse(localStorage.getItem('vv_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('vv_wishlist')) || [];

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavbar();
    initMobileMenu();
    initSearch();
    initScrollAnimations();
    initCounters();
    initTestimonials();
    initFeaturedProducts();
    updateCartUI();
    updateWishlistUI();
});

// --- Preloader ---
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    });
    // Fallback: hide after 3s regardless
    setTimeout(() => preloader.classList.add('hidden'), 3000);
}

// --- Navbar scroll effect ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    // Trigger once on load
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

// --- Mobile Menu ---
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// --- Search ---
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.querySelector('.search-close');
    const searchResults = document.getElementById('searchResults');

    if (!searchToggle || !searchOverlay) return;

    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.toggle('active');
        if (searchOverlay.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 100);
        }
    });

    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query.length < 2) { searchResults.innerHTML = ''; return; }

            const results = PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            ).slice(0, 8);

            searchResults.innerHTML = results.length
                ? results.map(p => `
                    <div class="search-result-item" onclick="window.location.href='shop.html?search=${encodeURIComponent(p.name)}'">
                        <div class="result-img"><i class="fas fa-glasses"></i></div>
                        <div class="result-info">
                            <h4>${p.name}</h4>
                            <p>${p.brand} · ₹${p.price.toLocaleString()}</p>
                        </div>
                    </div>
                `).join('')
                : '<p style="text-align:center;padding:20px;color:var(--gray-400);">No products found</p>';
        }, 300));
    }
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

// --- Counter Animation ---
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCount(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function tick() {
        current += step;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            return;
        }
        el.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(tick);
    }
    tick();
}

// --- Testimonials Slider ---
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonialDots');
    if (!cards.length || !dotsContainer) return;

    let current = 0;

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        cards[current].classList.remove('active');
        dotsContainer.children[current].classList.remove('active');
        current = index;
        cards[current].classList.add('active');
        dotsContainer.children[current].classList.add('active');
    }

    // Auto-advance
    setInterval(() => goTo((current + 1) % cards.length), 5000);
}

// --- Featured Products (Home page) ---
function initFeaturedProducts() {
    const grid = document.getElementById('featuredProducts');
    if (!grid) return;

    const featured = PRODUCTS.filter(p => p.featured).slice(0, 8);
    grid.innerHTML = featured.map(p => createProductCard(p)).join('');
}

// --- Product Card HTML ---
function createProductCard(product) {
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    const isWishlisted = wishlist.includes(product.id);
    const stars = getStarsHTML(product.rating);

    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <i class="fas fa-glasses"></i>
                ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge}</span>` : ''}
                <div class="product-actions">
                    <button class="product-action-btn ${isWishlisted ? 'wishlisted' : ''}" onclick="toggleWishlist(${product.id})" title="Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="product-action-btn" onclick="quickView(${product.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span>${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">₹${product.price.toLocaleString()}</span>
                    <span class="price-original">₹${product.originalPrice.toLocaleString()}</span>
                    <span class="price-discount">${discount}% OFF</span>
                </div>
                <button class="product-add-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

function getStarsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) html += '<i class="fas fa-star"></i>';
        else if (i - rating < 1) html += '<i class="fas fa-star-half-alt"></i>';
        else html += '<i class="far fa-star"></i>';
    }
    return html;
}

// --- Cart Functions ---
function addToCart(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: productId, qty: 1 });
    }
    saveCart();
    updateCartUI();
    showToast('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { removeFromCart(productId); return; }
    saveCart();
    updateCartUI();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('vv_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const countEls = document.querySelectorAll('.cart-count');
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    countEls.forEach(el => el.textContent = total);
}

function openCart() {
    document.getElementById('cartOverlay').classList.add('active');
    document.getElementById('cartSidebar').classList.add('active');
    renderCartItems();
}

function closeCart() {
    document.getElementById('cartOverlay').classList.remove('active');
    document.getElementById('cartSidebar').classList.remove('active');
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>`;
        if (footer) footer.style.display = 'none';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return '';
        total += product.price * item.qty;
        return `
            <div class="cart-item">
                <div class="cart-item-img"><i class="fas fa-glasses"></i></div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">₹${product.price.toLocaleString()}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQty(${product.id}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${product.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${product.id})"><i class="fas fa-trash"></i></button>
            </div>`;
    }).join('');

    if (footer) footer.style.display = 'block';
    if (totalEl) totalEl.textContent = '₹' + total.toLocaleString();
}

function checkout() {
    if (cart.length === 0) { showToast('Cart is empty!', 'error'); return; }
    showToast('Redirecting to checkout... (Demo)', 'info');
    // In production, redirect to a checkout page
}

// --- Wishlist ---
function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    if (idx > -1) {
        wishlist.splice(idx, 1);
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist!', 'success');
    }
    localStorage.setItem('vv_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();

    // Update button state if visible
    document.querySelectorAll(`.product-card[data-id="${productId}"] .product-action-btn`).forEach(btn => {
        if (btn.querySelector('.fa-heart')) {
            btn.classList.toggle('wishlisted', wishlist.includes(productId));
        }
    });
}

function updateWishlistUI() {
    const countEls = document.querySelectorAll('.wishlist-count');
    countEls.forEach(el => el.textContent = wishlist.length);
}

// --- Quick View (simple alert for demo) ---
function quickView(productId) {
    const p = PRODUCTS.find(pr => pr.id === productId);
    if (!p) return;
    showToast(`${p.name} — ${p.brand} — ₹${p.price.toLocaleString()}`, 'info');
}

// --- Toast Notifications ---
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Utility ---
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
