/* ============================================
   VinayakVision - Product Database
   ============================================ */

const PRODUCTS = [
    // --- SUNGLASSES ---
    { id: 1, name: "Classic Aviator Gold", brand: "Ray-Ban", category: "sunglasses", gender: "unisex", shape: "aviator", price: 7490, originalPrice: 9990, rating: 4.8, reviews: 342, badge: "trending", featured: true },
    { id: 2, name: "Wayfarer Original Black", brand: "Ray-Ban", category: "sunglasses", gender: "unisex", shape: "wayfarer", price: 6990, originalPrice: 8990, rating: 4.7, reviews: 289, badge: "trending", featured: true },
    { id: 3, name: "Round Metal Retro", brand: "Ray-Ban", category: "sunglasses", gender: "unisex", shape: "round", price: 7990, originalPrice: 10490, rating: 4.6, reviews: 198, badge: "", featured: false },
    { id: 4, name: "Clubmaster Classic", brand: "Ray-Ban", category: "sunglasses", gender: "men", shape: "clubmaster", price: 8490, originalPrice: 11490, rating: 4.9, reviews: 412, badge: "trending", featured: true },
    { id: 5, name: "Holbrook Sport", brand: "Oakley", category: "sunglasses", gender: "men", shape: "rectangle", price: 9990, originalPrice: 13990, rating: 4.7, reviews: 156, badge: "", featured: false },
    { id: 6, name: "Frogskins Lite", brand: "Oakley", category: "sunglasses", gender: "unisex", shape: "wayfarer", price: 8490, originalPrice: 11490, rating: 4.5, reviews: 123, badge: "new", featured: false },
    { id: 7, name: "Cat Eye Glamour", brand: "Gucci", category: "sunglasses", gender: "women", shape: "cat-eye", price: 24990, originalPrice: 32990, rating: 4.9, reviews: 87, badge: "new", featured: true },
    { id: 8, name: "Oversized Square", brand: "Gucci", category: "sunglasses", gender: "women", shape: "rectangle", price: 27990, originalPrice: 35990, rating: 4.8, reviews: 65, badge: "", featured: false },
    { id: 9, name: "Idee Polarized Aviator", brand: "Fastrack", category: "sunglasses", gender: "men", shape: "aviator", price: 1999, originalPrice: 2999, rating: 4.3, reviews: 534, badge: "sale", featured: false },
    { id: 10, name: "Nebula Mirror", brand: "Fastrack", category: "sunglasses", gender: "unisex", shape: "wayfarer", price: 1499, originalPrice: 2499, rating: 4.2, reviews: 678, badge: "sale", featured: true },
    { id: 11, name: "Titan Polarized Executive", brand: "Titan", category: "sunglasses", gender: "men", shape: "rectangle", price: 3999, originalPrice: 5499, rating: 4.5, reviews: 234, badge: "", featured: false },
    { id: 12, name: "Round Vintage Rose Gold", brand: "Vincent Chase", category: "sunglasses", gender: "women", shape: "round", price: 1299, originalPrice: 2499, rating: 4.4, reviews: 456, badge: "sale", featured: false },

    // --- EYEGLASSES ---
    { id: 13, name: "Air Titanium Rectangle", brand: "John Jacobs", category: "eyeglasses", gender: "men", shape: "rectangle", price: 2999, originalPrice: 4499, rating: 4.6, reviews: 321, badge: "trending", featured: true },
    { id: 14, name: "Flex Round Pro", brand: "John Jacobs", category: "eyeglasses", gender: "unisex", shape: "round", price: 2499, originalPrice: 3999, rating: 4.5, reviews: 267, badge: "", featured: false },
    { id: 15, name: "Cat Eye Elegance", brand: "Vincent Chase", category: "eyeglasses", gender: "women", shape: "cat-eye", price: 1799, originalPrice: 2999, rating: 4.4, reviews: 189, badge: "new", featured: true },
    { id: 16, name: "Classic Wayfarer Frame", brand: "Vincent Chase", category: "eyeglasses", gender: "unisex", shape: "wayfarer", price: 1499, originalPrice: 2499, rating: 4.3, reviews: 345, badge: "", featured: false },
    { id: 17, name: "Ultra Light Rimless", brand: "Titan", category: "eyeglasses", gender: "men", shape: "rectangle", price: 4499, originalPrice: 6499, rating: 4.7, reviews: 178, badge: "", featured: false },
    { id: 18, name: "Premium Acetate Round", brand: "Ray-Ban", category: "eyeglasses", gender: "unisex", shape: "round", price: 8990, originalPrice: 11990, rating: 4.8, reviews: 134, badge: "new", featured: true },
    { id: 19, name: "Full Rim Clubmaster", brand: "Ray-Ban", category: "eyeglasses", gender: "unisex", shape: "clubmaster", price: 9490, originalPrice: 12490, rating: 4.7, reviews: 98, badge: "", featured: false },
    { id: 20, name: "Slim Fit Rectangle", brand: "Fastrack", category: "eyeglasses", gender: "men", shape: "rectangle", price: 999, originalPrice: 1999, rating: 4.1, reviews: 567, badge: "sale", featured: false },

    // --- COMPUTER GLASSES ---
    { id: 21, name: "Blue Shield Pro", brand: "John Jacobs", category: "computer", gender: "unisex", shape: "rectangle", price: 1999, originalPrice: 3499, rating: 4.6, reviews: 890, badge: "trending", featured: true },
    { id: 22, name: "Zero Power Square", brand: "Vincent Chase", category: "computer", gender: "unisex", shape: "rectangle", price: 1299, originalPrice: 2499, rating: 4.5, reviews: 1234, badge: "trending", featured: true },
    { id: 23, name: "Anti-Glare Round", brand: "John Jacobs", category: "computer", gender: "unisex", shape: "round", price: 2499, originalPrice: 3999, rating: 4.4, reviews: 456, badge: "", featured: false },
    { id: 24, name: "Gamer Pro Shield", brand: "Fastrack", category: "computer", gender: "men", shape: "rectangle", price: 1799, originalPrice: 2999, rating: 4.3, reviews: 321, badge: "new", featured: false },
    { id: 25, name: "Sleek Blue Cut", brand: "Titan", category: "computer", gender: "unisex", shape: "rectangle", price: 3499, originalPrice: 4999, rating: 4.6, reviews: 234, badge: "", featured: false },
    { id: 26, name: "Cat Eye Digital", brand: "Vincent Chase", category: "computer", gender: "women", shape: "cat-eye", price: 1499, originalPrice: 2499, rating: 4.4, reviews: 567, badge: "sale", featured: false },

    // --- CONTACT LENSES ---
    { id: 27, name: "Daily Aqua Comfort Plus", brand: "Johnson & Johnson", category: "contact-lenses", gender: "unisex", shape: "round", price: 899, originalPrice: 1299, rating: 4.7, reviews: 2345, badge: "trending", featured: true },
    { id: 28, name: "Monthly Fresh Look Green", brand: "Alcon", category: "contact-lenses", gender: "unisex", shape: "round", price: 799, originalPrice: 1199, rating: 4.5, reviews: 1567, badge: "", featured: false },
    { id: 29, name: "Bi-Weekly Air Optix", brand: "Alcon", category: "contact-lenses", gender: "unisex", shape: "round", price: 1299, originalPrice: 1799, rating: 4.6, reviews: 890, badge: "new", featured: false },
    { id: 30, name: "Color Lens Turquoise", brand: "Bausch & Lomb", category: "contact-lenses", gender: "women", shape: "round", price: 699, originalPrice: 999, rating: 4.3, reviews: 678, badge: "sale", featured: true },
    { id: 31, name: "Toric Astigmatism Lens", brand: "Johnson & Johnson", category: "contact-lenses", gender: "unisex", shape: "round", price: 1599, originalPrice: 2199, rating: 4.7, reviews: 234, badge: "", featured: false },
    { id: 32, name: "Ultra HD Monthly Clear", brand: "Bausch & Lomb", category: "contact-lenses", gender: "unisex", shape: "round", price: 999, originalPrice: 1499, rating: 4.5, reviews: 456, badge: "", featured: false },

    // --- READING GLASSES ---
    { id: 33, name: "Classic Reader +1.5", brand: "Titan", category: "reading", gender: "unisex", shape: "rectangle", price: 1999, originalPrice: 2999, rating: 4.4, reviews: 345, badge: "", featured: false },
    { id: 34, name: "Premium Folding Reader", brand: "John Jacobs", category: "reading", gender: "unisex", shape: "rectangle", price: 2499, originalPrice: 3999, rating: 4.6, reviews: 234, badge: "new", featured: true },
    { id: 35, name: "Half Frame Executive", brand: "Titan", category: "reading", gender: "men", shape: "rectangle", price: 2999, originalPrice: 4499, rating: 4.5, reviews: 167, badge: "", featured: false },
    { id: 36, name: "Round Scholar", brand: "Vincent Chase", category: "reading", gender: "unisex", shape: "round", price: 999, originalPrice: 1799, rating: 4.2, reviews: 456, badge: "sale", featured: false },

    // --- SPORTS EYEWEAR ---
    { id: 37, name: "Radar EV Path", brand: "Oakley", category: "sports", gender: "men", shape: "rectangle", price: 14990, originalPrice: 18990, rating: 4.9, reviews: 234, badge: "trending", featured: true },
    { id: 38, name: "Jawbreaker Prizm", brand: "Oakley", category: "sports", gender: "men", shape: "rectangle", price: 16990, originalPrice: 21990, rating: 4.8, reviews: 178, badge: "", featured: false },
    { id: 39, name: "Sport Wrap UV400", brand: "Fastrack", category: "sports", gender: "unisex", shape: "rectangle", price: 2499, originalPrice: 3999, rating: 4.3, reviews: 345, badge: "", featured: false },
    { id: 40, name: "Cycling Pro Shield", brand: "Oakley", category: "sports", gender: "men", shape: "rectangle", price: 12990, originalPrice: 16990, rating: 4.7, reviews: 123, badge: "new", featured: false },

    // --- KIDS EYEWEAR ---
    { id: 41, name: "Flexi Kids Round", brand: "Vincent Chase", category: "kids", gender: "unisex", shape: "round", price: 799, originalPrice: 1499, rating: 4.5, reviews: 567, badge: "trending", featured: true },
    { id: 42, name: "Cartoon Hero Frame", brand: "Fastrack", category: "kids", gender: "unisex", shape: "rectangle", price: 999, originalPrice: 1999, rating: 4.3, reviews: 345, badge: "new", featured: false },
    { id: 43, name: "Unbreakable Sport Kids", brand: "Titan", category: "kids", gender: "unisex", shape: "rectangle", price: 1499, originalPrice: 2499, rating: 4.6, reviews: 234, badge: "", featured: false },
    { id: 44, name: "Pink Princess Cat Eye", brand: "Vincent Chase", category: "kids", gender: "women", shape: "cat-eye", price: 899, originalPrice: 1599, rating: 4.4, reviews: 178, badge: "", featured: false },

    // --- POWER SUNGLASSES ---
    { id: 45, name: "Prescription Aviator", brand: "Ray-Ban", category: "power-sunglasses", gender: "unisex", shape: "aviator", price: 11990, originalPrice: 15990, rating: 4.8, reviews: 145, badge: "new", featured: true },
    { id: 46, name: "Progressive Sun Lens", brand: "John Jacobs", category: "power-sunglasses", gender: "unisex", shape: "wayfarer", price: 4999, originalPrice: 7499, rating: 4.5, reviews: 89, badge: "", featured: false },
    { id: 47, name: "Bifocal Outdoor", brand: "Titan", category: "power-sunglasses", gender: "men", shape: "rectangle", price: 5999, originalPrice: 8499, rating: 4.4, reviews: 67, badge: "", featured: false },
    { id: 48, name: "Photochromic Wayfarer", brand: "Vincent Chase", category: "power-sunglasses", gender: "unisex", shape: "wayfarer", price: 2999, originalPrice: 4999, rating: 4.6, reviews: 234, badge: "trending", featured: false }
];

// Category metadata
const CATEGORIES = {
    'sunglasses': { name: 'Sunglasses', icon: 'fa-sun', count: 12 },
    'eyeglasses': { name: 'Eyeglasses', icon: 'fa-glasses', count: 8 },
    'computer': { name: 'Computer Glasses', icon: 'fa-desktop', count: 6 },
    'contact-lenses': { name: 'Contact Lenses', icon: 'fa-circle', count: 6 },
    'reading': { name: 'Reading Glasses', icon: 'fa-book-open', count: 4 },
    'sports': { name: 'Sports Eyewear', icon: 'fa-running', count: 4 },
    'kids': { name: 'Kids Eyewear', icon: 'fa-child', count: 4 },
    'power-sunglasses': { name: 'Power Sunglasses', icon: 'fa-bolt', count: 4 }
};
