// script.js

// 1. Inicializar iconos de Lucide
lucide.createIcons();

// 2. Lógica del Carrusel Principal
let currentSlide = 0;
const totalSlides = 2; // Cantidad de banners en el carrusel
let carouselInterval;

function updateCarousel() {
    const inner = document.getElementById('carouselInner');
    // Mueve el contenedor horizontalmente
    inner.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualiza los puntos (dots) indicadores
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
            if (i === currentSlide) {
                dot.classList.remove('bg-white/50');
                dot.classList.add('bg-white');
            } else {
                dot.classList.remove('bg-white');
                dot.classList.add('bg-white/50');
            }
        }
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    resetCarouselTimer();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetCarouselTimer();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetCarouselTimer();
}

// Timer para auto-desplazamiento del carrusel cada 5 segundos
function resetCarouselTimer() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}
// Iniciar el timer al cargar
resetCarouselTimer();


// 3. Variables de estado del carrito
let cartCount = 0;
let cartTotal = 0;

// 4. Funciones de UI e interacciones
function triggerImageSearch() {
    showToast('Búsqueda por imagen activada - Selecciona una foto');
}

// Agregar al carrito
function addToCart(e) {
    e.stopPropagation();
    cartCount++;
    cartTotal += 25.00; // Precio mockeado
    
    // Actualizar badge del header
    const badge = document.getElementById('cartBadge');
    badge.textContent = cartCount;
    badge.classList.remove('hidden');
    
    // Animar badge
    badge.classList.add('scale-125');
    setTimeout(() => badge.classList.remove('scale-125'), 200);
    
    showToast('Producto agregado al carrito');
    updateCartDrawer();
}

// Actualizar vista del Drawer del Carrito
function updateCartDrawer() {
    const cartItems = document.getElementById('cartItems');
    const total = document.getElementById('total');
    
    if (cartCount > 0) {
        cartItems.innerHTML = `
            <div class="flex gap-3 bg-white p-3 rounded-xl border border-gray-100">
                <img src="http://static.photos/white/200x200/21" class="w-20 h-20 object-cover rounded-lg" alt="Product">
                <div class="flex-1">
                    <h4 class="text-sm font-medium line-clamp-2 mb-1">Polo 100% Algodón Peruano</h4>
                    <p class="text-patu-600 font-bold">S/ 25.00</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600">-</button>
                        <span class="text-sm font-medium w-4 text-center">${cartCount}</span>
                        <button class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600">+</button>
                    </div>
                </div>
                <button class="text-gray-400 hover:text-red-500 self-start transition-colors" onclick="removeItem()">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        lucide.createIcons(); // Recargar iconos para los nuevos elementos
    }
    
    if (total) {
        total.textContent = `S/ ${cartTotal.toFixed(2)}`;
    }
}

function removeItem() {
    cartCount = 0;
    cartTotal = 0;
    
    const badge = document.getElementById('cartBadge');
    badge.classList.add('hidden');
    
    document.getElementById('cartItems').innerHTML = `
        <div class="text-center text-gray-400 py-8">
            <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
            <p class="text-sm">Tu carrito está vacío</p>
            <button onclick="closeCart()" class="mt-4 text-patu-600 font-medium text-sm hover:underline">Seguir comprando</button>
        </div>
    `;
    lucide.createIcons();
    updateCartDrawer();
}

// Abrir/Cerrar Carrito
function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const content = document.getElementById('cartContent');
    drawer.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('translate-x-full');
    }, 10);
}

function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const content = document.getElementById('cartContent');
    content.classList.add('translate-x-full');
    setTimeout(() => {
        drawer.classList.add('hidden');
    }, 300);
}

// Notificación (Toast)
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
    toast.classList.add('opacity-100', 'translate-y-0');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
    }, 2500);
}

// 5. Temporizador (Ofertas Flash)
function updateTimer() {
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    
    if(!hours || !minutes || !seconds) return;

    let h = parseInt(hours.textContent);
    let m = parseInt(minutes.textContent);
    let s = parseInt(seconds.textContent);
    
    if (s > 0) {
        s--;
    } else {
        s = 59;
        if (m > 0) {
            m--;
        } else {
            m = 59;
            if (h > 0) {
                h--;
            }
        }
    }
    
    hours.textContent = h.toString().padStart(2, '0');
    minutes.textContent = m.toString().padStart(2, '0');
    seconds.textContent = s.toString().padStart(2, '0');
}

setInterval(updateTimer, 1000);