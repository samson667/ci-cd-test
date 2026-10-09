const gridContainer = document.getElementById('product-grid');
const skeletonContainer = document.getElementById('skeleton-container');
const productCountElement = document.getElementById('product-count');

// 6-ti dummy Skeleton Card toiri korar function
function showSkeletons() {
    skeletonContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'skeleton-card';
        skeletonCard.innerHTML = `
            <div class="skeleton-box skeleton-img"></div>
            <div class="skeleton-box skeleton-badge"></div>
            <div class="skeleton-box skeleton-title"></div>
            <div class="skeleton-box skeleton-text"></div>
            <div class="skeleton-box skeleton-text-short"></div>
            <div class="skeleton-box skeleton-price"></div>
        `;
        skeletonContainer.appendChild(skeletonCard);
    }
}

async function fetchProducts() {
    try {
        // Step 1: Loading surute skeleton dekhao
        showSkeletons();
        gridContainer.style.display = 'none';

        const response = await fetch('/product'); 
        const data = await response.json();

        const products = data.products || [];
        productCountElement.textContent = products.length;

        // Step 2: Data chole asle skeleton soraye real UI rendering koro
        skeletonContainer.innerHTML = ''; 
        gridContainer.style.display = 'grid';

        renderProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        skeletonContainer.innerHTML = '<p>Failed to load products!</p>';
    }
}

function renderProducts(products) {
    gridContainer.innerHTML = '';

    products.forEach(product => {
        const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
        
        const tagsHTML = product.tags
            ? product.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')
            : '';

        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            ${product.discountPercentage ? `<span class="badge-discount">-${product.discountPercentage}% OFF</span>` : ''}
            <span class="badge-stock">${product.availabilityStatus} (${product.stock})</span>
            
            <img class="card-img" src="${product.thumbnail || product.images[0]}" alt="${product.title}">
            
            <div class="card-body">
                <div class="category-brand">${product.brand ? product.brand + ' | ' : ''}${product.category}</div>
                <h2 class="title">${product.title}</h2>
                <p class="description">${product.description}</p>
                
                <div class="price-section">
                    <span class="current-price">$${product.price}</span>
                    <span class="original-price">$${originalPrice}</span>
                </div>

                <div class="rating-bar">⭐ ${product.rating} / 5</div>
                
                <div class="tags">${tagsHTML}</div>

                <div class="shipping-info">
                    🚚 ${product.shippingInformation}<br>
                    🛡️ ${product.warrantyInformation} | 🔄 ${product.returnPolicy}
                </div>
            </div>
        `;

        gridContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', fetchProducts);





// ------------------------gsap-----------------------------------




function renderProducts(products) {
    gridContainer.innerHTML = '';

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        // Card HTML Structure
        card.innerHTML = `
            <img class="card-img anim-item" src="${product.thumbnail}" alt="${product.title}">
            <div class="card-body">
                <span class="category-brand anim-item">${product.category}</span>
                <h2 class="title ">${product.title}</h2>
                <p class="description anim-item">${product.description}</p>
                <div class="price-section anim-item">
                    <span class="current-price">$${product.price}</span>
                </div>
            </div>
        `;

        gridContainer.appendChild(card);
    });

    // --- GSAP ANIMATION LOGIC ---
    animateCardsWithGSAP();
}

function animateCardsWithGSAP() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        // 1. Right/Left direction set kora (Even index = Left, Odd index = Right)
        const xOffset = index % 2 === 0 ? -100 : 100;

        // 2. Card gulo side theke smoothly ashbe
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                x: xOffset 
            }, 
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.8, 
                ease: "power3.out",
                delay: index * 0.15 // Ekta card-er por arekta card asbe
            }
        );

        // 3. Card-er bhetorer text/elements nich theke stagger hoye smoothly ashbe
        const innerItems = card.querySelectorAll('.anim-item');
        gsap.fromTo(innerItems,
            { 
                opacity: 0, 
                y: 20 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                stagger: 0.08, // Visual elements ektar por ekta smoothly asbe
                ease: "power2.out",
                delay: (index * 0.15) + 0.2 // Card asar thik por-i text shuru hobe
            }
        );
        gsap.from(".title",
          {  opacity:0,
            y:20,
            stagger:1
        }
        )
    });
}




// --------------------------gsap--------------------------
// GSAP Plugin Register kora
gsap.registerPlugin(ScrollTrigger);

function animateCardsWithGSAP() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        // Left (-100px) ba Right (100px) direction determine kora
        const xOffset = index % 2 === 0 ? -100 : 100;

        // 1. Card Entry Animation (ScrollTrigger-er sathe)
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                x: xOffset 
            }, 
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.8, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,          // Jei card-ti viewport-e asbe
                    start: "top 85%",       // Card-er top viewport-er 85%-e ashle animation suru hobe
                    toggleActions: "play none none reverse", // Scroll up korle abar reverse hobe
                }
            }
        );

        // 2. Card Content Stagger Animation (Nich theke smoothly upore uṭhbe)
        const innerItems = card.querySelectorAll('.anim-item');
        gsap.fromTo(innerItems,
            { 
                opacity: 0, 
                y: 25 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                stagger: 0.08, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                }
            }
        );
    });
}