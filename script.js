// ======================================================
// NATY DOCE — SCRIPT PRINCIPAL
// COMPATÍVEL COM O INDEX.HTML ATUAL
// ======================================================


// ======================================================
// 1. CONFIGURAÇÕES
// ======================================================

const WHATSAPP = "5531997557546";


// ======================================================
// 2. SUPABASE
// ======================================================

const SUPABASE_URL =
  "https://ggoghcojpijvvexmhmyb.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_qBtLGs1EgAZjKLfqR0OEiQ_l0q1VECf";

let supabaseClient = null;


// ======================================================
// 3. VÍDEO
// ======================================================

const VIDEO_CONFIG = {

  enabled: true,

  type: "youtube",

  url:
    "https://www.youtube.com/watch?v=SEU_VIDEO_AQUI",

  title:
    "Conheça a Naty Doce",

  description:
    "Conheça nossos bolos de pote e veja nossas delícias."

};


// ======================================================
// 4. PRODUTOS
// ======================================================

const PRODUCTS = [

  {
    id: 1,
    name: "Brigadeiro Cremoso",
    description:
      "Chocolate cremoso, intenso e muito recheado.",
    price: 10.00,
    emoji: "🍫",
    highlight: true
  },

  {
    id: 2,
    name: "Ninho com Morango",
    description:
      "Creme de Ninho com morangos e muito recheio.",
    price: 12.00,
    emoji: "🍓",
    highlight: true
  },

  {
    id: 3,
    name: "Prestígio",
    description:
      "Chocolate cremoso combinado com coco.",
    price: 10.00,
    emoji: "🥥",
    highlight: false
  },

  {
    id: 4,
    name: "Doce de Leite",
    description:
      "Doce de leite cremoso com sabor irresistível.",
    price: 11.00,
    emoji: "🍯",
    highlight: false
  },

  {
    id: 5,
    name: "Chocolate com Morango",
    description:
      "Chocolate cremoso com pedaços de morango.",
    price: 12.00,
    emoji: "🍫",
    highlight: true
  },

  {
    id: 6,
    name: "Ninho com Nutella",
    description:
      "Creme de Ninho com Nutella e muito recheio.",
    price: 13.00,
    emoji: "🤍",
    highlight: true
  }

];


// ======================================================
// 5. ELEMENTOS DO INDEX
// ======================================================

const productsContainer =
  document.getElementById("products");

const reviewsContainer =
  document.getElementById("reviews");

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

const footerWhatsApp =
  document.getElementById("footerWhatsApp");

const yearElement =
  document.getElementById("year");

const videoContainer =
  document.getElementById("advertisementVideo");


// ======================================================
// 6. ELEMENTOS DO CARRINHO
// ======================================================

const openCartButton =
  document.getElementById("openCart");

const closeCartButton =
  document.getElementById("closeCart");

const cartElement =
  document.getElementById("cart");

const overlay =
  document.getElementById("overlay");

const cartItemsContainer =
  document.getElementById("cartItems");

const cartTotalElement =
  document.getElementById("cartTotal");

const cartCountElement =
  document.getElementById("cartCount");

const checkoutButton =
  document.getElementById("checkout");


// ======================================================
// 7. CARRINHO
// ======================================================

let cart = [];


// ======================================================
// 8. LOCAL STORAGE
// ======================================================

function saveCart() {

  try {

    localStorage.setItem(
      "natyDoceCart",
      JSON.stringify(cart)
    );

  } catch (error) {

    console.warn(
      "Não foi possível salvar o carrinho.",
      error
    );

  }

}


function loadCart() {

  try {

    const saved =
      localStorage.getItem(
        "natyDoceCart"
      );

    if (!saved) {

      cart = [];

      return;

    }

    const parsed =
      JSON.parse(saved);

    if (Array.isArray(parsed)) {

      cart = parsed;

    } else {

      cart = [];

    }

  } catch (error) {

    console.warn(
      "Não foi possível carregar o carrinho.",
      error
    );

    cart = [];

  }

}


