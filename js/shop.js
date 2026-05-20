/* ============================================
   VinayakVision - Shop Page Logic
   Filters, Sort, Pagination, View Toggle
   ============================================ */

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredProducts = [...PRODUCTS];

document.addEventListener('DOMContentLoaded', () => {
    initShopFromURL();
    initFilterListeners();
    initViewToggle();
});

// --- Read URL params and apply initial state ---
function initShopFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const search = params.get('search');

    if (cat) {
        const checkbox = document.querySelector(`input[name="cat"][value="${cat}"]`);
        if (checkbox) checkbox.checked = true;
        const catInfo = CATEGORIES[cat];
        if (catInfo) {
            document.getElementById('shopTitle').textContent = catInfo.name;
        }
    }

    if (search) {
        filteredProducts = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase())
        );
        document.getElementById('shopTitle').textContent = `Search: "${search}"`;
    }

    applyFilters();
}

// --- Filter listeners (auto-apply on change) ---
function initFilterListeners() {
    const filterInputs = document.querySelectorAll('.filters-sidebar input[type="checkbox"], .filters-sidebar input[type="radio"]');
    filterInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
}

// --- Apply Filters ---
function applyFilters() {
    const checkedCats = getCheckedValues('cat');
    const checkedGenders = getCheckedValues('gender');
    const checkedShapes = getCheckedValues('shape');
    const checkedBrands = getCheckedValues('brand');
    const priceRange = getRadioValue('price');
    const sort = document.getElementById('sortSelect')?.value || 'popular';

    // Start with all products (unless URL search narrowed it)
    let results = [...PRODUCTS];

    // Category filter
    if (checkedCats.length > 0) {
        results = results.filter(p => checkedCats.includes(p.category));
    }

    // Gender filter
    if (checkedGenders.length > 0) {
        results = results.filter(p => checkedGenders.includes(p.gender));
    }

    // Shape filter
    if (checkedShapes.length > 0) {
        results = results.filter(p => checkedShapes.includes(p.shape));
    }

    // Brand filter
    if (checkedBrands.length > 0) {
        results = results.filter(p => checkedBrands.includes(p.brand));
    }

    // Price filter
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        results = results.filter(p => p.price >= min && p.price <= max);
    }

    // Sort
    switch (sort) {
        case 'price-low': results.sort((a, b) => a.price - b.price); break;
        case 'price-high': results.sort((a, b) => b.price - a.price); break;
        case 'newest': results.sort((a, b) => b.id - a.id); break;
        case 'rating': results.sort((a, b) => b.rating - a.rating); break;
        default: results.sort((a, b) => b.reviews - a.reviews); // popular
    }

    filteredProducts = results;
    currentPage = 1;
    renderProducts();
    renderPagination();
    updateResultsCount();
}

// --- Clear Filters ---
function clearFilters() {
    document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.filters-sidebar input[type="radio"]').forEach(rb => rb.checked = false);
    document.getElementById('shopTitle').textContent = 'All Eyewear';
    applyFilters();
}

// --- Render Products ---
function renderProducts() {
    const grid = document.getElementById('shopProducts');
    if (!grid) return;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = filteredProducts.slice(start, end);

    if (pageItems.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding:60px 20px;">
                <i class="fas fa-search" style="font-size:48px; color:var(--gray-600); margin-bottom:16px;"></i>
                <h3 style="color:var(--gray-300); margin-bottom:8px;">No products found</h3>
                <p style="color:var(--gray-500);">Try adjusting your filters or search terms</p>
                <button class="btn btn-outline" style="margin-top:16px;" onclick="clearFilters()">Clear Filters</button>
            </div>`;
        return;
    }

    grid.innerHTML = pageItems.map(p => createProductCard(p)).join('');
}

// --- Render Pagination ---
function renderPagination() {
    const container = document.getElementById('pagination');
    if (!container) return;

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    let html = '';

    // Previous
    if (currentPage > 1) {
        html += `<button class="page-btn" onclick="goToPage(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (totalPages > 7) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                html += `<span class="page-btn" style="border:none;cursor:default;">...</span>`;
            }
        } else {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }
    }

    // Next
    if (currentPage < totalPages) {
        html += `<button class="page-btn" onclick="goToPage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
    }

    container.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    renderProducts();
    renderPagination();
    window.scrollTo({ top: 300, behavior: 'smooth' });
}

// --- Results Count ---
function updateResultsCount() {
    const el = document.getElementById('resultsCount');
    if (el) el.textContent = `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
}

// --- View Toggle ---
function initViewToggle() {
    const btns = document.querySelectorAll('.view-btn');
    const grid = document.getElementById('shopProducts');
    if (!btns.length || !grid) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            if (view === 'list') {
                grid.style.gridTemplateColumns = '1fr';
            } else {
                grid.style.gridTemplateColumns = '';
            }
        });
    });
}

// --- Toggle filters on mobile ---
function toggleFilters() {
    const sidebar = document.getElementById('filtersSidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

// --- Utility helpers ---
function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);
}

function getRadioValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
}
