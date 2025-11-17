// Variable Declarations
const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#card-link-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");
const newPostSubmitButton = newPostModal.querySelector(".modal__submit-button");

const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCloseButton = previewModal.querySelector(
  ".modal__close-button_type_preview"
);
const previewCaption = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Function Declarations
function openModal(modal) {
  modal.classList.add("modal-is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal-is-opened");
}

function handleEscapeKeyProfile(evt) {
  if (evt.key === "Escape") {
    closeModal(editProfileModal);
    removeEscapeListener();
  }
}

function handleEscapeKeyPost(evt) {
  if (evt.key === "Escape") {
    closeModal(newPostModal);
    removeEscapeListener();
  }
}

function handleEscapeKeyPreview(evt) {
  if (evt.key === "Escape") {
    closeModal(previewModal);
    removeEscapeListener();
  }
}

function addEscapeListenerProfile() {
  window.addEventListener("keydown", handleEscapeKeyProfile);
}

function addEscapeListenerPost() {
  window.addEventListener("keydown", handleEscapeKeyPost);
}

function addEscapeListenerPreview() {
  window.addEventListener("keydown", handleEscapeKeyPreview);
}

function removeEscapeListener() {
  window.addEventListener("keydown", handleEscapeKey);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;

  disableButton(profileSubmitButton, settings);

  closeModal(editProfileModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  newPostForm.reset();

  disableButton(newPostSubmitButton, settings);

  closeModal(newPostModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button-liked");
    cardLikeButton.classList.toggle("card__like-button-liked");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Edit Profile
editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);

  addEscapeListenerProfile();

  window.onclick = function (evt) {
    if (evt.target == editProfileModal) {
      closeModal(editProfileModal);
    }
  };
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// New Post
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);

  addEscapeListenerPost();

  window.onclick = function (evt) {
    if (evt.target == newPostModal) {
      closeModal(newPostModal);
    }
  };
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", handleNewPostSubmit);

// Preview Modal
previewCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

addEscapeListenerPreview();

window.onclick = function (evt) {
  if (evt.target == previewModal) {
    closeModal(previewModal);
  }
};

// Cards
initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
