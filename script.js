(function () {
  var STORAGE_KEY = "grandpa-landing-editor-v6";
  var IMAGE_SCHEMA_VERSION = "v3";
  var GITHUB_SETTINGS_KEY = "grandpa-landing-github-settings-v1";
  var DEFAULT_GITHUB_CONFIG = {
    owner: "akazhymukhanuly",
    repo: "beknurs_project",
    branch: "main",
    path: "content.json",
    token: ""
  };
  var DEFAULT_LANGUAGE = "ru";
  var TEXT_SELECTOR = "h1, h2, h3, p, dt, dd, figcaption, .portrait-note span, .portrait-note strong";
  var IMAGE_SELECTOR = "main img";
  var translations = {
    ru: {
      metaTitle: "Бабаш Жукенов | Семейная биография",
      metaDescription: "Лендинг-память о Бабаше Жукенове, собранный по семейным фотографиям, наградам и архивным документам.",
      brand: "Семейный архив",
      navigationAria: "Основная навигация",
      navAbout: "О жизни",
      navTimeline: "Хронология",
      navAwards: "Награды",
      navArchive: "Архив",
      languageSwitcherAria: "Переключение языка",
      settingsLauncher: "Настройки",
      editorPanelAria: "Панель редактирования",
      editorTitle: "Редактор страницы",
      editorClose: "Закрыть",
      editorCloseAria: "Скрыть настройки",
      editorExport: "Экспорт",
      editorImport: "Импорт",
      editorReset: "Сбросить",
      editorHint: "В режиме редактирования можно менять текст прямо на странице. Для замены фото нажмите на нужное изображение.",
      editorToggleOn: "Включить редактирование",
      editorToggleOff: "Выключить редактирование",
      githubSectionTitle: "Сохранение в GitHub",
      githubOwnerLabel: "Владелец",
      githubRepoLabel: "Репозиторий",
      githubBranchLabel: "Ветка",
      githubPathLabel: "Файл",
      githubTokenLabel: "GitHub token",
      githubLoad: "Загрузить из GitHub",
      githubSave: "Сохранить в GitHub",
      githubTokenHelp: "Токен нужен только для записи в репозиторий. Он хранится локально в вашем браузере на этом устройстве.",
      statusView: "Режим просмотра",
      statusEditing: "Режим редактирования включен",
      statusSaved: "Изменения сохранены в браузере",
      statusExported: "Изменения экспортированы",
      statusImported: "Изменения импортированы",
      statusImportError: "Не удалось импортировать JSON",
      statusImageError: "Не удалось загрузить изображение",
      statusImageUpdated: "Фото обновлено",
      statusReset: "Все изменения сброшены",
      statusRepoLoading: "Загрузка данных из GitHub",
      statusRepoLoaded: "Данные загружены из GitHub",
      statusRepoLoadError: "Не удалось загрузить данные из GitHub",
      statusRepoSaving: "Сохранение в GitHub",
      statusRepoSaved: "Изменения записаны в репозиторий",
      statusRepoSaveError: "Не удалось сохранить изменения в GitHub",
      statusTokenMissing: "Нужен GitHub token для записи в репозиторий",
      statusStorageError: "Браузер не дал сохранить изменения локально",
      resetConfirm: "Сбросить все локальные изменения на этой странице?",
      heroEyebrow: "Памяти человека, чья история сохранилась в документах и в семье",
      heroTitle: "Бабаш Жукенов",
      heroLead: "Этот лендинг собран по семейным фотографиям, удостоверениям и наградам. Он фиксирует путь человека поколения войны: службу, общественную работу, партийную школу, уважение современников и память, которая продолжается в роду.",
      heroCtaTimeline: "Посмотреть путь жизни",
      heroCtaArchive: "Открыть архив",
      factBirthText: "год рождения по архивным документам",
      factPartyText: "вступление в партию",
      factAwardsText: "подтвержденные юбилейные награды",
      heroPortraitAlt: "Портрет Бабаша Жукенова",
      portraitNoteLabel: "Семейная фотография",
      portraitNoteSource: "Личный архив семьи",
      aboutEyebrow: "О жизни",
      aboutTitle: "Биография, восстановленная по документам",
      aboutP1: "По сохранившимся документам видно, что Бабаш Жукенов родился в 1921 году. Его имя связано с военной эпохой и послевоенной общественной работой. В семейном архиве сохранились военный билет, партийный билет, удостоверение об окончании партийной школы и несколько наградных документов разных лет.",
      aboutP2: "Архив показывает не только официальный путь, но и человеческую сторону: строгие портреты, групповые снимки, пожелтевшие страницы удостоверений и аккуратно хранимые медали. Это история о достоинстве, служении и долгой памяти.",
      factWarTitle: "Военное поколение",
      factWarBody: "Юбилейные медали Победы подтверждают связь с Великой Отечественной войной 1941-1945 годов.",
      factPublicTitle: "Общественная работа",
      factPublicBody: "Партийные документы фиксируют вступление в ноябре 1946 года и дальнейший путь служения.",
      factEducationTitle: "Образование и признание",
      factEducationBody: "В 1951-1952 годах завершена районная вечерняя партийная школа; позднее оформлен статус персонального пенсионера.",
      memoryPortraitAlt: "Студийный портрет Бабаша Жукенова",
      memoryQuote: "Память о человеке держится не только на датах. Она живет в лицах на старых снимках, в следах печатей на документах и в уважении, с которым семья хранит его историю.",
      timelineEyebrow: "Хронология",
      timelineTitle: "Ключевые вехи жизни",
      timelineBirthTitle: "Рождение",
      timelineBirthBody: "Год рождения указан в партийном билете и других архивных материалах.",
      timelineWarTitle: "Военные годы",
      timelineWarBody: "Участие в поколении Победы подтверждается государственными юбилейными наградами к 50-летию и 60-летию Победы.",
      timelinePartyTitle: "Вступление в партию",
      timelinePartyBody: "По партийному билету дата вступления приходится на ноябрь 1946 года.",
      timelineSchoolTitle: "Партийная школа",
      timelineSchoolBody: "Сохранилось удостоверение об окончании районной вечерней партийной школы при райкоме КП(б) Казахстана.",
      timelinePensionTitle: "Персональный пенсионер",
      timelinePensionBody: "Архивное удостоверение указывает на статус персонального пенсионера союзного значения.",
      timelineAwardsTitle: "Награды и признание",
      timelineAwardsBody: "В архиве сохранились документы на юбилейные награды СССР и Республики Казахстан, а также медаль Маршала Жукова.",
      awardsEyebrow: "Награды",
      awardsTitle: "Документы, подтверждающие служение и признание",
      award70Alt: "Удостоверение к юбилейной медали 70 лет Вооруженных Сил СССР",
      award70Title: "70 лет Вооруженных Сил СССР",
      award70Text: "Наградной документ датирован 1988 годом.",
      award50Alt: "Удостоверение к медали 50 лет Победы в Великой Отечественной войне",
      award50Title: "50 лет Победы",
      award50Text: "Удостоверение к юбилейной медали Республики Казахстан, вручение в 1995 году.",
      awardZhukovAlt: "Удостоверение к медали Маршала Советского Союза Жукова",
      awardZhukovTitle: "Медаль Маршала Жукова",
      awardZhukovText: "Семейный архив хранит документ о награждении медалью Жукова в 1997 году.",
      award60Alt: "Удостоверение к награде 60 лет Победы",
      award60Title: "60 лет Победы",
      award60Text: "Наградной документ Республики Казахстан, оформленный в 2004 году.",
      archiveEyebrow: "Архив",
      archiveTitle: "Фотографии и документы из семейной коллекции",
      groupPhotoAlt: "Групповая фотография у памятника Ленину",
      groupPhotoCaption: "Групповой снимок эпохи, сохранивший атмосферу времени.",
      partySchoolAlt: "Удостоверение об окончании партийной школы",
      partySchoolCaption: "Удостоверение об окончании партийной школы в 1952 году.",
      partyCardAlt: "Партийный билет",
      partyCardCaption: "Партийный билет с указанием 1946 года вступления.",
      archivePortraitAlt: "Портрет Бабаша Жукенова в зрелые годы",
      archivePortraitCaption: "Портрет, который задает всему архиву личное измерение.",
      earlyIdAlt: "Старое удостоверение с фотографией",
      earlyIdCaption: "Одно из ранних удостоверений, сохранивших подпись и печати.",
      footerText: "Лендинг собран по семейным архивным материалам. Тексты можно дополнить датами, воспоминаниями и именами родных."
    },
    kz: {
      metaTitle: "Бабаш Жукенов | Отбасылық өмірбаян",
      metaDescription: "Бабаш Жукенов туралы отбасылық фотосуреттер, марапаттар мен мұрағат құжаттары негізінде жасалған естелік лендинг.",
      brand: "Отбасылық мұрағат",
      navigationAria: "Негізгі навигация",
      navAbout: "Өмір жолы",
      navTimeline: "Хронология",
      navAwards: "Марапаттар",
      navArchive: "Мұрағат",
      languageSwitcherAria: "Тілді ауыстыру",
      settingsLauncher: "Баптаулар",
      editorPanelAria: "Өңдеу панелі",
      editorTitle: "Бет редакторы",
      editorClose: "Жабу",
      editorCloseAria: "Баптауларды жасыру",
      editorExport: "Экспорт",
      editorImport: "Импорт",
      editorReset: "Тастау",
      editorHint: "Өңдеу режимінде мәтінді тікелей бетте өзгертуге болады. Фотосуретті ауыстыру үшін қажетті суретті басыңыз.",
      editorToggleOn: "Өңдеуді қосу",
      editorToggleOff: "Өңдеуді өшіру",
      githubSectionTitle: "GitHub-қа сақтау",
      githubOwnerLabel: "Иесі",
      githubRepoLabel: "Репозиторий",
      githubBranchLabel: "Бұтақ",
      githubPathLabel: "Файл",
      githubTokenLabel: "GitHub token",
      githubLoad: "GitHub-тан жүктеу",
      githubSave: "GitHub-қа сақтау",
      githubTokenHelp: "Токен тек репозиторийге жазу үшін керек. Ол осы құрылғыдағы браузерде жергілікті сақталады.",
      statusView: "Қарау режимі",
      statusEditing: "Өңдеу режимі қосылды",
      statusSaved: "Өзгерістер браузерде сақталды",
      statusExported: "Өзгерістер экспортталды",
      statusImported: "Өзгерістер импортталды",
      statusImportError: "JSON импортталмады",
      statusImageError: "Суретті жүктеу мүмкін болмады",
      statusImageUpdated: "Фото жаңартылды",
      statusReset: "Барлық өзгеріс өшірілді",
      statusRepoLoading: "GitHub-тан деректер жүктелуде",
      statusRepoLoaded: "Деректер GitHub-тан жүктелді",
      statusRepoLoadError: "GitHub-тан деректерді жүктеу мүмкін болмады",
      statusRepoSaving: "GitHub-қа сақтау жүріп жатыр",
      statusRepoSaved: "Өзгерістер репозиторийге жазылды",
      statusRepoSaveError: "GitHub-қа сақтау мүмкін болмады",
      statusTokenMissing: "Репозиторийге жазу үшін GitHub token керек",
      statusStorageError: "Браузер өзгерістерді жергілікті сақтай алмады",
      resetConfirm: "Осы беттегі барлық жергілікті өзгерістерді өшіру керек пе?",
      heroEyebrow: "Құжаттар мен отбасы жадында сақталған адамның рухына арналады",
      heroTitle: "Бабаш Жукенов",
      heroLead: "Бұл лендинг отбасылық фотосуреттер, куәліктер мен марапаттар негізінде жасалды. Ол соғыс буынына жататын адамның жолын: қызметін, қоғамдық еңбегін, партия мектебін, замандастарының құрметін және ұрпаққа жалғасқан жадын көрсетеді.",
      heroCtaTimeline: "Өмір жолын көру",
      heroCtaArchive: "Мұрағатты ашу",
      factBirthText: "мұрағат құжаттарындағы туған жылы",
      factPartyText: "партияға кіруі",
      factAwardsText: "расталған мерейтойлық марапаттар",
      heroPortraitAlt: "Бабаш Жукеновтің портреті",
      portraitNoteLabel: "Отбасылық фотосурет",
      portraitNoteSource: "Отбасының жеке мұрағаты",
      aboutEyebrow: "Өмірі туралы",
      aboutTitle: "Құжаттар арқылы қалпына келтірілген өмірбаян",
      aboutP1: "Сақталған құжаттарға қарағанда, Бабаш Жукенов 1921 жылы туған. Оның есімі әскери дәуірмен және соғыстан кейінгі қоғамдық қызметпен байланысты. Отбасылық мұрағатта әскери билет, партия билеті, партия мектебін бітіргені туралы куәлік және әр жылдардағы бірнеше марапат құжаты сақталған.",
      aboutP2: "Бұл мұрағат ресми өмір жолын ғана емес, адами болмысын да көрсетеді: қатал портреттер, топтық суреттер, сарғайған куәлік беттері және ұқыптап сақталған медальдар. Бұл қадір-қасиет, қызмет және ұзақ жады туралы тарих.",
      factWarTitle: "Соғыс буыны",
      factWarBody: "Жеңіс мерейтойлық медальдары оның 1941-1945 жылдардағы Ұлы Отан соғысымен байланысын дәлелдейді.",
      factPublicTitle: "Қоғамдық қызмет",
      factPublicBody: "Партия құжаттары 1946 жылғы қарашада партияға кіргенін және кейінгі қызмет жолын көрсетеді.",
      factEducationTitle: "Білім мен мойындалу",
      factEducationBody: "1951-1952 жылдары аудандық кешкі партия мектебін аяқтаған, кейін дербес зейнеткер мәртебесі рәсімделген.",
      memoryPortraitAlt: "Бабаш Жукеновтің студиялық портреті",
      memoryQuote: "Адам туралы жады тек даталармен өлшенбейді. Ол ескі суреттердегі жүздерде, құжаттардағы мөр іздерінде және отбасының оның тарихын құрметпен сақтауында өмір сүреді.",
      timelineEyebrow: "Хронология",
      timelineTitle: "Өмір жолының негізгі кезеңдері",
      timelineBirthTitle: "Туған жылы",
      timelineBirthBody: "Туған жылы партия билеті мен басқа да мұрағат материалдарында көрсетілген.",
      timelineWarTitle: "Соғыс жылдары",
      timelineWarBody: "Жеңіс буынына қатысы 50 және 60 жылдық мерейтой медальдарымен расталады.",
      timelinePartyTitle: "Партияға кіру",
      timelinePartyBody: "Партия билеті бойынша партияға кіру мерзімі 1946 жылдың қараша айына сәйкес келеді.",
      timelineSchoolTitle: "Партия мектебі",
      timelineSchoolBody: "Қазақстан КП(б) аудандық комитеті жанындағы кешкі партия мектебін бітіргені туралы куәлік сақталған.",
      timelinePensionTitle: "Дербес зейнеткер",
      timelinePensionBody: "Мұрағат куәлігі оның одақтық маңызы бар дербес зейнеткер мәртебесін көрсетеді.",
      timelineAwardsTitle: "Марапаттар мен мойындалу",
      timelineAwardsBody: "Мұрағатта КСРО мен Қазақстан Республикасының мерейтойлық марапат құжаттары, сондай-ақ Жуков маршалының медалі сақталған.",
      awardsEyebrow: "Марапаттар",
      awardsTitle: "Қызметі мен еңбегін растайтын құжаттар",
      award70Alt: "КСРО Қарулы Күштерінің 70 жылдығына арналған куәлік",
      award70Title: "КСРО Қарулы Күштеріне 70 жыл",
      award70Text: "Марапат құжаты 1988 жылмен белгіленген.",
      award50Alt: "Ұлы Отан соғысындағы Жеңістің 50 жылдығына арналған медаль куәлігі",
      award50Title: "Жеңіске 50 жыл",
      award50Text: "Қазақстан Республикасының мерейтойлық медаліне арналған куәлік, 1995 жылы табысталған.",
      awardZhukovAlt: "Кеңес Одағы Маршалы Жуков медаліне арналған куәлік",
      awardZhukovTitle: "Маршал Жуков медалі",
      awardZhukovText: "Отбасылық мұрағатта 1997 жылы Жуков медалімен марапатталғаны туралы құжат сақталған.",
      award60Alt: "Жеңістің 60 жылдығына арналған куәлік",
      award60Title: "Жеңіске 60 жыл",
      award60Text: "Қазақстан Республикасының марапат құжаты 2004 жылы рәсімделген.",
      archiveEyebrow: "Мұрағат",
      archiveTitle: "Отбасылық коллекциядағы фотосуреттер мен құжаттар",
      groupPhotoAlt: "Ленин ескерткіші жанындағы топтық фото",
      groupPhotoCaption: "Дәуір атмосферасын сақтап қалған топтық сурет.",
      partySchoolAlt: "Партия мектебін аяқтағаны туралы куәлік",
      partySchoolCaption: "1952 жылы партия мектебін аяқтағаны туралы куәлік.",
      partyCardAlt: "Партия билеті",
      partyCardCaption: "1946 жылы партияға кіргені көрсетілген партия билеті.",
      archivePortraitAlt: "Бабаш Жукеновтің есейген шағындағы портреті",
      archivePortraitCaption: "Бүкіл мұрағатқа жеке өлшем беретін портрет.",
      earlyIdAlt: "Фотосуреті бар ескі куәлік",
      earlyIdCaption: "Қолтаңба мен мөрлері сақталған ерте куәліктердің бірі.",
      footerText: "Лендинг отбасылық мұрағат материалдары бойынша жиналды. Мәтіндерді даталармен, естеліктермен және туғандардың есімдерімен толықтыруға болады."
    }
  };

  var kazakhOverrides = {
    metaTitle: "Бабаш Жукенов | Ғұмыр жолы",
    metaDescription: "Бұл бет Бабаш Жукеновтің өмір жолын таныстыратын отбасылық мұрағат, суреттер мен ресми құжаттар негізінде әзірленді.",
    brand: "Отбасы мұрағаты",
    navigationAria: "Негізгі бөлімдер",
    navAbout: "Өмір жолы",
    navTimeline: "Жылнама",
    navAwards: "Марапаттары",
    navArchive: "Мұрағат",
    languageSwitcherAria: "Тілді таңдау",
    settingsLauncher: "Баптаулар",
    editorPanelAria: "Редактор панелі",
    editorTitle: "Бет редакторы",
    editorClose: "Жабу",
    editorCloseAria: "Баптауларды жабу",
    editorExport: "Экспорт",
    editorImport: "Импорт",
    editorReset: "Тазарту",
    editorHint: "Өңдеу режимінде мәтінді тікелей осы беттен өзгерте аласыз. Суретті ауыстыру үшін керекті фотоны басыңыз.",
    editorToggleOn: "Өңдеуді қосу",
    editorToggleOff: "Өңдеуді тоқтату",
    githubSectionTitle: "GitHub арқылы сақтау",
    githubOwnerLabel: "Иесі",
    githubRepoLabel: "Репозиторий",
    githubBranchLabel: "Бұтағы",
    githubPathLabel: "Файл атауы",
    githubTokenLabel: "GitHub token",
    githubLoad: "GitHub-тан алу",
    githubSave: "GitHub-қа жазу",
    githubTokenHelp: "Бұл токен тек репозиторийге өзгеріс енгізу үшін қажет. Ол тек осы құрылғыдағы браузерде жергілікті түрде сақталады.",
    statusView: "Қарау режимі",
    statusEditing: "Өңдеу режимі қосылды",
    statusSaved: "Өзгерістер сақтауға дайын",
    statusExported: "Өзгерістер экспортталды",
    statusImported: "Өзгерістер импортталды",
    statusImportError: "JSON файлын оқу мүмкін болмады",
    statusImageError: "Суретті жүктеу сәтсіз аяқталды",
    statusImageUpdated: "Фото жаңартылды",
    statusReset: "Барлық өзгеріс өшірілді",
    statusRepoLoading: "GitHub-тен дерек жүктеліп жатыр",
    statusRepoLoaded: "Деректер GitHub-тен алынды",
    statusRepoLoadError: "GitHub-тен дерек алу мүмкін болмады",
    statusRepoSaving: "Өзгерістер GitHub-қа жіберіліп жатыр",
    statusRepoSaved: "Өзгерістер репозиторийге сақталды",
    statusRepoSaveError: "GitHub-қа жазу сәтсіз аяқталды",
    statusTokenMissing: "Репозиторийге жазу үшін GitHub token қажет",
    statusStorageError: "Браузер жергілікті сақтауға рұқсат бермеді",
    resetConfirm: "Осы беттегі барлық өзгерісті өшіргіңіз келе ме?",
    heroEyebrow: "Отбасы жадында сақталған ардақты азаматтың ғұмырына арналған бет",
    heroTitle: "Бабаш Жукенов",
    heroLead: "Бұл бет Бабаш Жукеновтің өмір жолын отбасылық суреттер мен сақталған құжаттар арқылы таныстырады. Мұнда соғыс кезеңінің ізі, ел алдындағы қызметі, қоғамдық еңбегі және ұрпақ жадында қалған қадірлі есімі көрініс табады.",
    heroCtaTimeline: "Өмір жолын қарау",
    heroCtaArchive: "Мұрағатты ашу",
    factBirthText: "мұрағаттағы туған жылы",
    factPartyText: "партия қатарына өткен мерзімі",
    factAwardsText: "сақталған мерейтойлық марапаттар",
    heroPortraitAlt: "Бабаш Жукеновтің портреті",
    portraitNoteLabel: "Отбасылық сурет",
    portraitNoteSource: "Отбасының жеке мұрағаты",
    aboutEyebrow: "Ғұмырнамасы",
    aboutTitle: "Құжаттармен айқындалған ғұмырнама",
    aboutP1: "Сақталған деректерге сүйенсек, Бабаш Жукенов 1921 жылы дүниеге келген. Оның өмір жолы ел басына күн туған кезеңмен, одан кейінгі қоғамдық қызметпен және ел ішіндегі абыройлы еңбегімен сабақтас. Отбасылық мұрағатта әскери билет, партия билеті, оқу куәліктері мен әр жылдары берілген марапат құжаттары сақталған.",
    aboutP2: "Бұл жинақ ресми деректермен ғана шектелмейді. Байыпты портреттер, көпшілікпен түскен суреттер, мөрі мен қолтаңбасы қалған куәліктер арқылы адамның болмысы мен заманы айқын сезіледі. Соның бәрі әулет үшін қастерлі мұраға айналған.",
    factWarTitle: "Соғыс жылдарының куәсі",
    factWarBody: "Жеңіс мерейтойына арналған марапаттар оның 1941-1945 жылдардағы тарихи кезеңмен тікелей байланысты екенін көрсетеді.",
    factPublicTitle: "Қоғамдық қызметі",
    factPublicBody: "Партиялық құжаттар оның 1946 жылы партия қатарына қабылданғанын және кейін де қоғамдық іске белсене араласқанын көрсетеді.",
    factEducationTitle: "Білімі мен беделі",
    factEducationBody: "1951-1952 жылдары кешкі партия мектебін аяқтағаны, кейін дербес зейнеткер мәртебесіне ие болғаны құжаттардан анық көрінеді.",
    memoryPortraitAlt: "Бабаш Жукеновтің студиялық портреті",
    memoryQuote: "Адамның ғұмыры тек даталармен өлшенбейді. Ол ескі суреттердегі жүзден, құжаттағы мөр мен қолтаңбадан, отбасының құрметпен сақтаған естелігінен танылады.",
    timelineEyebrow: "Жылнама",
    timelineTitle: "Өмір жолының басты белестері",
    timelineBirthTitle: "Дүниеге келуі",
    timelineBirthBody: "Туған жылы партия билеті мен өзге де мұрағат құжаттарында көрсетілген.",
    timelineWarTitle: "Соғыс кезеңі",
    timelineWarBody: "Жеңістің 50 және 60 жылдығына арналған марапаттар оның сол буын өкілі екенін айғақтайды.",
    timelinePartyTitle: "Партия қатарына өтуі",
    timelinePartyBody: "Құжаттар бойынша ол 1946 жылдың қараша айында партия мүшелігіне қабылданған.",
    timelineSchoolTitle: "Партия мектебіндегі даярлығы",
    timelineSchoolBody: "Аудандық кешкі партия мектебін аяқтағаны жөніндегі куәлік оның қоғамдық-саяси даярлығы болғанын көрсетеді.",
    timelinePensionTitle: "Дербес зейнеткер мәртебесі",
    timelinePensionBody: "Мұрағаттағы куәлік оның одақтық дәрежедегі дербес зейнеткер болғанын дәлелдейді.",
    timelineAwardsTitle: "Ел құрметі мен марапаттары",
    timelineAwardsBody: "Сақталған құжаттар қатарында КСРО мен Қазақстан Республикасының мерейтойлық марапаттары, сондай-ақ Жуков медаліне қатысты деректер бар.",
    awardsEyebrow: "Марапаттары",
    awardsTitle: "Еңбегі мен абыройын айқындайтын құжаттар",
    award70Alt: "КСРО Қарулы Күштерінің 70 жылдығына берілген куәлік",
    award70Title: "КСРО Қарулы Күштеріне 70 жыл",
    award70Text: "Бұл марапат құжаты 1988 жылмен белгіленген.",
    award50Alt: "Жеңістің 50 жылдығына арналған медаль куәлігі",
    award50Title: "Жеңістің 50 жылдығы",
    award50Text: "Қазақстан Республикасының мерейтойлық медаліне берілген бұл куәлік 1995 жылы тапсырылған.",
    awardZhukovAlt: "Жуков медаліне берілген куәлік",
    awardZhukovTitle: "Жуков медалі",
    awardZhukovText: "Отбасылық мұрағатта 1997 жылы Жуков медалімен марапатталғанын растайтын құжат бар.",
    award60Alt: "Жеңістің 60 жылдығына арналған куәлік",
    award60Title: "Жеңістің 60 жылдығы",
    award60Text: "Бұл марапат құжаты 2004 жылы рәсімделген.",
    archiveEyebrow: "Мұрағат",
    archiveTitle: "Отбасында сақталған суреттер мен құжаттар",
    groupPhotoAlt: "Көпшілікпен бірге түскен тарихи фото",
    groupPhotoCaption: "Дәуір тынысын аңғартатын көпшілік сурет.",
    partySchoolAlt: "Партия мектебін аяқтағаны туралы куәлік",
    partySchoolCaption: "1952 жылы берілген оқу куәлігі.",
    partyCardAlt: "Партия билеті",
    partyCardCaption: "1946 жылғы мүшелік дерегі көрсетілген партия билеті.",
    archivePortraitAlt: "Бабаш Жукеновтің есейген шағындағы портреті",
    archivePortraitCaption: "Мұрағаттың мазмұнын тереңдете түсетін жеке портрет.",
    earlyIdAlt: "Ескі куәлік пен фотосурет",
    earlyIdCaption: "Қолтаңбасы мен мөрі сақталған ертеректегі құжаттардың бірі.",
    footerText: "Бұл бет отбасылық мұрағат материалдарының негізінде әзірленді. Қажет болған жағдайда оны қосымша деректермен, естеліктермен және туыстардың аты-жөнімен толықтыруға болады."
  };

  translations.kz = Object.assign({}, translations.kz, kazakhOverrides);

  var settingsToggle = document.getElementById("toggle-settings");
  var settingsPanel = document.getElementById("editor-toolbar");
  var settingsClose = document.getElementById("close-settings");
  var toggleButton = document.getElementById("toggle-edit");
  var exportButton = document.getElementById("export-content");
  var importButton = document.getElementById("import-content");
  var resetButton = document.getElementById("reset-content");
  var loadGitHubButton = document.getElementById("load-github");
  var saveGitHubButton = document.getElementById("save-github");
  var statusNode = document.getElementById("editor-status");
  var imageUpload = document.getElementById("image-upload");
  var importInput = document.getElementById("content-import");
  var languageButtons = Array.from(document.querySelectorAll("[data-lang-switch]"));
  var githubOwnerInput = document.getElementById("github-owner");
  var githubRepoInput = document.getElementById("github-repo");
  var githubBranchInput = document.getElementById("github-branch");
  var githubPathInput = document.getElementById("github-path");
  var githubTokenInput = document.getElementById("github-token");
  var archiveCarousel = document.getElementById("archive-carousel");
  var archiveSlides = Array.from(document.querySelectorAll("[data-archive-slide]"));
  var archivePrevButton = document.getElementById("archive-prev");
  var archiveNextButton = document.getElementById("archive-next");
  var awardsFeatureImage = document.getElementById("awards-feature-image");
  var awardsThumbs = Array.from(document.querySelectorAll("[data-awards-thumb]"));
  var awardsIndex = 0;
  var awardsTimer = null;
  var carousels = [];

  if (
    !settingsToggle ||
    !settingsPanel ||
    !settingsClose ||
    !toggleButton ||
    !exportButton ||
    !importButton ||
    !resetButton ||
    !loadGitHubButton ||
    !saveGitHubButton ||
    !statusNode ||
    !imageUpload ||
    !importInput ||
    !githubOwnerInput ||
    !githubRepoInput ||
    !githubBranchInput ||
    !githubPathInput ||
    !githubTokenInput
  ) {
    return;
  }

  var isEditMode = false;
  var activeImage = null;
  var contentSha = "";
  var statusKey = "statusView";
  var state = loadState();
  var currentLanguage = state.language;
  var githubConfig = loadGitHubConfig();
  var translatableNodes = Array.from(document.querySelectorAll("[data-i18n]"));
  var translatableAttrNodes = Array.from(document.querySelectorAll("[data-i18n-attrs]"));
  var editableTexts = Array.from(document.querySelectorAll(TEXT_SELECTOR)).filter(function (node) {
    return !node.closest("[data-editor-ui]");
  });
  var editableImages = Array.from(document.querySelectorAll(IMAGE_SELECTOR)).filter(function (node) {
    return !node.closest("[data-editor-ui]");
  });

  editableTexts.forEach(function (node, index) {
    var translationKey = node.dataset.i18n || ("text-" + index);
    node.dataset.editorKey = translationKey;
    node.spellcheck = false;
    node.setAttribute("data-editor-editable", "true");
  });

  editableImages.forEach(function (node, index) {
    var key = node.dataset.editorImageKey || ("image-" + index);
    node.dataset.editorImageKey = key;
    node.dataset.originalSrc = node.getAttribute("src") || "";
    node.setAttribute("data-editor-image", "true");
  });

  fillGitHubInputs();

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
    setStatus("statusExported");
  });

  importButton.addEventListener("click", function () {
    importInput.click();
  });

  loadGitHubButton.addEventListener("click", function () {
    syncGitHubConfigFromInputs();
    loadContentFromGitHub(true);
  });

  saveGitHubButton.addEventListener("click", function () {
    syncGitHubConfigFromInputs();
    saveContentToGitHub();
  });

  [
    githubOwnerInput,
    githubRepoInput,
    githubBranchInput,
    githubPathInput,
    githubTokenInput
  ].forEach(function (input) {
    input.addEventListener("input", function () {
      syncGitHubConfigFromInputs();
    });
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
        currentLanguage = state.language;
        renderLanguage(currentLanguage);
        persistState();
        setStatus("statusImported");
      } catch (error) {
        setStatus("statusImportError");
      } finally {
        importInput.value = "";
      }
    };
    reader.readAsText(file, "utf-8");
  });

  resetButton.addEventListener("click", function () {
    var confirmed = window.confirm(translate("resetConfirm"));
    if (!confirmed) {
      return;
    }

    state = {
      language: currentLanguage,
      texts: { ru: {}, kz: {} },
      images: {}
    };

    editableImages.forEach(function (node) {
      node.src = node.dataset.originalSrc || "";
    });

    saveState(state);
    renderLanguage(currentLanguage);
    setStatus("statusReset");
  });

  editableTexts.forEach(function (node) {
    node.addEventListener("input", function () {
      if (!isEditMode) {
        return;
      }

      state.texts[currentLanguage][node.dataset.editorKey] = node.innerHTML;
      saveState(state);
      setStatus("statusSaved");
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
        setStatus("statusImageError");
        return;
      }

      activeImage.src = result;
      state.images[activeImage.dataset.editorImageKey] = result;
      saveState(state);
      setStatus("statusImageUpdated");
      imageUpload.value = "";
    };
    reader.readAsDataURL(file);
  });

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var nextLanguage = button.dataset.langSwitch;
      if (!translations[nextLanguage] || nextLanguage === currentLanguage) {
        return;
      }

      persistState();
      currentLanguage = nextLanguage;
      state.language = nextLanguage;
      saveState(state);
      renderLanguage(nextLanguage);
      setStatus(isEditMode ? "statusEditing" : "statusView");
    });
  });

  setEditMode(false);
  setSettingsOpen(false);
  renderLanguage(currentLanguage);
  initCarousel({
    root: archiveCarousel,
    slides: archiveSlides,
    prevButton: archivePrevButton,
    nextButton: archiveNextButton
  });
  initAwardsGallery();
  loadContentFromLocalFile(false);

  function renderLanguage(language) {
    document.documentElement.lang = language === "kz" ? "kk" : "ru";
    window.dispatchEvent(new CustomEvent("grandpa-language-change", {
      detail: { language: language }
    }));

    translatableNodes.forEach(function (node) {
      var key = node.dataset.i18n;
      if (node.dataset.editorKey && Object.prototype.hasOwnProperty.call(state.texts[language], node.dataset.editorKey)) {
        node.innerHTML = state.texts[language][node.dataset.editorKey];
        return;
      }

      node.innerHTML = translate(key, language);
    });

    translatableAttrNodes.forEach(function (node) {
      node.dataset.i18nAttrs.split(";").forEach(function (mapping) {
        var parts = mapping.split(":");
        var attributeName = parts[0];
        var key = parts[1];
        if (attributeName && key) {
          node.setAttribute(attributeName, translate(key, language));
        }
      });
    });

    languageButtons.forEach(function (button) {
      var isActive = button.dataset.langSwitch === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    toggleButton.textContent = isEditMode ? translate("editorToggleOff", language) : translate("editorToggleOn", language);
    statusNode.textContent = translate(statusKey, language);
  }

  function setEditMode(nextValue) {
    isEditMode = nextValue;
    document.body.classList.toggle("edit-mode", isEditMode);

    editableTexts.forEach(function (node) {
      node.contentEditable = isEditMode ? "true" : "false";
    });

    toggleButton.textContent = isEditMode ? translate("editorToggleOff") : translate("editorToggleOn");
    setStatus(isEditMode ? "statusEditing" : "statusView");
  }

  function setSettingsOpen(nextValue) {
    settingsPanel.hidden = !nextValue;
    settingsToggle.setAttribute("aria-expanded", nextValue ? "true" : "false");
  }

  function translate(key, language) {
    var nextLanguage = language || currentLanguage;
    if (
      state &&
      state.texts &&
      state.texts[nextLanguage] &&
      Object.prototype.hasOwnProperty.call(state.texts[nextLanguage], key)
    ) {
      return state.texts[nextLanguage][key];
    }

    if (translations[nextLanguage] && Object.prototype.hasOwnProperty.call(translations[nextLanguage], key)) {
      return translations[nextLanguage][key];
    }

    return translations[DEFAULT_LANGUAGE][key] || "";
  }

  function normalizeState(rawState) {
    var normalizedTexts = { ru: {}, kz: {} };
    var normalizedImages = {};

    if (rawState && rawState.texts && typeof rawState.texts === "object") {
      if (rawState.texts.ru || rawState.texts.kz) {
        normalizedTexts.ru = rawState.texts.ru && typeof rawState.texts.ru === "object" ? rawState.texts.ru : {};
        normalizedTexts.kz = rawState.texts.kz && typeof rawState.texts.kz === "object" ? rawState.texts.kz : {};
      } else {
        normalizedTexts.ru = rawState.texts;
      }
    }

    if (
      rawState &&
      rawState.imageSchemaVersion === IMAGE_SCHEMA_VERSION &&
      rawState.images &&
      typeof rawState.images === "object"
    ) {
      normalizedImages = rawState.images;
    }

    return {
      language: rawState && rawState.language && translations[rawState.language] ? rawState.language : DEFAULT_LANGUAGE,
      texts: normalizedTexts,
      images: normalizedImages,
      imageSchemaVersion: IMAGE_SCHEMA_VERSION
    };
  }

  function loadState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? normalizeState(JSON.parse(raw)) : normalizeState(null);
    } catch (error) {
      return normalizeState(null);
    }
  }

  function saveState(nextState) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch (error) {
      setStatus("statusStorageError");
    }
  }

  function persistState() {
    editableTexts.forEach(function (node) {
      state.texts[currentLanguage][node.dataset.editorKey] = node.innerHTML;
    });

    editableImages.forEach(function (node) {
      state.images[node.dataset.editorImageKey] = node.src;
    });

    state.language = currentLanguage;
    state.imageSchemaVersion = IMAGE_SCHEMA_VERSION;
    saveState(state);
  }

  function fillGitHubInputs() {
    githubOwnerInput.value = githubConfig.owner;
    githubRepoInput.value = githubConfig.repo;
    githubBranchInput.value = githubConfig.branch;
    githubPathInput.value = githubConfig.path;
    githubTokenInput.value = githubConfig.token;
  }

  function syncGitHubConfigFromInputs() {
    githubConfig = {
      owner: githubOwnerInput.value.trim() || DEFAULT_GITHUB_CONFIG.owner,
      repo: githubRepoInput.value.trim() || DEFAULT_GITHUB_CONFIG.repo,
      branch: githubBranchInput.value.trim() || DEFAULT_GITHUB_CONFIG.branch,
      path: githubPathInput.value.trim() || DEFAULT_GITHUB_CONFIG.path,
      token: githubTokenInput.value.trim()
    };
    saveGitHubConfig(githubConfig);
  }

  function loadGitHubConfig() {
    try {
      var raw = window.localStorage.getItem(GITHUB_SETTINGS_KEY);
      if (!raw) {
        return Object.assign({}, DEFAULT_GITHUB_CONFIG);
      }

      var parsed = JSON.parse(raw);
      return {
        owner: parsed && parsed.owner ? parsed.owner : DEFAULT_GITHUB_CONFIG.owner,
        repo: parsed && parsed.repo ? parsed.repo : DEFAULT_GITHUB_CONFIG.repo,
        branch: parsed && parsed.branch ? parsed.branch : DEFAULT_GITHUB_CONFIG.branch,
        path: parsed && parsed.path ? parsed.path : DEFAULT_GITHUB_CONFIG.path,
        token: parsed && parsed.token ? parsed.token : ""
      };
    } catch (error) {
      return Object.assign({}, DEFAULT_GITHUB_CONFIG);
    }
  }

  function saveGitHubConfig(nextConfig) {
    try {
      window.localStorage.setItem(GITHUB_SETTINGS_KEY, JSON.stringify(nextConfig));
    } catch (error) {
      console.error(error);
    }
  }

  function buildGitHubApiUrl() {
    var encodedPath = githubConfig.path.split("/").map(encodeURIComponent).join("/");
    return "https://api.github.com/repos/" +
      encodeURIComponent(githubConfig.owner) +
      "/" +
      encodeURIComponent(githubConfig.repo) +
      "/contents/" +
      encodedPath +
      "?ref=" +
      encodeURIComponent(githubConfig.branch);
  }

  function buildGitHubHeaders(includeJson) {
    var headers = {
      Accept: "application/vnd.github+json"
    };

    if (githubConfig.token) {
      headers.Authorization = "Bearer " + githubConfig.token;
    }

    if (includeJson) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  function decodeBase64Utf8(base64Value) {
    var binary = atob(String(base64Value || "").replace(/\n/g, ""));
    var bytes = Uint8Array.from(binary, function (character) {
      return character.charCodeAt(0);
    });
    return new TextDecoder().decode(bytes);
  }

  function encodeBase64Utf8(value) {
    var bytes = new TextEncoder().encode(value);
    var binary = "";
    bytes.forEach(function (byte) {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

  function loadContentFromGitHub(showStatus) {
    if (showStatus) {
      setStatus("statusRepoLoading");
    }

    return fetch(buildGitHubApiUrl(), {
      method: "GET",
      headers: buildGitHubHeaders(false)
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("GitHub GET failed: " + response.status);
      }
      return response.json();
    }).then(function (payload) {
      contentSha = payload.sha || "";
      state = normalizeState(JSON.parse(decodeBase64Utf8(payload.content || "")));
      currentLanguage = state.language || currentLanguage;
      renderLanguage(currentLanguage);

      editableImages.forEach(function (node) {
        var key = node.dataset.editorImageKey;
        node.src = Object.prototype.hasOwnProperty.call(state.images, key) ? state.images[key] : (node.dataset.originalSrc || "");
      });

      saveState(state);

      if (showStatus) {
        setStatus("statusRepoLoaded");
      }

      return true;
    }).catch(function (error) {
      console.error(error);

      if (showStatus) {
        setStatus("statusRepoLoadError");
      }

      return loadContentFromLocalFile(showStatus);
    });
  }

  function loadContentFromLocalFile(showStatus) {
    return fetch("content.json?ts=" + Date.now(), {
      method: "GET",
      cache: "no-store"
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("Local content fetch failed");
      }
      return response.json();
    }).then(function (payload) {
      state = normalizeState(payload);
      currentLanguage = state.language || currentLanguage;
      renderLanguage(currentLanguage);

      editableImages.forEach(function (node) {
        var key = node.dataset.editorImageKey;
        node.src = Object.prototype.hasOwnProperty.call(state.images, key) ? state.images[key] : (node.dataset.originalSrc || "");
      });

      saveState(state);

      if (showStatus) {
        setStatus("statusRepoLoaded");
      }

      return true;
    }).catch(function (error) {
      console.error(error);

      if (showStatus) {
        setStatus("statusRepoLoadError");
      }

      return false;
    });
  }

  function ensureRemoteSha() {
    if (contentSha) {
      return Promise.resolve(contentSha);
    }

    return fetch(buildGitHubApiUrl(), {
      method: "GET",
      headers: buildGitHubHeaders(false)
    }).then(function (response) {
      if (response.status === 404) {
        return "";
      }
      if (!response.ok) {
        throw new Error("GitHub SHA fetch failed: " + response.status);
      }
      return response.json().then(function (payload) {
        contentSha = payload.sha || "";
        return contentSha;
      });
    });
  }

  function saveContentToGitHub() {
    persistState();

    if (!githubConfig.token) {
      setStatus("statusTokenMissing");
      return;
    }

    setStatus("statusRepoSaving");

    ensureRemoteSha().then(function (sha) {
      var body = {
        message: "Update landing content",
        content: encodeBase64Utf8(JSON.stringify(state, null, 2)),
        branch: githubConfig.branch
      };

      if (sha) {
        body.sha = sha;
      }

      return fetch(buildGitHubApiUrl(), {
        method: "PUT",
        headers: buildGitHubHeaders(true),
        body: JSON.stringify(body)
      });
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("GitHub PUT failed: " + response.status);
      }
      return response.json();
    }).then(function (payload) {
      contentSha = payload && payload.content && payload.content.sha ? payload.content.sha : contentSha;
      setStatus("statusRepoSaved");
    }).catch(function (error) {
      console.error(error);
      setStatus("statusRepoSaveError");
    });
  }

  function setStatus(nextStatusKey) {
    statusKey = nextStatusKey;
    statusNode.textContent = translate(statusKey);
  }

  function initCarousel(config) {
    if (!config.root || config.slides.length === 0) {
      return;
    }

    var carouselState = {
      root: config.root,
      slides: config.slides,
      prevButton: config.prevButton,
      nextButton: config.nextButton,
      index: 0,
      timer: null
    };

    carousels.push(carouselState);
    updateCarousel(carouselState);

    if (carouselState.prevButton) {
      carouselState.prevButton.addEventListener("click", function () {
        stepCarousel(carouselState, -1);
      });
    }

    if (carouselState.nextButton) {
      carouselState.nextButton.addEventListener("click", function () {
        stepCarousel(carouselState, 1);
      });
    }

  }

  function stepCarousel(carouselState, direction) {
    carouselState.index = (carouselState.index + direction + carouselState.slides.length) % carouselState.slides.length;
    updateCarousel(carouselState);
  }

  function updateCarousel(carouselState) {
    if (!carouselState.slides.length) {
      return;
    }

    var prevIndex = (carouselState.index - 1 + carouselState.slides.length) % carouselState.slides.length;
    var nextIndex = (carouselState.index + 1) % carouselState.slides.length;

    carouselState.slides.forEach(function (slide, index) {
      slide.classList.remove("is-active", "is-prev", "is-next", "is-hidden");

      if (index === carouselState.index) {
        slide.classList.add("is-active");
        return;
      }

      if (index === prevIndex) {
        slide.classList.add("is-prev");
        return;
      }

      if (index === nextIndex) {
        slide.classList.add("is-next");
        return;
      }

      slide.classList.add("is-hidden");
    });
  }

  function initAwardsGallery() {
    if (!awardsFeatureImage || awardsThumbs.length === 0) {
      return;
    }

    updateAwardsGallery();

    awardsThumbs.forEach(function (thumb, index) {
      thumb.addEventListener("click", function () {
        awardsIndex = index;
        updateAwardsGallery();
      });
    });
  }

  function updateAwardsGallery() {
    var activeThumb = awardsThumbs[awardsIndex];
    if (!activeThumb) {
      return;
    }

    awardsFeatureImage.src = activeThumb.dataset.awardsThumb;
    awardsFeatureImage.alt = activeThumb.getAttribute("aria-label") || activeThumb.querySelector("img").alt || "Марапат";

    awardsThumbs.forEach(function (thumb, index) {
      thumb.classList.toggle("is-active", index === awardsIndex);
    });

    document.getElementById("awards-thumbs").scrollTo({
      left: Math.max(0, activeThumb.offsetLeft - ((document.getElementById("awards-thumbs").clientWidth - activeThumb.offsetWidth) / 2)),
      behavior: "smooth"
    });
  }

})();
