/**
 * Espanso Editor Logic
 * Handles File System Access API, YAML parsing/dumping, and UI rendering.
 * UNIFIED EDITOR VERSION - Uses {{var}} syntax, auto-detected variables, always-visible preview
 */

// --- Translations ---
const translations = {
    fr: {
        appTitle: "Espanso YAML Editor",
        headerSubtitle: "Créez vos raccourcis Espanso facilement",
        btnOpenMenu: "Ouvrir",
        btnLoadFile: "Fichier (.yml)",
        btnLoadFolder: "Dossier (/match)",
        statusFolderOpened: "Dossier ouvert : ",
        noYamlFilesFound: "Aucun fichier YAML (.yml ou .yaml) trouvé dans ce dossier.",
        sidebarFiles: "Fichiers",
        sidebarTriggers: "Raccourcis",
        btnSave: "Enregistrer",
        btnSaveAs: "Enregistrer sous...",
        btnDropdownTitle: "Plus d'options",
        btnHelpTitle: "Aide",
        statusEmpty: "Prêt. Aucun fichier ouvert.",
        statusOpened: "Fichier ouvert : ",
        statusSaved: "Sauvegardé ! ",
        statusSavedShort: "Enregistré !",
        statusErrorLoading: "Erreur lors de l'ouverture du fichier.",
        statusErrorSaving: "Erreur lors de la sauvegarde.",
        btnAddMatch: "Ajouter un Match",
        welcomeMessage: "Commencez par ouvrir un fichier .yml ou créez un nouveau match.",
        yamlPreviewTitle: "Aperçu YAML",
        btnFormat: "Formater",
        btnFormatTitle: "Formater le code",
        btnCopy: "Copier",
        btnCopyTitle: "Copier le contenu",
        yamlPlaceholder: "# Le contenu YAML apparaîtra ici...",
        editMatch: "Éditer le Match",
        newMatch: "Nouveau Match",
        contentType: "Type de contenu",
        typeSimple: "Texte Simple",
        typeRich: "Texte riche",
        typeInteractive: "Formulaire",
        typeDate: "Date",
        triggerLabel: "Déclencheur (Trigger)",
        triggerPlaceholder: ":monraccourci",
        triggerHelp: "Le texte à taper pour déclencher le remplacement (ex: :date)",
        contentPlaceholder: "Votre texte ici... Utilisez {{nom}} pour créer des variables.",
        previewLabel: "Aperçu",
        insertLabel: "Insérer",
        insertText: "Champ texte",
        insertChoice: "Choix (dropdown)",
        insertList: "Liste (selection)",
        insertMultiline: "Texte multilignes",
        varsConfigTitle: "Variables détectées",
        varsConfigHint: "Utilisez {{nom}} dans le texte pour créer une variable",
        dateConfigTitle: "Format de date par défaut",
        varTypeStatic: "Texte (static)",
        varTypeChoice: "Choix (dropdown)",
        varTypeList: "Liste (selection)",
        varTypeMultiline: "Texte multilignes",
        varTypeDate: "Date",
        varDefaultValue: "Valeur par défaut",
        varDateFormat: "Format",
        varChoicesList: "Options",
        addOption: "+ Ajouter",
        tooltipContentType: "Choisissez si vous voulez un texte simple, un texte riche (HTML/Markdown), un contenu interactif avec variables, ou une date automatique.",
        tooltipTrigger: "Le mot-clé (souvent commençant par :) qui déclenchera le remplacement.",
        selectTypeTitle: "Quel type de raccourci ?",
        selectTypeDesc: "Choisissez le format de base.",
        dateParameters: "Paramètres : %d (jour), %m (mois), %Y (année), %H:%M (heure).",
        btnDelete: "Supprimer",
        btnCancel: "Annuler",
        btnSaveMatch: "Valider",
        alertTriggerRequired: "Le trigger est obligatoire.",
        confirmDelete: "Supprimer ce match ?",
        noMatchesFound: "Aucun match trouvé.",
        copied: "Copié !",
        dynamicContent: "(Contenu dynamique)",
        sidebarTitle: "Explorateur",
        btnNewFile: "Nouveau fichier YML",
        btnNewFolder: "Nouveau dossier",
        promptFileName: "Nom du fichier YML :",
        promptFolderName: "Nom du dossier :",
        newFileCreated: "Nouveau fichier créé : ",
        newFolderCreated: "Nouveau dossier créé : ",
        errorCreatingFile: "Erreur lors de la création du fichier.",
        errorCreatingFolder: "Erreur lors de la création du dossier.",
        confirmOverwriteFile: "Le fichier existe déjà. Voulez-vous l'écraser ?",
        noFolderOpened: "Vous devez d'abord ouvrir un dossier.",
        btnGotIt: "Compris",
        alertNoApi: "Votre navigateur ne supporte pas l'API d'accès aux fichiers native.",
        confirmOverwrite: "Confirmer ?",
        alertFormRequired: "Un formulaire doit contenir au moins une variable {{nom}}.",
        richModeHtml: "HTML",
        richModeMarkdown: "Markdown",
        previewTypeSimple: "Texte simple",
        previewTypeRich: "Rendu HTML",
        previewTypeInteractive: "Aperçu interactif",
        previewTypeDate: "Aperçu date",
        previewTypeImage: "Rendu d'image",
        formPreviewTitle: "Formulaire de saisie",
        resultPreviewTitle: "Texte généré (Résultat)",
        dateGuideLink: "Guide complet des formats (Chrono)",
        noVarsDetected: "Aucune variable détectée dans votre texte. Utilisez le bouton d'insertion ou écrivez {{nom_variable}}.",
        typeImage: "Image",
        imagePathLabel: "Chemin de l'image (image_path)",
        imagePathPlaceholder: "$CONFIG/img/mon-image.jpg",
        imagePathHelp: "Espanso recommande d'utiliser le répertoire $CONFIG/ pour vos images.",
        btnSelectImage: "Importer...",
        tooltipImagePath: "Le chemin absolu ou relatif vers le fichier image (ex: $CONFIG/img/image.png).",
        errorImageUpload: "Erreur lors de la copie de l'image dans l'espace de travail.",
        statusImageCopied: "Image copiée dans $CONFIG/img/ !",
        whatIsEspanso: "Qu'est-ce qu'Espanso ?",
        espansoDesc: "Espanso est un <strong>remplaceur de texte</strong> (text expander). Il surveille ce que vous tapez et remplace instantanément des mots-clés par du contenu plus long, des dates, ou des formulaires complexes.",
        whatIsTool: "À quoi sert cet éditeur ?",
        toolDesc: "Espanso utilise des fichiers <code>.yml</code> pour stocker vos raccourcis. Ce site vous permet de :",
        feature1: "Créer des raccourcis visuellement sans erreur de syntaxe.",
        feature2: "Gérer des formulaires avec choix et listes déroulantes.",
        feature3: "Générer des dates automatiques au bon format.",
        whereToSave: "Où enregistrer vos fichiers ?",
        savePathDesc: "Pour qu'Espanso détecte vos raccourcis, enregistrez votre fichier dans le dossier <code>match</code> de votre configuration :",
        savePathTip: "Astuce : Vous pouvez créer autant de fichiers .yml que vous le souhaitez dans ce dossier pour organiser vos raccourcis par thèmes (ex : pro.yml, perso.yml, etc.).",
        tableOS: "Système",
        tablePath: "Chemin du répertoire /match",
        btnCopyMini: "Copier",
        tutorialSymLinksTitle: "🖥️ Tutoriel : Utiliser des liens symboliques sous Windows",
        tutorialSymLinksDesc: "Si vous souhaitez centraliser vos fichiers de raccourcis dans un dossier spécifique (par exemple, pour les synchroniser ou les gérer plus facilement avec l'éditeur), vous pouvez créer un <strong>lien symbolique</strong>. Cela permettra à Espanso de lire vos fichiers comme s'ils étaient au bon endroit, sans que vous ayez à les déplacer.",
        tutorialSymLinksMotivation: "<strong>Pas de panique</strong>, la manipulation ne prend que quelques secondes ! Suivez le guide :",
        tutorialSymLinksStep1Title: "Étape 1 : Ouvrir l'Invite de commande en mode Administrateur",
        tutorialSymLinksStep1a: "Cliquez sur le menu <strong>Démarrer</strong> de Windows (ou appuyez sur la touche \"Windows\" de votre clavier).",
        tutorialSymLinksStep1b: "Tapez simplement les trois lettres <strong>cmd</strong>.",
        tutorialSymLinksStep1c: "Dans les résultats de recherche, faites un <strong>clic droit</strong> sur <em>Invite de commandes</em> et choisissez <em>Exécuter en tant qu'administrateur</em>.",
        tutorialSymLinksStep1d: "Validez par \"Oui\" si Windows vous demande une autorisation. Une fenêtre noire s'ouvre.",
        tutorialSymLinksStep2Title: "Étape 2 : Préparer et lancer la commande",
        tutorialSymLinksStep2a: "Copiez la ligne ci-dessous, mais attention : avant d'appuyer sur Entrée, vous devez <strong>remplacer la seconde partie</strong> par le chemin du dossier où vous stockez vos raccourcis.",
        tutorialSymLinksStep2b: "💡 <strong>Astuce pour ne pas vous tromper de chemin :</strong> Allez dans votre explorateur de fichiers, ouvrez le dossier où se trouvent vos raccourcis, cliquez tout en haut dans la barre d'adresse, et copiez le chemin. Remplacez ensuite \"C:\\Chemin\\Vers\\Vos\\Raccourcis\" par ce que vous venez de copier (gardez bien les guillemets).",
        tutorialSymLinksStep3Title: "Étape 3 : Vérifier que cela a fonctionné",
        tutorialSymLinksStep3a: "Collez la commande modifiée dans la fenêtre noire (un simple <strong>clic droit</strong> dans la fenêtre suffit souvent à coller le texte) et appuyez sur Entrée.",
        tutorialSymLinksStep3b: "Si tout est correct, la console affichera ce message de confirmation : <code>Lien symbolique créé pour [...]</code>",
        tutorialSymLinksStep3c: "Il ne vous reste plus qu'à <strong>redémarrer Espanso</strong> (en tapant <code>espanso restart</code> dans la console ou via l'icône dans votre barre des tâches) pour qu'il charge vos nouveaux raccourcis.",
        securityNote: "<strong>Note :</strong> Pour des raisons de sécurité, les navigateurs ne peuvent pas écrire directement dans vos dossiers système. Enregistrez le fichier sur votre bureau, puis déplacez-le manuellement."
    },
    en: {
        appTitle: "Espanso YAML Editor",
        headerSubtitle: "Create your Espanso shortcuts easily",
        btnOpenMenu: "Open",
        btnLoadFile: "File (.yml)",
        btnLoadFolder: "Folder (/match)",
        statusFolderOpened: "Folder opened: ",
        noYamlFilesFound: "No YAML files (.yml or .yaml) found in this folder.",
        sidebarFiles: "Files",
        sidebarTriggers: "Shortcuts",
        btnSave: "Save",
        btnSaveAs: "Save As...",
        btnDropdownTitle: "More options",
        btnHelpTitle: "Help",
        statusEmpty: "Ready. No file opened.",
        statusOpened: "File opened: ",
        statusSaved: "Saved! ",
        statusSavedShort: "Saved !",
        statusErrorLoading: "Error loading file.",
        statusErrorSaving: "Error saving file.",
        btnAddMatch: "Add a Match",
        welcomeMessage: "Start by opening a .yml file or create a new match.",
        yamlPreviewTitle: "YAML Preview",
        btnFormat: "Format",
        btnFormatTitle: "Format code",
        btnCopy: "Copy",
        btnCopyTitle: "Copy content",
        yamlPlaceholder: "# YAML content will appear here...",
        editMatch: "Edit Match",
        newMatch: "New Match",
        contentType: "Content Type",
        typeSimple: "Simple Text",
        typeRich: "Rich Text",
        typeInteractive: "Form",
        typeDate: "Date",
        triggerLabel: "Trigger",
        triggerPlaceholder: ":myshortcut",
        triggerHelp: "The text to type to trigger replacement (ex: :date)",
        contentPlaceholder: "Your text here... Use {{name}} to create variables.",
        previewLabel: "Preview",
        insertLabel: "Insert",
        insertText: "Text field",
        insertChoice: "Choice (dropdown)",
        insertList: "List (selection)",
        insertMultiline: "Multiline text",
        varsConfigTitle: "Detected Variables",
        varsConfigHint: "Use {{name}} in the text to create a variable",
        dateConfigTitle: "Default date format",
        varTypeStatic: "Text (static)",
        varTypeChoice: "Choice (dropdown)",
        varTypeList: "List (selection)",
        varTypeMultiline: "Multiline text",
        varTypeDate: "Date",
        varDefaultValue: "Default value",
        varDateFormat: "Format",
        varChoicesList: "Options",
        addOption: "+ Add",
        tooltipContentType: "Choose between simple text, rich text (HTML/Markdown), interactive content with variables, or an automatic date.",
        tooltipTrigger: "The keyword (often starting with :) that will trigger the replacement.",
        selectTypeTitle: "What type of shortcut?",
        selectTypeDesc: "Choose the base format.",
        dateParameters: "Parameters: %d (day), %m (month), %Y (year), %H:%M (hour).",
        btnDelete: "Delete",
        btnCancel: "Cancel",
        btnSaveMatch: "Apply",
        alertTriggerRequired: "Trigger is mandatory.",
        confirmDelete: "Delete this match?",
        noMatchesFound: "No matches found.",
        copied: "Copied!",
        dynamicContent: "(Dynamic content)",
        sidebarTitle: "Explorer",
        btnNewFile: "New YML file",
        btnNewFolder: "New folder",
        promptFileName: "YML file name:",
        promptFolderName: "Folder name:",
        newFileCreated: "New file created: ",
        newFolderCreated: "New folder created: ",
        errorCreatingFile: "Error creating file.",
        errorCreatingFolder: "Error creating folder.",
        confirmOverwriteFile: "File already exists. Overwrite?",
        noFolderOpened: "You must open a folder first.",
        btnGotIt: "Got it",
        alertNoApi: "Your browser does not support the native file access API.",
        confirmOverwrite: "Confirm?",
        alertFormRequired: "A form must contain at least one {{variable}}.",
        richModeHtml: "HTML",
        richModeMarkdown: "Markdown",
        previewTypeSimple: "Simple text",
        previewTypeRich: "HTML render",
        previewTypeInteractive: "Interactive preview",
        previewTypeDate: "Date preview",
        previewTypeImage: "Image Render",
        formPreviewTitle: "Input Form",
        resultPreviewTitle: "Generated Text (Result)",
        dateGuideLink: "Full format guide (Chrono)",
        noVarsDetected: "No variables detected in your text. Use the insert button or write {{variable_name}}.",
        typeImage: "Image",
        imagePathLabel: "Image Path (image_path)",
        imagePathPlaceholder: "$CONFIG/img/my-image.jpg",
        imagePathHelp: "Espanso recommends using the $CONFIG/ directory for your images.",
        btnSelectImage: "Import...",
        tooltipImagePath: "The absolute or relative path to the image file (e.g. $CONFIG/img/image.png).",
        errorImageUpload: "Error copying image to workspace.",
        statusImageCopied: "Image copied to $CONFIG/img/ !",
        whatIsEspanso: "What is Espanso?",
        espansoDesc: "Espanso is a <strong>text expander</strong>. It monitors what you type and instantly replaces keywords with longer content, dates, or complex forms.",
        whatIsTool: "What is this editor for?",
        toolDesc: "Espanso uses <code>.yml</code> files to store your shortcuts. This site allows you to:",
        feature1: "Create shortcuts visually without syntax errors.",
        feature2: "Manage forms with choices and dropdown lists.",
        feature3: "Generate automatic dates in the correct format.",
        whereToSave: "Where to save your files?",
        savePathDesc: "For Espanso to detect your shortcuts, save your file in the <code>match</code> folder of your configuration:",
        savePathTip: "Tip: You can create as many .yml files as you want in this folder to organize your shortcuts by theme (e.g.: work.yml, personal.yml, etc.).",
        tableOS: "System",
        tablePath: "/match directory path",
        btnCopyMini: "Copy",
        tutorialSymLinksTitle: "🖥️ Tutorial: Using symbolic links on Windows",
        tutorialSymLinksDesc: "If you want to centralize your shortcut files in a specific folder (for example, to sync them or manage them more easily with the editor), you can create a <strong>symbolic link</strong>. This will allow Espanso to read your files as if they were in the right place, without you having to move them.",
        tutorialSymLinksMotivation: "<strong>Don't worry</strong>, the process only takes a few seconds! Follow the guide:",
        tutorialSymLinksStep1Title: "Step 1: Open the Command Prompt as Administrator",
        tutorialSymLinksStep1a: "Click on the Windows <strong>Start</strong> menu (or press the \"Windows\" key on your keyboard).",
        tutorialSymLinksStep1b: "Simply type the three letters <strong>cmd</strong>.",
        tutorialSymLinksStep1c: "In the search results, <strong>right-click</strong> on <em>Command Prompt</em> and choose <em>Run as administrator</em>.",
        tutorialSymLinksStep1d: "Click \"Yes\" if Windows asks for permission. A black window opens.",
        tutorialSymLinksStep2Title: "Step 2: Prepare and run the command",
        tutorialSymLinksStep2a: "Copy the line below, but be careful: before pressing Enter, you must <strong>replace the second part</strong> with the path to the folder where you store your shortcuts.",
        tutorialSymLinksStep2b: "💡 <strong>Tip to avoid path mistakes:</strong> Open your file explorer, navigate to the folder containing your shortcuts, click the address bar at the top, and copy the path. Then replace \"C:\\Path\\To\\Your\\Shortcuts\" with what you just copied (keep the quotation marks).",
        tutorialSymLinksStep3Title: "Step 3: Verify that it worked",
        tutorialSymLinksStep3a: "Paste the modified command into the black window (a simple <strong>right-click</strong> in the window usually pastes the text) and press Enter.",
        tutorialSymLinksStep3b: "If everything is correct, the console will display this confirmation message: <code>Symbolic link created for [...]</code>",
        tutorialSymLinksStep3c: "All that's left is to <strong>restart Espanso</strong> (by typing <code>espanso restart</code> in the console or via the icon in your taskbar) so it loads your new shortcuts.",
        securityNote: "<strong>Note:</strong> For security reasons, browsers cannot write directly to your system folders. Save the file to your desktop, then move it manually."
    }
};

