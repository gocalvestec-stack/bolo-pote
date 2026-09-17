// ==========================================
// NATY DOCE — SCRIPT PRINCIPAL
// ==========================================

// ==========================================
// 1. CONFIGURAÇÕES
// ==========================================

// Coloque aqui o número do WhatsApp da Naty Doce.
// Exemplo: 5531999999999
const WHATSAPP = "5500000000000";


// ==========================================
// 2. CONFIGURAÇÃO DO VÍDEO
// ==========================================

const VIDEO_CONFIG = {
  enabled: true,

  // Use:
  // "youtube" para YouTube
  // "mp4" para vídeo direto .mp4
  type: "youtube",

  // COLE AQUI O LINK DO SEU VÍDEO
  url: "https://www.youtube.com/watch?v=SEU_VIDEO_AQUI",

  title: "Conheça nossas delícias",

  description:
    "Assista ao nosso vídeo e conheça os produtos da Naty Doce."
};


// ==========================================
// 3. PRODUTOS
// ==========================================

const PRODUCTS = [
  {
    id: 1,
    name: "Brigadeiro Cremoso",
    description: "Muito chocolate, cremosidade e sabor irresistível.",
    price: 10.00,
    emoji: "🍫"
  },

  {
    id: 2,
    name: "Ninho com Morango",
    description: "Creme de Ninho com morangos e muito recheio.",
    price: 12.00,
    emoji: "🍓"
  },

  {
    id: 3,
    name: "Prestígio",
    description: "Chocolate cremoso com coco em uma combinação deliciosa.",
    price: 10.00,
    emoji: "🥥"
  },

  {
    id: 4,
    name: "Doce de Leite",
    description: "Doce de leite cremoso para quem ama um sabor clássico.",
    price: 11.00,
    emoji: "🍯"
  },

  {
    id: 5,
    name: "Chocolate com Morango",
    description: "Chocolate cremoso combinado com morangos fresquinhos.",
    price: 12.00,
    emoji: "🍫"
  },

  {
    id: 6,
    name: "Ninho com Nutella",
    description: "Creme de Ninho com Nutella e muito recheio.",
    price: 13.00,
    emoji: "🤍"
  }
];


// ==========================================
// 4. AVALIAÇÕES INICIAIS
// ==========================================

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Mariana",
    stars: 5,
    text: "Muito gostoso e bem recheado. Amei!"
  },

  {
    id: 2,
    name: "Juliana",
    stars: 5,
    text: "Chegou tudo certinho e estava uma delícia."
  },

  {
    id: 3,
    name: "Camila",
    stars: 5,
    text: "Muito caprichado. Com certeza vou pedir novamente."
  }
];


// ==========================================
// 5. VARIÁVEIS
// ==========================================

let cart = JSON.parse(
  localStorage.getItem("natyDoceCart") || "[]"
);

let reviews = JSON.parse(
  localStorage.getItem("natyDoceReviews") || "null"
);

if (!reviews) {
  reviews = DEFAULT_REVIEWS;
  saveReviews();
}


// ==========================================
// 6. ELEMENTOS DA PÁGINA
// ==========================================

const productsContainer =
  document.getElementById("products");

const reviewsContainer =
  document.getElementById("reviews");

const cartElement =
  document.getElementById("cart");

const overlay =
  document.getElementById("overlay");

const cartItemsElement =
  document.getElementById("cartItems");

const cartTotalElement =
  document.getElementById("cartTotal");

const cartCountElement =
  document.getElementById("cartCount");

const openCartButton =
  document.getElementById("openCart");

const closeCartButton =
  document.getElementById("closeCart");

const checkoutButton =
  document.getElementById("checkout");

const reviewButton =
  document.getElementById("reviewButton");

const reviewModal =
  document.getElementById("reviewModal");

const reviewForm =
  document.getElementById("reviewForm");

const heroWhatsApp =
  document.getElementById("heroWhatsApp");

const ctaWhatsApp =
  document.getElementById("ctaWhatsApp");

const yearElement =
  document.getElementById("year");


// ==========================================
// 7. FUNÇÕES AUXILIARES
// ==========================================

