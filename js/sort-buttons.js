const catalogItems = document.querySelectorAll('.catalog-item');
const showHiddenCheckbox = document.querySelector('.catalog-sort_hide-checkbox');

const catalogSort = document.querySelector(".catalog-sort");

const favouriteItems = [];
const comparisonItems = [];
const hiddenItems = [];

catalogSort.addEventListener('click', function (e) {
  var target = e.target;
  if (target.classList.contains('catalog-sort__sort-button') && !target.classList.contains('active')) {
    document.querySelectorAll('.catalog-sort__sort-button').forEach(function (button) {
      if (button.dataset.filter == target.dataset.filter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  catalogItems.forEach(function (catalogItem) {
    switch (target.dataset.filter) {
      case 'all':
        catalogItem.style.display = 'flex';
        showHiddenAll();
        break;
      case 'favourite':
        if (catalogItem.classList.contains('favourite')) {
          catalogItem.style.display = 'flex';
          showHiddenFavourite();
        } else {
          catalogItem.style.display = 'none';
        }
        break;
      case 'comparison':
        if (catalogItem.classList.contains('comparison')) {
          catalogItem.style.display = 'flex';
          showHiddenComparison();
        } else {
          catalogItem.style.display = 'none';
        }
        break;

    }

  });
});


function showHiddenComparison() {
  if (showHiddenCheckbox.checked) {
    hiddenItems.forEach(function (hiddenItem) {
      if (hiddenItem.classList.contains('comparison')) {
        hiddenItem.style.display = 'flex';
      }
    });
  } else {
    hiddenItems.forEach(function (hiddenItem) {
      hiddenItem.style.display = 'none';
    });
  }
}

function showHiddenFavourite() {
  if (showHiddenCheckbox.checked) {
    hiddenItems.forEach(function (hiddenItem) {
      if (hiddenItem.classList.contains('favourite')) {
        hiddenItem.style.display = 'flex';
      }
    });
  } else {
    hiddenItems.forEach(function (hiddenItem) {
      hiddenItem.style.display = 'none';
    });
  }
}

function showHiddenAll() {
  if (showHiddenCheckbox.checked) {
    hiddenItems.forEach(function (hiddenItem) {
      hiddenItem.style.display = 'flex';
    });
  } else {
    hiddenItems.forEach(function (hiddenItem) {
      hiddenItem.style.display = 'none';
    });
  }
}

function showHidden() {
  const showAllButton = document.querySelector(".catalog-sort__sort-button.all");
  const showFavouriteButton = document.querySelector(".catalog-sort__sort-button.favourite");
  const showComparisonButton = document.querySelector(".catalog-sort__sort-button.comparison");
  if (showFavouriteButton.classList.contains('active')) {
    showHiddenFavourite();
  } else if (showComparisonButton.classList.contains('active')) {
    showHiddenComparison();
  } else if (showAllButton.classList.contains('active')) {
    showHiddenAll();
  }
}


showHiddenCheckbox.addEventListener('change', function () {
  showHidden();
});


catalogItems.forEach(function (catalogItem) {
  const hideButton = catalogItem.querySelector('.catalog-item__hover-button.hide');
  const favouriteButton = catalogItem.querySelector('.catalog-item__hover-button.favourite');
  const comparisonButton = catalogItem.querySelector('.catalog-item__hover-button.comparison');


  hideButton.addEventListener('click', function () {
    toggleHide(catalogItem, hideButton);
  });

  favouriteButton.addEventListener('click', function () {
    toggleFavourite(catalogItem, favouriteButton);
  });

  comparisonButton.addEventListener('click', function () {
    toggleComparison(catalogItem, comparisonButton);
  });

});

function toggleHide(tile, hideButton) {
  tile.classList.toggle('hidden');

  if (tile.classList.contains('hidden')) {
    if (!showHiddenCheckbox.checked) {
      tile.style.display = 'none';
    }
    tile.style.opacity = '0.5';
    hiddenItems.push(tile);
    hideButton.classList.add('active');
  } else {
    tile.style.opacity = '1';
    hideButton.classList.remove('active');
    hiddenItems.splice(hiddenItems.indexOf(tile), 1);
  }
}

function toggleFavourite(tile, button) {
  tile.classList.toggle('favourite');
  button.classList.toggle('active');

  if (tile.classList.contains('favourite')) {
    favouriteItems.push(tile);
  } else {
    favouriteItems.splice(favouriteItems.indexOf(tile), 1);
  }
}

function toggleComparison(tile, button) {
  tile.classList.toggle('comparison');
  button.classList.toggle('active');

  if (tile.classList.contains('comparison')) {
    comparisonItems.push(tile);
  } else {
    comparisonItems.splice(comparisonItems.indexOf(tile), 1);
  }
}

function saveHiddenItems() {
  var hiddenIds = Array.from(hiddenItems).map(function (element) {
    return element.id;
  });
  localStorage.setItem('hiddenItems', JSON.stringify(hiddenIds));
}

function saveFavouriteItems() {
  var favouriteIds = Array.from(favouriteItems).map(function (element) {
    return element.id;
  });
  localStorage.setItem('favouriteItems', JSON.stringify(favouriteIds));
}

function saveComparisonItems() {
  var comparisonIds = Array.from(comparisonItems).map(function (element) {
    return element.id;
  });
  localStorage.setItem('comparisonItems', JSON.stringify(comparisonIds));
}

function loadHiddenItems() {
  var hiddenIds = JSON.parse(localStorage.getItem('hiddenItems')) || [];
  hiddenIds.forEach(function (id) {
    var element = document.getElementById(id);
    if (element) {
      var hideButton = element.querySelector('.catalog-item__hover-button.hide');
      toggleHide(element, hideButton);
    }
  });
}

function loadFavouriteItems() {
  var favouriteIds = JSON.parse(localStorage.getItem('favouriteItems')) || [];
  favouriteIds.forEach(function (id) {
    var element = document.getElementById(id);
    if (element) {
      const favouriteButton = element.querySelector('.catalog-item__hover-button.favourite');
      toggleFavourite(element, favouriteButton);
    }
  });
}

function loadComparisonItems() {
  var comparisonIds = JSON.parse(localStorage.getItem('comparisonItems')) || [];
  comparisonIds.forEach(function (id) {
    var element = document.getElementById(id);
    if (element) {
      const comparisonButton = element.querySelector('.catalog-item__hover-button.comparison');
      toggleComparison(element, comparisonButton);
    }
  });
}

window.addEventListener("unload", function () {
  saveHiddenItems();
  saveComparisonItems();
  saveFavouriteItems();
});


document.addEventListener("DOMContentLoaded", function () {
  loadHiddenItems();
  loadFavouriteItems();
  loadComparisonItems();
});


