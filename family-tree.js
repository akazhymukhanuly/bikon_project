(function () {
  var DEFAULT_LANGUAGE = "ru";
  var PLACEHOLDER_PHOTO = "assets/family-member-placeholder.svg";
  var DEFAULT_UI = {
    ru: {
      pageTitle: "Родословная семьи",
      back: "Открыть полную страницу шежіре",
      eyebrow: "Шежіре",
      title: "Родословное древо семьи",
      lead: "Здесь показаны дедушка, бабушка и все ветви потомков по семейным линиям.",
      note: "Если в JSON нет служебного блока ui, дерево всё равно строится по доступным данным.",
      searchLabel: "Поиск по имени",
      searchPlaceholder: "Введите имя или ветвь",
      branchesEyebrow: "Ветви рода",
      branchesTitle: "Потомки по семейным линиям",
      statsChildren: "детей",
      statsGrandchildren: "внуков",
      statsGreatGrandchildren: "правнуков",
      statsAllDescendants: "всего потомков",
      empty: "Поиск ничего не нашел."
    },
    kz: {
      pageTitle: "Отбасы шежіресі",
      back: "Шежіренің толық бетіне өту",
      eyebrow: "Шежіре",
      title: "Отбасының шежіре ағашы",
      lead: "Мұнда ата, әже және ұрпақтардың барлық тармақтары көрсетілген.",
      note: "JSON ішінде ui блогы болмаса да, ағаш бар деректер бойынша құрылады.",
      searchLabel: "Аты бойынша іздеу",
      searchPlaceholder: "Атын немесе тармағын енгізіңіз",
      branchesEyebrow: "Әулет тармақтары",
      branchesTitle: "Отбасылық тармақтар бойынша ұрпақтар",
      statsChildren: "баласы",
      statsGrandchildren: "немересі",
      statsGreatGrandchildren: "шөбересі",
      statsAllDescendants: "барлық ұрпақ",
      empty: "Іздеу бойынша ештеңе табылмады."
    }
  };
  var state = {
    language: getInitialLanguage(),
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

  if (!pageNodes.container || !pageNodes.stats) {
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
    window.addEventListener("resize", drawConnectors);
  }).catch(function (error) {
    console.error(error);
    pageNodes.container.innerHTML = "<p>Не удалось загрузить дерево семьи.</p>";
  });

  function bindEvents() {
    window.addEventListener("grandpa-language-change", function (event) {
      var nextLanguage = event && event.detail && event.detail.language;
      if (!treeData || !isSupportedLanguage(nextLanguage) || nextLanguage === state.language) {
        return;
      }

      state.language = nextLanguage;
      renderPage();
    });

    languageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var nextLanguage = button.dataset.treeLang;
        if (!isSupportedLanguage(nextLanguage) || nextLanguage === state.language) {
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
    var ui = getUi();
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
    hideLegacyRootSection();
    renderTree();
  }

  function renderStats() {
    var ui = getUi();
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

  function renderTree() {
    var rootNode = buildRootNode();
    var filteredRoot = filterTree(rootNode, state.filter);

    if (!filteredRoot) {
      filteredRoot = buildRootNode();
    }

    annotateLayout(filteredRoot, 0, 1);
    var levels = collectLevels(filteredRoot);
    if (pageNodes.empty) {
      var hasVisibleDescendants = filteredRoot.children && filteredRoot.children.length > 0;
      pageNodes.empty.hidden = hasVisibleDescendants;
      pageNodes.empty.textContent = getUi().empty;
    }

    pageNodes.container.innerHTML = [
      "<div class=\"pedigree-chart\">",
      "<div class=\"pedigree-stage\" style=\"--tree-columns:" + filteredRoot._span + ";\">",
      "<svg class=\"pedigree-lines\" aria-hidden=\"true\"></svg>",
      levels.map(function (nodes, rowIndex) {
        return renderRow(nodes, rowIndex);
      }).join(""),
      "</div>",
      "</div>"
    ].join("");

    requestAnimationFrame(drawConnectors);
  }

  function buildRootNode() {
    return {
      id: "family-root",
      name: treeData.family.grandfather.name,
      subtitle: {
        ru: "Родоначальник",
        kz: "Әулет бастауы"
      },
      note: treeData.family.grandfather.note,
      years: treeData.family.grandfather.years,
      photo: treeData.family.grandfather.photo,
      spouse: treeData.family.grandmother ? treeData.family.grandmother.name : null,
      children: treeData.family.children || []
    };
  }

  function filterTree(node, query) {
    var filteredChildren = (node.children || []).map(function (child) {
      return filterTree(child, query);
    }).filter(Boolean);

    if (!query) {
      return cloneNode(node, filteredChildren);
    }

    if (matchesNode(node, query) || filteredChildren.length) {
      return cloneNode(node, filteredChildren);
    }

    return null;
  }

  function cloneNode(node, children) {
    return {
      id: node.id,
      name: node.name,
      subtitle: node.subtitle,
      note: node.note,
      years: node.years,
      photo: node.photo,
      spouse: node.spouse,
      children: children
    };
  }

  function annotateLayout(node, depth, start) {
    node._depth = depth;
    node._start = start;

    if (!node.children || !node.children.length) {
      node._span = 1;
      return start + 1;
    }

    var nextStart = start;
    node.children.forEach(function (child) {
      nextStart = annotateLayout(child, depth + 1, nextStart);
    });

    node._span = nextStart - start;
    return nextStart;
  }

  function collectLevels(rootNode) {
    var levels = [];

    walk(rootNode, function (node) {
      if (!levels[node._depth]) {
        levels[node._depth] = [];
      }
      levels[node._depth].push(node);
    });

    return levels;
  }

  function walk(node, visitor) {
    visitor(node);
    (node.children || []).forEach(function (child) {
      walk(child, visitor);
    });
  }

  function getUi() {
    var source = treeData && treeData.ui && treeData.ui[state.language];
    var fallback = DEFAULT_UI[state.language] || DEFAULT_UI[DEFAULT_LANGUAGE];
    return Object.assign({}, fallback, source || {});
  }

  function renderRow(nodes, depth) {
    return [
      "<div class=\"pedigree-row\" data-depth=\"" + depth + "\">",
      nodes.map(function (node) {
        return renderCard(node);
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderCard(node) {
    var title = localized(node.name);
    var note = localized(node.note);
    var subtitle = localized(node.subtitle);
    var spouse = localized(node.spouse);
    var photo = localized(node.photo) || PLACEHOLDER_PHOTO;
    var cardClass = node.id === "family-root" ? "pedigree-card pedigree-card-root" : "pedigree-card";

    return [
      "<article class=\"" + cardClass + "\" data-node-id=\"" + escapeHtml(node.id) + "\" style=\"grid-column:" + node._start + " / span " + node._span + ";\">",
      "<div class=\"pedigree-card-shell\">",
      "<img class=\"pedigree-card-photo\" src=\"" + escapeHtml(photo) + "\" alt=\"" + escapeHtml(title) + "\" loading=\"lazy\">",
      "<div class=\"pedigree-card-copy\">",
      subtitle ? "<span class=\"tree-node-badge\">" + escapeHtml(subtitle) + "</span>" : "",
      "<h3 class=\"tree-node-title\">" + escapeHtml(title) + "</h3>",
      node.years ? "<div class=\"tree-node-meta\">" + escapeHtml(node.years) + "</div>" : "",
      spouse ? "<div class=\"pedigree-card-spouse\">" + escapeHtml(spouse) + "</div>" : "",
      note ? "<p class=\"tree-node-note\">" + escapeHtml(note) + "</p>" : "",
      "</div>",
      "</div>",
      "</article>"
    ].join("");
  }

  function drawConnectors() {
    var stage = pageNodes.container.querySelector(".pedigree-stage");
    var svg = pageNodes.container.querySelector(".pedigree-lines");

    if (!stage || !svg) {
      return;
    }

    var boxes = {};
    Array.from(stage.querySelectorAll("[data-node-id]")).forEach(function (node) {
      boxes[node.dataset.nodeId] = measureBox(node, stage);
    });

    var width = Math.ceil(stage.scrollWidth);
    var height = Math.ceil(stage.scrollHeight);

    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));

    var lines = [];
    var filteredRoot = filterTree(buildRootNode(), state.filter) || buildRootNode();

    walk(filteredRoot, function (node) {
      (node.children || []).forEach(function (child) {
        var parentBox = boxes[node.id];
        var childBox = boxes[child.id];

        if (!parentBox || !childBox) {
          return;
        }

        var parentX = parentBox.left + parentBox.width / 2;
        var parentY = parentBox.top + parentBox.height;
        var childX = childBox.left + childBox.width / 2;
        var childY = childBox.top;
        var middleY = parentY + ((childY - parentY) / 2);

        lines.push(
          "<path d=\"M " + parentX + " " + parentY + " V " + middleY + " H " + childX + " V " + childY + "\" />"
        );
      });
    });

    svg.innerHTML = lines.join("");
  }

  function measureBox(element, stage) {
    var elementRect = element.getBoundingClientRect();
    var stageRect = stage.getBoundingClientRect();

    return {
      left: elementRect.left - stageRect.left,
      top: elementRect.top - stageRect.top,
      width: elementRect.width,
      height: elementRect.height
    };
  }

  function hideLegacyRootSection() {
    if (pageNodes.root && pageNodes.root.parentElement) {
      pageNodes.root.parentElement.hidden = true;
    }
  }

  function matchesNode(node, query) {
    var haystack = [
      localized(node.name),
      localized(node.note),
      localized(node.subtitle),
      localized(node.spouse)
    ].join(" ").toLowerCase();

    return haystack.indexOf(query) !== -1;
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

  function getInitialLanguage() {
    var lang = String(document.documentElement.lang || "").toLowerCase();
    if (lang === "kk" || lang === "kz") {
      return "kz";
    }
    return DEFAULT_LANGUAGE;
  }

  function isSupportedLanguage(value) {
    return value === "ru" || value === "kz";
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