// ======================================================
// 9. FORMATAÇÃO DE PREÇO
// ======================================================

function formatMoney(value) {

  return Number(value).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );

}


// ======================================================
// 10. PROTEÇÃO HTML
// ======================================================

function escapeHTML(text) {

  return String(text)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


// ======================================================
// 11. WHATSAPP
// ======================================================

function whatsappLink(message) {

  return (
    "https://wa.me/" +
    WHATSAPP +
    "?text=" +
    encodeURIComponent(message)
  );

}


// ======================================================
// 12. CONFIGURAR WHATSAPP
// ======================================================

function setupWhatsApp() {

  const heroMessage =
    "Olá! 😍 Vim pelo site da Naty Doce e gostaria de fazer um pedido.";

  const ctaMessage =
    "Olá! 🍰 Quero conhecer os sabores da Naty Doce e fazer um pedido.";

  const footerMessage =
    "Olá! 🍰 Vim pelo site da Naty Doce e gostaria de fazer um pedido.";

  if (heroWhatsApp) {

    heroWhatsApp.href =
      whatsappLink(heroMessage);

  }

  if (ctaWhatsApp) {

    ctaWhatsApp.href =
      whatsappLink(ctaMessage);

  }

  if (footerWhatsApp) {

    footerWhatsApp.href =
      whatsappLink(footerMessage);

  }

}


// ======================================================
// 13. RENDERIZAR PRODUTOS
// ======================================================

function renderProducts() {

  if (!productsContainer) return;

  productsContainer.innerHTML =
    PRODUCTS.map(product => {

      const badge =
        product.highlight
          ? `<span class="product-badge">Mais pedido</span>`
          : "";

      return `

        <article
          class="product"
          data-product-id="${product.id}"
        >

          <div class="product-img">

            ${badge}

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

                <span>
                  ${product.emoji}
                </span>

                <strong>
                  Naty Doce
                </strong>

                <small>
                  BOLO DE POTE
                </small>

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
                class="btn small primary add-product"
                type="button"
                data-product-id="${product.id}"
              >
                Pedir
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");


  document
    .querySelectorAll(".add-product")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const productId =
            Number(
              button.dataset.productId
            );

          addToCart(productId);

        }
      );

    });

}


// ======================================================
// 14. ADICIONAR AO CARRINHO
// ======================================================

function addToCart(productId) {

  const product =
    PRODUCTS.find(
      item =>
        item.id === productId
    );

  if (!product) return;


  const existing =
    cart.find(
      item =>
        item.id === productId
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id: product.id,

      name: product.name,

      price: product.price,

      emoji: product.emoji,

      quantity: 1

    });

  }


  saveCart();

  renderCart();

  openCart();

}


// ======================================================
// 15. ALTERAR QUANTIDADE
// ======================================================

function changeQuantity(
  productId,
  change
) {

  const item =
    cart.find(
      product =>
        product.id === productId
    );

  if (!item) return;


  item.quantity += change;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== productId
      );

  }


  saveCart();

  renderCart();

}


// ======================================================
// 16. REMOVER PRODUTO
// ======================================================

function removeFromCart(productId) {

  cart =
    cart.filter(
      item =>
        item.id !== productId
    );


  saveCart();

  renderCart();

}


// ======================================================
// 17. TOTAL DO CARRINHO
// ======================================================

function getCartTotal() {

  return cart.reduce(

    (total, item) => {

      return (
        total +
        item.price *
        item.quantity
      );

    },

    0

  );

}


// ======================================================
// 18. QUANTIDADE TOTAL
// ======================================================

function getCartCount() {

  return cart.reduce(

    (total, item) => {

      return (
        total +
        item.quantity
      );

    },

    0

  );

}


// ======================================================
// 19. RENDERIZAR CARRINHO
// ======================================================

function renderCart() {

  if (
    !cartItemsContainer ||
    !cartTotalElement
  ) return;


  const count =
    getCartCount();


  if (cartCountElement) {

    cartCountElement.textContent =
      count;

  }


  const total =
    getCartTotal();


  cartTotalElement.textContent =
    formatMoney(total);


  if (cart.length === 0) {

    cartItemsContainer.innerHTML = `

      <div class="empty-cart">

        <div>
          🍰
        </div>

        <h3>
          Seu carrinho está vazio
        </h3>

        <p>
          Escolha um sabor delicioso para começar.
        </p>

      </div>

    `;

    if (checkoutButton) {

      checkoutButton.disabled = true;

    }

    return;

  }


  if (checkoutButton) {

    checkoutButton.disabled = false;

  }


  cartItemsContainer.innerHTML =

    cart.map(item => {

      const subtotal =
        item.price *
        item.quantity;


      return `

        <div
          class="cart-item"
          data-cart-id="${item.id}"
        >

          <div class="cart-item-info">

            <div class="cart-item-emoji">
              ${item.emoji || "🍰"}
            </div>

            <div>

              <strong>
                ${escapeHTML(item.name)}
              </strong>

              <small>
                ${formatMoney(item.price)}
              </small>

            </div>

          </div>


          <div class="cart-item-bottom">

            <div class="quantity">

              <button
                type="button"
                class="quantity-minus"
                data-id="${item.id}"
              >
                −
              </button>

              <strong>
                ${item.quantity}
              </strong>

              <button
                type="button"
                class="quantity-plus"
                data-id="${item.id}"
              >
                +
              </button>

            </div>


            <strong>
              ${formatMoney(subtotal)}
            </strong>


            <button
              type="button"
              class="remove-cart-item"
              data-id="${item.id}"
              aria-label="Remover produto"
            >
              🗑️
            </button>

          </div>

        </div>

      `;

    }).join("");


  cartItemsContainer
    .querySelectorAll(".quantity-minus")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeQuantity(
            Number(button.dataset.id),
            -1
          );

        }
      );

    });


  cartItemsContainer
    .querySelectorAll(".quantity-plus")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeQuantity(
            Number(button.dataset.id),
            1
          );

        }
      );

    });


  cartItemsContainer
    .querySelectorAll(".remove-cart-item")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          removeFromCart(
            Number(button.dataset.id)
          );

        }
      );

    });

}


// ======================================================
// 20. ABRIR CARRINHO
// ======================================================

function openCart() {

  if (cartElement) {

    cartElement.classList.add("show");

  }


  if (overlay) {

    overlay.classList.add("show");

  }


  document.body.classList.add(
    "cart-open"
  );

}


// ======================================================
// 21. FECHAR CARRINHO
// ======================================================

function closeCart() {

  if (cartElement) {

    cartElement.classList.remove("show");

  }


  if (overlay) {

    overlay.classList.remove("show");

  }


  document.body.classList.remove(
    "cart-open"
  );

}


// ======================================================
// 22. CONFIGURAR CARRINHO
// ======================================================

function setupCart() {

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
      checkoutWhatsApp
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeCart();

      }

    }
  );

}


// ======================================================
// 23. FINALIZAR PEDIDO
// ======================================================

function checkoutWhatsApp() {

  if (cart.length === 0) {

    alert(
      "Seu carrinho está vazio."
    );

    return;

  }


  let message =
    "Olá! 🍰 Quero fazer um pedido na Naty Doce.%0A%0A";


  message =
    "Olá! 🍰 Quero fazer um pedido na Naty Doce.\n\n";


  cart.forEach(item => {

    const subtotal =
      item.price *
      item.quantity;


    message +=
      `${item.quantity}x ${item.name} — ${formatMoney(subtotal)}\n`;

  });


  message +=
    `\nTotal: ${formatMoney(getCartTotal())}`;


  message +=
    "\n\nGostaria de combinar a entrega pelo WhatsApp. ❤️";


  window.open(
    whatsappLink(message),
    "_blank"
  );

}


// ======================================================
// 24. YOUTUBE — PEGAR ID
// ======================================================

function getYouTubeId(url) {

  if (!url) return null;


  try {

    const parsed =
      new URL(url);


    if (
      parsed.hostname.includes(
        "youtube.com"
      ) &&
      parsed.searchParams.get("v")
    ) {

      return parsed.searchParams.get("v");

    }


    if (
      parsed.hostname.includes(
        "youtu.be"
      )
    ) {

      return parsed.pathname
        .replace("/", "")
        .split("?")[0];

    }


    if (
      parsed.pathname.includes(
        "/shorts/"
      )
    ) {

      return parsed.pathname
        .split("/shorts/")[1]
        .split("/")[0];

    }


    if (
      parsed.pathname.includes(
        "/embed/"
      )
    ) {

      return parsed.pathname
        .split("/embed/")[1]
        .split("/")[0];

    }

  } catch (error) {

    console.warn(
      "URL de vídeo inválida.",
      error
    );

  }


  return null;

}


// ======================================================
// 25. RENDERIZAR VÍDEO
// ======================================================

function renderVideo() {

  if (!videoContainer) return;


  if (
    !VIDEO_CONFIG.enabled ||
    !VIDEO_CONFIG.url ||
    VIDEO_CONFIG.url.includes(
      "SEU_VIDEO_AQUI"
    )
  ) {

    videoContainer.innerHTML = `

      <div class="video-placeholder">

        <div class="video-play">
          ▶
        </div>

        <h3>
          ${escapeHTML(
            VIDEO_CONFIG.title
          )}
        </h3>

        <p>
          ${escapeHTML(
            VIDEO_CONFIG.description
          )}
        </p>

      </div>

    `;

    return;

  }


  if (
    VIDEO_CONFIG.type ===
    "youtube"
  ) {

    const videoId =
      getYouTubeId(
        VIDEO_CONFIG.url
      );


    if (!videoId) {

      videoContainer.innerHTML = `

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


    videoContainer.innerHTML = `

      <iframe

        src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}"

        title="${escapeHTML(
          VIDEO_CONFIG.title
        )}"

        loading="lazy"

        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share
        "

        allowfullscreen>

      </iframe>

    `;

    return;

  }


  if (
    VIDEO_CONFIG.type ===
    "mp4"
  ) {

    videoContainer.innerHTML = `

      <video
        controls
        playsinline
        preload="metadata"
      >

        <source
          src="${escapeHTML(
            VIDEO_CONFIG.url
          )}"
          type="video/mp4"
        >

        Seu navegador não suporta vídeo.

      </video>

    `;

    return;

  }


  videoContainer.innerHTML = `

    <div class="video-placeholder">

      <div class="video-play">
        ⚠️
      </div>

      <h3>
        Configuração inválida
      </h3>

      <p>
        Use "youtube" ou "mp4".
      </p>

    </div>

  `;

}


// ======================================================
// 26. ESTRELAS
// ======================================================

function renderStars(number) {

  const stars =
    Math.max(
      0,
      Math.min(
        5,
        Number(number)
      )
    );


  return (
    "★".repeat(stars) +
    "☆".repeat(5 - stars)
  );

}


// ======================================================
// 27. CARREGAR AVALIAÇÕES
// ======================================================

async function loadReviews() {

  if (!reviewsContainer) return;


  if (!supabaseClient) {

    renderDemoReviews();

    return;

  }


  try {

    const {
      data,
      error
    } = await supabaseClient

      .from("avaliacoes")

      .select(
        "id,nome,estrelas,comentario,aprovado,criado_em"
      )

      .eq(
        "aprovado",
        true
      )

      .order(
        "criado_em",
        {
          ascending: false
        }
      );


    if (error) {

      console.error(
        "Erro ao carregar avaliações:",
        error
      );

      renderDemoReviews();

      return;

    }


    renderReviews(
      data || []
    );

    updateRatingSummary(
      data || []
    );

  } catch (error) {

    console.error(
      "Erro inesperado nas avaliações:",
      error
    );

    renderDemoReviews();

  }

}


// ======================================================
// 28. AVALIAÇÕES DEMO
// ======================================================

function renderDemoReviews() {

  const demoReviews = [

    {
      nome: "Mariana",
      estrelas: 5,
      comentario:
        "Muito gostoso e bem recheado. Amei!"
    },

    {
      nome: "Juliana",
      estrelas: 5,
      comentario:
        "Chegou tudo certinho e estava uma delícia."
    },

    {
      nome: "Camila",
      estrelas: 5,
      comentario:
        "Muito caprichado. Com certeza vou pedir novamente."
    }

  ];


  renderReviews(
    demoReviews
  );

  updateRatingSummary(
    demoReviews
  );

}


// ======================================================
// 29. RENDERIZAR AVALIAÇÕES
// ======================================================

function renderReviews(data) {

  if (!reviewsContainer) return;


  if (
    !data ||
    data.length === 0
  ) {

    reviewsContainer.innerHTML = `

      <div class="empty-reviews">

        <div>
          ⭐
        </div>

        <h3>
          Seja o primeiro a avaliar!
        </h3>

        <p>
          Conte para outras pessoas como foi sua experiência.
        </p>

      </div>

    `;

    return;

  }


  reviewsContainer.innerHTML =

    data.map(review => {

      const name =
        review.nome ||
        "Cliente";


      const comment =
        review.comentario ||
        "";


      const stars =
        Number(
          review.estrelas
        ) || 5;


      const initial =
        name
          .charAt(0)
          .toUpperCase();


      return `

        <article class="review">

          <div class="review-top">

            <div class="review-avatar">
              ${escapeHTML(initial)}
            </div>

            <div>

              <strong>
                ${escapeHTML(name)}
              </strong>

              <div class="stars">
                ${renderStars(stars)}
              </div>

            </div>

          </div>

          <p>
            "${escapeHTML(comment)}"
          </p>

        </article>

      `;

    }).join("");

}


// ======================================================
// 30. RESUMO DAS AVALIAÇÕES
// ======================================================

function updateRatingSummary(data) {

  if (
    !data ||
    data.length === 0
  ) return;


  const total =
    data.reduce(
      (
        sum,
        review
      ) =>
        sum +
        Number(
          review.estrelas || 0
        ),
      0
    );


  const average =
    total /
    data.length;


  const averageElement =
    document.getElementById(
      "averageRating"
    );


  const countElement =
    document.getElementById(
      "reviewCount"
    );


  const starsElement =
    document.getElementById(
      "averageStars"
    );


  if (averageElement) {

    averageElement.textContent =
      average.toFixed(1);

  }


  if (countElement) {

    countElement.textContent =
      `${data.length} avaliações`;

  }


  if (starsElement) {

    starsElement.textContent =
      renderStars(
        Math.round(average)
      );

  }

}


// ======================================================
// 31. ABRIR MODAL DE AVALIAÇÃO
// ======================================================

function openReviewModal() {

  if (!reviewModal) return;


  reviewModal.classList.add(
    "show"
  );


  document.body.classList.add(
    "modal-open"
  );

}


// ======================================================
// 32. FECHAR MODAL DE AVALIAÇÃO
// ======================================================

function closeReviewModal() {

  if (!reviewModal) return;


  reviewModal.classList.remove(
    "show"
  );


  document.body.classList.remove(
    "modal-open"
  );

}


// ======================================================
// 33. ENVIAR AVALIAÇÃO
// ======================================================

async function submitReview(event) {

  event.preventDefault();


  const nameInput =
    document.getElementById(
      "reviewName"
    );


  const starsInput =
    document.getElementById(
      "reviewStars"
    );


  const textInput =
    document.getElementById(
      "reviewText"
    );


  if (
    !nameInput ||
    !starsInput ||
    !textInput
  ) {

    return;

  }


  const name =
    nameInput.value.trim();


  const stars =
    Number(
      starsInput.value
    );


  const comment =
    textInput.value.trim();


  if (
    name.length < 2
  ) {

    alert(
      "Digite seu nome."
    );

    nameInput.focus();

    return;

  }


  if (
    stars < 1 ||
    stars > 5
  ) {

    alert(
      "Escolha uma nota de 1 a 5 estrelas."
    );

    return;

  }


  if (
    comment.length < 3
  ) {

    alert(
      "Escreva um comentário."
    );

    textInput.focus();

    return;

  }


  if (!supabaseClient) {

    alert(
      "O sistema de avaliações ainda não está conectado ao banco de dados."
    );

    return;

  }


  const submitButton =
    reviewForm.querySelector(
      'button[type="submit"]'
    );


  const originalText =
    submitButton
      ? submitButton.textContent
      : "";


  if (submitButton) {

    submitButton.disabled =
      true;

    submitButton.textContent =
      "Enviando...";

  }


  try {

    const {
      error
    } = await supabaseClient

      .from("avaliacoes")

      .insert([

        {
          nome: name,

          estrelas: stars,

          comentario: comment,

          aprovado: false
        }

      ]);


    if (error) {

      console.error(
        "Erro ao enviar avaliação:",
        error
      );

      alert(
        "Não foi possível enviar sua avaliação. Tente novamente."
      );

      return;

    }


    alert(
      "Obrigado pela avaliação! ❤️\n\nSua avaliação foi enviada para análise."
    );


    reviewForm.reset();

    closeReviewModal();

  } catch (error) {

    console.error(
      "Erro inesperado:",
      error
    );

    alert(
      "Ocorreu um erro. Tente novamente."
    );

  } finally {

    if (submitButton) {

      submitButton.disabled =
        false;

      submitButton.textContent =
        originalText;

    }

  }

}


// ======================================================
// 34. CONFIGURAR MODAL
// ======================================================

function setupReviewModal() {

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


  document
    .querySelectorAll(
      "[data-close]"
    )
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

        if (
          event.target ===
          reviewModal
        ) {

          closeReviewModal();

        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeReviewModal();

      }

    }
  );

}