// --- Rich Text Mode ---
let currentRichMode = 'html';

// Global State
let currentMatches = [];
let fileHandle = null;
let currentLang = 'fr';
let activeMatchType = 'simple';
let isSingleFileModified = false; // Ajouté pour le suivi en mode fichier unique

// Folder mode state
let isFolderMode = false;
let folderFiles = [];
let folderDirs = []; // Stocke la liste de tous les répertoires (y compris les dossiers vides)
let activeFolderFileIndex = -1;
let currentDirHandle = null;

// Sort state
let sortDirection = 1;
let fileSortDirection = 1;

// Expanded state for folder tree
let expandedFolders = {};

// Editor state
let editingIndex = -1;
let isPopulating = false;

// Check API Support
const supportsFileSystemAPI = 'showOpenFilePicker' in window;

// DOM Elements
const dom = {
    matchesList: document.getElementById('matchesList'),
    statusMessage: document.getElementById('statusMessage'),
    btnOpenDropdown: document.getElementById('btnOpenDropdown'),
    openMenu: document.getElementById('openMenu'),
    btnLoadFile: document.getElementById('btnLoadFile'),
    btnLoadFolder: document.getElementById('btnLoadFolder'),
    btnSave: document.getElementById('btnSave'),
    btnSaveAs: document.getElementById('btnSaveAs'),
    btnDropdown: document.getElementById('btnDropdown'),
    saveDropdown: document.getElementById('saveDropdown'),
    btnAdd: document.getElementById('btnAdd'),
    sidebarList: document.getElementById('sidebarList'),
    btnHelp: document.getElementById('btnHelp'),

    helpModal: document.getElementById('helpModal'),
    btnCloseHelp: document.getElementById('btnCloseHelp'),
    btnCloseHelpFooter: document.getElementById('btnCloseHelpFooter'),

    editorModal: document.getElementById('editorModal'),
    modalTitle: document.getElementById('modalTitle'),
    btnCloseModal: document.getElementById('btnCloseModal'),
    btnCancel: document.getElementById('btnCancel'),
    btnSaveMatch: document.getElementById('btnSaveMatch'),
    btnDeleteMatch: document.getElementById('btnDeleteMatch'),
    typeOverlay: document.getElementById('typeOverlay'),
    typeButtons: document.querySelectorAll('.type-btn-large'),

    triggerInput: document.getElementById('triggerInput'),
    contentInput: document.getElementById('contentInput'),

    // Unified editor elements
    previewSection: document.getElementById('previewSection'),
    previewContent: document.getElementById('previewContent'),
    previewTypeLabel: document.getElementById('previewTypeLabel'),
    varsConfigPanel: document.getElementById('varsConfigPanel'),
    varsConfigList: document.getElementById('varsConfigList'),
    dateFormatConfig: document.getElementById('dateFormatConfig'),
    dateFormatDefault: document.getElementById('dateFormatDefault'),

    // Live Preview
    yamlEditor: document.getElementById('yamlEditor'),
    btnFormatYaml: document.getElementById('btnFormatYaml'),
    btnCopyYaml: document.getElementById('btnCopyYaml'),

    // New folder/file buttons
    btnNewFile: document.getElementById('btnNewFile'),
    btnNewFolder: document.getElementById('btnNewFolder'),

    // Lang buttons
    langBtns: document.querySelectorAll('.lang-btn'),
    btnSortAlpha: null,
    btnSortFiles: null,

    // Insert menu
    btnInsertToggle: document.getElementById('btnInsertToggle'),
    insertMenu: document.getElementById('insertMenu'),
    insertMenuItems: document.querySelectorAll('.insert-menu-item'),

    // Toolbar mode toggle
    unifiedModeToggle: document.getElementById('unifiedModeToggle'),
    mdToolbarBtns: document.querySelectorAll('.unified-toolbar .md-toolbar-btn'),
    mdModeBtns: document.querySelectorAll('.unified-mode-toggle .md-mode-btn'),

    // Templates
    varConfigRowTemplate: document.getElementById('varConfigRowTemplate'),
    varOptionRowTemplate: document.getElementById('varOptionRowTemplate'),

    // Image match elements
    imageConfigPanel: document.getElementById('imageConfigPanel'),
    imagePathInput: document.getElementById('imagePathInput'),
    btnSelectImage: document.getElementById('btnSelectImage'),
    imageFileInput: document.getElementById('imageFileInput'),
    btnLibraryImage: document.getElementById('btnLibraryImage'),
    libraryDropdown: document.getElementById('libraryDropdown')
};

// --- Initialization ---
function init() {
    const savedLang = localStorage.getItem('espanso_lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }

    updateLanguageUI();
    setupEventListeners();
    renderMatches();
    updateYamlPreview();

    // Empêche la fermeture accidentelle du navigateur en cas de modifications non sauvegardées
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges()) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

function setupEventListeners() {
    // Menu déroulant "Ouvrir"
    const openMenu = dom.openMenu;
    dom.btnOpenDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu.classList.toggle('hidden');
    });
    dom.btnLoadFile.addEventListener('click', () => {
        openMenu.classList.add('hidden');
        loadFile();
    });
    dom.btnLoadFolder.addEventListener('click', () => {
        openMenu.classList.add('hidden');
        loadFolder();
    });
    dom.btnSave.addEventListener('click', (e) => saveFile(e.currentTarget));
    dom.btnSaveAs.addEventListener('click', (e) => {
        saveFileAs(e.currentTarget);
        if (dom.saveDropdown) dom.saveDropdown.classList.add('hidden');
    });
    dom.btnDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dom.saveDropdown.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (e) => {
        if (dom.saveDropdown && !e.target.closest('.split-button')) {
            dom.saveDropdown.classList.add('hidden');
        }
        if (dom.libraryDropdown && !e.target.closest('#btnLibraryImage') && !e.target.closest('#libraryDropdown')) {
            dom.libraryDropdown.classList.add('hidden');
        }
        if (dom.insertMenu && !e.target.closest('#btnInsertToggle') && !e.target.closest('#insertMenu')) {
            dom.insertMenu.classList.add('hidden');
        }
        if (dom.openMenu && !e.target.closest('#btnOpenDropdown') && !e.target.closest('#openMenu')) {
            dom.openMenu.classList.add('hidden');
        }
    });

    dom.btnAdd.addEventListener('click', () => openEditor());

    dom.btnCloseModal.addEventListener('click', closeEditor);
    dom.btnCancel.addEventListener('click', closeEditor);

    // Help - ouvre la modale et scrolle vers le tutoriel liens symboliques
    dom.btnHelp.addEventListener('click', () => {
        openHelp();
        setTimeout(() => {
            const modalBody = dom.helpModal.querySelector('.modal-body');
            const sections = modalBody.querySelectorAll('section');
            if (sections.length > 2) sections[2].scrollIntoView();
        }, 100);
    });
    dom.btnCloseHelp.addEventListener('click', closeHelp);
    dom.btnCloseHelpFooter.addEventListener('click', closeHelp);

    // Copy mini buttons (for CSP compliance)
    document.querySelectorAll('.btn-copy-mini').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const textToCopy = e.currentTarget.getAttribute('data-copy-text');
            if (textToCopy) copyText(textToCopy, e.currentTarget);
        });
    });

    // Initial Type Selection (overlay)
    dom.typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            setMatchType(type);
            updateEditorUI();
            dom.typeOverlay.classList.add('hidden');
        });
    });

    // Content input -> update preview and vars
    dom.contentInput.addEventListener('input', () => {
        updatePreview();
        syncVarsFromText();
    });

    // Insert menu toggle
    if (dom.btnInsertToggle) {
        dom.btnInsertToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dom.insertMenu.classList.toggle('hidden');
        });
    }

    // Insert menu items
    dom.insertMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = item.dataset.insertType;
            insertVariable(type);
            dom.insertMenu.classList.add('hidden');
        });
    });

    // Toolbar format buttons
    dom.mdToolbarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleFormatToolbar(btn.dataset.md);
        });
    });

    // Mode toggle (HTML/Markdown)
    dom.mdModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentRichMode = btn.dataset.richMode;
            dom.mdModeBtns.forEach(b => b.classList.toggle('active', b.dataset.richMode === currentRichMode));
            updatePreview();
        });
    });

    // Date default format
    if (dom.dateFormatDefault) {
        dom.dateFormatDefault.addEventListener('input', updatePreview);
    }

    // Live Preview
    dom.yamlEditor.addEventListener('input', handleYamlEditorInput);
    dom.btnFormatYaml.addEventListener('click', formatYamlPreview);
    dom.btnCopyYaml.addEventListener('click', copyYamlContent);

    // Lang Switchers
    dom.langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            localStorage.setItem('espanso_lang', currentLang);
            updateLanguageUI();
            renderMatches();
            if (!dom.editorModal.classList.contains('hidden')) {
                updateEditorUI();
                updatePreview();
            }
        });
    });

    // New file/folder
    if (dom.btnNewFile) {
        dom.btnNewFile.addEventListener('click', createNewFile);
    }
    if (dom.btnNewFolder) {
        dom.btnNewFolder.addEventListener('click', createNewFolder);
    }

    // Événements d'importation d'image
    if (dom.btnSelectImage && dom.imageFileInput) {
        dom.btnSelectImage.addEventListener('click', () => dom.imageFileInput.click());
        dom.imageFileInput.addEventListener('change', handleImageUpload);
    }
    
    // Événement d'ouverture de la bibliothèque d'images
    if (dom.btnLibraryImage) {
        dom.btnLibraryImage.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (!isFolderMode || !currentDirHandle) {
                alert(currentLang === 'fr' ? "Veuillez ouvrir un dossier d'abord." : "Please open a folder first.");
                return;
            }
            dom.libraryDropdown.classList.toggle('hidden');
            if (!dom.libraryDropdown.classList.contains('hidden')) {
                await populateLibraryDropdown();
            }
        });
    }
    
    if (dom.imagePathInput) {
        dom.imagePathInput.addEventListener('input', updatePreview);
    }

    initTooltips();
}

// --- Nouvelle fonction d'aide pour obtenir le dossier du fichier YAML actif ---
async function getActiveFileDirHandle() {
    if (!isFolderMode || activeFolderFileIndex === -1) return null;
    const activeFile = folderFiles[activeFolderFileIndex];
    const parts = activeFile.name.split('/');
    parts.pop(); // Retire le nom du fichier pour garder le dossier
    
    let currentHandle = currentDirHandle;
    for (const part of parts) {
        if (part) {
            currentHandle = await currentHandle.getDirectoryHandle(part);
        }
    }
    return currentHandle;
}

// Détermine si le dossier de travail ouvert dans l'éditeur est la racine $CONFIG ou le sous-dossier match
function isWorkspaceRootConfig() {
    if (!isFolderMode) return false;
    return folderFiles.some(f => f.name.startsWith('match/'));
}

// Convertit le chemin virtuel $CONFIG/ d'Espanso ou un chemin relatif vers le chemin local réel du workspace
async function resolveLocalImage(path) {
    if (!isFolderMode || !currentDirHandle || !path) return null;
    
    let localPath = "";
    const isRoot = isWorkspaceRootConfig();
    
    if (path.startsWith('$CONFIG/')) {
        if (isRoot) {
            localPath = path.replace('$CONFIG/', '');
        } else {
            if (path.startsWith('$CONFIG/match/')) {
                localPath = path.replace('$CONFIG/match/', '');
                const rootName = currentDirHandle.name;
                if (rootName !== 'match' && localPath.startsWith(rootName + '/')) {
                    localPath = localPath.substring(rootName.length + 1);
                }
            } else {
                localPath = path.replace('$CONFIG/', '');
                const rootName = currentDirHandle.name;
                if (rootName !== 'espanso' && localPath.startsWith(rootName + '/')) {
                    localPath = localPath.substring(rootName.length + 1);
                }
            }
        }
    } else if (path.startsWith('~/') || path.match(/^[a-zA-Z]:\\/) || path.startsWith('/')) {
        return null;
    } else {
        // Chemin relatif
        if (activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
            const activeFile = folderFiles[activeFolderFileIndex];
            const parts = activeFile.name.split('/');
            parts.pop(); // Retire le nom du fichier
            if (parts.length > 0) {
                localPath = parts.join('/') + '/' + path;
            } else {
                localPath = path;
            }
        } else {
            localPath = path;
        }
    }
    
    try {
        const parts = localPath.split('/').filter(p => p && p !== '.');
        let resolvedParts = [];
        for (const p of parts) {
            if (p === '..') {
                resolvedParts.pop();
            } else {
                resolvedParts.push(p);
            }
        }
        
        let currentHandle = currentDirHandle;
        for (let i = 0; i < resolvedParts.length - 1; i++) {
            currentHandle = await currentHandle.getDirectoryHandle(resolvedParts[i]);
        }
        const fileHandle = await currentHandle.getFileHandle(resolvedParts[resolvedParts.length - 1]);
        const file = await fileHandle.getFile();
        return URL.createObjectURL(file);
    } catch (e) {
        if (e.name !== 'NotFoundError') {
            console.warn("Error resolving local image:", e);
        }
        return null;
    }
}

