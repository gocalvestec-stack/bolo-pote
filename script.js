// ======================================================
//  RD-DOCE — SCRIPT PRINCIPAL
// VERSÃO PROFISSIONAL
// ======================================================


// ======================================================
// 1. CONFIGURAÇÕES GERAIS
// ======================================================

// WhatsApp da Naty Doce
// Formato: 55 + DDD + número
// Exemplo: 5531999999999
const WHATSAPP = "5500000000000";


// ======================================================
// 2. SUPABASE
// ======================================================
//
// Depois vamos colocar aqui os dados do seu projeto.
//
// URL:
// https://xxxxxxxxxxxx.supabase.co
//
// ANON KEY:
// eyJhbGciOiJIUzI1NiIs...
//
// IMPORTANTE:
// Use somente a chave ANON/PUBLIC.
// NUNCA coloque a SERVICE_ROLE KEY no site.
//

const SUPABASE_URL = "https://ggoghcojpijvvexmhmyb.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_qBtLGs1EgAZjKLfqR0OEiQ_l0q1VECf";


// ======================================================
// 3. CONFIGURAÇÃO DO VÍDEO
// ======================================================

const VIDEO_CONFIG = {

  enabled: true,

  // youtube ou mp4
  type: "youtube",

  // Cole aqui o link do vídeo
  url: "https://www.youtube.com/watch?v=SEU_VIDEO_AQUI",

  title: "Conheça a Naty Doce",

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
// 5. ELEMENTOS DO HTML
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

const yearElement =
  document.getElementById("year");

const videoContainer =
  document.getElementById("advertisementVideo");


// ======================================================
// 6. SUPABASE CLIENTE
// ======================================================

let supabaseClient = null;


// Carrega a biblioteca do Supabase automaticamente
function loadSupabase() {

  return new Promise((resolve, reject) => {

    if (
      SUPABASE_URL.startsWith("https://") &&
      SUPABASE_ANON_KEY.length > 20 &&
      !SUPABASE_URL.includes("COLE_AQUI") &&
      !SUPABASE_ANON_KEY.includes("COLE_AQUI")
    ) {

      if (window.supabase) {

        supabaseClient =
          window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
          );

        resolve();

        return;
      }

    }


    const script =
      document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

    script.onload = () => {

      if (
        SUPABASE_URL.includes("COLE_AQUI") ||
        SUPABASE_ANON_KEY.includes("COLE_AQUI")
      ) {

        console.warn(
          "Supabase ainda não configurado."
        );

        resolve();

        return;
      }


      try {

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

      console.error(
        "Não foi possível carregar o Supabase."
      );

      reject(
        new Error("Supabase não carregado.")
      );

    };


    document.head.appendChild(script);

  });

}


// ======================================================
// 7. FORMATAÇÃO DE PREÇO
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
// 8. PROTEÇÃO HTML
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
// 9. LINK DO WHATSAPP
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
// 10. PRODUTOS
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

        <article class="product">

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


              <a
                class="btn small primary"
                href="${whatsappLink(
                  `Olá! 🍰 Quero pedir o bolo de pote "${product.name}" da Naty Doce.`
                )}"
                target="_blank"
                rel="noopener"
              >
                Pedir
              </a>

            </div>

          </div>

        </article>

      `;

    }).join("");

}


// ======================================================
// 11. BOTÕES WHATSAPP
// ======================================================

function setupWhatsApp() {

  const heroMessage =
    "Olá! 😍 Vim pelo site da Naty Doce e gostaria de fazer um pedido.";


  const ctaMessage =
    "Olá! 🍰 Quero conhecer os sabores da Naty Doce e fazer um pedido.";


  if (heroWhatsApp) {

    heroWhatsApp.href =
      whatsappLink(heroMessage);

  }


  if (ctaWhatsApp) {

    ctaWhatsApp.href =
      whatsappLink(ctaMessage);

  }

}


// ======================================================
// 12. YOUTUBE — PEGAR ID
// ======================================================

function getYouTubeId(url) {

  if (!url) return null;


  try {

    const parsed =
      new URL(url);


    // youtube.com/watch?v=
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.get("v")
    ) {

      return parsed.searchParams.get("v");

    }


    // youtu.be/
    if (
      parsed.hostname.includes("youtu.be")
    ) {

      return parsed.pathname
        .replace("/", "")
        .split("?")[0];

    }


    // youtube.com/shorts/
    if (
      parsed.pathname.includes("/shorts/")
    ) {

      return parsed.pathname
        .split("/shorts/")[1]
        .split("/")[0];

    }


    // youtube.com/embed/
    if (
      parsed.pathname.includes("/embed/")
    ) {

      return parsed.pathname
        .split("/embed/")[1]
        .split("/")[0];

    }

  } catch (error) {

    console.warn(
      "URL de vídeo inválida."
    );

  }


  return null;

}


// ======================================================
// 13. VÍDEO
// ======================================================

function renderVideo() {

  if (!videoContainer) return;


  if (
    !VIDEO_CONFIG.enabled ||
    !VIDEO_CONFIG.url ||
    VIDEO_CONFIG.url.includes("SEU_VIDEO_AQUI")
  ) {

    videoContainer.innerHTML = `

      <div class="video-placeholder">

        <div class="video-play">
          ▶
        </div>

        <h3>
          ${escapeHTML(VIDEO_CONFIG.title)}
        </h3>

        <p>
          O vídeo promocional aparecerá aqui.
        </p>

      </div>

    `;

    return;
  }


  // ====================================================
  // YOUTUBE
  // ====================================================

  if (VIDEO_CONFIG.type === "youtube") {

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

        title="${escapeHTML(VIDEO_CONFIG.title)}"

        loading="lazy"

        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

        allowfullscreen>

      </iframe>

    `;

    return;
  }


  // ====================================================
  // MP4
  // ====================================================

  if (VIDEO_CONFIG.type === "mp4") {

    videoContainer.innerHTML = `

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


  // ====================================================
  // ERRO
  // ====================================================

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
// 14. ESTRELAS
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
// 15. CARREGAR AVALIAÇÕES
// ======================================================

async function loadReviews() {

  if (!reviewsContainer) return;


  // ----------------------------------------------------
  // Se o Supabase ainda não estiver configurado
  // ----------------------------------------------------

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

      .eq("aprovado", true)

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


    renderReviews(data || []);

    updateRatingSummary(data || []);

  } catch (error) {

    console.error(
      "Erro inesperado nas avaliações:",
      error
    );

    renderDemoReviews();

  }

}


// ======================================================
// 16. AVALIAÇÕES DE DEMONSTRAÇÃO
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


  renderReviews(demoReviews);

  updateRatingSummary(demoReviews);

}


// ======================================================
// 17. RENDERIZAR AVALIAÇÕES
// ======================================================

function renderReviews(data) {

  if (!reviewsContainer) return;


  if (!data || data.length === 0) {

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
        review.nome || "Cliente";


      const comment =
        review.comentario || "";


      const stars =
        Number(review.estrelas) || 5;


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
// 18. MÉDIA DAS AVALIAÇÕES
// ======================================================

function updateRatingSummary(data) {

  if (!data || data.length === 0) return;


  const total =
    data.reduce(
      (sum, review) =>
        sum + Number(review.estrelas || 0),
      0
    );


  const average =
    total / data.length;


  // Elementos opcionais.
  // Se forem adicionados posteriormente no HTML,
  // serão preenchidos automaticamente.

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
// 19. ABRIR MODAL
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
// 20. FECHAR MODAL
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
// 21. ENVIAR AVALIAÇÃO
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
    Number(starsInput.value);


  const comment =
    textInput.value.trim();


  // ----------------------------------------------------
  // Validação
  // ----------------------------------------------------

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


  // ----------------------------------------------------
  // Verifica Supabase
  // ----------------------------------------------------

  if (!supabaseClient) {

    alert(
      "O sistema de avaliações ainda não está conectado ao banco de dados."
    );

    return;
  }


  // ----------------------------------------------------
  // Desabilita botão
  // ----------------------------------------------------

  const submitButton =
    reviewForm.querySelector(
      'button[type="submit"]'
    );


  const originalText =
    submitButton
      ? submitButton.textContent
      : "";


  if (submitButton) {

    submitButton.disabled = true;

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


    // --------------------------------------------------
    // Sucesso
    // --------------------------------------------------

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

      submitButton.disabled = false;

      submitButton.textContent =
        originalText;

    }

  }

}


// ======================================================
// 22. FECHAR MODAL CLICANDO FORA
// ======================================================

if (reviewModal) {

  reviewModal.addEventListener(
    "click",
    event => {

      if (
        event.target === reviewModal
      ) {

        closeReviewModal();

      }

    }
  );

}


// ======================================================
// 23. BOTÃO DE AVALIAÇÃO
// ======================================================

if (reviewButton) {

  reviewButton.addEventListener(
    "click",
    openReviewModal
  );

}


// ======================================================
// 24. BOTÃO FECHAR DO MODAL
// ======================================================

document
  .querySelectorAll("[data-close]")
  .forEach(button => {

    button.addEventListener(
      "click",
      closeReviewModal
    );

  });


// ======================================================
// 25. ESC FECHA MODAL
// ======================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeReviewModal();

    }

  }
);


// ======================================================
// 26. ANO AUTOMÁTICO
// ======================================================

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ======================================================
// 27. INICIALIZAÇÃO
// ======================================================

async function init() {

  // Produtos
  renderProducts();


  // WhatsApp
  setupWhatsApp();


  // Vídeo
  renderVideo();


  // Supabase
  try {

    await loadSupabase();

  } catch (error) {

    console.warn(
      "Supabase não pôde ser inicializado."
    );

  }


  // Avaliações
  await loadReviews();

}


// ======================================================
// 28. INICIAR SISTEMA
// ======================================================

init();
