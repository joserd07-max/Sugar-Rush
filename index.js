// ===== PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: 'Pastel de Planta',
        desc: 'Masa de vainilla relleno de crema pastelera y suspiro, topping de oreo + flor eterna de tu preferencia.',
        priceSmall: 1100,
        priceLarge: 1800,
        labelSmall: '½ libra',
        labelLarge: '1 libra',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPde-OYGKzitWfv_mZ5zOz5m_mjAAJhyP1Q&s',
        bg: 'linear-gradient(135deg, #7b1fa2, #9c27b0)',
        badge: { text: 'Nuevo', type: 'new' }
    },
    {
        id: 2,
        name: 'Brownies Especial',
        desc: 'Brownie de chocolate con topping de dulce de leche.',
        priceSmall: 200,
        priceLarge: null,
        labelSmall: 'Porción',
        labelLarge: null,
        image: 'https://i.pinimg.com/736x/be/8b/db/be8bdb69dfa46d8dc92d197c14beeb60.jpg',
        bg: 'linear-gradient(135deg, #5d4037, #795548)',
        badge: null
    },
    {
        id: 3,
        name: 'Pastel de Zanahoria',
        desc: 'Masa de zanahoria relleno de cream cheese.',
        priceSmall: 1500,
        priceLarge: 2000,
        labelSmall: '¼ libra',
        labelLarge: '½ libra',
        image: 'https://confiterialuben.com/wp-content/uploads/2025/05/CARROT-CAKE.png',
        bg: 'linear-gradient(135deg, #ff8f00, #ffb300)',
        badge: null
    },
    {
        id: 4,
        name: 'Flan Casero',
        desc: 'Flan casero con topping de dulce de leche.',
        priceSmall: 150,
        priceLarge: 800,
        labelSmall: 'Porción',
        labelLarge: 'Completo',
        image: 'https://recetassalvadorenas.com/wp-content/uploads/2014/03/flan-casero.jpg',
        bg: 'linear-gradient(135deg, #ffd54f, #ffb300)',
        badge: null
    },
    {
        id: 5,
        name: 'Tres Leches',
        desc: 'Tres leches con topping de oreo y suspiro.',
        priceSmall: 100,
        priceLarge: 250,
        labelSmall: 'Vaso 9oz',
        labelLarge: 'Mini Bandeja',
        image: 'https://images-tastehub.mdlzapps.cloud/images/1603d82c-2878-4048-bbfa-18c4f5933fd2.jpg',
        bg: 'linear-gradient(135deg, #f8b4c8, #e84393)',
        badge: null
    },
    {
        id: 6,
        name: 'Porción Bizcocho Dominicano',
        desc: 'Bizcocho dominicano tradicional, esponjoso y delicioso.',
        priceSmall: 200,
        priceLarge: null,
        labelSmall: 'Porción',
        labelLarge: null,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxShELWcdvcela6VBIbJu4OL5yBmi2WqoYQ&s',
        bg: 'linear-gradient(135deg, #fff3e0, #fce4ec)',
        badge: null
    },
    {
        id: 7,
        name: 'Porción Bizcocho Chocolate',
        desc: 'Bizcocho de chocolate húmedo y suave.',
        priceSmall: 200,
        priceLarge: null,
        labelSmall: 'Porción',
        labelLarge: null,
        image: 'https://cdn.inoutdelivery.com/masa.delivery.com/sm/1700052942960-5D5A2892-176%20a-01.png',
        bg: 'linear-gradient(135deg, #4e342e, #6d4c41)',
        badge: null
    },
    {
        id: 8,
        name: 'Porción Bizcocho Zanahoria',
        desc: 'Bizcocho de zanahoria con cobertura de cream cheese.',
        priceSmall: 250,
        priceLarge: null,
        labelSmall: 'Porción',
        labelLarge: null,
        image: 'https://www.nattahometaste.com/wp-content/uploads/2025/10/pastel-de-zanahoria-y-platano-1-300x300.jpg',
        bg: 'linear-gradient(135deg, #d4a017, #f9a825)',
        badge: { text: 'Especial', type: 'hot' }
    }
];

// ===== CONFIG =====
const WHATSAPP_NUMBER = '18098214922';

// ===== CART STATE =====
let cart = [];
let cartOpen = false;

// ===== DOM REFS =====
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCart');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const contactForm = document.getElementById('contactForm');
const toastContainer = document.getElementById('toastContainer');