// Supprime l'image du disque en convertissant le chemin virtuel $CONFIG/ ou relatif en chemin local
async function deleteLocalImageFile(path) {
    if (!isFolderMode || !currentDirHandle || !supportsFileSystemAPI || !path) return;
    
    let localPath = "";
    const isRoot = isWorkspaceRootConfig();
    
    if (path.startsWith('$CONFIG/')) {
        if (isRoot) {
            localPath = path.replace('$CONFIG/', '');
        } else {
            if (path.startsWith('$CONFIG/match/')) {
                localPath = path.replace('$CONFIG/match/', '');
                const rootName = currentDirHandle.name;
                if (rootName !== 'match' && localPath.startsWith(rootName + '/')) {
                    localPath = localPath.substring(rootName.length + 1);
                }
            } else {
                localPath = path.replace('$CONFIG/', '');
                const rootName = currentDirHandle.name;
                if (rootName !== 'espanso' && localPath.startsWith(rootName + '/')) {
                    localPath = localPath.substring(rootName.length + 1);
                }
            }
        }
    } else if (path.startsWith('~/') || path.match(/^[a-zA-Z]:\\/) || path.startsWith('/')) {
        return;
    } else {
        if (activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
            const activeFile = folderFiles[activeFolderFileIndex];
            const parts = activeFile.name.split('/');
            parts.pop();
            if (parts.length > 0) {
                localPath = parts.join('/') + '/' + path;
            } else {
                localPath = path;
            }
        } else {
            localPath = path;
        }
    }
    
    try {
        const parts = localPath.split('/').filter(p => p && p !== '.');
        let resolvedParts = [];
        for (const p of parts) {
            if (p === '..') {
                resolvedParts.pop();
            } else {
                resolvedParts.push(p);
            }
        }
        
        let currentHandle = currentDirHandle;
        for (let i = 0; i < resolvedParts.length - 1; i++) {
            currentHandle = await currentHandle.getDirectoryHandle(resolvedParts[i]);
        }
        const fileName = resolvedParts[resolvedParts.length - 1];
        await currentHandle.removeEntry(fileName);
        dom.statusMessage.innerText = currentLang === 'fr' ? `Image supprimée : ${fileName}` : `Image deleted: ${fileName}`;
    } catch (err) {
        if (err.name !== 'NotFoundError') {
            console.error("Error deleting image file:", err);
        }
    }
}

// --- Image Upload Handler ---

async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (isFolderMode && currentDirHandle && supportsFileSystemAPI) {
        try {
            // 1. On récupère le dossier parent du fichier actif
            const activeDirHandle = await getActiveFileDirHandle() || currentDirHandle;
            const imgDirHandle = await activeDirHandle.getDirectoryHandle('img', { create: true });
            const fileHandle = await imgDirHandle.getFileHandle(file.name, { create: true });
            
            const writable = await fileHandle.createWritable();
            await writable.write(file);
            await writable.close();
            
            // 2. On reconstruit dynamiquement le chemin virtuel $CONFIG/ attendu par Espanso
            const activeFile = folderFiles[activeFolderFileIndex];
            const isRoot = isWorkspaceRootConfig();
            
            let virtualPath = "";
            if (isRoot) {
                // Le workspace ouvert est la racine de la config (ex: "match/naheulbeuk/barbare.yml")
                const parts = activeFile.name.split('/');
                parts.pop(); // Retire le nom du fichier
                const folderPath = parts.join('/');
                virtualPath = `$CONFIG/${folderPath}/img/${file.name}`;
            } else {
                // Le workspace ouvert est directement le dossier "match" (ex: "naheulbeuk/barbare.yml")
                const parts = activeFile.name.split('/');
                parts.pop();
                const folderPath = parts.join('/');
                virtualPath = folderPath 
                    ? `$CONFIG/match/${folderPath}/img/${file.name}`
                    : `$CONFIG/match/img/${file.name}`;
            }
            
            dom.imagePathInput.value = virtualPath;
            
            const base64Data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
            dom.imagePathInput.dataset.previewBlob = base64Data;
            
            dom.statusMessage.innerText = t('statusImageCopied') + ` (${file.name})`;
            updatePreview();
            
            // On conserve le fichier actif lors du rechargement de l'explorateur
            const activeFileName = folderFiles[activeFolderFileIndex]?.name || null;
            await readDirectory(currentDirHandle, activeFileName);
        } catch (err) {
            console.error('Erreur lors de la sauvegarde de l\'image :', err);
            alert(t('errorImageUpload'));
        }
    } else {
        const reader = new FileReader();
        reader.onload = function (event) {
            dom.imagePathInput.value = `$CONFIG/img/${file.name}`;
            dom.imagePathInput.dataset.previewBlob = event.target.result;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

async function scanImages(dirHandle, path = '') {
    let images = [];
    try {
        for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file') {
                const name = entry.name.toLowerCase();
                if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.gif') || name.endsWith('.webp')) {
                    images.push({ name: entry.name, relativePath: path ? `${path}/${entry.name}` : entry.name, handle: entry });
                }
            } else if (entry.kind === 'directory') {
                const subImgs = await scanImages(entry, path ? `${path}/${entry.name}` : entry.name);
                images = images.concat(subImgs);
            }
        }
    } catch (e) {
        console.warn("Could not scan directory:", e);
    }
    return images;
}

async function populateLibraryDropdown() {
    if (!dom.libraryDropdown) return;
    dom.libraryDropdown.innerHTML = `<div style="padding: 0.5rem; text-align: center; color: var(--text-secondary); font-size: 0.8rem;">Chargement...</div>`;
    
    const images = await scanImages(currentDirHandle);
    if (images.length === 0) {
        dom.libraryDropdown.innerHTML = `<div style="padding: 0.5rem; text-align: center; color: var(--text-secondary); font-size: 0.8rem;">Aucune image trouvée</div>`;
        return;
    }
    
    dom.libraryDropdown.innerHTML = '';
    for (const img of images) {
        const btn = document.createElement('button');
        btn.className = 'dropdown-item';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '0.5rem';
        
        const isRoot = isWorkspaceRootConfig();
        let virtualPath = "";
        if (isRoot) {
            virtualPath = `$CONFIG/${img.relativePath}`;
        } else {
            const rootName = currentDirHandle.name.toLowerCase();
            if (rootName === 'match') {
                virtualPath = `$CONFIG/match/${img.relativePath}`;
            } else {
                virtualPath = `$CONFIG/match/${currentDirHandle.name}/${img.relativePath}`;
            }
        }

        try {
            const file = await img.handle.getFile();
            const blobUrl = URL.createObjectURL(file);
            
            btn.innerHTML = `<img src="${blobUrl}" style="width:24px;height:24px;object-fit:contain;border-radius:2px;background:#f3f4f6;" />
                             <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.8rem;" title="${img.relativePath}">${img.name}</span>`;
            
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                dom.imagePathInput.value = virtualPath;
                delete dom.imagePathInput.dataset.previewBlob;
                dom.libraryDropdown.classList.add('hidden');
                updatePreview();
            });

            dom.libraryDropdown.appendChild(btn);
        } catch (e) {
            console.warn("Failed to load image for library:", e);
        }
    }
}

// --- Tooltips Logic ---
let globalTooltip = null;

function initTooltips() {
    if (!document.querySelector('.global-tooltip')) {
        globalTooltip = document.createElement('div');
        globalTooltip.className = 'global-tooltip';
        document.body.appendChild(globalTooltip);
    } else {
        globalTooltip = document.querySelector('.global-tooltip');
    }

    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('tooltip-icon')) {
            const text = e.target.getAttribute('data-tooltip');
            if (text) showGlobalTooltip(e.target, text);
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('tooltip-icon')) hideGlobalTooltip();
    });

    document.addEventListener('scroll', hideGlobalTooltip, true);
    window.addEventListener('resize', hideGlobalTooltip);
}

function showGlobalTooltip(target, text) {
    if (!globalTooltip) return;
    globalTooltip.textContent = text;
    globalTooltip.classList.add('visible');
    const rect = target.getBoundingClientRect();
    const tooltipRect = globalTooltip.getBoundingClientRect();
    let top = rect.top - tooltipRect.height - 10;
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    if (top < 10) top = rect.bottom + 10;
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    globalTooltip.style.top = `${top}px`;
    globalTooltip.style.left = `${left}px`;
}

function hideGlobalTooltip() {
    if (globalTooltip) globalTooltip.classList.remove('visible');
}

// --- I18n Logic ---

function updateLanguageUI() {
    const t = translations[currentLang];
    const elements = Array.from(document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-tooltip]'));
    document.querySelectorAll('template').forEach(template => {
        elements.push(...Array.from(template.content.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-tooltip]')));
    });

    elements.forEach(el => {
        if (el.closest && el.closest('.btn-feedback-active')) return;
        if (el.dataset.i18n) {
            const key = el.dataset.i18n;
            if (t[key]) {
                if (/<[a-z][\s\S]*>/i.test(t[key])) el.innerHTML = t[key];
                else el.innerText = t[key];
            }
        }
        if (el.dataset.i18nPlaceholder) {
            const key = el.dataset.i18nPlaceholder;
            if (t[key]) el.placeholder = t[key];
        }
        if (el.dataset.i18nTitle) {
            const key = el.dataset.i18nTitle;
            if (t[key]) el.title = t[key];
        }
        if (el.dataset.i18nTooltip) {
            const key = el.dataset.i18nTooltip;
            if (t[key]) el.setAttribute('data-tooltip', t[key]);
        }
    });

    dom.langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    document.querySelectorAll('.type-btn-large').forEach(btn => {
        const type = btn.dataset.type;
        const key = 'type' + type.charAt(0).toUpperCase() + type.slice(1);
        const span = btn.querySelector('span');
        if (span && t[key]) span.innerText = t[key];
    });

    if (!fileHandle) {
        dom.statusMessage.innerText = t.statusEmpty;
    }
}

function t(key) {
    return translations[currentLang][key] || key;
}

function closeDropdown() {
    if (dom.saveDropdown) dom.saveDropdown.classList.add('hidden');
    if (dom.libraryDropdown) dom.libraryDropdown.classList.add('hidden');
}

// --- Help Logic ---
function openHelp() { dom.helpModal.classList.remove('hidden'); }
function closeHelp() { dom.helpModal.classList.add('hidden'); }

function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => showFeedback(btn, 'copied'));
}

function showFeedback(btn, key) {
    const span = btn.querySelector('span[data-i18n]') || btn;
    const originalKey = span.getAttribute('data-i18n');
    btn.classList.add('btn-feedback-active');
    span.innerText = translations[currentLang][key] || key;
    setTimeout(() => {
        btn.classList.remove('btn-feedback-active');
        if (originalKey) span.innerText = translations[currentLang][originalKey];
    }, 2000);
}

function hasUnsavedChanges() {
    if (isFolderMode) {
        return folderFiles.some(f => f.isModified);
    }
    return isSingleFileModified;
}

function confirmUnsavedChanges() {
    if (hasUnsavedChanges()) {
        const message = currentLang === 'fr' 
            ? "Vous avez des modifications non enregistrées. Voulez-vous vraiment continuer sans sauvegarder ?" 
            : "You have unsaved changes. Do you really want to proceed without saving?";
        return confirm(message);
    }
    return true;
}

function updateSingleFileStatusIndicator() {
    if (isFolderMode) return;
    const t = translations[currentLang];
    const baseStatus = fileHandle ? `${t.statusOpened}${fileHandle.name}` : t.statusEmpty;
    if (isSingleFileModified) {
        dom.statusMessage.innerHTML = `${baseStatus} <span class="modified-dot" style="display:inline; margin-left:5px;">●</span>`;
    } else {
        dom.statusMessage.innerText = baseStatus;
    }
}

// --- File System Logic ---

async function loadFile() {
    if (!confirmUnsavedChanges()) return;
    if (!window.showOpenFilePicker) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.yml,.yaml';
        input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
                const text = await file.text();
                isFolderMode = false;
                fileHandle = null;
                isSingleFileModified = false;
                parseYaml(text);
                dom.statusMessage.innerText = `${t('statusOpened')}${file.name}`;
                renderSidebar();
            } catch (err) {
                console.error('Error reading file:', err);
                alert(t('statusErrorLoading'));
            }
        });
        input.click();
        return;
    }
    try {
        const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'Espanso YAML Files', accept: { 'text/yaml': ['.yml', '.yaml'] } }],
        });
        isFolderMode = false;
        fileHandle = handle;
        isSingleFileModified = false;
        const file = await fileHandle.getFile();
        const text = await file.text();
        parseYaml(text);
        dom.statusMessage.innerText = `${t('statusOpened')}${file.name}`;
    } catch (err) {
        if (err.name !== 'AbortError') { console.error('Error loading file:', err); alert(t('statusErrorLoading')); }
    }
}

async function loadFolder() {
    if (!confirmUnsavedChanges()) return;
    try {
        if (!window.showDirectoryPicker) { openFolderFallback(); return; }
        const dirHandle = await window.showDirectoryPicker();
        await readDirectory(dirHandle);
    } catch (err) {
        if (err.name !== 'AbortError') { console.error('Error loading folder:', err); alert(t('statusErrorLoading')); }
    }
}

async function readDirectory(dirHandle, preserveFileName = null) {
    if (!preserveFileName && isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
        preserveFileName = folderFiles[activeFolderFileIndex].name;
    }

    try {
        const { files, dirs } = await getFilesAndDirsRecursive(dirHandle);
        
        files.sort((a, b) => {
            const aParts = a.relativePath.split('/');
            const bParts = b.relativePath.split('/');
            const aDir = aParts.slice(0, -1).join('/');
            const bDir = bParts.slice(0, -1).join('/');
            const aFile = aParts[aParts.length - 1];
            const bFile = bParts[bParts.length - 1];
            if (aDir && bDir) { const dc = aDir.localeCompare(bDir); if (dc !== 0) return dc; return aFile.localeCompare(bFile); }
            if (aDir && !bDir) return -1; if (!aDir && bDir) return 1; return aFile.localeCompare(bFile);
        });

        folderFiles = [];
        for (const f of files) {
            try {
                const file = await f.handle.getFile();
                const text = await file.text();
                let parsedMatches = [];
                let hasParseError = false;
                let parseErrorMessage = '';
                try { 
                    const data = jsyaml.load(text, { schema: jsyaml.CORE_SCHEMA }); 
                    if (data && data.matches) {
                        parsedMatches = data.matches; 
                    } else {
                        parsedMatches = [];
                    }
                } catch (e) { 
                    console.warn(`Error parsing YAML in ${f.relativePath}:`, e); 
                    hasParseError = true;
                    parseErrorMessage = e.message;
                }
                folderFiles.push({ 
                    name: f.relativePath, 
                    handle: f.handle, 
                    content: text, 
                    matches: parsedMatches, 
                    isModified: false,
                    hasParseError: hasParseError,
                    parseErrorMessage: parseErrorMessage
                });
            } catch (e) { console.error(`Error reading file ${f.relativePath}:`, e); }
        }

        folderDirs = dirs.map(d => d.relativePath);
        currentDirHandle = dirHandle;
        isFolderMode = true;
        
        if (folderFiles.length > 0) {
            let targetIndex = 0;
            if (preserveFileName) {
                const foundIndex = folderFiles.findIndex(f => f.name === preserveFileName);
                if (foundIndex !== -1) {
                    targetIndex = foundIndex;
                }
            }
            activeFolderFileIndex = -1;
            selectFolderFile(targetIndex);
        } else {
            activeFolderFileIndex = -1;
            currentMatches = [];
            fileHandle = null;
            renderMatches();
            updateYamlPreview();
        }
        dom.statusMessage.innerText = `${t('statusFolderOpened')}${dirHandle.name}`;
    } catch (err) {
        console.error('Error reading directory:', err);
        alert(t('statusErrorLoading'));
    }
}

async function getFilesAndDirsRecursive(dirHandle, path = '', depth = 0) {
    const MAX_DEPTH = 10;
    if (depth > MAX_DEPTH) { console.warn(`Reached max depth at "${path}"`); return { files: [], dirs: [] }; }
    let files = [];
    let dirs = [];
    for await (const entry of dirHandle.values()) {
        const relativePath = path ? `${path}/${entry.name}` : entry.name;
        if (entry.kind === 'file') { 
            if (entry.name.endsWith('.yml') || entry.name.endsWith('.yaml')) {
                files.push({ handle: entry, relativePath }); 
            }
        } else if (entry.kind === 'directory') { 
            dirs.push({ handle: entry, relativePath });
            const sub = await getFilesAndDirsRecursive(entry, relativePath, depth + 1); 
            files = files.concat(sub.files);
            dirs = dirs.concat(sub.dirs);
        }
    }
    return { files, dirs };
}

