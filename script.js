const serviceNameInput   = document.querySelector('#service-name');
const categorySelect     = document.querySelector('#service-category');
const addBtn             = document.querySelector('#add-btn');
const clearFormBtn       = document.querySelector('#clear-form-btn');
const validationMsg      = document.querySelector('#validation-msg');

const servicesContainer  = document.querySelector('#services-container');
const totalCount         = document.querySelector('#total-count');
const emptyMsg           = document.querySelector('#empty-msg');

const toggleThemeBtn     = document.querySelector('#toggle-theme-btn');
const highlightDevBtn    = document.querySelector('#highlight-dev-btn');
const showFavoritesBtn   = document.querySelector('#show-favorites-btn');
const showAllBtn         = document.querySelector('#show-all-btn');

const demoFillBtn        = document.querySelector('#demo-fill-btn');

function updateCounter() {
  //ПОЧЕМУ? Использую метод querySelectorAll, чтобы найти элементы по классу '.service-card'
  const cards = servicesContainer.querySelectorAll('.service-card');
  //ПОЧЕМУ? Использую textContent для защиты от XSS (внедрения вредоносного кода)
  totalCount.textContent = cards.length;
}

function toggleEmptyMessage() {
  const cards = servicesContainer.querySelectorAll('.service-card');
  if (cards.length === 0) {
    //ПОЧЕМУ? style.display напрямую меняет CSS-свойство элемента.
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
  }
}

function validateInput(title) {
  if (title.trim().length < 3) {
    //ПОЧЕМУ? Использую textContent для защиты от XSS-атак (чтобы пользователь не смог внедрить вредоносный код)
    validationMsg.textContent = 'Название должно содержать не менее 3 символов';
    return false;
  } else {
    validationMsg.textContent = '';
    return true;
  }
}

function createCardElement(cardData) {
  // // ПОЧЕМУ? createElement безопасно создает новый DOM-узел
  const card = document.createElement('div');
  // // ПОЧЕМУ? classList.add удобен для безопасного добавления классов
  card.classList.add('service-card');
  card.dataset.id = cardData.id; 
  card.dataset.category = cardData.category;

  const titleEl = document.createElement('h3');
  // // ПОЧЕМУ? textContent безопасен для вставки текста
  titleEl.textContent = cardData.title;

  const categoryEl = document.createElement('span');
  categoryEl.classList.add('category-badge');
  categoryEl.textContent = cardData.category;

  const actionsEl = document.createElement('div');
  actionsEl.classList.add('card-actions');

  const favoriteBtn = document.createElement('button');
  favoriteBtn.classList.add('btn-secondary'); 
  favoriteBtn.textContent = '☆ В избранное';

  favoriteBtn.addEventListener('click', () => {
    
    if (favoriteBtn.classList.contains('btn-secondary')) {
      favoriteBtn.classList.remove('btn-secondary'); 
      favoriteBtn.textContent = '★ Избранное';     
      
    } else {
      
      favoriteBtn.classList.add('btn-secondary');   
      favoriteBtn.textContent = '☆ В избранное';     
    }
      
  });
  
  const deleteBtn = document.createElement('button');
  deleteBtn.addEventListener('click', () => {
    if (!confirm('Точно удалить карточку?')) {
      return; 
    }
    // ПОЧЕМУ? Метод remove() полностью удаляет этот DOM-узел со страницы
    card.remove();
    updateCounter();
    toggleEmptyMessage();
  });
  deleteBtn.classList.add('btn-danger');
  deleteBtn.textContent = 'Удалить';

  actionsEl.append(favoriteBtn, deleteBtn);
  // ПОЧЕМУ? append позволяет вставить несколько элементов за один вызов
  card.append(titleEl, categoryEl, actionsEl);
  return card;    
}

addBtn.addEventListener('click', () => {
  const titleValue = serviceNameInput.value.trim();
  const categoryValue = categorySelect.value;
  if (!validateInput(titleValue)) {
    return;
  }
  const cardData = {
    id: Date.now(),
    title: titleValue,
    category: categoryValue
  };
  const cardElement = createCardElement(cardData);
  // ПОЧЕМУ? appendChild безопасно вставляет созданную карточку в конец списка.
  servicesContainer.appendChild(cardElement);
  serviceNameInput.value = '';
  updateCounter();
  toggleEmptyMessage();
});


clearFormBtn.addEventListener('click', () => {
  serviceNameInput.value = '';
  categorySelect.value = 'design';
  validationMsg.textContent = '';
});

toggleThemeBtn.addEventListener('click', () => {
  // ПОЧЕМУ? toggle позволяет переключать класс без лишних условий
  document.body.classList.toggle('dark-mode');
});

highlightDevBtn.addEventListener('click', () => {
  const allCards = servicesContainer.querySelectorAll('.service-card');
  allCards.forEach(card => {
    if (card.dataset.category === 'dev') {
      // ПОЧЕМУ? classList.add добавляет класс подсветки, не удаляя старые классы
      card.classList.add('highlight');
    }
  });
});

showFavoritesBtn.addEventListener('click', () => {
  const allCards = servicesContainer.querySelectorAll('.service-card');
  allCards.forEach(card => {
    if (!card.classList.contains('highlight')) {
      // ПОЧЕМУ? classList.add('hidden') скрывает карточки, не удаляя их из DOM
      card.classList.add('hidden');
    } else {
      card.classList.remove('hidden');
    } 
});
});
showAllBtn.addEventListener('click', () => {
  const allCards = servicesContainer.querySelectorAll('.service-card');
  allCards.forEach(card => {
    // ПОЧЕМУ? classList.remove('hidden') показывает все карточки, не удаляя их из DOM
    card.classList.remove('hidden');
  });
});