// ======================================================
// 35. ANO
// ======================================================

function setupYear() {

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }

}


// ======================================================
// 36. CARREGAR SUPABASE
// ======================================================

function loadSupabase() {

  return new Promise(
    (resolve, reject) => {

      if (
        window.supabase
      ) {

        try {

          supabaseClient =
            window.supabase.createClient(
              SUPABASE_URL,
              SUPABASE_ANON_KEY
            );

          resolve();

          return;

        } catch (error) {

          reject(error);

          return;

        }

      }


      const script =
        document.createElement(
          "script"
        );


      script.src =
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";


      script.onload = () => {

        try {

          if (
            !window.supabase
          ) {

            reject(
              new Error(
                "Biblioteca Supabase não encontrada."
              )
            );

            return;

          }


          supabaseClient =
            window.supabase.createClient(
              SUPABASE_URL,
              SUPABASE_ANON_KEY
            );


          resolve();

        } catch (error) {

          console.error(
            "Erro ao inicializar Supabase:",
            error
          );

          reject(error);

        }

      };


      script.onerror = () => {

        reject(
          new Error(
            "Não foi possível carregar o Supabase."
          )
        );

      };


      document.head.appendChild(
        script
      );

    }
  );

}


// ======================================================
// 37. INICIALIZAÇÃO
// ======================================================

async function init() {

  // Produtos
  renderProducts();


  // WhatsApp
  setupWhatsApp();


  // Ano
  setupYear();


  // Vídeo
  renderVideo();


  // Carrinho
  loadCart();

  renderCart();

  setupCart();


  // Modal de avaliações
  setupReviewModal();


  // Supabase
  try {

    await loadSupabase();

  } catch (error) {

    console.warn(
      "Supabase não pôde ser inicializado.",
      error
    );

  }


  // Avaliações
  await loadReviews();

}


// ======================================================
// 38. INICIAR
// ======================================================

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

} else {

  init();

}