function formatMoney(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}


// ==========================================
// 8. PRODUTOS
// ==========================================

function renderProducts() {

  if (!productsContainer) return;

  productsContainer.innerHTML = PRODUCTS.map(product => {

    return `
      <article class="product">

        <div class="product-img">

          <div class="mini-jar">

            <div class="mini-lid">
              NATY DOCE
            </div>

            <div class="mini-cake">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div class="mini-label">
              ${product.emoji}
              <strong>Naty Doce</strong>
            </div>

          </div>

        </div>

        <div class="product-body">

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <p>
            ${escapeHTML(product.description)}
          </p>

          <div class="product-footer">

            <strong class="price">
              ${formatMoney(product.price)}
            </strong>

            <button
              class="btn small primary"
              onclick="addToCart(${product.id})"
            >
              + Adicionar
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");
}


// ==========================================
// 9. ADICIONAR AO CARRINHO
// ==========================================

function addToCart(productId) {

  const product =
    PRODUCTS.find(item => item.id === productId);

  if (!product) return;

  const existing =
    cart.find(item => item.id === productId);

  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({
      id: product.id,
      qty: 1
    });

  }

  saveCart();
  renderCart();

  openCart();
}


// ==========================================
// 10. ALTERAR QUANTIDADE
// ==========================================

function changeQty(productId, amount) {

  const item =
    cart.find(item => item.id === productId);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {

    cart =
      cart.filter(item => item.id !== productId);

  }

  saveCart();
  renderCart();
}


// ==========================================
// 11. SALVAR CARRINHO
// ==========================================

function saveCart() {

  localStorage.setItem(
    "natyDoceCart",
    JSON.stringify(cart)
  );

}


// ==========================================
// 12. RENDERIZAR CARRINHO
// ==========================================

function renderCart() {

  if (!cartItemsElement) return;

  if (cart.length === 0) {

    cartItemsElement.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🍰</div>

        <h3>
          Seu carrinho está vazio
        </h3>

        <p>
          Escolha um sabor delicioso para começar.
        </p>
      </div>
    `;

  } else {

    cartItemsElement.innerHTML =
      cart.map(item => {

        const product =
          PRODUCTS.find(p => p.id === item.id);

        if (!product) return "";

        const subtotal =
          product.price * item.qty;

        return `
          <div class="cart-item">

            <div class="cart-item-image">
              ${product.emoji}
            </div>

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(product.name)}
              </strong>

              <span>
                ${formatMoney(product.price)}
              </span>

              <div class="qty">

                <button
                  onclick="changeQty(${product.id}, -1)"
                >
                  −
                </button>

                <b>
                  ${item.qty}
                </b>

                <button
                  onclick="changeQty(${product.id}, 1)"
                >
                  +
                </button>

              </div>

            </div>

            <strong>
              ${formatMoney(subtotal)}
            </strong>

          </div>
        `;

      }).join("");

  }


  const total =
    getCartTotal();

  const count =
    getCartCount();

  if (cartTotalElement) {

    cartTotalElement.textContent =
      formatMoney(total);

  }

  if (cartCountElement) {

    cartCountElement.textContent =
      count;

  }

}


// ==========================================
// 13. TOTAL DO CARRINHO
// ==========================================

function getCartTotal() {

  return cart.reduce((total, item) => {

    const product =
      PRODUCTS.find(p => p.id === item.id);

    if (!product) return total;

    return total + (product.price * item.qty);

  }, 0);

}


// ==========================================
// 14. QUANTIDADE DE PRODUTOS
// ==========================================

function getCartCount() {

  return cart.reduce(
    (total, item) => total + item.qty,
    0
  );

}


// ==========================================
// 15. ABRIR CARRINHO
// ==========================================

function openCart() {

  if (!cartElement || !overlay) return;

  cartElement.classList.add("open");

  overlay.classList.add("show");

  document.body.classList.add("cart-open");

}


// ==========================================
// 16. FECHAR CARRINHO
// ==========================================

function closeCart() {

  if (!cartElement || !overlay) return;

  cartElement.classList.remove("open");

  overlay.classList.remove("show");

  document.body.classList.remove("cart-open");

}


// ==========================================
// 17. CHECKOUT PELO WHATSAPP
// ==========================================

function checkout() {

  if (cart.length === 0) {

    alert("Seu carrinho está vazio.");

    return;

  }


  let message =
    "🍰 *PEDIDO — NATY DOCE*%0A%0A";


  cart.forEach(item => {

    const product =
      PRODUCTS.find(p => p.id === item.id);

    if (!product) return;

    const subtotal =
      product.price * item.qty;

    message +=
      `🍰 ${item.qty}x ${product.name} — ${formatMoney(subtotal)}%0A`;

  });


  const total =
    getCartTotal();


  message +=
    `%0A💰 *Total: ${formatMoney(total)}*`;

  message +=
    "%0A%0A📍 Gostaria de combinar a entrega/retirada.";


  const url =
    `https://wa.me/${WHATSAPP}?text=${message}`;


  window.open(
    url,
    "_blank",
    "noopener"
  );

}


// ==========================================
// 18. WHATSAPP DO HERO
// ==========================================

function setupWhatsAppButtons() {

  const heroMessage =
    "Olá! 😍 Vim pelo site da Naty Doce e gostaria de fazer um pedido.";

  const ctaMessage =
    "Olá! 🍰 Quero conhecer os sabores e fazer um pedido na Naty Doce.";


  if (heroWhatsApp) {

    heroWhatsApp.href =
      createWhatsAppLink(heroMessage);

  }


  if (ctaWhatsApp) {

    ctaWhatsApp.href =
      createWhatsAppLink(ctaMessage);

  }

}


// ==========================================
// 19. VÍDEO
// ==========================================

function getYouTubeId(url) {

  if (!url) return null;

  try {

    const parsed =
      new URL(url);

    // youtube.com/watch?v=XXXX
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.get("v")
    ) {

      return parsed.searchParams.get("v");

    }

    // youtu.be/XXXX
    if (
      parsed.hostname.includes("youtu.be")
    ) {

      return parsed.pathname
        .replace("/", "")
        .split("?")[0];

    }

    // youtube.com/shorts/XXXX
    if (
      parsed.pathname.includes("/shorts/")
    ) {

      return parsed.pathname
        .split("/shorts/")[1]
        .split("/")[0];

    }

  } catch (error) {

    console.warn(
      "URL de vídeo inválida."
    );

  }

  return null;
}