function openFolderFallback() {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.directory = true;
    input.multiple = true;
    input.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files).filter(f => f.name.endsWith('.yml') || f.name.endsWith('.yaml'));
        files.sort((a, b) => {
            const aPath = a.webkitRelativePath, bPath = b.webkitRelativePath;
            const aParts = aPath.split('/'), bParts = bPath.split('/');
            aParts.shift(); bParts.shift();
            const aDir = aParts.slice(0, -1).join('/'), bDir = bParts.slice(0, -1).join('/');
            const aFile = aParts[aParts.length - 1], bFile = bParts[bParts.length - 1];
            if (aDir && bDir) { const dc = aDir.localeCompare(bDir); if (dc !== 0) return dc; return aFile.localeCompare(bFile); }
            if (aDir && !bDir) return -1; if (!aDir && bDir) return 1; return aFile.localeCompare(bFile);
        });
        
        folderFiles = [];
        const detectedDirs = new Set();
        for (const file of files) {
            try {
                const text = await file.text();
                let parsedMatches = [];
                let hasParseError = false;
                let parseErrorMessage = '';
                try { 
                    const data = jsyaml.load(text, { schema: jsyaml.CORE_SCHEMA }); 
                    if (data && data.matches) {
                        parsedMatches = data.matches; 
                    } else {
                        parsedMatches = [];
                    }
                } catch (err) { 
                    console.warn(`Error parsing YAML in ${file.webkitRelativePath}:`, err); 
                    hasParseError = true;
                    parseErrorMessage = err.message;
                }
                const parts = file.webkitRelativePath.split('/'); parts.shift();
                const relativePath = parts.join('/') || file.name;
                
                for (let i = 1; i < parts.length; i++) {
                    detectedDirs.add(parts.slice(0, i).join('/'));
                }
                
                folderFiles.push({ 
                    name: relativePath, 
                    handle: null, 
                    fileObject: file, 
                    content: text, 
                    matches: parsedMatches, 
                    isModified: false,
                    hasParseError: hasParseError,
                    parseErrorMessage: parseErrorMessage
                });
            } catch (err) { console.error(`Error reading file ${file.name}:`, err); }
        }
        
        folderDirs = Array.from(detectedDirs);
        isFolderMode = true;
        
        if (folderFiles.length > 0) {
            activeFolderFileIndex = -1;
            selectFolderFile(0);
        } else {
            activeFolderFileIndex = -1;
            currentMatches = [];
            fileHandle = null;
            renderMatches();
            updateYamlPreview();
        }
        const rootFolder = e.target.files[0]?.webkitRelativePath.split('/')[0] || 'Dossier';
        dom.statusMessage.innerText = `${t('statusFolderOpened')}${rootFolder}`;
    });
    input.click();
}

function selectFolderFile(index) {
    if (index < 0 || index >= folderFiles.length) return;
    
    if (isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length && activeFolderFileIndex !== index) {
        const oldFile = folderFiles[activeFolderFileIndex];
        if (!oldFile.hasParseError) {
            oldFile.matches = [...currentMatches];
            oldFile.content = generateYaml();
        }
    }
    
    activeFolderFileIndex = index;
    const activeFile = folderFiles[index];
    currentMatches = [...activeFile.matches];
    fileHandle = activeFile.handle;
    
    renderMatches();
    
    if (activeFile.hasParseError) {
        dom.yamlEditor.value = activeFile.content;
    } else {
        updateYamlPreview();
    }
}

function markActiveFileAsModified() {
    if (isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
        folderFiles[activeFolderFileIndex].isModified = true;
        renderSidebar();
    } else if (!isFolderMode) {
        isSingleFileModified = true;
        updateSingleFileStatusIndicator();
    }
}

async function saveFile(btn = dom.btnSave) {
    if (!fileHandle) { saveFileAs(btn); return; }
    if (isFolderMode) {
        const fileName = fileHandle.name || 'fichier';
        if (!confirm(`Vous allez écraser le fichier original "${fileName}". Confirmer ?`)) return;
    }
    try {
        const writable = await fileHandle.createWritable();
        
        let yamlContent;
        if (isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
            const activeFile = folderFiles[activeFolderFileIndex];
            if (activeFile.hasParseError) {
                yamlContent = dom.yamlEditor.value;
            } else {
                yamlContent = generateYaml();
            }
        } else {
            yamlContent = generateYaml();
        }
        
        await writable.write(yamlContent);
        await writable.close();
        
        if (isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
            const activeFile = folderFiles[activeFolderFileIndex];
            activeFile.isModified = false;
            activeFile.content = yamlContent;
            
            try {
                const data = jsyaml.load(yamlContent, { schema: jsyaml.CORE_SCHEMA });
                if (data && data.matches) {
                    activeFile.matches = data.matches;
                    activeFile.hasParseError = false;
                    activeFile.parseErrorMessage = '';
                    currentMatches = [...activeFile.matches];
                }
            } catch (e) {
                activeFile.hasParseError = true;
                activeFile.parseErrorMessage = e.message;
            }
            
            renderSidebar();
            renderMatches();
        } else if (!isFolderMode) {
            isSingleFileModified = false;
            updateSingleFileStatusIndicator();
        }
        
        dom.statusMessage.innerText = `${t('statusOpened')}${fileHandle.name} (${new Date().toLocaleTimeString()})`;
        showFeedback(btn, 'statusSavedShort');
    } catch (err) { console.error('Error saving file:', err); alert(t('statusErrorSaving')); }
}

async function saveFileAs(btn = dom.btnSaveAs) {
    const yamlContent = generateYaml();
    let fileName = 'match.yml';
    if (isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
        const pathParts = folderFiles[activeFolderFileIndex].name.split('/');
        fileName = pathParts[pathParts.length - 1];
    } else if (fileHandle) { fileName = fileHandle.name; }
    if (!window.showSaveFilePicker) {
        try {
            const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a'); link.href = url; link.download = fileName;
            document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
            if (isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
                folderFiles[activeFolderFileIndex].isModified = false;
                folderFiles[activeFolderFileIndex].content = yamlContent;
                renderSidebar();
            }
            dom.statusMessage.innerText = `${t('statusSaved')} : ${fileName}`;
            showFeedback(btn, 'statusSavedShort');
        } catch (err) { console.error('Error downloading file:', err); alert(t('statusErrorSaving')); }
        return;
    }
    try {
        const handle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types: [{ description: 'Espanso YAML File', accept: { 'text/yaml': ['.yml'] } }],
        });
        fileHandle = handle;
        if (isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
            folderFiles[activeFolderFileIndex].handle = handle;
            folderFiles[activeFolderFileIndex].name = handle.name;
        }
        await saveFile(btn);
    } catch (err) { if (err.name !== 'AbortError') { console.error('Error saving file:', err); alert(t('statusErrorSaving')); } }
}

// --- Data Parsing/Generation ---

function parseYaml(text) {
    try {
        const data = jsyaml.load(text, { schema: jsyaml.CORE_SCHEMA });
        if (data && data.matches) { currentMatches = data.matches; } else { currentMatches = []; }
        renderMatches();
        updateYamlPreview();
    } catch (e) { alert(t('statusErrorLoading') + ' : ' + e.message); }
}

function generateYaml() {
    const data = { matches: currentMatches };
    const header = `# espanso match file\n# Generated by Espanso Editor\n\nmatches:\n`;
    if (!currentMatches || currentMatches.length === 0) return header;
    const yamlBody = jsyaml.dump(data.matches, { indent: 2, lineWidth: -1, quotingType: '"', noRefs: true });
    const indentedBody = yamlBody.split('\n').map(line => line ? '  ' + line : line).join('\n');
    return header + indentedBody;
}

// --- Drag and Drop Logic ---
let draggedIndex = null;

function handleDragStart(e, index) { draggedIndex = index; e.dataTransfer.effectAllowed = 'move'; e.target.classList.add('dragging'); }
function handleDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; const t = e.target.closest('.sidebar-item'); if (t) t.classList.add('drag-over'); }
function handleDragLeave(e) { const t = e.target.closest('.sidebar-item'); if (t) t.classList.remove('drag-over'); }
function handleDrop(e, targetIndex) {
    e.preventDefault(); const t = e.target.closest('.sidebar-item'); if (t) t.classList.remove('drag-over');
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const item = currentMatches.splice(draggedIndex, 1)[0]; currentMatches.splice(targetIndex, 0, item);
    markActiveFileAsModified(); renderMatches(targetIndex); updateYamlPreview();
}
function handleDragEnd(e) { e.target.classList.remove('dragging'); draggedIndex = null; }

function sortMatchesAlphabetically() {
    if (!currentMatches || currentMatches.length < 2) return;
    sortDirection = sortDirection === 1 ? -1 : 1;
    currentMatches.sort((a, b) => { return (a.trigger || "").toLowerCase().localeCompare((b.trigger || "").toLowerCase()) * sortDirection; });
    updateSortButtonIcon(); markActiveFileAsModified(); renderMatches(); updateYamlPreview();
}

function sortFilesAlphabetically() {
    if (!isFolderMode || folderFiles.length < 2) return;
    fileSortDirection = fileSortDirection === 1 ? -1 : 1;
    updateFileSortButtonIcon(); renderSidebar();
}

// --- File Tree & Drag Logic ---
function saveExpandedState(node, parentPath) {
    if (node.children) { for (const dirName of Object.keys(node.children)) { const dirPath = parentPath ? parentPath + '/' + dirName : dirName; expandedFolders[dirPath] = node.children[dirName].expanded; saveExpandedState(node.children[dirName], dirPath); } }
}
function buildFileTree(fileList) {
    const root = { children: {}, files: [] };
    
    if (Array.isArray(folderDirs)) {
        folderDirs.forEach(dirPath => {
            const parts = dirPath.split('/');
            let current = root;
            for (let i = 0; i < parts.length; i++) {
                const dirName = parts[i];
                if (!current.children[dirName]) {
                    const currentPath = parts.slice(0, i + 1).join('/');
                    const savedExpanded = expandedFolders[currentPath];
                    current.children[dirName] = {
                        name: dirName,
                        parent: current,
                        children: {},
                        files: [],
                        expanded: savedExpanded !== undefined ? savedExpanded : true
                    };
                }
                current = current.children[dirName];
            }
        });
    }

    const sorted = [...fileList].sort((a, b) => {
        const aParts = a.name.split('/'), bParts = b.name.split('/');
        const aDir = aParts.slice(0, -1).join('/'), bDir = bParts.slice(0, -1).join('/');
        if (aDir && !bDir) return -1; if (!aDir && bDir) return 1;
        if (aDir && bDir) { const dc = aDir.localeCompare(bDir); if (dc !== 0) return dc; }
        return (aParts[aParts.length - 1] || '').localeCompare((bParts[bParts.length - 1] || '')) * fileSortDirection;
    });

    sorted.forEach(file => {
        const parts = file.name.split('/');
        if (parts.length === 1) {
            root.files.push(file);
        } else {
            let current = root;
            for (let i = 0; i < parts.length - 1; i++) {
                const dirName = parts[i];
                if (!current.children[dirName]) {
                    const dirPath = parts.slice(0, i + 1).join('/');
                    const savedExpanded = expandedFolders[dirPath];
                    current.children[dirName] = { 
                        name: dirName, 
                        parent: current, 
                        children: {}, 
                        files: [], 
                        expanded: savedExpanded !== undefined ? savedExpanded : true 
                    };
                }
                current = current.children[dirName];
            }
            current.files.push(file);
        }
    });
    return root;
}
let fileDragData = null;

function handleFileDragStart(e, fileIndex) { fileDragData = { index: fileIndex }; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', 'file'); e.target.classList.add('dragging'); }
function handleFileDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; const dz = e.target.closest('.sidebar-file-item, .sidebar-dir-header'); if (dz) dz.classList.add('drag-over'); }
function handleFileDragLeave(e) { const dz = e.target.closest('.sidebar-file-item, .sidebar-dir-header'); if (dz) dz.classList.remove('drag-over'); }
function handleFileDrop(e, targetFileIndex) {
    e.preventDefault(); document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over')); if (!fileDragData) return;
    if (!supportsFileSystemAPI || !currentDirHandle) { alert(t('alertNoApi')); fileDragData = null; return; }
    if (fileDragData.index === targetFileIndex) { fileDragData = null; return; }
    const sourceFile = folderFiles[fileDragData.index], targetFile = folderFiles[targetFileIndex];
    if (!sourceFile || !targetFile) { fileDragData = null; return; }
    const targetParts = targetFile.name.split('/'); const targetDir = targetParts.slice(0, -1).join('/');
    moveFileToDirectory(sourceFile, targetDir);
}
async function handleFileDropOnDir(e, dirPath) {
    e.preventDefault(); document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over')); if (!fileDragData) return;
    if (!supportsFileSystemAPI || !currentDirHandle) { alert(t('alertNoApi')); fileDragData = null; return; }
    const sourceFile = folderFiles[fileDragData.index]; if (!sourceFile) { fileDragData = null; return; }
    moveFileToDirectory(sourceFile, dirPath);
}
function fileDragEnd(e) { e.target.classList.remove('dragging'); fileDragData = null; }
async function moveFileToDirectory(sourceFile, targetDirPath) {
    const sourceName = sourceFile.name.split('/').pop();
    const sourceDir = sourceFile.name.split('/').slice(0, -1).join('/');
    if (sourceDir === targetDirPath) { fileDragData = null; return; }
    if (!confirm(`${currentLang === 'fr' ? 'Déplacer ce fichier ?' : 'Move this file?'}\n"${sourceName}" → ${targetDirPath || '(racine)'}`)) { fileDragData = null; return; }
    try {
        const sourcePathParts = sourceFile.name.split('/'); let sourceDirHandle = currentDirHandle;
        for (let i = 0; i < sourcePathParts.length - 1; i++) sourceDirHandle = await sourceDirHandle.getDirectoryHandle(sourcePathParts[i]);
        const fileHandleToMove = sourceFile.handle;
        let destDirHandle = currentDirHandle;
        if (targetDirPath) { const dirParts = targetDirPath.split('/'); for (const dirPart of dirParts) destDirHandle = await destDirHandle.getDirectoryHandle(dirPart, { create: true }); }
        try { await destDirHandle.getFileHandle(sourceName); if (!confirm(`${currentLang === 'fr' ? 'Le fichier existe déjà. Remplacer ?' : 'File already exists. Overwrite?'}`)) { fileDragData = null; return; } } catch (e) {}
        await fileHandleToMove.move(destDirHandle, sourceName);
        await readDirectory(currentDirHandle);
    } catch (err) { console.error('Error moving file:', err); alert(t('errorCreatingFile') + ': ' + err.message); }
    fileDragData = null;
}

function updateFileSortButtonIcon() {
    if (!dom.btnSortFiles) return;
    const svgArrow = fileSortDirection === 1 ? `<path d="M11 5h10"></path><path d="M11 9h7"></path><path d="M11 13h4"></path><path d="M3 17l3 3 3-3"></path><path d="M6 18V4"></path>` : `<path d="M3 7l3-3 3 3"></path><path d="M6 4v16"></path><path d="M11 19h10"></path><path d="M11 15h7"></path><path d="M11 11h4"></path>`;
    dom.btnSortFiles.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgArrow}</svg>`;
}

function updateSortButtonIcon() {
    if (!dom.btnSortAlpha) return;
    const svgArrow = sortDirection === 1 ? `<path d="M11 5h10"></path><path d="M11 9h7"></path><path d="M11 13h4"></path><path d="M3 17l3 3 3-3"></path><path d="M6 18V4"></path>` : `<path d="M3 7l3-3 3 3"></path><path d="M6 4v16"></path><path d="M11 19h10"></path><path d="M11 15h7"></path><path d="M11 11h4"></path>`;
    dom.btnSortAlpha.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgArrow}</svg>`;
    dom.btnSortAlpha.title = sortDirection === 1 ? t('btnSortAlpha') : (currentLang === 'fr' ? 'Trier Z-A' : 'Sort Z-A');
}

// Résout récursivement un handle de sous-dossier à partir de son chemin virtuel
async function getDirHandleFromPath(dirPath) {
    if (!dirPath) return currentDirHandle;
    const parts = dirPath.split('/');
    let current = currentDirHandle;
    for (const part of parts) {
        if (part) {
            current = await current.getDirectoryHandle(part);
        }
    }
    return current;
}

