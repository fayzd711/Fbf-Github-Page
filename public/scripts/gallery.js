const gallery = document.querySelector("#gallery");
const galleryCount = document.querySelector("#gallery-count");
const loadMoreButton = document.querySelector("#load-more");
const loadSentinel = document.querySelector("#load-sentinel");
const modal = document.querySelector("#detail-modal");
const modalMedia = document.querySelector("#modal-media");
const modalType = document.querySelector("#modal-type");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalCredit = document.querySelector("#modal-credit");
const modalDisclosure = document.querySelector("#modal-disclosure");
const modalActions = document.querySelector("#modal-actions");
const dataElement = document.querySelector("#gallery-data");

const batchSize = 6;
let galleryItems = [];
let visibleCount = 0;
let lastFocusedElement = null;

function normalizeType(type) {
  return type ? type.charAt(0).toUpperCase() + type.slice(1) : "Find";
}

function getPrimaryUrl(item) {
  return item.affiliateUrl || item.sourceUrl || "";
}

function createImage(item) {
  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.alt || "";
  image.loading = visibleCount < batchSize ? "eager" : "lazy";
  image.decoding = "async";

  if (item.aspectRatio) {
    image.style.setProperty("--ratio", item.aspectRatio);
  }

  return image;
}

function createCard(item) {
  const isExternal = item.clickBehavior === "external" && getPrimaryUrl(item);
  const card = document.createElement(isExternal ? "a" : "button");
  card.className = `gallery-card ${item.type ? `${item.type}-card` : ""}`;

  if (isExternal) {
    card.href = getPrimaryUrl(item);
    card.target = "_blank";
    card.rel = "noreferrer sponsored";
  } else {
    card.type = "button";
    card.addEventListener("click", () => openModal(item, card));
  }

  if (item.image) {
    card.append(createImage(item));
  }

  const shouldShowCopy = item.title || item.caption || item.type || item.ctaLabel;

  if (shouldShowCopy) {
    const copy = document.createElement("div");
    copy.className = "card-copy";

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.innerHTML = `<span>${normalizeType(item.type)}</span>${item.featured ? "<span>Featured</span>" : ""}`;
    copy.append(meta);

    if (item.title) {
      const title = document.createElement("h3");
      title.textContent = item.title;
      copy.append(title);
    }

    if (item.caption) {
      const caption = document.createElement("p");
      caption.textContent = item.caption;
      copy.append(caption);
    }

    if (item.ctaLabel) {
      const cta = document.createElement("span");
      cta.className = "card-cta";
      cta.textContent = isExternal ? item.ctaLabel : "Open detail";
      copy.append(cta);
    }

    card.append(copy);
  }

  if (!item.title && item.alt) {
    card.setAttribute("aria-label", item.alt);
  }

  return card;
}

function renderNextBatch() {
  const nextItems = galleryItems.slice(visibleCount, visibleCount + batchSize);
  const fragment = document.createDocumentFragment();

  nextItems.forEach((item) => {
    fragment.append(createCard(item));
  });

  gallery.append(fragment);
  visibleCount += nextItems.length;

  galleryCount.textContent = `${Math.min(visibleCount, galleryItems.length)} of ${galleryItems.length} finds shown`;
  loadMoreButton.classList.toggle("is-visible", visibleCount < galleryItems.length);
}

function openModal(item, trigger) {
  lastFocusedElement = trigger;
  modalMedia.replaceChildren();
  modalActions.replaceChildren();

  if (item.image) {
    modalMedia.append(createImage(item));
  }

  modalType.textContent = normalizeType(item.type);
  modalTitle.textContent = item.title || "Untitled find";
  modalDescription.textContent = item.detail || item.caption || "";
  modalCredit.textContent = item.credit ? `Credit: ${item.credit}` : "";
  modalDisclosure.textContent =
    item.type === "affiliate"
      ? "Affiliate disclosure: this card may include a commissionable link."
      : "";

  const primaryUrl = getPrimaryUrl(item);

  if (primaryUrl) {
    const action = document.createElement("a");
    action.href = primaryUrl;
    action.target = "_blank";
    action.rel = item.affiliateUrl ? "noreferrer sponsored" : "noreferrer";
    action.textContent = item.ctaLabel || "Open Link";
    modalActions.append(action);
  }

  document.body.classList.add("modal-open");
  modal.showModal();
}

function closeModal() {
  modal.close();
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function loadGallery() {
  try {
    galleryItems = JSON.parse(dataElement.textContent || "[]");
    galleryItems.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    renderNextBatch();
  } catch (error) {
    galleryCount.textContent = "Gallery could not load.";
    gallery.innerHTML = `<p class="error-message">${error.message}</p>`;
  }
}

loadMoreButton.addEventListener("click", renderNextBatch);

modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.closest("[data-close-modal]")) {
    closeModal();
  }
});

modal.addEventListener("cancel", () => {
  document.body.classList.remove("modal-open");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting) && visibleCount < galleryItems.length) {
        renderNextBatch();
      }
    },
    { rootMargin: "600px" },
  );

  observer.observe(loadSentinel);
} else {
  loadMoreButton.classList.add("is-visible");
}

loadGallery();
