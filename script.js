(function () {
  var STORAGE_KEY = "grandpa-landing-editor-v1";
  var TEXT_SELECTOR = "h1, h2, h3, p, dt, dd, figcaption, .portrait-note span, .portrait-note strong";
  var IMAGE_SELECTOR = "main img";

  var settingsToggle = document.getElementById("toggle-settings");
  var settingsPanel = document.getElementById("editor-toolbar");
  var settingsClose = document.getElementById("close-settings");
  var toggleButton = document.getElementById("toggle-edit");
  var exportButton = document.getElementById("export-content");
  var importButton = document.getElementById("import-content");
  var resetButton = document.getElementById("reset-content");
  var statusNode = document.getElementById("editor-status");
  var imageUpload = document.getElementById("image-upload");
  var importInput = document.getElementById("content-import");

  if (!settingsToggle || !settingsPanel || !settingsClose || !toggleButton || !statusNode || !imageUpload || !importInput) {
    return;
  }

  var isEditMode = false;
  var activeImage = null;
  var state = loadState();

  var editableTexts = Array.from(document.querySelectorAll(TEXT_SELECTOR)).filter(function (node) {
    return !node.closest("[data-editor-ui]");
  });

  var editableImages = Array.from(document.querySelectorAll(IMAGE_SELECTOR)).filter(function (node) {
    return !node.closest("[data-editor-ui]");
  });

  editableTexts.forEach(function (node, index) {
    var key = "text-" + index;
    node.dataset.editorKey = key;
    node.dataset.originalHtml = node.innerHTML;
    node.spellcheck = false;
    node.setAttribute("data-editor-editable", "true");
  });

  editableImages.forEach(function (node, index) {
    var key = "image-" + index;
    node.dataset.editorImageKey = key;
    node.dataset.originalSrc = node.getAttribute("src") || "";
    node.setAttribute("data-editor-image", "true");
  });

  applyState(state);

  settingsToggle.addEventListener("click", function () {
    setSettingsOpen(settingsPanel.hidden);
  });

  settingsClose.addEventListener("click", function () {
    setSettingsOpen(false);
  });

  toggleButton.addEventListener("click", function () {
    setEditMode(!isEditMode);
  });

  exportButton.addEventListener("click", function () {
    persistState();

    var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "grandpa-landing-content.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Изменения экспортированы");
  });

  importButton.addEventListener("click", function () {
    importInput.click();
  });

  importInput.addEventListener("change", function (event) {
    var file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function (loadEvent) {
      try {
        var importedState = JSON.parse(String(loadEvent.target && loadEvent.target.result || "{}"));
        state = normalizeState(importedState);
        applyState(state);
        persistState();
        setStatus("Изменения импортированы");
      } catch (error) {
        setStatus("Не удалось импортировать JSON");
      } finally {
        importInput.value = "";
      }
    };
    reader.readAsText(file, "utf-8");
  });

  resetButton.addEventListener("click", function () {
    var confirmed = window.confirm("Сбросить все локальные изменения на этой странице?");
    if (!confirmed) {
      return;
    }

    state = { texts: {}, images: {} };
    editableTexts.forEach(function (node) {
      node.innerHTML = node.dataset.originalHtml || "";
    });
    editableImages.forEach(function (node) {
      node.src = node.dataset.originalSrc || "";
    });
    saveState(state);
    setStatus("Все изменения сброшены");
  });

  editableTexts.forEach(function (node) {
    node.addEventListener("input", function () {
      if (!isEditMode) {
        return;
      }

      state.texts[node.dataset.editorKey] = node.innerHTML;
      persistState();
      setStatus("Изменения сохранены в браузере");
    });
  });

  editableImages.forEach(function (node) {
    node.addEventListener("click", function () {
      if (!isEditMode) {
        return;
      }

      activeImage = node;
      imageUpload.click();
    });
  });

  imageUpload.addEventListener("change", function (event) {
    var file = event.target.files && event.target.files[0];
    if (!file || !activeImage) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function (loadEvent) {
      var result = String(loadEvent.target && loadEvent.target.result || "");
      if (!result) {
        setStatus("Не удалось загрузить изображение");
        return;
      }

      activeImage.src = result;
      state.images[activeImage.dataset.editorImageKey] = result;
      persistState();
      setStatus("Фото обновлено");
      imageUpload.value = "";
    };
    reader.readAsDataURL(file);
  });

  setEditMode(false);
  setSettingsOpen(false);

  function setEditMode(nextValue) {
    isEditMode = nextValue;
    document.body.classList.toggle("edit-mode", isEditMode);
    toggleButton.textContent = isEditMode ? "Выключить редактирование" : "Включить редактирование";

    editableTexts.forEach(function (node) {
      node.contentEditable = isEditMode ? "true" : "false";
    });

    setStatus(isEditMode ? "Режим редактирования включен" : "Режим просмотра");
  }

  function setSettingsOpen(nextValue) {
    settingsPanel.hidden = !nextValue;
    settingsToggle.setAttribute("aria-expanded", nextValue ? "true" : "false");
  }

  function applyState(nextState) {
    editableTexts.forEach(function (node) {
      var key = node.dataset.editorKey;
      if (Object.prototype.hasOwnProperty.call(nextState.texts, key)) {
        node.innerHTML = nextState.texts[key];
      }
    });

    editableImages.forEach(function (node) {
      var key = node.dataset.editorImageKey;
      if (Object.prototype.hasOwnProperty.call(nextState.images, key)) {
        node.src = nextState.images[key];
      }
    });
  }

  function normalizeState(rawState) {
    return {
      texts: rawState && rawState.texts && typeof rawState.texts === "object" ? rawState.texts : {},
      images: rawState && rawState.images && typeof rawState.images === "object" ? rawState.images : {}
    };
  }

  function loadState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? normalizeState(JSON.parse(raw)) : { texts: {}, images: {} };
    } catch (error) {
      return { texts: {}, images: {} };
    }
  }

  function saveState(nextState) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch (error) {
      setStatus("Браузер не дал сохранить изменения локально");
    }
  }

  function persistState() {
    editableTexts.forEach(function (node) {
      state.texts[node.dataset.editorKey] = node.innerHTML;
    });
    editableImages.forEach(function (node) {
      state.images[node.dataset.editorImageKey] = node.src;
    });
    saveState(state);
  }

  function setStatus(message) {
    statusNode.textContent = message;
  }
})();