// ===== RENDER PRODUCTS =====
function renderProducts() {
    productsGrid.innerHTML = products.map(product => {
        const badgeHtml = product.badge
            ? `<span class="product-badge ${product.badge.type}">${product.badge.text}</span>`
            : '';
        
        // Build price options
        let pricesHtml = '';
        if (product.priceSmall && product.priceLarge) {
            pricesHtml = `
                <div class="prices-row">
                    <div class="price-option" onclick="addToCart(${product.id}, 'small')">
                        <span class="price-label">${product.labelSmall}</span>
                        <span class="price-value">RD$${product.priceSmall.toFixed(2)}</span>
                    </div>
                    <div class="price-option" onclick="addToCart(${product.id}, 'large')">
                        <span class="price-label">${product.labelLarge}</span>
                        <span class="price-value">RD$${product.priceLarge.toFixed(2)}</span>
                    </div>
                </div>
            `;
        } else if (product.priceSmall) {
            pricesHtml = `
                <div class="prices-row prices-row-single">
                    <div class="price-option" onclick="addToCart(${product.id}, 'small')">
                        <span class="price-label">${product.labelSmall}</span>
                        <span class="price-value">RD$${product.priceSmall.toFixed(2)}</span>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="product-card animate-on-scroll" data-id="${product.id}">
                <div class="product-img" style="background: ${product.bg}15;">
                    <div class="product-bg" style="background: ${product.bg};"></div>
                    ${badgeHtml}
                    <img src="${product.image}" alt="${product.name}" class="product-item-img">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    ${pricesHtml}
                    <div class="product-footer">
                        <button class="add-to-cart" onclick="addToCart(${product.id}, 'small')" aria-label="Agregar">
                            <i class="fas fa-cart-plus"></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    setTimeout(observeElements, 100);
}

// ===== CART FUNCTIONS =====
function addToCart(productId, size = 'small') {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const price = size === 'large' ? product.priceLarge : product.priceSmall;
    const sizeLabel = size === 'large' ? product.labelLarge : product.labelSmall;
    const cartKey = `${productId}-${size}`;

    const existingIndex = cart.findIndex(item => item.cartKey === cartKey);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            desc: product.desc,
            price: price,
            size: size,
            sizeLabel: sizeLabel,
            cartKey: cartKey,
            quantity: 1,
            image: product.image,
            bg: product.bg
        });
    }

    updateCartUI();
    showToast(`🍰 ${product.name} (${sizeLabel}) agregado al carrito`, 'success');
    openCart();
}

function removeFromCart(cartKey) {
    cart = cart.filter(item => item.cartKey !== cartKey);
    updateCartUI();
}

function changeQuantity(cartKey, delta) {
    const index = cart.findIndex(item => item.cartKey === cartKey);
    if (index === -1) return;

    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        removeFromCart(cartKey);
        return;
    }

    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartCount.style.animation = 'none';
    setTimeout(() => cartCount.style.animation = 'bounceIn 0.4s ease', 10);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Tu carrito está vacío</p>
                <p style="font-size: 0.85rem; margin-top: 5px;">¡Agrega algunos dulces!</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-img" style="background: ${item.bg}20;">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name} <span class="cart-item-size">(${item.sizeLabel})</span></h4>
                    <span class="cart-item-price">RD$${(item.price * item.quantity).toFixed(2)}</span>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="changeQuantity('${item.cartKey}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity('${item.cartKey}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="removeFromCart('${item.cartKey}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
    }

    cartTotal.textContent = `RD$${totalPrice.toFixed(2)}`;
}

// ===== CART SIDEBAR =====
function openCart() {
    cartOpen = true;
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartOpen = false;
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

cartBtn.addEventListener('click', () => {
    if (cartOpen) closeCart();
    else openCart();
});

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ===== CHECKOUT - Enviar a WhatsApp =====
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    
    let message = '🍰 *Nuevo Pedido - Sugar Rush* 🍰\n\n';
    message += '📦 *Productos:*\n';
    
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `   • ${item.name} (${item.sizeLabel}) × ${item.quantity} = RD$${subtotal.toFixed(2)}\n`;
    });
    
    message += `\n💰 *Total:* RD$${total.toFixed(2)}\n`;
    message += '\n📝 *Por favor indícanos:*\n';
    message += '• Nombre:\n• Dirección:\n• Fecha de Entrega:\n';
    message += '\n✅ *¡Gracias por tu preferencia!*';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    showToast('✅ Pedido enviado por WhatsApp', 'success', 4000);
    cart = [];
    updateCartUI();
});

// ===== MOBILE MENU =====
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        showToast('Por favor completa todos los campos', 'error');
        return;
    }

    showToast(`✅ ¡Gracias ${name}! Te contactaremos pronto.`, 'success', 4000);
    contactForm.reset();
});

// ===== SCROLL ANIMATIONS =====
function observeElements() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setTimeout(observeElements, 200);
});