const catalogItems = document.querySelectorAll('.catalog-item');
const showHiddenCheckbox = document.querySelector('.catalog-sort_hide-checkbox');
const showAllButton = document.querySelector(".catalog-sort__sort-button.all");
const showFavouriteButton = document.querySelector(".catalog-sort__sort-button.favourite");
const showComparisonButton = document.querySelector(".catalog-sort__sort-button.comparison");

const favouriteItems = [];
const comparisonItems = [];
const hiddenItems = [];

function toggleShowButtons(all, favourite, comparison) {
  showAllButton.classList.remove('active');
  showFavouriteButton.classList.remove('active');
  showComparisonButton.classList.remove('active');

  if (all) {
    showAllButton.classList.toggle('active');
  }
  if (favourite) {
    showFavouriteButton.classList.toggle('active');
  }
  if (comparison) {
    showComparisonButton.classList.toggle('active');
  }
}

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
  if (showFavouriteButton.classList.contains('active')) {
    showHiddenFavourite();
  } else if (showComparisonButton.classList.contains('active')) {
    showHiddenComparison();
  } else if (showAllButton.classList.contains('active')) {
    showHiddenAll();
  }
}

function showAll() {
  toggleShowButtons(true, false, false);
  catalogItems.forEach(function (catalogItem) {
    catalogItem.style.display = 'flex';
    showHiddenAll();
  });
}

function showComparison() {
  toggleShowButtons(false, false, true);
  catalogItems.forEach(function (catalogItem) {
    if (catalogItem.classList.contains('comparison')) {
      catalogItem.style.display = 'flex';
      showHiddenComparison();
    } else {
      catalogItem.style.display = 'none';
    }
  });
}

function showFavourite() {
  toggleShowButtons(false, true, false);
  catalogItems.forEach(function (catalogItem) {
    if (catalogItem.classList.contains('favourite')) {
      catalogItem.style.display = 'flex';
      showHiddenFavourite();
    } else {
      catalogItem.style.display = 'none';
    }
  });
}

showHiddenCheckbox.addEventListener('change', function () {
  showHidden();
});

showAllButton.addEventListener('click', function () {
  showAll();
});

showComparisonButton.addEventListener('click', function () {
  showComparison();
});

showFavouriteButton.addEventListener('click', function () {
  showFavourite();
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