async function renameFile(fileIndex) {
    if (!supportsFileSystemAPI || !currentDirHandle) return;
    const fileObj = folderFiles[fileIndex];
    const oldName = fileObj.name.split('/').pop();
    const newName = prompt(currentLang === 'fr' ? "Nouveau nom du fichier :" : "New file name:", oldName);
    if (!newName || newName === oldName) return;
    
    let finalName = newName;
    if (!finalName.endsWith('.yml') && !finalName.endsWith('.yaml')) {
        finalName += '.yml';
    }
    
    try {
        await fileObj.handle.move(finalName);
        await readDirectory(currentDirHandle);
    } catch (err) {
        console.error("Error renaming file:", err);
        alert(currentLang === 'fr' ? "Erreur lors du renommage du fichier." : "Error renaming file.");
    }
}

async function deleteFile(fileIndex) {
    if (!supportsFileSystemAPI || !currentDirHandle) return;
    const fileObj = folderFiles[fileIndex];
    const name = fileObj.name.split('/').pop();
    if (!confirm(currentLang === 'fr' ? `Supprimer définitivement le fichier "${name}" ?` : `Permanently delete file "${name}"?`)) return;
    
    try {
        if (typeof fileObj.handle.remove === 'function') {
            await fileObj.handle.remove();
        } else {
            const pathParts = fileObj.name.split('/');
            const parentPath = pathParts.slice(0, -1).join('/');
            const parentHandle = await getDirHandleFromPath(parentPath);
            await parentHandle.removeEntry(pathParts[pathParts.length - 1]);
        }
        
        if (activeFolderFileIndex === fileIndex) {
            activeFolderFileIndex = -1;
            currentMatches = [];
            fileHandle = null;
        }
        
        await readDirectory(currentDirHandle);
    } catch (err) {
        console.error("Error deleting file:", err);
        alert(currentLang === 'fr' ? "Erreur lors de la suppression." : "Error deleting file.");
    }
}

// Vérifie si un dossier est vide
async function isDirEmpty(dirHandle) {
    for await (const entry of dirHandle.values()) {
        return false; // Contient au moins un élément
    }
    return true; // Dossier vide
}

// Copie récursivement le contenu d'un répertoire source vers un répertoire cible
async function copyDirectoryHelper(sourceHandle, targetHandle) {
    for await (const entry of sourceHandle.values()) {
        if (entry.kind === 'file') {
            const file = await entry.getFile();
            const newFileHandle = await targetHandle.getFileHandle(entry.name, { create: true });
            const writable = await newFileHandle.createWritable();
            await writable.write(file);
            await writable.close();
        } else if (entry.kind === 'directory') {
            const newDirHandle = await targetHandle.getDirectoryHandle(entry.name, { create: true });
            const subSourceHandle = await sourceHandle.getDirectoryHandle(entry.name);
            await copyDirectoryHelper(subSourceHandle, newDirHandle);
        }
    }
}

// Fonction de suppression de dossier mise à jour avec vérification de contenu
async function deleteFolder(dirPath) {
    if (!supportsFileSystemAPI || !currentDirHandle) return;
    const parts = dirPath.split('/');
    const dirName = parts[parts.length - 1];
    
    try {
        const dirHandle = await getDirHandleFromPath(dirPath);
        const isEmpty = await isDirEmpty(dirHandle);
        
        let confirmationMessage = "";
        if (!isEmpty) {
            confirmationMessage = currentLang === 'fr' 
                ? `⚠️ Le dossier "${dirName}" n'est pas vide. Voulez-vous vraiment supprimer ce dossier et TOUT son contenu ?`
                : `⚠️ The folder "${dirName}" is not empty. Do you really want to delete this folder and ALL its contents?`;
        } else {
            confirmationMessage = currentLang === 'fr'
                ? `Supprimer le dossier vide "${dirName}" ?`
                : `Delete empty folder "${dirName}"?`;
        }
        
        if (!confirm(confirmationMessage)) return;
        
        const parentPath = parts.slice(0, -1).join('/');
        const parentHandle = await getDirHandleFromPath(parentPath);
        await parentHandle.removeEntry(dirName, { recursive: true });
        
        // Réinitialise la sélection active si le fichier en cours d'édition était dans le dossier supprimé
        if (activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
            const activeFile = folderFiles[activeFolderFileIndex];
            if (activeFile.name.startsWith(dirPath + '/')) {
                activeFolderFileIndex = -1;
                currentMatches = [];
                fileHandle = null;
            }
        }
        
        await readDirectory(currentDirHandle);
    } catch (err) {
        console.error("Error deleting folder:", err);
        alert(currentLang === 'fr' ? "Erreur lors de la suppression du dossier." : "Error deleting folder.");
    }
}

// Fonction de renommage de dossier mise à jour avec contournement pour Chrome
async function renameFolder(dirPath) {
    if (!supportsFileSystemAPI || !currentDirHandle) return;
    const parts = dirPath.split('/');
    const oldName = parts[parts.length - 1];
    const parentPath = parts.slice(0, -1).join('/');
    
    const newName = prompt(currentLang === 'fr' ? "Nouveau nom du dossier :" : "New folder name:", oldName);
    if (!newName || newName === oldName) return;
    if (!/^[a-zA-Z0-9_\- ]+$/.test(newName)) {
        alert(currentLang === 'fr' ? "Nom de dossier invalide." : "Invalid folder name.");
        return;
    }

    try {
        const parentHandle = await getDirHandleFromPath(parentPath);
        const sourceHandle = await getDirHandleFromPath(dirPath);
        
        // 1. Crée le dossier cible avec le nouveau nom
        const targetHandle = await parentHandle.getDirectoryHandle(newName, { create: true });
        
        // 2. Copie récursivement tout le contenu
        await copyDirectoryHelper(sourceHandle, targetHandle);
        
        // 3. Supprime l'ancien répertoire
        await parentHandle.removeEntry(oldName, { recursive: true });
        
        // 4. Mémorise le chemin relatif du fichier ouvert actuellement
        let activeRelPath = "";
        if (activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
            activeRelPath = folderFiles[activeFolderFileIndex].name;
        }
        
        // 5. Met à jour l'arbre de fichiers
        await readDirectory(currentDirHandle);
        
        // 6. Restaure la sélection active si elle faisait partie du dossier renommé
        if (activeRelPath) {
            const oldPrefix = dirPath + '/';
            const newPrefix = parentPath ? `${parentPath}/${newName}/` : `${newName}/`;
            if (activeRelPath.startsWith(oldPrefix)) {
                const updatedRelPath = activeRelPath.replace(oldPrefix, newPrefix);
                const newIdx = folderFiles.findIndex(f => f.name === updatedRelPath);
                if (newIdx !== -1) {
                    selectFolderFile(newIdx);
                }
            }
        }
    } catch (err) {
        console.error("Error renaming folder:", err);
        alert(currentLang === 'fr' ? "Erreur lors du renommage du dossier." : "Error renaming folder.");
    }
}

// --- UI Rendering ---

