const bodyElement = document.querySelector('body');
const photoModal = document.querySelector('.big-picture');
const photoModalImage = photoModal.querySelector('.big-picture__img img');
const photoModalCloseButton = photoModal.querySelector('.big-picture__cancel');
const photoLikesCount = photoModal.querySelector('.likes-count');
const photoCounter = photoModal.querySelector('.social__comment-count');
const photoDescription = photoModal.querySelector('.social__caption');
const photoCommentsLoader = photoModal.querySelector('.comments-loader');
const commentsTemplate = photoModal.querySelector('.social__comments');
const commentTemplate = photoModal.querySelector('.social__comment');

const createFullPhoto = (imageId, photos) => {
  const currentPhoto = photos.find((photo) => photo.id === imageId);

  photoModalImage.src = currentPhoto.url;
  photoLikesCount.textContent = currentPhoto.likes;
  photoDescription.textContent = currentPhoto.description;

  const commentFragment = document.createDocumentFragment();

  currentPhoto.comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);

    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentFragment.append(newComment);
  });

  commentsTemplate.innerHTML = '';
  commentsTemplate.append(commentFragment);
  photoCounter.classList.add('hidden');
  photoCommentsLoader.classList.add('hidden');
};

const openModal = () => {
  photoModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const closeModal = () => {
  photoModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const handleGalleryImageClick = (evt, photos) => {
  const currentElement = evt.target;
  if (currentElement.classList.contains('picture__img')) {
    evt.preventDefault();

    createFullPhoto(Number(currentElement.dataset.imageId), photos);

    openModal();
  }
};

const handleCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const handleCloseButtonKeydown = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeModal();
  }
};

export const managePhotoModal = (photos) => {
  document.addEventListener('click', (evt) => handleGalleryImageClick(evt, photos));
  photoModalCloseButton.addEventListener('click', handleCloseButtonClick);
  document.addEventListener('keydown', handleCloseButtonKeydown);
};
