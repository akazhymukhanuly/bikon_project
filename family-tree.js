(function () {
  var DEFAULT_LANGUAGE = "ru";
  var PLACEHOLDER_PHOTO = "assets/family-member-placeholder.svg";
  var state = {
    language: DEFAULT_LANGUAGE,
    filter: ""
  };

  var pageNodes = {
    back: document.getElementById("tree-back-link"),
    eyebrow: document.getElementById("tree-eyebrow"),
    title: document.getElementById("tree-title"),
    lead: document.getElementById("tree-lead"),
    note: document.getElementById("tree-note"),
    searchLabel: document.getElementById("tree-search-label"),
    searchInput: document.getElementById("tree-search-input"),
    expandAll: document.getElementById("tree-expand-all"),
    collapseAll: document.getElementById("tree-collapse-all"),
    branchesEyebrow: document.getElementById("tree-branches-eyebrow"),
    branchesTitle: document.getElementById("tree-branches-title"),
    stats: document.getElementById("tree-stats"),
    root: document.getElementById("tree-root-card"),
    container: document.getElementById("tree-container"),
    empty: document.getElementById("tree-empty")
  };

  var languageButtons = Array.from(document.querySelectorAll("[data-tree-lang]"));
  var treeData = null;
  var isStandalonePage = document.body.classList.contains("tree-page");

  if (!pageNodes.container || !pageNodes.root || !pageNodes.stats) {
    return;
  }

  fetch("family-tree.json?ts=" + Date.now(), {
    method: "GET",
    cache: "no-store"
  }).then(function (response) {
    if (!response.ok) {
      throw new Error("family-tree.json load failed");
    }

    return response.json();
  }).then(function (payload) {
    treeData = payload;
    bindEvents();
    renderPage();
  }).catch(function (error) {
    console.error(error);
    pageNodes.container.innerHTML = "<p>Не удалось загрузить дерево семьи.</p>";
  });

  function bindEvents() {
    languageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var nextLanguage = button.dataset.treeLang;
        if (nextLanguage === state.language) {
          return;
        }

        state.language = nextLanguage;
        renderPage();
      });
    });

    if (pageNodes.searchInput) {
      pageNodes.searchInput.addEventListener("input", function () {
        state.filter = String(pageNodes.searchInput.value || "").trim().toLowerCase();
        renderTree();
      });
    }

    if (pageNodes.expandAll) {
      pageNodes.expandAll.hidden = true;
    }

    if (pageNodes.collapseAll) {
      pageNodes.collapseAll.hidden = true;
    }
  }

  function renderPage() {
    var ui = treeData.ui[state.language];
    document.documentElement.lang = state.language === "kz" ? "kk" : "ru";

    if (isStandalonePage) {
      document.title = ui.pageTitle;
    }

    setText(pageNodes.back, ui.back);
    setText(pageNodes.eyebrow, ui.eyebrow);
    setText(pageNodes.title, ui.title);
    setText(pageNodes.lead, ui.lead);
    setText(pageNodes.note, ui.note);
    setText(pageNodes.searchLabel, ui.searchLabel);
    setPlaceholder(pageNodes.searchInput, ui.searchPlaceholder);
    setText(pageNodes.branchesEyebrow, ui.branchesEyebrow);
    setText(pageNodes.branchesTitle, ui.branchesTitle);

    languageButtons.forEach(function (button) {
      var active = button.dataset.treeLang === state.language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    renderStats();
    renderRoot();
    renderTree();
  }

  function renderStats() {
    var ui = treeData.ui[state.language];
    var counts = countGenerations(treeData.family.children, 1, {});
    var childrenCount = treeData.family.children.length;
    var grandchildrenCount = counts[2] || 0;
    var greatGrandchildrenCount = counts[3] || 0;
    var allDescendants = countAll(treeData.family.children);

    pageNodes.stats.innerHTML = [
      statCard(childrenCount, ui.statsChildren),
      statCard(grandchildrenCount, ui.statsGrandchildren),
      statCard(greatGrandchildrenCount, ui.statsGreatGrandchildren),
      statCard(allDescendants, ui.statsAllDescendants)
    ].join("");
  }

  function renderRoot() {
    var ui = treeData.ui[state.language];
    var family = treeData.family;

    pageNodes.root.innerHTML = [
      rootPersonCard(family.grandfather, ui.grandfatherLabel),
      rootPersonCard(family.grandmother, ui.grandmotherLabel)
    ].join("");
  }

  function renderTree() {
    var visibleChildren = treeData.family.children.filter(function (child) {
      return matchesNodeOrDescendant(child, state.filter);
    });

    if (pageNodes.empty) {
      pageNodes.empty.hidden = visibleChildren.length > 0;
      pageNodes.empty.textContent = treeData.ui[state.language].empty;
    }

    pageNodes.container.innerHTML = "<ul class=\"tree-level tree-level-root\">" + visibleChildren.map(function (child) {
      return renderNode(child, 0);
    }).join("") + "</ul>";
  }

  function renderNode(node, depth) {
    var ui = treeData.ui[state.language];
    var children = (node.children || []).filter(function (child) {
      return matchesNodeOrDescendant(child, state.filter);
    });
    var title = localized(node.name);
    var note = localized(node.note);
    var subtitle = localized(node.subtitle);
    var photo = localized(node.photo) || PLACEHOLDER_PHOTO;
    var childCount = countAll(node.children || []);
    var childLabel = childCount === 1 ? ui.descendantSingle : ui.descendantPlural;

    return [
      "<li class=\"tree-node\">",
      "<article class=\"tree-person-card\" data-depth=\"" + depth + "\">",
      "<div class=\"tree-person-top\">",
      "<img class=\"tree-person-photo\" src=\"" + escapeHtml(photo) + "\" alt=\"" + escapeHtml(title) + "\" loading=\"lazy\">",
      "<div class=\"tree-person-copy\">",
      "<span class=\"tree-node-badge\">" + escapeHtml(subtitle || generationLabel(depth, ui)) + "</span>",
      "<h3 class=\"tree-node-title\">" + escapeHtml(title) + "</h3>",
      node.years ? "<div class=\"tree-node-meta\">" + escapeHtml(node.years) + "</div>" : "",
      "</div>",
      "</div>",
      note ? "<p class=\"tree-node-note\">" + escapeHtml(note) + "</p>" : "<p class=\"tree-node-note\">" + escapeHtml(ui.emptyBranch) + "</p>",
      "<div class=\"tree-node-footer\">",
      "<span class=\"tree-node-count\">" + childCount + " " + escapeHtml(childLabel) + "</span>",
      "</div>",
      "</article>",
      children.length ? "<ul class=\"tree-level tree-level-children\">" + children.map(function (child) {
        return renderNode(child, depth + 1);
      }).join("") + "</ul>" : "",
      "</li>"
    ].join("");
  }

  function generationLabel(depth, ui) {
    if (depth === 0) {
      return ui.generationChild;
    }
    if (depth === 1) {
      return ui.generationGrandchild;
    }
    if (depth === 2) {
      return ui.generationGreatGrandchild;
    }
    return ui.generationNext;
  }

  function rootPersonCard(person, label) {
    var name = localized(person.name);
    var photo = localized(person.photo) || PLACEHOLDER_PHOTO;

    return [
      "<article class=\"tree-root-person\">",
      "<img class=\"tree-root-photo\" src=\"" + escapeHtml(photo) + "\" alt=\"" + escapeHtml(name) + "\" loading=\"lazy\">",
      "<div class=\"tree-root-copy\">",
      "<span class=\"tree-node-badge\">" + escapeHtml(label) + "</span>",
      "<h3>" + escapeHtml(name) + "</h3>",
      person.years ? "<p class=\"tree-node-meta\">" + escapeHtml(person.years) + "</p>" : "",
      person.note ? "<p>" + escapeHtml(localized(person.note)) + "</p>" : "",
      "</div>",
      "</article>"
    ].join("");
  }

  function statCard(value, label) {
    return "<article><strong>" + value + "</strong><span>" + escapeHtml(label) + "</span></article>";
  }

  function localized(value) {
    if (!value) {
      return "";
    }
    if (typeof value === "string") {
      return value;
    }
    return value[state.language] || value.ru || "";
  }

  function countAll(nodes) {
    return (nodes || []).reduce(function (total, node) {
      return total + 1 + countAll(node.children || []);
    }, 0);
  }

  function countGenerations(nodes, depth, map) {
    return (nodes || []).reduce(function (acc, node) {
      acc[depth] = (acc[depth] || 0) + 1;
      return countGenerations(node.children || [], depth + 1, acc);
    }, map);
  }

  function matchesNodeOrDescendant(node, query) {
    if (!query) {
      return true;
    }

    var haystack = [
      localized(node.name),
      localized(node.note),
      localized(node.subtitle)
    ].join(" ").toLowerCase();

    if (haystack.indexOf(query) !== -1) {
      return true;
    }

    return (node.children || []).some(function (child) {
      return matchesNodeOrDescendant(child, query);
    });
  }

  function setText(node, value) {
    if (node) {
      node.textContent = value;
    }
  }

  function setPlaceholder(node, value) {
    if (node) {
      node.placeholder = value;
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
