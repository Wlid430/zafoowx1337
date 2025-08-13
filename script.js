// Product data
const products = [
    {
        id: 1,
        name: "1337 Classic Red",
        price: 29.99,
        image: "media/WhatsApp Image 2025-07-14 at 07.35.11_0ca5a296.jpg",
        description: "Classic black tee with bold red 1337 NPC design. Perfect for gaming enthusiasts and tech culture lovers.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        soldOut: true
    },
    {
        id: 2,
        name: "1337 Vintage White",
        price: 29.99,
        image: "media/WhatsApp Image 2025-07-14 at 07.35.11_16167ddb.jpg",
        description: "Retro-style black tee featuring white 1337 graphics with vintage aesthetic appeal.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        soldOut: true
    },
    {
        id: 3,
        name: "1337 Limited Edition",
        price: 29.99,
        image: "media/WhatsApp Image 2025-07-14 at 07.35.12_6d913b95.jpg",
        description: "Exclusive black tee with premium 1337 graphics. Limited edition design for true collectors.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        soldOut: true
    },
    {
        id: 4,
        name: "1337 Street Edition",
        price: 29.99,
        image: "media/WhatsApp Image 2025-07-14 at 07.35.11_6ed3da45.jpg",
        description: "Contemporary black tee with 1337 branding. Ideal for streetwear enthusiasts and modern style.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        soldOut: true
    },
    {
        id: 5,
        name: "1337 Poolside Green",
        price: 29.99,
        image: "media/WhatsApp Image 2025-07-14 at 07.35.11_2f394ea2.jpg",
        description: "Stylish black tee with green 1337 design and smiley face accent. Great for casual wear.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        soldOut: true
    }
];

// Shopping basket
let basket = [];

// DOM elements
const productGrid = document.getElementById('productGrid');
const basketOverlay = document.getElementById('basketOverlay');
const basketItems = document.getElementById('basketItems');
const basketCount = document.querySelector('.basket-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateBasketCount();
    
    // Hero CTA button functionality
    const ctaBtn = document.querySelector('.cta-btn');
    ctaBtn.addEventListener('click', function() {
        document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
    });
});

// Load products into the grid
function loadProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openProductPage(product.id);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">€${product.price}</p>
            <span class="sold-out-badge">SOLD OUT</span>
        </div>
    `;
    
    return card;
}

// Open product page
function openProductPage(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create product page overlay
    const overlay = document.createElement('div');
    overlay.className = 'product-overlay';
    overlay.innerHTML = `
        <div class="product-page">
            <button class="close-product" onclick="closeProductPage()">×</button>
            <div class="product-details">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-detail-image">
                </div>
                <div class="product-info-container">
                    <h1 class="product-detail-title">${product.name}</h1>
                    <p class="product-detail-price">€${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="size-selector">
                        <h4>Size:</h4>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-option" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <button class="add-to-basket-btn sold-out-btn" disabled>
                        SOLD OUT
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add size selection functionality
    const sizeOptions = overlay.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Show overlay
    setTimeout(() => overlay.classList.add('show'), 10);
}

// Close product page
function closeProductPage() {
    const overlay = document.querySelector('.product-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    }
}

// Toggle basket overlay
function toggleBasket() {
    basketOverlay.style.display = basketOverlay.style.display === 'flex' ? 'none' : 'flex';
    if (basketOverlay.style.display === 'flex') {
        updateBasketDisplay();
    }
}

// Add to basket (parody function - items disappear)
function addToBasket(productId, size) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Simulate adding to basket
    basket.push({
        id: productId,
        name: product.name,
        price: product.price,
        size: size,
        image: product.image
    });
    
    updateBasketCount();
    
    // Remove item after 2 seconds (parody effect)
    setTimeout(() => {
        basket = basket.filter(item => !(item.id === productId && item.size === size));
        updateBasketCount();
        updateBasketDisplay();
    }, 2000);
}

// Update basket count
function updateBasketCount() {
    basketCount.textContent = basket.length;
}

// Update basket display
function updateBasketDisplay() {
    if (basket.length === 0) {
        basketItems.innerHTML = '<p class="empty-basket">Your basket is empty</p>';
        return;
    }
    
    basketItems.innerHTML = basket.map(item => `
        <div class="basket-item">
            <img src="${item.image}" alt="${item.name}" class="basket-item-image">
            <div class="basket-item-details">
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p class="basket-item-price">€${item.price}</p>
            </div>
        </div>
    `).join('');
}

// Close basket when clicking outside
basketOverlay.addEventListener('click', function(e) {
    if (e.target === basketOverlay) {
        toggleBasket();
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add product page styles dynamically
const productPageStyles = `
    .product-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .product-overlay.show {
        opacity: 1;
    }
    
    .product-page {
        background-color: #111;
        border-radius: 10px;
        padding: 40px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }
    
    .close-product {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        transition: color 0.3s;
    }
    
    .close-product:hover {
        color: #ffff00;
    }
    
    .product-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        margin-top: 20px;
    }
    
    .product-detail-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .product-detail-title {
        font-size: 28px;
        margin-bottom: 10px;
        color: #fff;
    }
    
    .product-detail-price {
        font-size: 24px;
        color: #ffff00;
        font-weight: bold;
        margin-bottom: 20px;
    }
    
    .product-description {
        color: #ccc;
        line-height: 1.6;
        margin-bottom: 30px;
    }
    
    .size-selector h4 {
        color: #fff;
        margin-bottom: 15px;
    }
    
    .size-options {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
    }
    
    .size-option {
        background-color: #333;
        color: #fff;
        border: 2px solid #333;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .size-option:hover {
        border-color: #ffff00;
    }
    
    .size-option.selected {
        background-color: #ffff00;
        color: #000;
        border-color: #ffff00;
    }
    
    .add-to-basket-btn {
        background-color: #ffff00;
        color: #000;
        border: none;
        padding: 15px 30px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        transition: background-color 0.3s;
    }
    
    .sold-out-btn {
        background-color: #ff4444 !important;
        color: #fff !important;
        cursor: not-allowed;
    }
    
    .basket-item {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #333;
    }
    
    .basket-item-image {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 5px;
    }
    
    .basket-item-details h4 {
        color: #fff;
        margin-bottom: 5px;
        font-size: 16px;
    }
    
    .basket-item-details p {
        color: #ccc;
        font-size: 14px;
        margin-bottom: 3px;
    }
    
    .basket-item-price {
        color: #ffff00 !important;
        font-weight: bold;
    }
    
    @media (max-width: 768px) {
        .product-details {
            grid-template-columns: 1fr;
        }
        
        .product-page {
            padding: 20px;
        }
        
        .product-detail-image {
            height: 300px;
        }
    }
`;

// Add styles to head
const style = document.createElement('style');
style.textContent = productPageStyles;
document.head.appendChild(style);