function renderVideo() {

  const container =
    document.getElementById("advertisementVideo");

  if (!container) return;


  if (
    !VIDEO_CONFIG.enabled ||
    !VIDEO_CONFIG.url ||
    VIDEO_CONFIG.url.includes("SEU_VIDEO_AQUI")
  ) {

    container.innerHTML = `
      <div class="video-placeholder">

        <div class="video-play">
          ▶
        </div>

        <h3>
          ${escapeHTML(VIDEO_CONFIG.title)}
        </h3>

        <p>
          Cole o link do seu vídeo no arquivo script.js.
        </p>

      </div>
    `;

    return;

  }


  // ========================================
  // YOUTUBE
  // ========================================

  if (VIDEO_CONFIG.type === "youtube") {

    const videoId =
      getYouTubeId(VIDEO_CONFIG.url);

    if (!videoId) {

      container.innerHTML = `
        <div class="video-placeholder">

          <div class="video-play">
            ⚠️
          </div>

          <h3>
            Vídeo não encontrado
          </h3>

          <p>
            Verifique o link do YouTube.
          </p>

        </div>
      `;

      return;

    }


    container.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}"
        title="${escapeHTML(VIDEO_CONFIG.title)}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;

    return;

  }


  // ========================================
  // MP4
  // ========================================

  if (VIDEO_CONFIG.type === "mp4") {

    container.innerHTML = `
      <video
        controls
        playsinline
        preload="metadata"
      >
        <source
          src="${escapeHTML(VIDEO_CONFIG.url)}"
          type="video/mp4"
        >

        Seu navegador não suporta vídeo.
      </video>
    `;

    return;

  }


  // ========================================
  // ERRO
  // ========================================

  container.innerHTML = `
    <div class="video-placeholder">

      <div class="video-play">
        ⚠️
      </div>

      <h3>
        Configuração de vídeo inválida
      </h3>

      <p>
        Use type: "youtube" ou type: "mp4".
      </p>

    </div>
  `;

}