function renderMatches(highlightIndex = -1) {
    dom.matchesList.innerHTML = '';
    if (isFolderMode && activeFolderFileIndex >= 0 && activeFolderFileIndex < folderFiles.length) {
        const activeFile = folderFiles[activeFolderFileIndex];
        
        if (activeFile.hasParseError) {
            dom.matchesList.innerHTML = `
                <div class="error-state">
                    <div class="error-state-header">
                        <span class="error-icon">⚠️</span>
                        <h3>Erreur de lecture YAML</h3>
                    </div>
                    <p class="error-desc">Ce fichier contient des erreurs de syntaxe ou un format non supporté par l'éditeur visuel. Vous pouvez le corriger manuellement dans l'éditeur de texte à droite.</p>
                    <pre class="error-log">${escapeHtml(activeFile.parseErrorMessage)}</pre>
                </div>
            `;
            renderSidebar(highlightIndex);
            return;
        }
        
        activeFile.matches = currentMatches;
    }
    
    renderSidebar(highlightIndex);
    if (!currentMatches || currentMatches.length === 0) {
        dom.matchesList.innerHTML = `<div class="empty-state"><p>${t('noMatchesFound')}</p></div>`;
        return;
    }
    currentMatches.forEach((match, index) => {
        const card = createMatchCard(match, index);
        if (index === highlightIndex) card.classList.add('selected');
        dom.matchesList.appendChild(card);
    });
    if (highlightIndex !== -1) {
        const selectedEl = dom.matchesList.children[highlightIndex];
        if (selectedEl) selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function renderSidebar(highlightIndex = -1) {
    if (!dom.sidebarList) return;
    dom.sidebarList.innerHTML = '';
    if (isFolderMode) {
        const filesHeader = document.createElement('div'); filesHeader.className = 'sidebar-section-header';
        const filesHeaderLabel = document.createElement('span'); filesHeaderLabel.innerText = t('sidebarFiles'); filesHeader.appendChild(filesHeaderLabel);
        const fileSortBtn = document.createElement('button'); fileSortBtn.className = 'btn-icon sort-file-btn';
        fileSortBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5h10"></path><path d="M11 9h7"></path><path d="M11 13h4"></path><path d="M3 17l3 3 3-3"></path><path d="M6 18V4"></path></svg>`;
        fileSortBtn.title = currentLang === 'fr' ? 'Trier les fichiers' : 'Sort files';
        fileSortBtn.addEventListener('click', (e) => { e.stopPropagation(); sortFilesAlphabetically(); });
        filesHeader.appendChild(fileSortBtn);
        dom.btnSortFiles = fileSortBtn;
        dom.sidebarList.appendChild(filesHeader);
        if (!supportsFileSystemAPI) {
            const fallbackBanner = document.createElement('div'); fallbackBanner.className = 'sidebar-fallback-banner';
            fallbackBanner.innerHTML = `<span class="fallback-icon">💡</span> ${currentLang === 'fr' ? 'Pour gérer les fichiers, utilisez Chrome ou Edge.' : 'To manage files, use Chrome or Edge.'}`;
            dom.sidebarList.appendChild(fallbackBanner);
        }
        const filesContainer = document.createElement('div'); filesContainer.className = 'sidebar-files-list';
        const tree = buildFileTree(folderFiles); const treeEl = document.createElement('div'); treeEl.className = 'file-tree';

        function renderTreeNode(node, level = 0) {
            const sortedDirNames = Object.keys(node.children).sort((a, b) => a.localeCompare(b) * fileSortDirection);
            sortedDirNames.forEach(dirName => {
                const dir = node.children[dirName]; const dirEl = document.createElement('div'); dirEl.className = 'sidebar-dir-header';
                dirEl.style.paddingLeft = `${8 + level * 16}px`; dirEl.title = dirName;
                
                // Wrapper de texte pour l'alignement
                const textWrapper = document.createElement('div');
                textWrapper.className = 'sidebar-item-text';
                
                const arrowSpan = document.createElement('span'); arrowSpan.className = 'dir-arrow'; arrowSpan.innerText = dir.expanded ? '▼' : '▶'; textWrapper.appendChild(arrowSpan);
                const folderIcon = document.createElement('span'); folderIcon.className = 'dir-icon'; folderIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`; textWrapper.appendChild(folderIcon);
                const dirNameSpan = document.createElement('span'); dirNameSpan.className = 'dir-name'; dirNameSpan.innerText = dirName; textWrapper.appendChild(dirNameSpan);
                dirEl.appendChild(textWrapper);

                const getFullDirPath = (d) => { const parts = []; let cur = d; while (cur.name) { parts.unshift(cur.name); cur = cur.parent; } return parts.join('/'); };
                const dirFullPath = getFullDirPath(dir);

                // Ajout des boutons d'action du dossier (Renommer / Supprimer)
                if (supportsFileSystemAPI) {
                    const actionWrapper = document.createElement('div');
                    actionWrapper.className = 'sidebar-item-actions';
                    
                    const renameBtn = document.createElement('button');
                    renameBtn.className = 'sidebar-action-btn';
                    renameBtn.innerHTML = '✏️';
                    renameBtn.title = currentLang === 'fr' ? 'Renommer' : 'Rename';
                    renameBtn.onclick = (e) => { e.stopPropagation(); renameFolder(dirFullPath); };
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'sidebar-action-btn delete-btn';
                    deleteBtn.innerHTML = '🗑️';
                    deleteBtn.title = currentLang === 'fr' ? 'Supprimer' : 'Delete';
                    deleteBtn.onclick = (e) => { e.stopPropagation(); deleteFolder(dirFullPath); };
                    
                    actionWrapper.appendChild(renameBtn);
                    actionWrapper.appendChild(deleteBtn);
                    dirEl.appendChild(actionWrapper);
                    
                    dirEl.addEventListener('dragover', handleFileDragOver); 
                    dirEl.addEventListener('dragleave', handleFileDragLeave); 
                    dirEl.addEventListener('drop', (e) => handleFileDropOnDir(e, dirFullPath)); 
                }

                dirEl.onclick = (e) => { e.stopPropagation(); dir.expanded = !dir.expanded; expandedFolders[dirFullPath] = dir.expanded; renderSidebar(highlightIndex); };
                treeEl.appendChild(dirEl);
                if (dir.expanded) {
                    dir.files.forEach(f => {
                        const fileIndexInFolderFiles = folderFiles.indexOf(f); if (fileIndexInFolderFiles === -1) return;
                        const item = document.createElement('div'); item.className = 'sidebar-file-item'; if (fileIndexInFolderFiles === activeFolderFileIndex) item.classList.add('selected');
                        item.style.paddingLeft = `${8 + (level + 1) * 16}px`;
                        
                        const fileTextWrapper = document.createElement('div');
                        fileTextWrapper.className = 'sidebar-item-text';
                        
                        fileTextWrapper.innerHTML = `<svg class="file-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
                        const nameSpan = document.createElement('span'); nameSpan.className = 'file-name'; nameSpan.innerText = f.name.split('/').pop(); fileTextWrapper.appendChild(nameSpan);
                        
                        if (f.hasParseError) {
                            const errIndicator = document.createElement('span');
                            errIndicator.className = 'parse-error-indicator';
                            errIndicator.innerText = ' ⚠️';
                            errIndicator.title = f.parseErrorMessage;
                            fileTextWrapper.appendChild(errIndicator);
                        }
                        
                        if (f.isModified) { const modIndicator = document.createElement('span'); modIndicator.className = 'modified-dot'; modIndicator.innerText = '●'; fileTextWrapper.appendChild(modIndicator); }
                        item.appendChild(fileTextWrapper);

                        // Actions du fichier (Renommer / Supprimer)
                        if (supportsFileSystemAPI) {
                            const actionWrapper = document.createElement('div');
                            actionWrapper.className = 'sidebar-item-actions';
                            
                            const renameBtn = document.createElement('button');
                            renameBtn.className = 'sidebar-action-btn';
                            renameBtn.innerHTML = '✏️';
                            renameBtn.title = currentLang === 'fr' ? 'Renommer' : 'Rename';
                            renameBtn.onclick = (e) => { e.stopPropagation(); renameFile(fileIndexInFolderFiles); };
                            
                            const deleteBtn = document.createElement('button');
                            deleteBtn.className = 'sidebar-action-btn delete-btn';
                            deleteBtn.innerHTML = '🗑️';
                            deleteBtn.title = currentLang === 'fr' ? 'Supprimer' : 'Delete';
                            deleteBtn.onclick = (e) => { e.stopPropagation(); deleteFile(fileIndexInFolderFiles); };
                            
                            actionWrapper.appendChild(renameBtn);
                            actionWrapper.appendChild(deleteBtn);
                            item.appendChild(actionWrapper);
                            
                            item.draggable = true; 
                            item.addEventListener('dragstart', (e) => handleFileDragStart(e, fileIndexInFolderFiles)); 
                            item.addEventListener('dragend', fileDragEnd); 
                            item.addEventListener('dragover', handleFileDragOver); 
                            item.addEventListener('dragleave', handleFileDragLeave); 
                            item.addEventListener('drop', (e) => handleFileDrop(e, fileIndexInFolderFiles)); 
                        }

                        item.onclick = (e) => { e.stopPropagation(); selectFolderFile(fileIndexInFolderFiles); };
                        treeEl.appendChild(item);
                    });
                    renderTreeNode(dir, level + 1);
                }
            });
            if (level === 0) {
                node.files.forEach(f => {
                    const fileIndexInFolderFiles = folderFiles.indexOf(f); if (fileIndexInFolderFiles === -1) return;
                    const item = document.createElement('div'); item.className = 'sidebar-file-item'; if (fileIndexInFolderFiles === activeFolderFileIndex) item.classList.add('selected');
                    item.style.paddingLeft = `${8}px`;
                    
                    const fileTextWrapper = document.createElement('div');
                    fileTextWrapper.className = 'sidebar-item-text';
                    
                    fileTextWrapper.innerHTML = `<svg class="file-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
                    const nameSpan = document.createElement('span'); nameSpan.className = 'file-name'; nameSpan.innerText = f.name; fileTextWrapper.appendChild(nameSpan);
                    
                    if (f.hasParseError) {
                        const errIndicator = document.createElement('span');
                        errIndicator.className = 'parse-error-indicator';
                        errIndicator.innerText = ' ⚠️';
                        errIndicator.title = f.parseErrorMessage;
                        fileTextWrapper.appendChild(errIndicator);
                    }
                    
                    if (f.isModified) { const modIndicator = document.createElement('span'); modIndicator.className = 'modified-dot'; modIndicator.innerText = '●'; fileTextWrapper.appendChild(modIndicator); }
                    item.appendChild(fileTextWrapper);

                    // Actions du fichier racine (Renommer / Supprimer)
                    if (supportsFileSystemAPI) {
                        const actionWrapper = document.createElement('div');
                        actionWrapper.className = 'sidebar-item-actions';
                        
                        const renameBtn = document.createElement('button');
                        renameBtn.className = 'sidebar-action-btn';
                        renameBtn.innerHTML = '✏️';
                        renameBtn.title = currentLang === 'fr' ? 'Renommer' : 'Rename';
                        renameBtn.onclick = (e) => { e.stopPropagation(); renameFile(fileIndexInFolderFiles); };
                        
                        const deleteBtn = document.createElement('button');
                        deleteBtn.className = 'sidebar-action-btn delete-btn';
                        deleteBtn.innerHTML = '🗑️';
                        deleteBtn.title = currentLang === 'fr' ? 'Supprimer' : 'Delete';
                        deleteBtn.onclick = (e) => { e.stopPropagation(); deleteFile(fileIndexInFolderFiles); };
                        
                        actionWrapper.appendChild(renameBtn);
                        actionWrapper.appendChild(deleteBtn);
                        item.appendChild(actionWrapper);
                        
                        item.draggable = true; 
                        item.addEventListener('dragstart', (e) => handleFileDragStart(e, fileIndexInFolderFiles)); 
                        item.addEventListener('dragend', fileDragEnd); 
                        item.addEventListener('dragover', handleFileDragOver); 
                        item.addEventListener('dragleave', handleFileDragLeave); 
                        item.addEventListener('drop', (e) => handleFileDrop(e, fileIndexInFolderFiles)); 
                    }

                    item.onclick = (e) => { e.stopPropagation(); selectFolderFile(fileIndexInFolderFiles); };
                    treeEl.appendChild(item);
                });
            }
        }
        renderTreeNode(tree, 0);
        filesContainer.appendChild(treeEl);
        dom.sidebarList.appendChild(filesContainer);
        
        // Triggers section
        const triggersHeader = document.createElement('div'); triggersHeader.className = 'sidebar-section-header';
        const triggersHeaderLabel = document.createElement('span'); triggersHeaderLabel.innerText = t('sidebarTriggers'); triggersHeader.appendChild(triggersHeaderLabel);
        const matchSortBtn = document.createElement('button'); matchSortBtn.className = 'btn-icon sort-match-btn';
        const initArrow = sortDirection === 1 ? `<path d="M11 5h10"></path><path d="M11 9h7"></path><path d="M11 13h4"></path><path d="M3 17l3 3 3-3"></path><path d="M6 18V4"></path>` : `<path d="M3 7l3-3 3 3"></path><path d="M6 4v16"></path><path d="M11 19h10"></path><path d="M11 15h7"></path><path d="M11 11h4"></path>`;
        matchSortBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${initArrow}</svg>`;
        matchSortBtn.title = t('btnSortAlpha');
        matchSortBtn.addEventListener('click', (e) => { e.stopPropagation(); sortMatchesAlphabetically(); });
        triggersHeader.appendChild(matchSortBtn);
        dom.btnSortAlpha = matchSortBtn;
        dom.sidebarList.appendChild(triggersHeader);
    }
    if (!currentMatches || currentMatches.length === 0) return;
    const triggersContainer = document.createElement('div'); triggersContainer.className = 'sidebar-triggers-list';
    currentMatches.forEach((match, index) => {
        const item = document.createElement('div'); item.className = 'sidebar-item'; item.draggable = true;
        if (index === highlightIndex) item.classList.add('selected');
        item.innerText = match.trigger || `(Match ${index + 1})`; item.title = match.trigger;
        item.onclick = (e) => { e.stopPropagation(); renderMatches(index); };
        item.addEventListener('dragstart', (e) => handleDragStart(e, index)); item.addEventListener('dragover', handleDragOver); item.addEventListener('dragleave', handleDragLeave); item.addEventListener('drop', (e) => handleDrop(e, index)); item.addEventListener('dragend', handleDragEnd);
        triggersContainer.appendChild(item);
    });
    dom.sidebarList.appendChild(triggersContainer);
}

function createMatchCard(match, index) {
    const el = document.createElement('div'); el.className = 'match-card'; el.onclick = () => openEditor(index);
    let type = t('typeSimple');
    let contentPreview = match.replace;

    if (match.image_path) {
        type = t('typeImage');
        contentPreview = `Image: ${match.image_path}`;
    } else if (match.markdown || match.html) {
        type = t('typeRich');
        contentPreview = match.replace;
    } else if (match.form) {
        type = t('typeInteractive');
        contentPreview = match.form.replace(/\[\[\s*([a-zA-Z0-9_\-]+)\s*\]\]/g, '{{$1}}');
    } else if (match.vars) {
        const formVar = match.vars.find(v => v.type === 'form');
        if (formVar) {
            type = t('typeInteractive');
            const formVarName = formVar.name || 'form1';
            const regex = new RegExp(`\\{\\{\\s*${formVarName}\\.([a-zA-Z0-9_\\-]+)\\s*\\\}\\}`, 'g');
            contentPreview = (match.replace || '').replace(regex, '{{$1}}');
        } else if (match.vars.some(v => v.type === 'date')) {
            type = t('typeDate');
        } else {
            type = t('typeInteractive');
        }
    }

    if (contentPreview && contentPreview.length > 150) contentPreview = contentPreview.substring(0, 150) + '...';
    
    el.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap: 1rem; width: 100%;">
            <div style="flex: 1; min-width: 0;">
                <div class="match-header"><span class="trigger-badge">${escapeHtml(match.trigger)}</span><span class="type-badge">${type}</span></div>
                <div class="match-content">${escapeHtml(contentPreview || t('dynamicContent'))}</div>
            </div>
            ${match.image_path ? `
            <div class="match-thumbnail" style="width: 60px; height: 60px; flex-shrink: 0; border: 1px solid var(--border-color); border-radius: 4px; background: #f9fafb; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img class="lazy-image" style="max-width: 100%; max-height: 100%; object-fit: contain; display: none;" />
            </div>` : ''}
        </div>
    `;

    if (match.image_path) {
        const imgEl = el.querySelector('.lazy-image');
        resolveLocalImage(match.image_path).then(blobUrl => {
            if (blobUrl && imgEl) {
                imgEl.src = blobUrl;
                imgEl.style.display = 'block';
            }
        }).catch(e => {
            console.warn("Could not load thumbnail for match card:", e);
        });
    }

    return el;
}

function escapeHtml(text) { if (!text) return ''; const el = document.createElement('div'); el.appendChild(document.createTextNode(text)); return el.innerHTML; }

// ========== UNIFIED EDITOR LOGIC ==========

function openEditor(index = -1) {
    editingIndex = index;
    dom.editorModal.classList.remove('hidden');
    dom.btnSaveMatch.onclick = saveMatchFromEditor;
    dom.btnDeleteMatch.onclick = deleteMatchFromEditor;
    isPopulating = true;

    if (index === -1) {
        dom.modalTitle.innerText = t('newMatch');
        dom.btnDeleteMatch.classList.add('hidden');
        dom.typeOverlay.classList.remove('hidden');
        resetEditorFields();
    } else {
        dom.modalTitle.innerText = t('editMatch');
        dom.btnDeleteMatch.classList.remove('hidden');
        dom.typeOverlay.classList.add('hidden');
        populateEditor(currentMatches[index]);
    }
    isPopulating = false;
}

function closeEditor() {
    dom.editorModal.classList.add('hidden');
}

function resetEditorFields() {
    dom.triggerInput.value = '';
    if (dom.contentInput) dom.contentInput.value = '';
    if (dom.imagePathInput) {
        dom.imagePathInput.value = '';
        delete dom.imagePathInput.dataset.previewBlob;
    }
    if (dom.dateFormatDefault) dom.dateFormatDefault.value = '%d/%m/%Y';
    setMatchType('simple');
    clearVarsConfig();
    updateEditorUI();
}

function setMatchType(type) {
    activeMatchType = type;
}

function getMatchType() {
    return activeMatchType;
}

function clearVarsConfig() {
    if (dom.varsConfigList) dom.varsConfigList.innerHTML = '';
    if (dom.varsConfigPanel) dom.varsConfigPanel.classList.add('hidden');
    if (dom.dateFormatConfig) dom.dateFormatConfig.classList.add('hidden');
}

// --- Update the unified editor UI based on type ---
function updateEditorUI() {
    const type = getMatchType();

    const formatGroup = document.querySelector('.unified-format-group');
    if (formatGroup) {
        formatGroup.classList.toggle('hidden', type !== 'rich');
    }

    if (dom.unifiedModeToggle) {
        dom.unifiedModeToggle.classList.toggle('hidden', type !== 'rich');
    }

    const insertGroup = document.querySelector('.unified-insert-group');
    if (insertGroup) {
        insertGroup.classList.toggle('hidden', type !== 'interactive');
    }

    // Affichage ou masquage de l'éditeur textuel standard
    if (dom.contentInput) {
        dom.contentInput.classList.toggle('hidden', type === 'image');
    }
    
    // Affichage ou masquage de la barre d'outils unifiée
    const unifiedToolbar = document.querySelector('.unified-toolbar');
    if (unifiedToolbar) {
        unifiedToolbar.classList.toggle('hidden', type === 'image');
    }

    // Gestion du panneau de saisie d'image
    if (dom.imageConfigPanel) {
        dom.imageConfigPanel.classList.toggle('hidden', type !== 'image');
    }

    if (type === 'date') {
        if (!dom.contentInput.value) {
            dom.contentInput.value = '{{mydate}}';
        }
        dom.contentInput.readOnly = false;
        dom.contentInput.style.backgroundColor = '';
        dom.contentInput.style.cursor = '';
    } else {
        dom.contentInput.readOnly = false;
        dom.contentInput.style.backgroundColor = '';
        dom.contentInput.style.cursor = '';
        if (dom.contentInput.value === '{{mydate}}') {
            dom.contentInput.value = '';
        }
    }

    if (type === 'interactive' || type === 'date') {
        syncVarsFromText();
    } else {
        clearVarsConfig();
    }

    if (dom.varsConfigPanel) {
        dom.varsConfigPanel.classList.toggle('hidden', (type !== 'interactive' && type !== 'date'));
    }

    // Maintient le bloc de format global masqué
    if (dom.dateFormatConfig) {
        dom.dateFormatConfig.classList.add('hidden');
    }

    updatePreview();
}

// --- INSERT VARIABLE INTO TEXT ---

function getUniqueVarName(baseName) {
    const text = dom.contentInput.value;
    const regex = /\{\{\s*([a-zA-Z0-9_\-]+)\s*\}\}/g;
    const existing = [];
    let match;
    while ((match = regex.exec(text)) !== null) existing.push(match[1]);
    let counter = 1;
    let name = baseName;
    while (existing.includes(name)) { name = `${baseName}_${counter}`; counter++; }
    return name;
}

function insertVariable(variableType) {
    const name = getUniqueVarName(variableType === 'text' ? 'mon_texte' : variableType === 'choice' ? 'mon_choix' : variableType === 'list' ? 'ma_liste' : 'mon_texte');
    const textarea = dom.contentInput;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const textToInsert = `{{${name}}}`;
    textarea.value = text.substring(0, start) + textToInsert + text.substring(end);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = start + textToInsert.length;

    syncVarsFromText();

    const rows = dom.varsConfigList.querySelectorAll('.var-config-row');
    rows.forEach(row => {
        const rowName = row.dataset.varName;
        if (rowName === name) {
            const typeSelect = row.querySelector('.var-type-select');
            if (typeSelect) {
                const typeMap = { 'text': 'static', 'choice': 'choice', 'list': 'list', 'multiline': 'multiline' };
                typeSelect.value = typeMap[variableType] || 'static';
                typeSelect.dispatchEvent(new Event('change'));
            }
        }
    });

    updatePreview();
}

// --- SYNC VARS FROM TEXT ---

function syncVarsFromText() {
    const content = dom.contentInput.value || '';
    const regex = /\{\{\s*([a-zA-Z0-9_\-]+)\s*\}\}/g;
    const detectedVars = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        const varName = match[1];
        if (!detectedVars.includes(varName)) detectedVars.push(varName);
    }

    // Le formatage se faisant par variable, le bloc global reste masqué
    if (dom.dateFormatConfig) {
        dom.dateFormatConfig.classList.add('hidden');
    }

    const currentRows = dom.varsConfigList.querySelectorAll('.var-config-row');
    const existingNames = Array.from(currentRows).map(row => row.dataset.varName);

    currentRows.forEach(row => {
        if (!detectedVars.includes(row.dataset.varName)) {
            row.remove();
        }
    });

    detectedVars.forEach(varName => {
        if (!existingNames.includes(varName)) {
            addVarConfigRow(varName);
        }
    });

    if (dom.varsConfigPanel) {
        dom.varsConfigPanel.classList.toggle('hidden', detectedVars.length === 0);
    }

    updatePreview();
}

// --- Add configuration row for a variable ---
function addVarConfigRow(varName) {
    const template = dom.varConfigRowTemplate;
    if (!template) return;
    const clone = template.content.cloneNode(true);
    const row = clone.querySelector('.var-config-row');
    row.dataset.varName = varName;
    row.querySelector('.var-config-name').innerText = `{{${varName}}}`;

    const typeSelect = row.querySelector('.var-type-select');
    const staticField = row.querySelector('.var-static-field');
    const multilineField = row.querySelector('.var-multiline-field');
    const optionsField = row.querySelector('.var-options-field');
    const dateField = row.querySelector('.var-date-field');
    const defaultInput = row.querySelector('.var-default-value');
    const multilineInput = row.querySelector('.var-default-value-multiline');
    const dateFormatInput = row.querySelector('.var-date-format');
    const addOptionBtn = row.querySelector('.var-add-option-btn');
    const optionsList = row.querySelector('.var-options-list');

    const updateFieldVisibility = () => {
        const type = typeSelect.value;
        staticField.classList.toggle('hidden', type !== 'static');
        multilineField.classList.toggle('hidden', type !== 'multiline');
        if (optionsField) {
            optionsField.classList.toggle('hidden', type !== 'choice' && type !== 'list');
        }
        dateField.classList.toggle('hidden', type !== 'date');

        if ((type === 'choice' || type === 'list') && optionsList && optionsList.children.length === 0) {
            addVarOptionRow(optionsList, 'Option 1', 'Valeur 1');
            addVarOptionRow(optionsList, 'Option 2', 'Valeur 2');
        }
    };

    typeSelect.addEventListener('change', () => {
        updateFieldVisibility();
        updatePreview();
    });

    // Force l'affichage et le type en 'date' si le match parent est de type 'date'
    const matchType = getMatchType();
    if (matchType === 'date') {
        typeSelect.value = 'date';
        typeSelect.disabled = true;
        const typeContainer = row.querySelector('.var-config-type');
        if (typeContainer) typeContainer.classList.add('hidden');
    }

    if (defaultInput) defaultInput.addEventListener('input', updatePreview);
    if (multilineInput) multilineInput.addEventListener('input', updatePreview);
    if (dateFormatInput) dateFormatInput.addEventListener('input', updatePreview);

    if (addOptionBtn) {
        addOptionBtn.addEventListener('click', () => {
            addVarOptionRow(optionsList, '', '');
            updatePreview();
        });
    }

    const toggleBtn = row.querySelector('.var-options-toggle-btn');
    const optionsTitle = row.querySelector('.var-options-header-title label');
    if (toggleBtn && optionsField) {
        const handleCollapse = (e) => {
            e.preventDefault();
            const isCollapsed = optionsField.classList.toggle('collapsed');
            
            if (optionsList) {
                optionsList.style.setProperty('display', isCollapsed ? 'none' : 'flex', 'important');
            }
            
            const icon = toggleBtn.querySelector('.toggle-icon');
            if (icon) {
                icon.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
            }
        };
        toggleBtn.addEventListener('click', handleCollapse);
        if (optionsTitle) {
            optionsTitle.addEventListener('click', handleCollapse);
        }
    }

    updateFieldVisibility();
    dom.varsConfigList.appendChild(row);
}

// --- Add option row ---

function addVarOptionRow(container, text = '', value = '') {
    const template = dom.varOptionRowTemplate;
    if (!template) return;
    const clone = template.content.cloneNode(true);
    const row = clone.querySelector('.var-option-row');
    const textInput = row.querySelector('.var-option-text');
    const valueInput = row.querySelector('.var-option-value');
    const removeBtn = row.querySelector('.var-option-remove');

    if (textInput) { textInput.value = text; textInput.addEventListener('input', updatePreview); }
    if (valueInput) { valueInput.value = value; valueInput.addEventListener('input', updatePreview); }
    if (removeBtn) { removeBtn.addEventListener('click', () => { row.remove(); updatePreview(); }); }

    container.appendChild(row);
}

// --- Get vars config data from UI ---

function getVarsConfig() {
    const config = {};
    const rows = dom.varsConfigList.querySelectorAll('.var-config-row');
    rows.forEach(row => {
        const varName = row.dataset.varName;
        const typeSelect = row.querySelector('.var-type-select');
        const type = typeSelect ? typeSelect.value : 'static';

        const defaultInput = row.querySelector('.var-default-value');
        const multilineInput = row.querySelector('.var-default-value-multiline');
        const dateFormatInput = row.querySelector('.var-date-format');

        config[varName] = { type: type };

        if (type === 'static') {
            config[varName].value = defaultInput ? defaultInput.value : '';
        } else if (type === 'multiline') {
            config[varName].value = multilineInput ? multilineInput.value : '';
            config[varName].multiline = true;
        } else if (type === 'date') {
            config[varName].format = dateFormatInput ? dateFormatInput.value : '%d/%m/%Y';
        } else if (type === 'choice' || type === 'list') {
            const optionsList = row.querySelector('.var-options-list');
            const optionRows = optionsList ? optionsList.querySelectorAll('.var-option-row') : [];
            const values = [];
            optionRows.forEach(optRow => {
                const optText = optRow.querySelector('.var-option-text').value.trim();
                const optVal = optRow.querySelector('.var-option-value').value;
                if (optText || optVal) {
                    if (optText && optVal && optText !== optVal) {
                        values.push({ text: optText, value: optVal });
                    } else {
                        values.push(optVal || optText);
                    }
                }
            });
            config[varName].values = values;
        }
    });
    return config;
}

// --- PREVIEW ---

function updatePreview() {
    if (!dom.previewSection || !dom.previewContent) return;
    const type = getMatchType();
    const content = dom.contentInput.value || '';
    const varsConfig = getVarsConfig();

    const typeLabelMap = { simple: 'previewTypeSimple', rich: 'previewTypeRich', interactive: 'previewTypeInteractive', date: 'previewTypeDate', image: 'previewTypeImage' };
    if (dom.previewTypeLabel) {
        dom.previewTypeLabel.innerText = t(typeLabelMap[type] || 'previewTypeSimple');
    }

    if (type === 'image') {
        const path = dom.imagePathInput.value.trim();
        if (!path) {
            dom.previewContent.innerHTML = `<span class="preview-empty">${t('previewLabel')}</span>`;
            return;
        }
        
        // SVG d'illustration encodé en base64 pour supprimer tout conflit de guillemets
        const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ij48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPSIyMSAxNSAxNiAxMCA1IDIxIj48L3BvbHlsaW5lPjwvc3ZnPg==';
        let imgSrc = dom.imagePathInput.dataset.previewBlob || placeholder;
        
        dom.previewContent.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem; width:100%;">
                <img id="previewImageElement" src="${imgSrc}" class="preview-image-el" alt="Aperçu">
                <code style="font-size:0.75rem; color:var(--text-secondary); word-break:break-all;">${escapeHtml(path)}</code>
            </div>
        `;

        if (!dom.imagePathInput.dataset.previewBlob && isFolderMode && currentDirHandle && supportsFileSystemAPI) {
            resolveLocalImage(path).then(blobUrl => {
                const imgEl = document.getElementById('previewImageElement');
                if (imgEl && blobUrl) {
                    imgEl.src = blobUrl;
                }
            }).catch(err => {
                console.warn("Could not load local image preview:", err);
            });
        }
        return;
    }

    if (!content) {
        dom.previewContent.innerHTML = `<span class="preview-empty">${t('previewLabel')}</span>`;
        return;
    }

    if (type === 'interactive') {
        renderInteractiveDualPreview(content, varsConfig);
    } else {
        const renderedHTML = renderPreviewContent(content, type, varsConfig);
        dom.previewContent.innerHTML = renderedHTML;
        wirePreviewControls(content, varsConfig);
    }
}

// --- DOUBLE APERÇU POUR LES FORMULAIRES ---

function renderInteractiveDualPreview(content, varsConfig) {
    const varRegex = /\{\{\s*([a-zA-Z0-9_\-]+)\s*\}\}/g;
    const detectedVars = [];
    let match;
    while ((match = varRegex.exec(content)) !== null) {
        const varName = match[1];
        if (!detectedVars.includes(varName)) detectedVars.push(varName);
    }

    if (detectedVars.length === 0) {
        dom.previewContent.innerHTML = `<div class="preview-empty">${t('noVarsDetected')}</div>`;
        return;
    }

    // 1. Construit le formulaire de saisie de gauche
    let formHtml = `<div class="preview-form-fields">`;
    detectedVars.forEach(varName => {
        const config = varsConfig[varName] || { type: 'static', value: '' };
        formHtml += `<div class="preview-form-group">`;
        formHtml += `<label>{{${escapeHtml(varName)}}}</label>`;

        if (config.type === 'choice' || config.type === 'list') {
            formHtml += `<select class="preview-form-input" data-var-name="${escapeHtml(varName)}">`;
            const values = config.values || [];
            values.forEach(v => {
                if (typeof v === 'object' && v !== null) {
                    formHtml += `<option value="${escapeHtml(v.value || '')}">${escapeHtml(v.text || v.value || '')}</option>`;
                } else {
                    formHtml += `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`;
                }
            });
            formHtml += `</select>`;
        } else if (config.type === 'date') {
            const fmt = config.format || dom.dateFormatDefault?.value || '%d/%m/%Y';
            const formattedDate = formatDateString(fmt);
            formHtml += `<input type="text" class="preview-form-input" value="${escapeHtml(formattedDate)}" readonly style="background-color: #f3f4f6; cursor: not-allowed;">`;
        } else if (config.type === 'multiline') {
            formHtml += `<textarea class="preview-form-input" data-var-name="${escapeHtml(varName)}" rows="2" placeholder="${escapeHtml(config.value || '')}"></textarea>`;
        } else {
            formHtml += `<input type="text" class="preview-form-input" data-var-name="${escapeHtml(varName)}" value="${escapeHtml(config.value || '')}" placeholder="${escapeHtml(config.value || '')}">`;
        }
        formHtml += `</div>`;
    });
    formHtml += `</div>`;

    // 2. Insère la structure duale (Formulaire / Résultat)
    dom.previewContent.innerHTML = `
        <div class="interactive-preview-container">
            <div class="preview-form-block">
                <div class="preview-sublabel">${t('formPreviewTitle')}</div>
                ${formHtml}
            </div>
            <div class="preview-result-block">
                <div class="preview-sublabel">${t('resultPreviewTitle')}</div>
                <div class="preview-result-text" id="previewResultText"></div>
            </div>
        </div>
    `;

    // 3. Logique de remplacement et de mise à jour dynamique du résultat obtenu
    const updateResultText = () => {
        const resultTextEl = dom.previewContent.querySelector('#previewResultText');
        if (!resultTextEl) return;

        let output = content;

        detectedVars.forEach(varName => {
            const config = varsConfig[varName] || { type: 'static', value: '' };
            let val = '';

            if (config.type === 'date') {
                const fmt = config.format || dom.dateFormatDefault?.value || '%d/%m/%Y';
                val = formatDateString(fmt);
            } else {
                const inputEl = dom.previewContent.querySelector(`.preview-form-input[data-var-name="${varName}"]`);
                if (inputEl) {
                    val = inputEl.value;
                    if (!val) {
                        val = inputEl.placeholder || `{{${varName}}}`;
                    }
                } else {
                    val = config.value || `{{${varName}}}`;
                }
            }

            const regex = new RegExp(`\\{\\{\\s*${varName}\\s*\\\}\\}`, 'g');
            output = output.replace(regex, val);
        });

        resultTextEl.textContent = output;
    };

    const controls = dom.previewContent.querySelectorAll('.preview-form-input');
    controls.forEach(ctrl => {
        ctrl.addEventListener('input', updateResultText);
        ctrl.addEventListener('change', updateResultText);
    });

    updateResultText();
}

function renderPreviewContent(content, type, varsConfig) {
    if (type === 'rich') {
        try {
            if (currentRichMode === 'html') {
                let html = content;
                html = html.replace(/\{\{\s*([a-zA-Z0-9_\-]+)\s*\}\}/g, (m, varName) => {
                    return `<span class="preview-var-placeholder">{{${escapeHtml(varName)}}}</span>`;
                });
                return html;
            } else if (typeof marked !== 'undefined' && marked.parse) {
                let md = content;
                md = md.replace(/\{\{\s*([a-zA-Z0-9_\-]+)\s*\}\}/g, (m, varName) => {
                    return `<span class="preview-var-placeholder">{{${escapeHtml(varName)}}}</span>`;
                });
                const renderer = new marked.Renderer();
                renderer.link = function({ href, title, text }) {
                    const titleAttr = title ? ` title="${title}"` : '';
                    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
                };
                marked.setOptions({ renderer, breaks: true, gfm: true });
                return marked.parse(md);
            } else {
                return `<pre>${escapeHtml(content)}</pre>`;
            }
        } catch (e) {
            return escapeHtml(content);
        }
    }

    const parts = content.split(/(\{\{\s*[a-zA-Z0-9_\-]+\s*\}\})/g);
    const hasVars = /\{\{\s*[a-zA-Z0-9_\-]+\s*\}\}/.test(content);

    if (!hasVars) {
        return `<div class="preview-inline-container">${escapeHtml(content)}</div>`;
    }

    let html = '<div class="preview-inline-container">';
    const varRegex = /^\{\{\s*([a-zA-Z0-9_\-]+)\s*\}\}$/;

    parts.forEach(part => {
        const match = part.match(varRegex);
        if (match) {
            const varName = match[1];
            let config = varsConfig[varName];

            // Force le type 'date' pour chaque variable présente si le match est de type 'date'
            if (type === 'date') {
                config = { type: 'date', format: config?.format || '%d/%m/%Y' };
            } else if (!config) {
                config = { type: 'static', value: '' };
            }

            const uid = `preview-${varName}-${Math.random().toString(36).substr(2, 6)}`;

            if (config.type === 'choice' || config.type === 'list') {
                html += `<span class="inline-field-wrapper" data-var-name="${escapeHtml(varName)}">`;
                html += `<select class="inline-input preview-select" data-var-name="${escapeHtml(varName)}" data-uid="${uid}">`;
                const values = config.values || [];
                if (values.length > 0) {
                    values.forEach(v => {
                        if (typeof v === 'object' && v !== null) {
                            html += `<option value="${escapeHtml(v.value || '')}">${escapeHtml(v.text || v.value || '')}</option>`;
                        } else {
                            html += `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`;
                        }
                    });
                } else {
                    html += `<option value="">${escapeHtml(varName)}</option>`;
                }
                html += `</select>`;
                html += `</span>`;
            } else if (config.type === 'date') {
                const fmt = config.format || dom.dateFormatDefault?.value || '%d/%m/%Y';
                const formattedDate = formatDateString(fmt);
                html += `<span class="inline-date-preview" data-var-name="${escapeHtml(varName)}">${escapeHtml(formattedDate)}</span>`;
            } else if (config.multiline || config.type === 'multiline') {
                html += `<span class="inline-field-wrapper" data-var-name="${escapeHtml(varName)}">`;
                html += `<textarea class="inline-input preview-multiline" data-var-name="${escapeHtml(varName)}" data-uid="${uid}" rows="1" placeholder="${escapeHtml(varName)}">${escapeHtml(config.value || '')}</textarea>`;
                html += `</span>`;
            } else {
                html += `<span class="inline-field-wrapper" data-var-name="${escapeHtml(varName)}">`;
                html += `<input type="text" class="inline-input preview-input" data-var-name="${escapeHtml(varName)}" data-uid="${uid}" value="${escapeHtml(config.value || '')}" placeholder="${escapeHtml(varName)}" style="width:${Math.max((varName.length + 5) * 8, 80)}px">`;
                html += `</span>`;
            }

            html += `<span class="inline-ref-span hidden-ref" data-uid="${uid}" data-var-name="${escapeHtml(varName)}">${escapeHtml(config.value || '')}</span>`;
        } else {
            if (part === '') return;
            html += `<span class="inline-text">${escapeHtml(part)}</span>`;
        }
    });

    html += '</div>';
    return html;
}

function wirePreviewControls(content, varsConfig) {
    const previewContainer = dom.previewContent;
    const inputs = previewContainer.querySelectorAll('.preview-input, .preview-select, .preview-multiline');
    inputs.forEach(input => {
        const uid = input.dataset.uid;
        if (!uid) return;

        const handler = () => {
            const refSpans = previewContainer.querySelectorAll(`.hidden-ref[data-uid="${uid}"]`);
            refSpans.forEach(span => {
                span.innerText = input.value || input.placeholder || '';
            });
        };

        if (input.tagName === 'SELECT') {
            input.addEventListener('change', handler);
        } else {
            input.addEventListener('input', handler);
        }

        handler();
    });

    const refs = previewContainer.querySelectorAll('.hidden-ref');
    refs.forEach(ref => {
        const uid = ref.dataset.uid;
        if (!uid) return;
        const sourceInput = previewContainer.querySelector(`[data-uid="${uid}"]`);
        if (sourceInput) {
            ref.innerText = sourceInput.value || sourceInput.placeholder || '';
        }
    });
}

// --- POPULATE EDITOR FROM EXISTING MATCH ---

function populateEditor(match) {
    dom.triggerInput.value = match.trigger || '';

    let type = 'simple';
    let content = '';
    let formVar = null;

    if (match.vars && Array.isArray(match.vars)) {
        formVar = match.vars.find(v => v.type === 'form');
    }

    if (match.image_path) {
        type = 'image';
        if (dom.imagePathInput) {
            dom.imagePathInput.value = match.image_path;
            delete dom.imagePathInput.dataset.previewBlob;
        }
    } else if (match.markdown || match.html) {
        type = 'rich';
        content = match.replace || '';
        currentRichMode = match.html ? 'html' : (match.markdown ? 'markdown' : 'html');
        dom.mdModeBtns.forEach(b => b.classList.toggle('active', b.dataset.richMode === currentRichMode));
    } else if (formVar) {
        type = 'interactive';
        const formVarName = formVar.name || 'form1';
        const regex = new RegExp(`\\{\\{\\s*${formVarName}\\.([a-zA-Z0-9_\\-]+)\\s*\\\}\\}`, 'g');
        content = (match.replace || '').replace(regex, '{{$1}}');
    } else if (match.form) {
        type = 'interactive';
        content = match.form.replace(/\[\[\s*([a-zA-Z0-9_\-]+)\s*\]\]/g, '{{$1}}');
    } else if (match.vars && Array.isArray(match.vars)) {
        const allVarsAreDate = match.vars.length > 0 && match.vars.every(v => v.type === 'date');
        if (allVarsAreDate) {
            type = 'date';
            content = match.replace || '';
        } else {
            type = 'simple';
            content = match.replace || '';
        }
    } else {
        type = 'simple';
        content = match.replace || '';
    }

    setMatchType(type);
    dom.contentInput.value = content;

    if (type === 'interactive' || type === 'date') {
        clearVarsConfig();
        setTimeout(() => {
            syncVarsFromText();
            const rows = dom.varsConfigList.querySelectorAll('.var-config-row');
            
            let fieldsSource = null;
            if (formVar && formVar.params && formVar.params.fields) {
                fieldsSource = formVar.params.fields;
            } else if (match.form_fields) {
                fieldsSource = match.form_fields;
            }

            if (type === 'date' && match.vars) {
                match.vars.forEach(v => {
                    rows.forEach(row => {
                        if (row.dataset.varName === v.name) {
                            const dateFormatInput = row.querySelector('.var-date-format');
                            if (dateFormatInput && v.params && v.params.format) {
                                dateFormatInput.value = v.params.format;
                            }
                        }
                    });
                });
            } else if (fieldsSource) {
                Object.keys(fieldsSource).forEach(varName => {
                    const fieldConfig = fieldsSource[varName];
                    rows.forEach(row => {
                        if (row.dataset.varName === varName) {
                            const typeSelect = row.querySelector('.var-type-select');
                            const defaultInput = row.querySelector('.var-default-value');
                            const multilineInput = row.querySelector('.var-default-value-multiline');
                            const dateFormatInput = row.querySelector('.var-date-format');
                            const optionsList = row.querySelector('.var-options-list');
                            
                            const fType = fieldConfig.type;
                            const fParams = fieldConfig.params || {};

                            if (fType === 'choice' || fType === 'list') {
                                typeSelect.value = 'choice';
                                typeSelect.dispatchEvent(new Event('change'));
                                if (optionsList) {
                                    optionsList.innerHTML = '';
                                    const values = fieldConfig.values || fParams.values || fParams.choices;
                                    if (values) {
                                        values.forEach(val => {
                                            if (typeof val === 'object' && val !== null) {
                                                addVarOptionRow(optionsList, val.label || val.text || '', val.id || val.value || '');
                                            } else {
                                                addVarOptionRow(optionsList, val, val);
                                            }
                                        });
                                    }
                                }
                            } else if (fieldConfig.multiline === true || (fType === 'echo' && (fParams.echo || '').includes('\n'))) {
                                typeSelect.value = 'multiline';
                                typeSelect.dispatchEvent(new Event('change'));
                                if (multilineInput) {
                                    multilineInput.value = fieldConfig.placeholder || fParams.echo || '';
                                }
                            } else if (fType === 'date' || fieldConfig.type === 'date') {
                                typeSelect.value = 'date';
                                typeSelect.dispatchEvent(new Event('change'));
                                if (dateFormatInput) {
                                    dateFormatInput.value = fParams.format || fieldConfig.placeholder || '%d/%m/%Y';
                                }
                            } else {
                                typeSelect.value = 'static';
                                typeSelect.dispatchEvent(new Event('change'));
                                if (defaultInput) {
                                    defaultInput.value = fieldConfig.placeholder || fParams.echo || fParams.value || '';
                                }
                            }
                            typeSelect.dispatchEvent(new Event('change'));
                        }
                    });
                });
            }
            updatePreview();
        }, 50);
    }

    updateEditorUI();
    updatePreview();
}
// --- SAVE MATCH FROM EDITOR ---

function saveMatchFromEditor() {
    const type = getMatchType();
    const trigger = dom.triggerInput.value.trim();
    const content = dom.contentInput.value || '';

    if (!trigger) {
        alert(t('alertTriggerRequired'));
        return;
    }

    const newMatch = { trigger: trigger };

    if (type === 'image') {
        newMatch.image_path = dom.imagePathInput.value.trim() || '$CONFIG/img/image.png';
    } else if (type === 'rich') {
        newMatch.replace = content;
        if (currentRichMode === 'html') {
            newMatch.html = true;
        } else {
            newMatch.markdown = true;
        }
    } else if (type === 'simple') {
        newMatch.replace = content;
    } else if (type === 'date') {
        const varRegex = /\{\{\s*([a-zA-Z0-9_\-]+)\s*\}\}/g;
        const detectedVars = [];
        let match;
        while ((match = varRegex.exec(content)) !== null) {
            if (!detectedVars.includes(match[1])) detectedVars.push(match[1]);
        }

        newMatch.replace = content;
        
        const varsConfig = getVarsConfig();
        const varsArray = [];

        detectedVars.forEach(varName => {
            const config = varsConfig[varName] || { format: '%d/%m/%Y' };
            const formatVal = config.format || '%d/%m/%Y';
            varsArray.push({
                name: varName,
                type: 'date',
                params: {
                    format: formatVal
                }
            });
        });

        if (varsArray.length > 0) {
            newMatch.vars = varsArray;
        }
    } else if (type === 'interactive') {
        const varRegex = /\{\{\s*([a-zA-Z0-9_\-]+)\s*\}\}/g;
        const detectedVars = [];
        let match;
        while ((match = varRegex.exec(content)) !== null) {
            if (!detectedVars.includes(match[1])) detectedVars.push(match[1]);
        }

        const varsConfig = getVarsConfig();
        
        let replaceText = content;
        detectedVars.forEach(varName => {
            const regex = new RegExp(`\\{\\{\\s*${varName}\\s*\\\}\\}`, 'g');
            replaceText = replaceText.replace(regex, `{{form1.${varName}}}`);
        });
        
        newMatch.replace = replaceText;
        
        const formLayout = detectedVars.map(v => `[[${v}]]`).join('\n');
        const formFields = {};
        
        detectedVars.forEach(varName => {
            const config = varsConfig[varName] || { type: 'static', value: '' };
            const fieldDef = {};

            if (config.type === 'choice' || config.type === 'list') {
                const valuesList = (config.values || []).map(v => {
                    if (typeof v === 'object' && v !== null) {
                        return v.value || v.text || v.id || String(v);
                    }
                    return String(v);
                });
                fieldDef.type = 'choice';
                fieldDef.values = valuesList;
            } else if (config.type === 'multiline') {
                fieldDef.multiline = true;
                if (config.value) fieldDef.placeholder = config.value;
            } else if (config.type === 'date') {
                fieldDef.type = 'date';
                if (config.format) fieldDef.placeholder = config.format;
            } else {
                if (config.value) fieldDef.placeholder = config.value;
            }

            formFields[varName] = fieldDef;
        });
        
        newMatch.vars = [
            {
                name: 'form1',
                type: 'form',
                params: {
                    layout: formLayout,
                    fields: formFields
                }
            }
        ];
    }

    if (editingIndex === -1) {
        currentMatches.push(newMatch);
    } else {
        currentMatches[editingIndex] = newMatch;
    }

    const targetIndex = (editingIndex === -1) ? currentMatches.length - 1 : editingIndex;
    closeEditor();
    markActiveFileAsModified();
    renderMatches(targetIndex);
    updateYamlPreview();
}

function deleteMatchFromEditor() {
    if (editingIndex !== -1) {
        if (confirm(t('confirmDelete'))) {
            const matchToDelete = currentMatches[editingIndex];
            
            // Si le match possède une image associée, on propose de la supprimer également du disque
            if (matchToDelete && matchToDelete.image_path) {
                const deleteImgMsg = currentLang === 'fr' 
                    ? "Voulez-vous également supprimer le fichier image associé de votre espace de travail ?" 
                    : "Do you also want to delete the associated image file from your workspace?";
                
                if (confirm(deleteImgMsg)) {
                    deleteLocalImageFile(matchToDelete.image_path);
                }
            }

            currentMatches.splice(editingIndex, 1);
            markActiveFileAsModified();
            renderMatches();
            updateYamlPreview();
            closeEditor();
        }
    }
}

// --- Live Preview Logic ---

function updateYamlPreview() {
    if (document.activeElement === dom.yamlEditor) return;
    const yaml = generateYaml();
    dom.yamlEditor.value = yaml;
}

function handleYamlEditorInput() {
    const text = dom.yamlEditor.value;
    try {
        const data = jsyaml.load(text, { schema: jsyaml.CORE_SCHEMA });
        if (data && data.matches) {
            currentMatches = data.matches;
            markActiveFileAsModified();
            renderMatches();
        }
    } catch (e) { /* allow invalid YAML while typing */ }
}

function formatYamlPreview() {
    dom.yamlEditor.value = generateYaml();
}

function copyYamlContent() {
    navigator.clipboard.writeText(dom.yamlEditor.value).then(() => {
        const btn = dom.btnCopyYaml;
        const originalContent = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${t('copied')}`;
        setTimeout(() => { btn.innerHTML = originalContent; }, 2000);
    });
}

// --- Format toolbar ---

const formatSyntax = {
    html_b: { before: '<b>', after: '</b>', placeholder: 'gras' },
    html_i: { before: '<i>', after: '</i>', placeholder: 'italique' },
    html_s: { before: '<s>', after: '</s>', placeholder: 'barré' },
    html_u: { before: '<u>', after: '</u>', placeholder: 'souligné' },
    html_link: { before: '<a href="', after: '">', placeholder: 'url', then: 'texte</a>' },
    html_code: { before: '<code>', after: '</code>', placeholder: 'code' },
    html_ul: { before: '<ul>\n  <li>', after: '</li>\n</ul>', placeholder: 'élément', block: true },
    html_ol: { before: '<ol>\n  <li>', after: '</li>\n</ol>', placeholder: 'élément', block: true },
    md_bold: { before: '**', after: '**', placeholder: 'texte en gras' },
    md_italic: { before: '*', after: '*', placeholder: 'texte en italique' },
    md_strikethrough: { before: '~~', after: '~~', placeholder: 'texte barré' },
    md_code: { before: '`', after: '`', placeholder: 'code' },
    md_link: { before: '[', after: '](url)', placeholder: 'texte du lien' },
    md_ul: { before: '- ', after: '', placeholder: 'élément de liste', block: true },
    md_ol: { before: '1. ', after: '', placeholder: 'élément numéroté', block: true }
};

function handleFormatToolbar(action) {
    let syntax;
    if (getMatchType() === 'rich' && currentRichMode === 'markdown') {
        const mdMap = { html_b: 'md_bold', html_i: 'md_italic', html_s: 'md_strikethrough', html_code: 'md_code', html_link: 'md_link', html_ul: 'md_ul', html_ol: 'md_ol' };
        const mdAction = mdMap[action] || action;
        syntax = formatSyntax[mdAction];
    } else {
        syntax = formatSyntax[action];
    }

    if (!syntax) return;

    const textarea = dom.contentInput;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    let before = syntax.before;
    let after = syntax.after;
    let placeholder = syntax.placeholder;
    const isBlock = syntax.block || false;

    if (isBlock && !selected) {
        const lineStart = text.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = text.indexOf('\n', start);
        const line = text.substring(lineStart, lineEnd !== -1 ? lineEnd : text.length);
        const newText = text.substring(0, lineStart) + before + line + after + text.substring(lineStart + line.length);
        textarea.value = newText;
        const newPos = lineStart + before.length + line.length + after.length;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
    } else if (isBlock && selected) {
        const lines = selected.split('\n');
        const wrappedLines = lines.map((l, i) => (i === 0 && action === 'ol' ? before : before) + l);
        const newText = text.substring(0, start) + wrappedLines.join('\n') + text.substring(end);
        textarea.value = newText;
        textarea.selectionStart = start;
        textarea.selectionEnd = start + wrappedLines.join('\n').length;
    } else if (!selected && placeholder) {
        const insertion = before + placeholder + after;
        const newText = text.substring(0, start) + insertion + text.substring(end);
        textarea.value = newText;
        textarea.selectionStart = start + before.length;
        textarea.selectionEnd = start + before.length + placeholder.length;
    } else if (selected) {
        const insertion = before + selected + after;
        const newText = text.substring(0, start) + insertion + text.substring(end);
        textarea.value = newText;
        textarea.selectionStart = start + before.length;
        textarea.selectionEnd = start + before.length + selected.length;
    }

    textarea.focus();
    updatePreview();
}

// --- Date Format Helper ---

function formatDateString(format) {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    const hour = pad(now.getHours());
    const minute = pad(now.getMinutes());
    const second = pad(now.getSeconds());
    const locale = currentLang === 'fr' ? 'fr-FR' : 'en-US';
    const dayName = now.toLocaleDateString(locale, { weekday: 'long' });
    const monthName = now.toLocaleDateString(locale, { month: 'long' });
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    return format.replace(/%d/g, day).replace(/%m/g, month).replace(/%Y/g, year).replace(/%H/g, hour).replace(/%M/g, minute).replace(/%S/g, second).replace(/%A/g, cap(dayName)).replace(/%B/g, cap(monthName));
}

// --- Create New File/Folder ---

async function createNewFile() {
    if (!isFolderMode || !currentDirHandle) { alert(t('noFolderOpened')); return; }
    const fileName = prompt(t('promptFileName'), 'nouveau.yml');
    if (!fileName) return;
    let finalName = fileName;
    if (!finalName.endsWith('.yml') && !finalName.endsWith('.yaml')) finalName += '.yml';
    try {
        if (window.showDirectoryPicker && currentDirHandle) {
            let fileHandle;
            try {
                fileHandle = await currentDirHandle.getFileHandle(finalName);
                if (!confirm(t('confirmOverwriteFile'))) return;
                const writable = await fileHandle.createWritable();
                const defaultContent = `# espanso match file\n# Generated by Espanso Editor\n\nmatches:\n`;
                await writable.write(defaultContent); await writable.close();
            } catch (e) {
                fileHandle = await currentDirHandle.getFileHandle(finalName, { create: true });
                const writable = await fileHandle.createWritable();
                const defaultContent = `# espanso match file\n# Generated by Espanso Editor\n\nmatches:\n`;
                await writable.write(defaultContent); await writable.close();
            }
        } else {
            const defaultContent = `# espanso match file\n# Generated by Espanso Editor\n\nmatches:\n`;
            const blob = new Blob([defaultContent], { type: 'text/yaml;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a'); link.href = url; link.download = finalName;
            document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
        }
        dom.statusMessage.innerText = t('newFileCreated') + finalName;
        if (window.showDirectoryPicker && currentDirHandle) await readDirectory(currentDirHandle);
    } catch (err) { if (err.name !== 'AbortError') { console.error('Error creating file:', err); alert(t('errorCreatingFile')); } }
}

async function createNewFolder() {
    if (!isFolderMode || !currentDirHandle) { alert(t('noFolderOpened')); return; }
    if (!window.showDirectoryPicker) { alert(t('errorCreatingFolder') + ' ' + t('alertNoApi')); return; }
    const folderName = prompt(t('promptFolderName'), 'nouveau-dossier');
    if (!folderName) return;
    if (!/^[a-zA-Z0-9_\- ]+$/.test(folderName)) { alert(t('errorCreatingFolder')); return; }
    try {
        await currentDirHandle.getDirectoryHandle(folderName, { create: true });
        
        if (!folderDirs.includes(folderName)) {
            folderDirs.push(folderName);
        }
        
        dom.statusMessage.innerText = t('newFolderCreated') + folderName;
        await readDirectory(currentDirHandle);
    } catch (err) { if (err.name !== 'AbortError') { console.error('Error creating folder:', err); alert(t('errorCreatingFolder')); } }
}

// Start
init();