// ==========================================
// 20. AVALIAÇÕES
// ==========================================

function saveReviews() {

  localStorage.setItem(
    "natyDoceReviews",
    JSON.stringify(reviews)
  );

}


function renderReviews() {

  if (!reviewsContainer) return;


  if (reviews.length === 0) {

    reviewsContainer.innerHTML = `
      <div class="empty-reviews">
        Ainda não existem avaliações.
      </div>
    `;

    return;

  }


  reviewsContainer.innerHTML =
    reviews.map(review => {

      const stars =
        "★".repeat(review.stars) +
        "☆".repeat(5 - review.stars);


      return `
        <article class="review">

          <div class="review-top">

            <div class="review-avatar">
              ${escapeHTML(
                review.name.charAt(0).toUpperCase()
              )}
            </div>

            <div>

              <strong>
                ${escapeHTML(review.name)}
              </strong>

              <div class="stars">
                ${stars}
              </div>

            </div>

          </div>

          <p>
            "${escapeHTML(review.text)}"
          </p>

        </article>
      `;

    }).join("");

}


// ==========================================
// 21. ABRIR MODAL DE AVALIAÇÃO
// ==========================================

function openReviewModal() {

  if (!reviewModal) return;

  reviewModal.classList.add("show");

  document.body.classList.add("modal-open");

}


// ==========================================
// 22. FECHAR MODAL
// ==========================================

function closeReviewModal() {

  if (!reviewModal) return;

  reviewModal.classList.remove("show");

  document.body.classList.remove("modal-open");

}


// ==========================================
// 23. ENVIAR AVALIAÇÃO
// ==========================================

function submitReview(event) {

  event.preventDefault();


  const name =
    document.getElementById("reviewName").value.trim();

  const stars =
    Number(
      document.getElementById("reviewStars").value
    );

  const text =
    document.getElementById("reviewText").value.trim();


  if (!name || !text) {

    alert("Preencha seu nome e comentário.");

    return;

  }


  const newReview = {

    id: Date.now(),

    name,

    stars,

    text

  };


  reviews.unshift(newReview);

  saveReviews();

  renderReviews();

  reviewForm.reset();

  closeReviewModal();


  alert(
    "Obrigado pela avaliação! ❤️"
  );

}


// ==========================================
// 24. EVENTOS DO CARRINHO
// ==========================================

if (openCartButton) {

  openCartButton.addEventListener(
    "click",
    openCart
  );

}


if (closeCartButton) {

  closeCartButton.addEventListener(
    "click",
    closeCart
  );

}


if (overlay) {

  overlay.addEventListener(
    "click",
    closeCart
  );

}


if (checkoutButton) {

  checkoutButton.addEventListener(
    "click",
    checkout
  );

}


// ==========================================
// 25. EVENTOS DA AVALIAÇÃO
// ==========================================

if (reviewButton) {

  reviewButton.addEventListener(
    "click",
    openReviewModal
  );

}


if (reviewForm) {

  reviewForm.addEventListener(
    "submit",
    submitReview
  );

}


document.querySelectorAll("[data-close]")
  .forEach(button => {

    button.addEventListener(
      "click",
      closeReviewModal
    );

  });


if (reviewModal) {

  reviewModal.addEventListener(
    "click",
    event => {

      if (event.target === reviewModal) {

        closeReviewModal();

      }

    }
  );

}


// ==========================================
// 26. ESC FECHA MODAIS
// ==========================================

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeCart();
      closeReviewModal();

    }

  }
);


// ==========================================
// 27. ANO AUTOMÁTICO
// ==========================================

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ==========================================
// 28. INICIALIZAÇÃO
// ==========================================

renderProducts();

renderCart();

renderReviews();

renderVideo();

setupWhatsAppButtons();


// ==========================================
// FIM
// ==========================================
