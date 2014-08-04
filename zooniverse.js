/*!
 * Zooniverse Library - v0.7.1
 */
;(function(window) {
window.base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  
  encode: function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    
    input = base64._utf8_encode(input);
    
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      
      output = output +
        base64._keyStr.charAt(enc1) + base64._keyStr.charAt(enc2) +
        base64._keyStr.charAt(enc3) + base64._keyStr.charAt(enc4);
    }
    
    return output;
  },
  
  decode: function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
    while (i < input.length) {
      enc1 = base64._keyStr.indexOf(input.charAt(i++));
      enc2 = base64._keyStr.indexOf(input.charAt(i++));
      enc3 = base64._keyStr.indexOf(input.charAt(i++));
      enc4 = base64._keyStr.indexOf(input.charAt(i++));
      
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      
      output = output + String.fromCharCode(chr1);
      
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    
    output = base64._utf8_decode(output);
    
    return output;
  },
  
  _utf8_encode: function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    
    return utftext;
  },
  
  _utf8_decode: function (utftext) {
    var string = "";
    var i = 0;
    var c = 0, c1 = 0, c2 = 0;
    
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c1 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
        i += 2;
      } else {
        c1 = utftext.charCodeAt(i + 1);
        c2 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
        i += 3;
      }
    }
    return string;
  }
};

(function() {
  var en, _base;

  en = {
    topBarHeading: 'A Zooniverse project',
    signUpHeading: 'Sign up for a new Zooniverse account',
    signInHeading: 'Sign in to your Zooniverse account',
    signUp: 'Sign up',
    signIn: 'Sign in',
    signOut: 'Sign out',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    realName: 'Real name',
    whyRealName: 'This will be used when we thank contributors, for example, in talks or on posters. If you don\'t want to be mentioned publicly, leave this blank.',
    noAccount: 'Don\'t have an account?',
    agreeToPrivacyPolicy: 'I agree to the <a href="https://www.zooniverse.org/privacy" target="_blank">privacy policy</a>.',
    betaPreference: 'I would like to receive notices with opportunities to test and provide feedback on unreleased Zooniverse projects.',
    forgotPassword: 'Forgot your password?',
    badLogin: 'Incorrect username or password',
    signInFailed: 'Sign in failed.',
    signInForProfile: 'Sign in to see your profile.',
    footerHeading: 'The Zooniverse is a collection of web-based citizen science projects that use the efforts of volunteers to help researchers deal with the flood of data that confronts them.',
    privacyPolicy: 'Privacy policy',
    forkOnGitHub: 'Source & bugs',
    recents: 'Recents',
    favorites: 'Favorites',
    none: 'none'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.en = en;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = en;
  }

}).call(this);

(function() {
  var es, _base;

  es = {
    topBarHeading: 'Un proyecto de Zooniverse',
    signUpHeading: 'Regístrate con una nueva cuenta Zooniverse',
    signInHeading: 'Inicia sesión con tu cuenta de Zooniverse',
    signUp: 'Suscribirse',
    signIn: 'Iniciar sesión',
    signOut: 'Salir',
    username: 'Nombre de Usuario',
    password: 'Contraseña',
    email: 'Email',
    realName: 'Nombre Real',
    whyRealName: 'Esto será usado para agradecer a los colaboradores, por ejempl  en las conversaciones o carteles. Si no quieres ser mencionado públicament  déjalo en blanco.',
    noAccount: '¿No tienes una cuenta?',
    agreeToPrivacyPolicy: 'Estoy de acuerdo con <a href="https://www.zoonivers  org/privacy" target="_blank"> y su política de privacidad </a>.',
    betaPreference: 'Me gustaría recibir noticias con oportunidades para probar   proporcionar feedback en los proyectos inéditos de Zooniverse',
    forgotPassword: '¿Olvidaste tu contraseña?',
    badLogin: 'Nombre de usuario o contraseña incorrecta',
    signInFailed: 'Error al iniciar sesión',
    signInForProfile: 'Inicia sesión para ver tu perfil.',
    footerHeading: 'Zooniverse es una colección de proyectos de ciencia ciudadan  basados en la web que utiliza el esfuerzo de voluntarios para ayudar a lo investigadores con la avalancha de datos a la que se enfrentan.',
    privacyPolicy: 'Política de privacidad',
    forkOnGitHub: 'Fuente y errores',
    recents: 'Recientes',
    favorites: 'Favoritos',
    none: 'ninguno'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.es = es;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = es;
  }

}).call(this);

(function() {
  var fr, _base;

  fr = {
    topBarHeading: 'Un projet Zooniverse',
    signUpHeading: 'Créer un compte Zooniverse',
    signInHeading: 'Connectez-vous à votre compte Zooniverse',
    signUp: 'S\'inscrire',
    signIn: 'Connexion',
    signOut: 'Déconnexion',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    email: 'Email',
    realName: 'Prénom Nom',
    whyRealName: 'Votre nom pourra être utiliser lors du remerciement des contributeurs, par exemple lors de présentation orales ou sur des posters.<br />Si vous ne souhaitez pas qu\'il soit mentionner publiquement, laissez cette case vide.',
    noAccount: 'Vous n\'avez pas encore de compte?',
    agreeToPrivacyPolicy: 'J\'accepte les <a href="https://www.zooniverse.org/privacy" target="_blank">conditions d\'utilisation </a>.',
    betaPreference: 'J\'aimerais être tenu au courant des projets en cours de développement par Zooniverse, afin de participer aux tests et donner mon avis.',
    forgotPassword: 'Mot de passe oublié?',
    badLogin: 'Utilisateur ou mot de passe incorrect',
    signInFailed: 'Échec de la connexion.',
    signInForProfile: 'Connectez-vous pour accéder à votre profil.',
    footerHeading: 'Zooniverse est une collection de projets de science participative en ligne qui permettent aux volontaires d\'aider les scientifiques à traiter les immenses quantités de données dont ils disposent.',
    privacyPolicy: 'Contiditons d\'utilisation',
    recents: 'Récents',
    favorites: 'Favoris',
    none: 'aucun'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.fr = fr;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = fr;
  }

}).call(this);

(function() {
  var pl, _base;

  pl = {
    topBarHeading: 'Projekt Zooniverse',
    signUpHeading: 'Utwórz nowe konto Zooniverse',
    signInHeading: 'Zaloguj się na swoje konto Zooniverse',
    signUp: 'Zarejestruj',
    signIn: 'Zaloguj',
    signOut: 'Wyloguj',
    username: 'Nazwa użytkownika',
    password: 'Hasło',
    email: 'Adres e-mail',
    realName: 'Prawdziwe imię',
    whyRealName: 'Korzystamy z tych danych, kiedy dziękujemy ochotnikom za ich wkład, na przykład podczas rozmów czy na plakatach. <br/> Jeżeli nie chcesz, abyśmy wymieniali Cię publicznie z imienia i nazwiska, zostaw to pole puste.',
    noAccount: 'Nie masz jeszcze konta?',
    agreeToPrivacyPolicy: 'Zgadzam się z <a href="https://www.zooniverse.org/privacy" target="_blank">polityką prywatności</a>.',
    forgotPassword: 'Nie pamiętasz hasła?',
    badLogin: 'Niepoprawna nazwa użytkownika lub hasło',
    signInFailed: 'Nie udało się zalogować',
    signInForProfile: 'Zaloguj się, aby zobaczyć swój profil',
    footerHeading: 'Zooniverse to zbiór projektów nauki obywatelskiej w Internecie, dzięki którym ochotnicy pomagają badaczom przedzierać się przez powódź napływających danych.',
    privacyPolicy: 'Polityka prywatności',
    recents: 'Najnowsze',
    favorites: 'Ulubione',
    none: 'nic'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.pl = pl;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = pl;
  }

}).call(this);

(function() {
  var ru, _base;

  ru = {
    topBarHeading: 'Проект Zooniverse',
    signUpHeading: 'Создать новый аккаунт Zooniverse',
    signInHeading: 'Войти в ваш аккаунт Zooniverse',
    signUp: 'Зарегистрироваться',
    signIn: 'Войти',
    signOut: 'Выйти',
    username: 'Имя пользователя',
    password: 'Пароль',
    email: 'Адрес E-mail',
    realName: 'Настоящее имя',
    whyRealName: 'Используется при выражении нашей благодарности участникам, например, в обсуждениях или объявлениях. Если вы не хотите, чтобы вас упоминали публично, оставьте это поле пустым.',
    noAccount: 'Нет аккаунта?',
    agreeToPrivacyPolicy: 'Я согласен с <a href="https://www.zooniverse.org/privacy" target="_blank">политикой конфиденциальности</a>.',
    betaPreference: 'Я хочу получать приглашения к участию в тестировании новых проектов Zooniverse.',
    forgotPassword: 'Забыли пароль?',
    badLogin: 'Неправильное имя пользователя или пароль',
    signInFailed: 'Вход не выполнен.',
    signInForProfile: 'Войдите, чтобы увидеть свой профиль.',
    footerHeading: 'Zooniverse — это группа онлайн-проектов гражданской науки, где добровольцы помогают обрабатывать огромные объемы данных, с которыми приходится сталкиваться учёным.',
    privacyPolicy: 'Политика конфиденциальности',
    forkOnGitHub: 'Исходный код и баги',
    recents: 'Недавние',
    favorites: 'Избранное',
    none: 'пусто'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.ru = ru;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = ru;
  }

}).call(this);

(function() {
  var zh_tw, _base;

  zh_tw = {
    topBarHeading: '「Zooniverse」計畫',
    signUpHeading: ' "申請新的「Zooniverse」帳號',
    signInHeading: '以「Zooniverse」帳號登入 ',
    signUp: '新增帳號',
    signIn: '登入',
    signOut: '登出',
    username: '用戶名',
    password: '密碼',
    email: '電子信箱帳號',
    realName: '真實姓名',
    whyRealName: '這會用來感謝我們的協力夥伴，譬如放在演講場合或海報上。如果你不願公開真實姓名，可以空白。',
    noAccount: '還沒開立過帳號嗎？',
    agreeToPrivacyPolicy: '我同意 <a href="https://www.zooniverse.org/privacy" target="_blank"> 隱私權設定規定</a>.',
    betaPreference: '我樂意幫忙測試尚未正式上線的「Zooniverse」計畫並協助讓程式更完善，有機會請通知我。',
    forgotPassword: '忘記密碼?',
    badLogin: '用戶名稱錯誤或密碼錯誤',
    signInFailed: '登入失敗。',
    signInForProfile: '登入查看已分類記錄。',
    footerHeading: ' 「Zooniverse」網站以網路方式讓一般大眾能參與多種研究主題的科學計畫。志工分類員的協同努力，幫助科學家處理了龐大資料，這海量的資料原本對科學家是個不小的挑戰！',
    privacyPolicy: '隱私權設定規定',
    forkOnGitHub: '原始碼及錯誤回報',
    recents: '最新完成的',
    favorites: '我的最愛',
    none: '無'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.zh_tw = zh_tw;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = zh_tw;
  }

}).call(this);

(function() {
  var zh_cn, _base;

  zh_cn = {
    topBarHeading: 'Zooniverse计划',
    signUpHeading: ' "申请新的Zooniverse帐号',
    signInHeading: '登入Zooniverse',
    signUp: '申请帐号',
    signIn: '登入',
    signOut: '登出',
    username: '用户名',
    password: '密码',
    email: '电子信箱帐号',
    realName: '真实姓名',
    whyRealName: '将会被用来感谢我们的协力伙伴，譬如放在演讲场合或海报上。如果你不愿公开真实姓名，可以空白。 ',
    noAccount: '还没开立过帐号吗？ ',
    agreeToPrivacyPolicy: '我同意<a href="https://www.zooniverse.org/privacy" target="_blank">隐私权设定规定</a>.',
    betaPreference: '我愿意帮忙测试尚未正式上线的 "Zooniverse计划" 并协助让程式更完善，有这类机会请通知我。 ',
    forgotPassword: '忘记密码?',
    badLogin: '用户名称错误或密码错误',
    signInFailed: '登入失败。 ',
    signInForProfile: '登入查看已分类记录。 ',
    footerHeading: ' Zooniverse网站以网路方式让一般大众能参与多种研究主题的科学计划。海量的资料原本給科学家带来不小的挑战，还好有志愿者分类员协同努力，已帮助科学家处理了大量资料。 ',
    privacyPolicy: '隐私权设定规定',
    forkOnGitHub: '原始码及错误回报',
    recents: '最新完成的',
    favorites: '我的最爱',
    none: '无'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.zh_cn = zh_cn;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = zh_cn;
  }

}).call(this);

(function() {
  var de, _base;

  de = {
    topBarHeading: 'Ein Projekt von Zooniverse',
    signUpHeading: 'Ein neues Zooniverse-Konto erstellen',
    signInHeading: 'Mit Zooniverse-Konto anmelden',
    signUp: 'Registrieren',
    signIn: 'Anmelden',
    signOut: 'Abmelden',
    username: 'Benutzername',
    password: 'Passwort',
    email: 'E-Mail',
    realName: 'Tatsächlicher Name',
    whyRealName: 'Wenn wir Freiwilligen danken, zum Beispiel auf Postern oder in Vorträgen, wird dein tatsächlicher Name verwendet. Falls du nicht öffentlich erwähnt werden willst, lasse diese Zeile offen.',
    noAccount: 'Kein Benutzerkonto?',
    agreeToPrivacyPolicy: 'Ich stimme der <a href="https://www.zooniverse.org/privacy" target="_blank">Datenschutzrichtlinie</a> zu.',
    betaPreference: 'Ich würde gerne eine Nachricht erhalten, wenn die Gelegenheit besteht, neue Zooniverse-Projekte zu testen und meine Meinung abzugeben.',
    forgotPassword: 'Passwort vergessen?',
    badLogin: 'Falscher Benutzername oder falsches Passwort',
    signInFailed: 'Anmeldung fehlgeschlagen.',
    signInForProfile: 'Melde dich an, um dein Profil zu sehen.',
    footerHeading: 'Zooniverse ist eine Sammlung von Citizen Science Projekten im Internet, die die Leistungen Freiwilliger nutzen, um Forschern mit der Datenflut zu helfen, mit der sie konfrontiert werden.',
    privacyPolicy: 'Datenschutzrichtlinie',
    forkOnGitHub: 'Source & Bugs',
    recents: 'Neueste',
    favorites: 'Favoriten',
    none: 'keine'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.de = de;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = de;
  }

}).call(this);

(function() {
  var cs, _base;

  cs = {
    topBarHeading: 'Zooniverse projekt',
    signUpHeading: 'Vytvoření Zooniverse účtu',
    signInHeading: 'Přihlašování na Zooniverse účet',
    signUp: 'Zaregistrovat se',
    signIn: 'Přihlásit se',
    signOut: 'Odhlásit se',
    username: 'Uživatelské jméno',
    password: 'Heslo',
    email: 'Email',
    realName: 'Pravé jméno',
    whyRealName: 'Toto jméno bývá použito při děkování přispěvatelům, např. v rozhovorech nebo na posterech. Pokud si nepřejete, aby bylo Vaše jméno zveřejněno, nechte políčko prázdné.',
    noAccount: 'Nemáte ještě účet?',
    agreeToPrivacyPolicy: 'Souhlasím se <a href="https://www.zooniverse.org/privacy" target="_blank">zásadami ochrany osobních údajů</a>.',
    betaPreference: 'Chci dostávat oznámení o možnosti testování dosud nezveřejněných Zooniverse projektů a poskytování zpětné vazby.',
    forgotPassword: 'Zapomněli jste heslo?',
    badLogin: 'Zadali jste chybné uživatelské jméno, nebo heslo.',
    signInFailed: 'Přihlášení se nezdařilo.',
    signInForProfile: 'K zobrazení Vašeho profilu je nutné se přihlásit.',
    footerHeading: 'Zooniverse je soubor občansko naučných webových projektů, které využívají úsilí dobrovolníků pomoct vědcům zpracovat kvanta dat, jimiž jsou při svém výzkumu zaplaveni.',
    privacyPolicy: 'Zásady ochrany osobních údajů',
    forkOnGitHub: 'Zdrojové soubory & chyby',
    recents: 'Nedávné',
    favorites: 'Oblíbené',
    none: 'Žádné'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.cs = cs;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = cs;
  }

}).call(this);

(function() {
  var ro, _base;

  ro = {
    topBarHeading: 'Un proiect Zooniverse',
    signUpHeading: 'Inregistreaza un nou cont Zooniverse',
    signInHeading: 'Logheaza-te in countul tau Zooniverse',
    signUp: 'Inregistrare',
    signIn: 'Logare',
    signOut: 'Delogare',
    username: 'Nume utilizator',
    password: 'Parola',
    email: 'Email',
    realName: 'Numele real',
    whyRealName: 'Acesta va fi folosit pentru a multumi colaboratorilor, de exemplu, in discutii sau pe afise. Daca nu vrei sa fii mentionat in public, lasa acest camp necompletat.',
    noAccount: 'Nu ai un cont?',
    agreeToPrivacyPolicy: 'Sunt de acord cu <a href="https://www.zooniverse.org/privacy" target="_blank">regulile de confidentialitate</a>.',
    betaPreference: 'As dori sa primesc mesaje despre oportunitati de a testa si comenta despre proiecte Zooniverse nelansate.',
    forgotPassword: 'Ai uitat parola?',
    badLogin: 'Nume utilizator sau parola este incorecta',
    signInFailed: 'Logarea a esuat.',
    signInForProfile: 'Logheaza-te pentru a-ti vedea profilul.',
    footerHeading: 'Zooniverse este o colectie de proiecte stiintifice conduse online in care voluntarii ii ajuta pe cercetatori sa administreze afluxul de date cu care se confrunta.',
    privacyPolicy: 'Reguli de confidentialitate',
    forkOnGitHub: 'Cod sursa si erori',
    recents: 'Recente',
    favorites: 'Favorite',
    none: 'nici una'
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).translations == null) {
    _base.translations = {};
  }

  window.zooniverse.translations.ro = ro;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = ro;
  }

}).call(this);

(function() {
  var $, EventEmitter, logTriggers,
    __hasProp = {}.hasOwnProperty;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  $ = window.jQuery;

  logTriggers = !!~location.href.indexOf('log=1');

  EventEmitter = (function() {
    var method, methodName;

    function EventEmitter() {}

    EventEmitter.on = function(eventName, handler) {
      if (this.jQueryEventProxy == null) {
        this.jQueryEventProxy = $({});
      }
      return this.jQueryEventProxy.on(eventName, handler);
    };

    EventEmitter.one = function(eventName, handler) {
      if (this.jQueryEventProxy == null) {
        this.jQueryEventProxy = $({});
      }
      return this.jQueryEventProxy.one(eventName, handler);
    };

    EventEmitter.off = function(eventName, handler) {
      if (this.jQueryEventProxy == null) {
        this.jQueryEventProxy = $({});
      }
      return this.jQueryEventProxy.off(eventName, handler);
    };

    EventEmitter.trigger = function(eventName, args) {
      var _base, _ref;
      if (args == null) {
        args = [];
      }
      if (logTriggers) {
        if (typeof console !== "undefined" && console !== null) {
          console.info(this.name || this.toString(), eventName.toUpperCase(), args);
        }
      }
      if (this.jQueryEventProxy == null) {
        this.jQueryEventProxy = $({});
      }
      (_ref = this.jQueryEventProxy).trigger.apply(_ref, arguments);
      return typeof (_base = this.constructor).trigger === "function" ? _base.trigger(eventName, [this].concat(args)) : void 0;
    };

    for (methodName in EventEmitter) {
      if (!__hasProp.call(EventEmitter, methodName)) continue;
      method = EventEmitter[methodName];
      EventEmitter.prototype[methodName] = method;
    }

    EventEmitter.prototype.destroy = function() {
      this.trigger('destroying');
      return this.off();
    };

    if (logTriggers) {
      EventEmitter.prototype.toString = function() {
        return "" + this.constructor.name + " instance";
      };
    }

    return EventEmitter;

  })();

  window.zooniverse.EventEmitter = EventEmitter;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = EventEmitter;
  }

}).call(this);

(function() {
  var $, EventEmitter, ProxyFrame, beta, demo, flaggedHost, highPort, html, messageId, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  EventEmitter = window.zooniverse.EventEmitter || require('./event-emitter');

  $ = window.jQuery;

  html = $(document.body.parentNode);

  messageId = -1;

  demo = !!~location.hostname.indexOf('demo');

  beta = !!~location.pathname.indexOf('beta');

  highPort = +location.port >= 1024;

  flaggedHost = (_ref = location.search.match(/api=([^&]+)/)) != null ? _ref[1] : void 0;

  if ((flaggedHost != null) && !!!~flaggedHost.indexOf('//')) {
    flaggedHost = "//" + flaggedHost;
  }

  ProxyFrame = (function(_super) {
    __extends(ProxyFrame, _super);

    ProxyFrame.REJECTION = 'ProxyFrame not connected';

    ProxyFrame.prototype.host = flaggedHost || ("https://" + (demo || beta || highPort ? 'dev' : 'api') + ".zooniverse.org");

    ProxyFrame.prototype.path = '/proxy';

    ProxyFrame.prototype.loadTimeout = 5 * 1000;

    ProxyFrame.prototype.retryTimeout = 2 * 60 * 1000;

    ProxyFrame.prototype.el = null;

    ProxyFrame.prototype.className = 'proxy-frame';

    ProxyFrame.prototype.attempt = 0;

    ProxyFrame.prototype.ready = false;

    ProxyFrame.prototype.failed = false;

    ProxyFrame.prototype.deferreds = null;

    ProxyFrame.prototype.queue = null;

    function ProxyFrame(params) {
      var property, value,
        _this = this;
      if (params == null) {
        params = {};
      }
      this.timeout = __bind(this.timeout, this);
      ProxyFrame.__super__.constructor.apply(this, arguments);
      for (property in params) {
        if (!__hasProp.call(params, property)) continue;
        value = params[property];
        if (property in this && (value != null)) {
          this[property] = value;
        }
      }
      if (this.deferreds == null) {
        this.deferreds = {};
      }
      if (this.queue == null) {
        this.queue = [];
      }
      $(window).on('message', function(_arg) {
        var e;
        e = _arg.originalEvent;
        if (e.source === _this.el.get(0).contentWindow) {
          return _this.onMessage.apply(_this, arguments);
        }
      });
      this.connect();
    }

    ProxyFrame.prototype.connect = function() {
      var testBad, _ref1,
        _this = this;
      testBad = this.attempt < 0 ? '_BAD' : '';
      this.attempt += 1;
      if ((_ref1 = this.el) != null) {
        _ref1.remove();
      }
      this.el = $("<iframe src='" + this.host + this.path + testBad + "' class='" + this.className + "' data-attempt='" + this.attempt + "' style='display: none;'></iframe>");
      this.el.appendTo(document.body);
      return setTimeout((function() {
        if (!_this.ready) {
          return _this.timeout();
        }
      }), this.loadTimeout);
    };

    ProxyFrame.prototype.onReady = function() {
      var _this = this;
      this.attempt = 0;
      this.ready = true;
      this.failed = false;
      setTimeout((function() {
        var payload, _i, _len, _ref1, _results;
        _ref1 = _this.queue;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          payload = _ref1[_i];
          _results.push(_this.process(payload));
        }
        return _results;
      }), 100);
      html.removeClass('offline');
      return this.trigger('ready');
    };

    ProxyFrame.prototype.timeout = function() {
      this.trigger('timeout', this.loadTimeout);
      return this.onFailed();
    };

    ProxyFrame.prototype.onFailed = function() {
      var payload, _i, _len, _ref1,
        _this = this;
      if (this.ready) {
        return;
      }
      this.failed = true;
      _ref1 = this.queue;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        payload = _ref1[_i];
        this.deferreds[payload.id].reject(this.constructor.REJECTION);
      }
      this.queue.splice(0);
      html.addClass('offline');
      this.trigger('fail');
      return setTimeout((function() {
        return _this.connect();
      }), this.retryTimeout);
    };

    ProxyFrame.prototype.send = function(payload, done, fail) {
      var deferred,
        _this = this;
      messageId += 1;
      payload.id = messageId;
      deferred = new $.Deferred;
      deferred.then(done, fail);
      (function(messageId, deferred) {
        return deferred.always(function() {
          return delete _this.deferreds[messageId];
        });
      })(messageId, deferred);
      this.deferreds[messageId] = deferred;
      if (this.failed) {
        deferred.reject(this.constructor.REJECTION);
      } else if (this.ready) {
        this.process(payload);
      } else {
        this.queue.push(payload);
      }
      return deferred.promise();
    };

    ProxyFrame.prototype.process = function(payload) {
      return this.el.get(0).contentWindow.postMessage(JSON.stringify(payload), this.host);
    };

    ProxyFrame.prototype.onMessage = function(_arg) {
      var e, message;
      e = _arg.originalEvent;
      message = JSON.parse(e.data);
      if (message.id === 'READY') {
        return this.onReady();
      }
      if (message.failure) {
        this.deferreds[message.id].reject(message.response);
      } else {
        this.deferreds[message.id].resolve(message.response);
      }
      return this.trigger('response', [message]);
    };

    ProxyFrame.prototype.destroy = function() {
      this.el.remove();
      return ProxyFrame.__super__.destroy.apply(this, arguments);
    };

    return ProxyFrame;

  })(EventEmitter);

  window.zooniverse.ProxyFrame = ProxyFrame;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = ProxyFrame;
  }

}).call(this);

(function() {
  var $, Api, EventEmitter, ProxyFrame,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  EventEmitter = window.zooniverse.EventEmitter || require('./event-emitter');

  ProxyFrame = window.zooniverse.ProxyFrame || require('./proxy-frame');

  $ = window.jQuery;

  Api = (function(_super) {
    __extends(Api, _super);

    Api.current = null;

    Api.prototype.project = '.';

    Api.prototype.headers = {};

    Api.prototype.proxyFrame = null;

    function Api(_arg) {
      var host, loadTimeout, path, _ref,
        _this = this;
      _ref = _arg != null ? _arg : {}, this.project = _ref.project, host = _ref.host, path = _ref.path, loadTimeout = _ref.loadTimeout;
      Api.__super__.constructor.apply(this, arguments);
      this.proxyFrame = new ProxyFrame({
        host: host,
        path: path,
        loadTimeout: loadTimeout
      });
      this.proxyFrame.on('ready', function() {
        return _this.trigger('ready');
      });
      this.proxyFrame.on('fail', function() {
        return _this.trigger('fail');
      });
      this.select();
    }

    Api.prototype.request = function(type, url, data, done, fail) {
      var _ref;
      if (typeof data === 'function') {
        _ref = [done, data, null], fail = _ref[0], done = _ref[1], data = _ref[2];
        this.trigger('request', [type, url, data]);
      }
      return this.proxyFrame.send({
        type: type,
        url: url,
        data: data,
        headers: this.headers
      }, done, fail);
    };

    Api.prototype.get = function() {
      return window.req = this.request.apply(this, ['get'].concat(__slice.call(arguments)));
    };

    Api.prototype.getJSON = function() {
      return this.request.apply(this, ['getJSON'].concat(__slice.call(arguments)));
    };

    Api.prototype.post = function() {
      return this.request.apply(this, ['post'].concat(__slice.call(arguments)));
    };

    Api.prototype.put = function() {
      return this.request.apply(this, ['put'].concat(__slice.call(arguments)));
    };

    Api.prototype["delete"] = function() {
      return this.request.apply(this, ['delete'].concat(__slice.call(arguments)));
    };

    Api.prototype.select = function() {
      this.trigger('select');
      return this.constructor.current = this;
    };

    Api.prototype.destroy = function() {
      this.proxyFrame.destroy();
      return Api.__super__.destroy.apply(this, arguments);
    };

    return Api;

  })(EventEmitter);

  window.zooniverse.Api = Api;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Api;
  }

}).call(this);

(function() {
  var toggleClass, _base,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  toggleClass = function(element, className, condition) {
    var classList, contained;
    classList = element.className.split(/\s+/);
    contained = __indexOf.call(classList, className) >= 0;
    if (condition == null) {
      condition = !contained;
    }
    condition = !!condition;
    if (!contained && condition === true) {
      classList.push(className);
    }
    if (contained && condition === false) {
      classList.splice(classList.indexOf(className), 1);
    }
    element.className = classList.join(' ');
    return null;
  };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).util == null) {
    _base.util = {};
  }

  window.zooniverse.util.toggleClass = toggleClass;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = toggleClass;
  }

}).call(this);

(function() {
  var $, EventEmitter, LanguageManager, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  EventEmitter = ((_ref = window.zooniverse) != null ? _ref.EventEmitter : void 0) || require('./event-emitter');

  $ = window.jQuery;

  LanguageManager = (function(_super) {
    __extends(LanguageManager, _super);

    LanguageManager.current = null;

    LanguageManager.defaultLocale = 'en';

    LanguageManager.prototype.translations = null;

    LanguageManager.prototype.code = null;

    function LanguageManager(params) {
      this.defaultStringsFormat = __bind(this.defaultStringsFormat, this);
      this.label = __bind(this.label, this);
      var property, value, _base, _name, _ref1, _ref2, _ref3,
        _this = this;
      for (property in params) {
        if (!__hasProp.call(params, property)) continue;
        value = params[property];
        if (property in this) {
          this[property] = value;
        }
      }
      if (this.translations == null) {
        this.translations = {};
      }
      if (this.code == null) {
        this.code = (_ref1 = location.search.match(/lang=([^&]+)/)) != null ? _ref1[1] : void 0;
      }
      if (this.code == null) {
        this.code = localStorage.getItem('zooniverse-language-code');
      }
      if (this.code == null) {
        this.code = (_ref2 = navigator.language) != null ? _ref2.split('-')[0] : void 0;
      }
      if (this.code == null) {
        this.code = (_ref3 = navigator.userLanguage) != null ? _ref3.split('-')[0] : void 0;
      }
      if (this.code == null) {
        this.code = this.constructor.prototype.code;
      }
      if (__indexOf.call(this.code, '/') >= 0 || __indexOf.call(this.code, '.json') >= 0) {
        if ((_base = this.translations)[_name = this.code] == null) {
          _base[_name] = {
            label: this.code,
            strings: this.code
          };
        }
      }
      this.constructor.current = this;
      setTimeout(function() {
        return _this.setLanguage(_this.code);
      });
    }

    LanguageManager.prototype.setLanguage = function(code, done, fail) {
      var localStrings, pathToStrings, request, _ref1,
        _this = this;
      this.code = code;
      if (this.translations[this.code] == null) {
        this.code = this.constructor.defaultLocale;
      }
      if (this.translations[this.code].strings == null) {
        this.translations[this.code].strings = this.defaultStringsFormat();
      }
      if (typeof this.translations[this.code].strings === 'string') {
        pathToStrings = (_ref1 = this.translations[this.code]) != null ? _ref1.strings : void 0;
        localStrings = JSON.parse(localStorage.getItem("zooniverse-language-strings-" + this.code));
        if (localStrings != null) {
          this.translations[this.code].strings = localStrings;
          this.setLanguage(this.code, done, fail);
        }
        request = $.getJSON(pathToStrings);
        request.done(function(data) {
          localStorage.setItem("zooniverse-language-strings-" + _this.code, JSON.stringify(data));
          _this.translations[_this.code].strings = data;
          return _this.setLanguage(_this.code, done, fail);
        });
        return request.fail(function() {
          _this.trigger('language-fetch-fail');
          return typeof fail === "function" ? fail.apply(null, arguments) : void 0;
        });
      } else {
        localStorage.setItem('zooniverse-language-code', this.code);
        document.querySelector('html').lang = this.code;
        this.trigger('change-language', [this.code, this.translations[this.code].strings]);
        return typeof done === "function" ? done(this.code, this.translations[this.code].strings) : void 0;
      }
    };

    LanguageManager.prototype.label = function() {
      var _ref1, _ref2;
      return ((_ref1 = this.translations[this.code]) != null ? _ref1.label : void 0) || ((_ref2 = this.translations[this.constructor.prototype.code]) != null ? _ref2.label : void 0);
    };

    LanguageManager.prototype.defaultStringsFormat = function() {
      return "./translations/" + this.code + ".json";
    };

    return LanguageManager;

  })(EventEmitter);

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  window.zooniverse.LanguageManager = LanguageManager;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = LanguageManager;
  }

}).call(this);

(function() {
  var LanguageManager, translate, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref20, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __slice = [].slice;

  LanguageManager = ((_ref = window.zooniverse) != null ? _ref.LanguageManager : void 0) || require('./language-manager');

  translate = function() {
    var element, key, tag, _arg, _i;
    _arg = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), key = arguments[_i++];
    tag = _arg[0];
    if (tag == null) {
      tag = 'span';
    }
    element = document.createElement(tag);
    element.setAttribute(translate.attr, key);
    translate.refresh(element);
    return element.outerHTML;
  };

  translate.attr = 'data-zooniverse-translate';

  translate.strings = {
    en: ((_ref1 = window.zooniverse) != null ? (_ref2 = _ref1.translations) != null ? _ref2.en : void 0 : void 0) || require('../translations/en'),
    es: ((_ref3 = window.zooniverse) != null ? (_ref4 = _ref3.translations) != null ? _ref4.es : void 0 : void 0) || require('../translations/es'),
    fr: ((_ref5 = window.zooniverse) != null ? (_ref6 = _ref5.translations) != null ? _ref6.fr : void 0 : void 0) || require('../translations/fr'),
    pl: ((_ref7 = window.zooniverse) != null ? (_ref8 = _ref7.translations) != null ? _ref8.pl : void 0 : void 0) || require('../translations/pl'),
    ru: ((_ref9 = window.zooniverse) != null ? (_ref10 = _ref9.translations) != null ? _ref10.ru : void 0 : void 0) || require('../translations/ru'),
    zh_tw: ((_ref11 = window.zooniverse) != null ? (_ref12 = _ref11.translations) != null ? _ref12.zh_tw : void 0 : void 0) || require('../translations/zh-tw'),
    zh_cn: ((_ref13 = window.zooniverse) != null ? (_ref14 = _ref13.translations) != null ? _ref14.zh_cn : void 0 : void 0) || require('../translations/zh-cn'),
    de: ((_ref15 = window.zooniverse) != null ? (_ref16 = _ref15.translations) != null ? _ref16.de : void 0 : void 0) || require('../translations/de'),
    cs: ((_ref17 = window.zooniverse) != null ? (_ref18 = _ref17.translations) != null ? _ref18.cs : void 0 : void 0) || require('../translations/cs'),
    ro: ((_ref19 = window.zooniverse) != null ? (_ref20 = _ref19.translations) != null ? _ref20.ro : void 0 : void 0) || require('../translations/ro')
  };

  translate.refresh = function(element, key) {
    var name, property, string, value, _i, _len, _ref21, _ref22, _ref23, _ref24, _ref25, _results;
    _ref21 = element.attributes;
    _results = [];
    for (_i = 0, _len = _ref21.length; _i < _len; _i++) {
      _ref22 = _ref21[_i], name = _ref22.name, value = _ref22.value;
      if (name.slice(0, translate.attr.length) !== translate.attr) {
        continue;
      }
      if (!value) {
        continue;
      }
      property = name.slice(translate.attr.length + 1) || 'innerHTML';
      string = (_ref23 = translate.strings[(_ref24 = LanguageManager.current) != null ? _ref24.code : void 0]) != null ? _ref23[value] : void 0;
      string || (string = (_ref25 = translate.strings[LanguageManager.defaultLocale]) != null ? _ref25[value] : void 0);
      string || (string = value);
      if (element.hasAttribute(property)) {
        _results.push(element.setAttribute(property, string));
      } else {
        _results.push(element[property] = string);
      }
    }
    return _results;
  };

  LanguageManager.on('change-language', function() {
    var element, _i, _len, _ref21, _results;
    _ref21 = document.querySelectorAll("[" + translate.attr + "]");
    _results = [];
    for (_i = 0, _len = _ref21.length; _i < _len; _i++) {
      element = _ref21[_i];
      _results.push(translate.refresh(element));
    }
    return _results;
  });

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  window.zooniverse.translate = translate;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = translate;
  }

}).call(this);

(function() {
  var $, EventEmitter, GA_SCOPES, GoogleAnalytics, gaSrc, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  EventEmitter = window.zooniverse.EventEmitter || require('./event-emitter');

  $ = window.jQuery;

  GA_SCOPES = {
    visitor: 1,
    session: 2,
    page: 3
  };

  gaSrc = 'http://www.google-analytics.com/ga.js';

  if (window.location.protocol === 'https:') {
    gaSrc = gaSrc.replace('http://www', 'https://ssl');
  }

  GoogleAnalytics = (function(_super) {
    __extends(GoogleAnalytics, _super);

    GoogleAnalytics.current = null;

    GoogleAnalytics.prototype.account = '';

    GoogleAnalytics.prototype.domain = '';

    GoogleAnalytics.prototype.trackHashes = true;

    GoogleAnalytics.prototype.ignoredSubdomainRefs = ['www'];

    function GoogleAnalytics(params) {
      var property, subdomain, value, _i, _len, _ref,
        _this = this;
      if (params == null) {
        params = {};
      }
      for (property in params) {
        value = params[property];
        this[property] = value;
      }
      this.select();
      if (!window._gaq) {
        $.getScript(gaSrc);
      }
      if (window._gaq == null) {
        window._gaq = [];
      }
      window._gaq.push(['_setAccount', this.account]);
      window._gaq.push(['_trackPageview']);
      if (this.domain) {
        window._gaq.push(['_setDomainName', this.domain]);
        _ref = this.ignoredSubdomainRefs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subdomain = _ref[_i];
          window._gaq.push(['_addIgnoredRef', "" + subdomain + "." + this.domain]);
        }
      }
      if (this.trackHashes) {
        $(window).on('hashchange', (function() {
          return _this.track();
        }));
      }
    }

    GoogleAnalytics.prototype.select = function() {
      this.constructor.current = this;
      return this.trigger('select');
    };

    GoogleAnalytics.prototype.track = function(pathname) {
      if (typeof pathname !== 'string') {
        pathname = "/" + location.hash;
      }
      window._gaq.push(['_trackPageview', pathname]);
      return this.trigger('track', [pathname]);
    };

    GoogleAnalytics.prototype.event = function(category, action, label, value, ignoreForBounceRate) {
      window._gaq.push(['_trackEvent'].concat(__slice.call(arguments)));
      return this.trigger('event', __slice.call(arguments));
    };

    GoogleAnalytics.prototype.custom = function(index, key, value, scope) {
      var command;
      if (typeof index === 'string') {
        index = this.constructor.indices[index];
      }
      if (typeof scope === 'string') {
        scope = GA_SCOPES[scope];
      }
      command = ['_setCustomVar', index, key, value];
      if (scope != null) {
        command.push(scope);
      }
      window._gaq.push(command);
      return this.trigger('custom', __slice.call(arguments));
    };

    return GoogleAnalytics;

  })(EventEmitter);

  if ((_ref = window.zooniverse) != null) {
    _ref.GoogleAnalytics = GoogleAnalytics;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = GoogleAnalytics;
  }

}).call(this);

(function() {
  var BaseModel, EventEmitter, _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).models == null) {
    _base.models = {};
  }

  EventEmitter = window.zooniverse.EventEmitter || require('../lib/event-emitter');

  BaseModel = (function(_super) {
    __extends(BaseModel, _super);

    BaseModel.idCounter = -1;

    BaseModel.instances = null;

    BaseModel.count = function() {
      if (this.instances == null) {
        this.instances = [];
      }
      return this.instances.length;
    };

    BaseModel.first = function() {
      if (this.instances == null) {
        this.instances = [];
      }
      return this.instances[0];
    };

    BaseModel.find = function(id) {
      var instance, _i, _len, _ref;
      if (this.instances == null) {
        this.instances = [];
      }
      _ref = this.instances;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        instance = _ref[_i];
        if (instance.id === id) {
          return instance;
        }
      }
    };

    BaseModel.search = function(query) {
      var instance, miss, property, value, _i, _len, _ref, _results;
      if (this.instances == null) {
        this.instances = [];
      }
      _ref = this.instances;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        instance = _ref[_i];
        miss = false;
        for (property in query) {
          if (!__hasProp.call(query, property)) continue;
          value = query[property];
          if (instance[property] !== value) {
            miss = true;
            break;
          }
        }
        if (miss) {
          continue;
        }
        _results.push(instance);
      }
      return _results;
    };

    BaseModel.destroyAll = function() {
      var _results;
      _results = [];
      while (this.count() !== 0) {
        _results.push(this.first().destroy());
      }
      return _results;
    };

    BaseModel.prototype.id = null;

    function BaseModel(params) {
      var property, value, _base1;
      if (params == null) {
        params = {};
      }
      BaseModel.__super__.constructor.apply(this, arguments);
      for (property in params) {
        if (!__hasProp.call(params, property)) continue;
        value = params[property];
        this[property] = value;
      }
      this.constructor.idCounter += 1;
      if (this.id == null) {
        this.id = "C_" + this.constructor.idCounter;
      }
      if ((_base1 = this.constructor).instances == null) {
        _base1.instances = [];
      }
      this.constructor.instances.push(this);
    }

    BaseModel.prototype.destroy = function() {
      var i, instance, _i, _len, _ref, _ref1, _results;
      BaseModel.__super__.destroy.apply(this, arguments);
      _ref = this.constructor.instances;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        instance = _ref[i];
        if (!(instance === this)) {
          continue;
        }
        if ((_ref1 = this.constructor.instances) != null) {
          _ref1.splice(i, 1);
        }
        break;
      }
      return _results;
    };

    return BaseModel;

  })(EventEmitter);

  window.zooniverse.models.BaseModel = BaseModel;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = BaseModel;
  }

}).call(this);

(function() {
  var Api, EventEmitter, User, base64, _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).models == null) {
    _base.models = {};
  }

  EventEmitter = window.zooniverse.EventEmitter || require('../lib/event-emitter');

  Api = window.zooniverse.Api || require('../lib/api');

  base64 = window.base64 || (require('../vendor/base64'), window.base64);

  User = (function(_super) {
    __extends(User, _super);

    User.current = false;

    User.path = function() {
      if (Api.current.project) {
        return "/projects/" + Api.current.project;
      } else {
        return '';
      }
    };

    User.fetch = function() {
      var fetcher, _ref;
      User.trigger('fetching', arguments);
      fetcher = (_ref = Api.current).getJSON.apply(_ref, ["" + (User.path()) + "/current_user"].concat(__slice.call(arguments)));
      fetcher.always(User.onFetch);
      return fetcher;
    };

    User.login = function(_arg) {
      var login, password, username, _ref;
      username = _arg.username, password = _arg.password;
      this.trigger('logging-in', arguments);
      login = (_ref = Api.current).getJSON.apply(_ref, ["" + (this.path()) + "/login"].concat(__slice.call(arguments)));
      login.done(this.onFetch);
      login.fail(this.onFail);
      return login;
    };

    User.logout = function() {
      var logout, _ref;
      this.trigger('logging-out', arguments);
      logout = (_ref = Api.current).getJSON.apply(_ref, ["" + (this.path()) + "/logout"].concat(__slice.call(arguments)));
      logout.always(this.onFetch);
      return logout;
    };

    User.signup = function(_arg) {
      var email, password, signup, username, _ref;
      username = _arg.username, password = _arg.password, email = _arg.email;
      this.trigger('signing-up');
      signup = (_ref = Api.current).getJSON.apply(_ref, ["" + (this.path()) + "/signup"].concat(__slice.call(arguments)));
      signup.always(this.onFetch);
      return signup;
    };

    User.onFetch = function(result) {
      var auth, original;
      original = User.current;
      if (result.success && 'name' in result && 'api_key' in result) {
        User.current = new User(result);
      } else {
        User.current = null;
      }
      if (User.current) {
        auth = base64.encode("" + User.current.name + ":" + User.current.api_key);
        Api.current.headers['Authorization'] = "Basic " + auth;
      } else {
        delete Api.current.headers['Authorization'];
      }
      if (User.current !== original) {
        if (original) {
          original.destroy();
        }
        User.trigger('change', [User.current]);
      }
      if (!result.success) {
        return User.trigger('sign-in-error', result.message);
      }
    };

    User.onFail = function() {
      return User.trigger('sign-in-failure');
    };

    User.prototype.id = '';

    User.prototype.zooniverse_id = '';

    User.prototype.api_key = '';

    User.prototype.name = '';

    User.prototype.avatar = '';

    User.prototype.project = null;

    function User(params) {
      var property, value;
      if (params == null) {
        params = {};
      }
      for (property in params) {
        if (!__hasProp.call(params, property)) continue;
        value = params[property];
        this[property] = value;
      }
    }

    User.prototype.setGroup = function(groupId, callback) {
      var get, path, _ref,
        _this = this;
      if (User.current == null) {
        return;
      }
      path = groupId != null ? "/user_groups/" + groupId + "/participate" : "/user_groups/TODO_HOW_DO_I_LEAVE_A_GROUP/participate";
      get = (_ref = Api.current) != null ? _ref.getJSON(path, function(group) {
        _this.trigger('change-group', group);
        return typeof callback === "function" ? callback.apply(null, arguments) : void 0;
      }) : void 0;
      return get;
    };

    User.prototype.setPreference = function(key, value, global, callback) {
      var _base1, _base2, _name, _ref;
      if (global == null) {
        global = false;
      }
      if (User.current == null) {
        return;
      }
      if (typeof global === 'function') {
        _ref = [false, global], global = _ref[0], callback = _ref[1];
      }
      if ((_base1 = User.current).preferences == null) {
        _base1.preferences = {};
      }
      if (global) {
        User.current.preferences[key] = value;
      } else {
        if ((_base2 = User.current.preferences)[_name = Api.current.project] == null) {
          _base2[_name] = {};
        }
        User.current.preferences[Api.current.project][key] = value;
      }
      if (!global) {
        key = "" + Api.current.project + "." + key;
      }
      return Api.current.put("/users/preferences", {
        key: key,
        value: value
      }, callback);
    };

    User.prototype.deletePreference = function(key, global, callback) {
      var _base1, _base2, _name, _ref;
      if (global == null) {
        global = false;
      }
      if (User.current == null) {
        return;
      }
      if (typeof global === 'function') {
        _ref = [false, global], global = _ref[0], callback = _ref[1];
      }
      if ((_base1 = User.current).preferences == null) {
        _base1.preferences = {};
      }
      if (global) {
        delete User.current.preferences[key];
      } else {
        if ((_base2 = User.current.preferences)[_name = Api.current.project] == null) {
          _base2[_name] = {};
        }
        delete User.current.preferences[Api.current.project][key];
      }
      if (!global) {
        key = "" + Api.current.project + "." + key;
      }
      return Api.current["delete"]("/users/preferences", {
        key: key
      }, callback);
    };

    return User;

  }).call(this, EventEmitter);

  window.zooniverse.models.User = User;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = User;
  }

}).call(this);

(function() {
  var $, Api, BaseModel, Subject, _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).models == null) {
    _base.models = {};
  }

  BaseModel = zooniverse.models.BaseModel || require('./base-model');

  Api = zooniverse.Api || require('../lib/api');

  $ = window.jQuery;

  Subject = (function(_super) {
    __extends(Subject, _super);

    Subject.current = null;

    Subject.seenThisSession = [];

    Subject.queueMin = 2;

    Subject.queueMax = 10;

    Subject.group = false;

    Subject.fallback = "./offline/subjects.json";

    Subject.path = function() {
      var groupString;
      groupString = !this.group ? '' : this.group === true ? 'groups/' : "groups/" + this.group + "/";
      return "/projects/" + Api.current.project + "/" + groupString + "subjects";
    };

    Subject.next = function(done, fail) {
      var fetcher, nexter, _ref,
        _this = this;
      this.trigger('get-next');
      if ((_ref = this.current) != null) {
        _ref.destroy();
      }
      this.current = null;
      nexter = new $.Deferred;
      nexter.then(done, fail);
      if (this.count() === 0) {
        fetcher = this.fetch();
        fetcher.done(function(newSubjects) {
          var _ref1;
          if ((_ref1 = _this.first()) != null) {
            _ref1.select();
          }
          if (_this.current) {
            return nexter.resolve(_this.current);
          } else {
            _this.trigger('no-more');
            return nexter.reject.apply(nexter, arguments);
          }
        });
        fetcher.fail(function() {
          return nexter.reject.apply(nexter, arguments);
        });
      } else {
        this.first().select();
        nexter.resolve(this.current);
        if (this.count() < this.queueMin) {
          this.fetch();
        }
      }
      return nexter.promise();
    };

    Subject.trackSeenSubject = function(subject) {
      return this.seenThisSession.push(subject.zooniverse_id);
    };

    Subject.hasSeenSubject = function(subject) {
      var _ref;
      return _ref = subject.zooniverse_id, __indexOf.call(this.seenThisSession, _ref) >= 0;
    };

    Subject.fetch = function(params, done, fail) {
      var fetcher, limit, request, _ref,
        _this = this;
      if (typeof params === 'function') {
        _ref = [params, done, {}], done = _ref[0], fail = _ref[1], params = _ref[2];
      }
      limit = (params || {}).limit;
      if (limit == null) {
        limit = this.queueMax - this.count();
      }
      fetcher = new $.Deferred;
      fetcher.then(done, fail);
      if (limit > 0) {
        request = Api.current.get(this.path(), {
          limit: limit
        });
        request.done(function(rawSubjects) {
          var newSubjects, rawSubject;
          newSubjects = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = rawSubjects.length; _i < _len; _i++) {
              rawSubject = rawSubjects[_i];
              if (!(!this.hasSeenSubject(rawSubject))) {
                continue;
              }
              this.trackSeenSubject(rawSubject);
              _results.push(new this(rawSubject));
            }
            return _results;
          }).call(_this);
          while (!(_this.seenThisSession.length < 1000)) {
            _this.seenThisSession.shift();
          }
          _this.trigger('fetch', [newSubjects]);
          return fetcher.resolve(newSubjects);
        });
        request.fail(function() {
          var getFallback;
          _this.trigger('fetching-fallback');
          getFallback = $.get(_this.fallback);
          getFallback.done(function(rawSubjects) {
            var newSubjects, rawGroupSubjects, rawSubject, _i, _len;
            if (_this.group) {
              rawGroupSubjects = [];
              for (_i = 0, _len = rawSubjects.length; _i < _len; _i++) {
                rawSubject = rawSubjects[_i];
                if (rawSubject.group_id === _this.group) {
                  rawGroupSubjects.push(rawSubject);
                }
              }
              rawSubjects = rawGroupSubjects;
            }
            rawSubjects.sort(function() {
              return Math.random() - 0.5;
            });
            newSubjects = (function() {
              var _j, _len1, _results;
              _results = [];
              for (_j = 0, _len1 = rawSubjects.length; _j < _len1; _j++) {
                rawSubject = rawSubjects[_j];
                _results.push(new this(rawSubject));
              }
              return _results;
            }).call(_this);
            _this.trigger('fetch', [newSubjects]);
            return fetcher.resolve(newSubjects);
          });
          return getFallback.fail(function() {
            _this.trigger('fetch-fail');
            return fetcher.fail.apply(fetcher, arguments);
          });
        });
      } else {
        fetcher.resolve(this.instances.slice(0, number));
      }
      return fetcher.promise();
    };

    Subject.prototype.id = '';

    Subject.prototype.zooniverse_id = '';

    Subject.prototype.classification_count = null;

    Subject.prototype.coords = null;

    Subject.prototype.location = null;

    Subject.prototype.metadata = null;

    Subject.prototype.project_id = '';

    Subject.prototype.group_id = '';

    Subject.prototype.workflow_ids = null;

    Subject.prototype.tutorial = null;

    Subject.prototype.preload = true;

    function Subject() {
      Subject.__super__.constructor.apply(this, arguments);
      if (this.location == null) {
        this.location = {};
      }
      if (this.coords == null) {
        this.coords = [];
      }
      if (this.metadata == null) {
        this.metadata = {};
      }
      if (this.workflow_ids == null) {
        this.workflow_ids = [];
      }
    }

    Subject.prototype.preloadImages = function() {
      var imageSources, src, type, _ref, _results;
      if (!this.preload) {
        return;
      }
      _ref = this.location;
      _results = [];
      for (type in _ref) {
        imageSources = _ref[type];
        if (!(imageSources instanceof Array)) {
          imageSources = [imageSources];
        }
        if (!this.isImage(imageSources)) {
          continue;
        }
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = imageSources.length; _i < _len; _i++) {
            src = imageSources[_i];
            _results1.push((new Image).src = src);
          }
          return _results1;
        })());
      }
      return _results;
    };

    Subject.prototype.select = function() {
      this.constructor.current = this;
      return this.trigger('select');
    };

    Subject.prototype.destroy = function() {
      if (this.constructor.current === this) {
        this.constructor.current = null;
      }
      return Subject.__super__.destroy.apply(this, arguments);
    };

    Subject.prototype.isImage = function(subjectLocation) {
      var src, _i, _len, _ref;
      for (_i = 0, _len = subjectLocation.length; _i < _len; _i++) {
        src = subjectLocation[_i];
        if (!((_ref = src.split('.').pop()) === 'gif' || _ref === 'jpg' || _ref === 'png')) {
          return false;
        }
      }
      return true;
    };

    Subject.prototype.talkHref = function() {
      var domain;
      domain = this.domain || location.hostname.replace(/^www\./, '');
      return "http://talk." + domain + "/#/subjects/" + this.zooniverse_id;
    };

    Subject.prototype.socialImage = function() {
      var image;
      image = this.location.standard instanceof Array ? this.location.standard[Math.floor(this.location.standard.length / 2)] : this.location.standard;
      return $("<a href='" + image + "'></a>").get(0).href;
    };

    Subject.prototype.socialTitle = function() {
      return 'Zooniverse classification';
    };

    Subject.prototype.socialMessage = function() {
      return 'Classifying on the Zooniverse!';
    };

    Subject.prototype.facebookHref = function() {
      return ("https://www.facebook.com/sharer/sharer.php\n?s=100\n&p[url]=" + (encodeURIComponent(this.talkHref())) + "\n&p[title]=" + (encodeURIComponent(this.socialTitle())) + "\n&p[summary]=" + (encodeURIComponent(this.socialMessage())) + "\n&p[images][0]=" + (this.socialMessage())).replace('\n', '', 'g');
    };

    Subject.prototype.twitterHref = function() {
      var status;
      status = "" + (this.socialMessage()) + " " + (this.talkHref());
      return "http://twitter.com/home?status=" + (encodeURIComponent(status));
    };

    Subject.prototype.pinterestHref = function() {
      return ("http://pinterest.com/pin/create/button/\n?url=" + (encodeURIComponent(this.talkHref())) + "\n&media=" + (encodeURIComponent(this.socialImage())) + "\n&description=" + (encodeURIComponent(this.socialMessage()))).replace('\n', '', 'g');
    };

    return Subject;

  })(BaseModel);

  window.zooniverse.models.Subject = Subject;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Subject;
  }

}).call(this);

(function() {
  var $, Api, BaseModel, Recent, Subject, SubjectForRecent, User, _base, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).models == null) {
    _base.models = {};
  }

  BaseModel = window.zooniverse.models.BaseModel || require('./base-model');

  Api = window.zooniverse.Api || require('../lib/api');

  User = window.zooniverse.models.User || require('./user');

  Subject = window.zooniverse.models.Subject || require('./subject');

  $ = window.jQuery;

  SubjectForRecent = (function(_super) {
    __extends(SubjectForRecent, _super);

    function SubjectForRecent() {
      _ref = SubjectForRecent.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return SubjectForRecent;

  })(Subject);

  Recent = (function(_super) {
    __extends(Recent, _super);

    Recent.type = 'recent';

    Recent.path = function() {
      var _ref1;
      return "/projects/" + Api.current.project + "/users/" + ((_ref1 = User.current) != null ? _ref1.id : void 0) + "/" + this.type + "s";
    };

    Recent.fetch = function(params, done, fail) {
      var fetcher, request, _ref1,
        _this = this;
      this.trigger('fetching');
      if (typeof params === 'function') {
        _ref1 = [params, done, {}], done = _ref1[0], fail = _ref1[1], params = _ref1[2];
      }
      params = $.extend({
        page: 1,
        per_page: 10
      }, params);
      fetcher = new $.Deferred;
      fetcher.then(done, fail);
      request = Api.current.get(this.path(), params);
      request.done(function(rawRecents) {
        var newRecents, rawRecent;
        newRecents = (function() {
          var _i, _len, _ref2, _results;
          _ref2 = rawRecents.reverse();
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            rawRecent = _ref2[_i];
            _results.push(new this(rawRecent));
          }
          return _results;
        }).call(_this);
        _this.trigger('fetch', [newRecents]);
        return fetcher.resolve(newRecents);
      });
      request.fail(function() {
        _this.trigger('fetch-fail');
        return fetcher.reject.apply(fetcher, arguments);
      });
      return fetcher.promise();
    };

    Recent.clearOnUserChange = function() {
      var self;
      self = this;
      return User.on('change', function() {
        var _results;
        _results = [];
        while (self.count() !== 0) {
          _results.push(self.first().destroy());
        }
        return _results;
      });
    };

    Recent.clearOnUserChange();

    Recent.prototype.subjects = null;

    Recent.prototype.project_id = '';

    Recent.prototype.workflow_id = '';

    Recent.prototype.created_at = '';

    function Recent() {
      var i, subject, _i, _len, _ref1, _ref2, _ref3, _ref4;
      Recent.__super__.constructor.apply(this, arguments);
      if (this.subjects == null) {
        this.subjects = [];
      }
      this.project_id || (this.project_id = (_ref1 = this.subjects[0]) != null ? _ref1.project_id : void 0);
      this.workflow_id || (this.workflow_id = (_ref2 = this.subjects[0]) != null ? (_ref3 = _ref2.workflow_ids) != null ? _ref3[0] : void 0 : void 0);
      this.created_at || (this.created_at = (new Date).toUTCString());
      _ref4 = this.subjects;
      for (i = _i = 0, _len = _ref4.length; _i < _len; i = ++_i) {
        subject = _ref4[i];
        this.subjects[i] = new SubjectForRecent(subject);
      }
    }

    return Recent;

  })(BaseModel);

  window.zooniverse.models.Recent = Recent;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Recent;
  }

}).call(this);

(function() {
  var $, Api, Favorite, Recent, User, _base, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).models == null) {
    _base.models = {};
  }

  Recent = window.zooniverse.models.Recent || require('./recent');

  Api = window.zooniverse.Api || require('../lib/api');

  User = window.zooniverse.models.User || require('./user');

  $ = window.jQuery;

  Favorite = (function(_super) {
    __extends(Favorite, _super);

    function Favorite() {
      this.toJSON = __bind(this.toJSON, this);
      _ref = Favorite.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Favorite.type = 'favorite';

    Favorite.clearOnUserChange();

    Favorite.prototype.toJSON = function() {
      var subject;
      return {
        favorite: {
          subject_ids: (function() {
            var _i, _len, _ref1, _results;
            _ref1 = this.subjects;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              subject = _ref1[_i];
              _results.push(subject.id);
            }
            return _results;
          }).call(this)
        }
      };
    };

    Favorite.prototype.send = function() {
      var _this = this;
      this.trigger('sending');
      return Api.current.post("/projects/" + Api.current.project + "/favorites", this.toJSON(), function(response) {
        _this.id = response.id;
        return _this.trigger('send');
      });
    };

    Favorite.prototype["delete"] = function() {
      var _this = this;
      this.trigger('deleting');
      return Api.current["delete"]("/projects/" + Api.current.project + "/favorites/" + this.id, function() {
        _this.trigger('delete');
        return _this.destroy();
      });
    };

    return Favorite;

  })(Recent);

  window.zooniverse.models.Favorite = Favorite;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Favorite;
  }

}).call(this);

(function() {
  var $, Api, BaseModel, Classification, Favorite, LanguageManager, RESOLVED_STATE, Recent, _base, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  BaseModel = ((_ref = window.zooniverse) != null ? (_ref1 = _ref.models) != null ? _ref1.BaseModel : void 0 : void 0) || require('./base-model');

  Api = ((_ref2 = window.zooniverse) != null ? _ref2.Api : void 0) || require('../lib/api');

  Recent = ((_ref3 = window.zooniverse) != null ? (_ref4 = _ref3.models) != null ? _ref4.Recent : void 0 : void 0) || require('../models/recent');

  Favorite = ((_ref5 = window.zooniverse) != null ? (_ref6 = _ref5.models) != null ? _ref6.Favorite : void 0 : void 0) || require('../models/favorite');

  LanguageManager = ((_ref7 = window.zooniverse) != null ? _ref7.LanguageManager : void 0) || require('../lib/language-manager');

  $ = window.jQuery;

  RESOLVED_STATE = (new $.Deferred).resolve().state();

  Classification = (function(_super) {
    __extends(Classification, _super);

    Classification.pending = JSON.parse(localStorage.getItem('pending-classifications')) || [];

    Classification.sentThisSession = 0;

    Classification.sendPending = function() {
      var classification, pendingPosts, _i, _len, _ref8, _results,
        _this = this;
      if (this.pending.length === 0) {
        return;
      }
      this.trigger('sending-pending', [classification]);
      pendingPosts = [];
      _ref8 = this.pending;
      _results = [];
      for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
        classification = _ref8[_i];
        _results.push((function(classification) {
          var latePost;
          latePost = Api.current.post(classification.url, classification);
          pendingPosts.push(latePost);
          latePost.done(function(response) {
            var favorite, id;
            _this.trigger('send-pending', [classification]);
            if (classification.favorite) {
              favorite = new Favorite({
                subjects: (function() {
                  var _j, _len1, _ref9, _results1;
                  _ref9 = classification.subject_ids;
                  _results1 = [];
                  for (_j = 0, _len1 = _ref9.length; _j < _len1; _j++) {
                    id = _ref9[_j];
                    _results1.push({
                      id: id
                    });
                  }
                  return _results1;
                })()
              });
              return favorite.send();
            }
          });
          latePost.fail(function() {
            return _this.trigger('send-pending-fail', [classification]);
          });
          return $.when.apply($, pendingPosts).always(function() {
            var i, _j, _ref9;
            for (i = _j = _ref9 = pendingPosts.length - 1; _ref9 <= 0 ? _j <= 0 : _j >= 0; i = _ref9 <= 0 ? ++_j : --_j) {
              if (pendingPosts[i].state() === RESOLVED_STATE) {
                _this.pending.splice(i, 1);
              }
            }
            return localStorage.setItem('pending-classifications', JSON.stringify(_this.pending));
          });
        })(classification));
      }
      return _results;
    };

    Classification.prototype.subjects = [];

    Classification.prototype.subject = null;

    Classification.prototype.annotations = null;

    Classification.prototype.favorite = false;

    Classification.prototype.generic = null;

    Classification.prototype.started_at = null;

    Classification.prototype.finished_at = null;

    Classification.prototype.user_agent = null;

    function Classification() {
      Classification.__super__.constructor.apply(this, arguments);
      if (this.annotations == null) {
        this.annotations = [];
      }
      this.generic = {};
      this.started_at = (new Date).toUTCString();
      this.user_agent = window.navigator.userAgent;
    }

    Classification.prototype.normalizeSubjects = function() {
      if (this.subjects.length > 0) {
        return this.subject || (this.subject = this.subjects[0]);
      } else {
        return this.subjects = [this.subject];
      }
    };

    Classification.prototype.annotate = function(annotation) {
      this.annotations.push(annotation);
      return annotation;
    };

    Classification.prototype.removeAnnotation = function(annotation) {
      var a, i, _i, _len, _ref8;
      _ref8 = this.annotations;
      for (i = _i = 0, _len = _ref8.length; _i < _len; i = ++_i) {
        a = _ref8[i];
        if (a === annotation) {
          return this.annotations.splice(i, 1);
        }
      }
    };

    Classification.prototype.isTutorial = function() {
      var subject;
      this.normalizeSubjects();
      return __indexOf.call((function() {
        var _i, _len, _ref8, _ref9, _results;
        _ref8 = this.subjects;
        _results = [];
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          subject = _ref8[_i];
          _results.push((_ref9 = subject.metadata) != null ? _ref9.tutorial : void 0);
        }
        return _results;
      }).call(this), true) >= 0;
    };

    Classification.prototype.set = function(key, value) {
      this.generic[key] = value;
      return this.trigger('change', [key, value]);
    };

    Classification.prototype.get = function(key) {
      return this.generic[key];
    };

    Classification.prototype.toJSON = function() {
      var annotation, key, output, subject, subject_ids, value, _ref8;
      if (LanguageManager.current != null) {
        this.set('lang', LanguageManager.current.code);
      }
      this.normalizeSubjects();
      subject_ids = (function() {
        var _i, _len, _ref8, _results;
        _ref8 = this.subjects;
        _results = [];
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          subject = _ref8[_i];
          _results.push(subject.id);
        }
        return _results;
      }).call(this);
      output = {
        classification: {
          subject_ids: subject_ids,
          annotations: this.annotations.concat([
            {
              started_at: this.started_at,
              finished_at: this.finished_at
            }, {
              user_agent: this.user_agent
            }
          ])
        }
      };
      _ref8 = this.generic;
      for (key in _ref8) {
        value = _ref8[key];
        annotation = {};
        annotation[key] = value;
        output.classification.annotations.push(annotation);
      }
      if (this.favorite) {
        output.classification.favorite = true;
      }
      return output;
    };

    Classification.prototype.url = function() {
      this.normalizeSubjects();
      return "/projects/" + Api.current.project + "/workflows/" + this.subjects[0].workflow_ids[0] + "/classifications";
    };

    Classification.prototype.send = function(done, fail) {
      var post, _ref8,
        _this = this;
      if (!this.isTutorial()) {
        this.constructor.sentThisSession += 1;
      }
      this.finished_at = (new Date).toUTCString();
      post = (_ref8 = Api.current).post.apply(_ref8, [this.url(), this.toJSON()].concat(__slice.call(arguments)));
      post.done(function() {
        _this.makeRecent();
        return _this.constructor.sendPending();
      });
      post.fail(function() {
        return _this.makePending();
      });
      return this.trigger('send');
    };

    Classification.prototype.makePending = function() {
      var asJSON;
      asJSON = this.toJSON();
      asJSON.url = this.url();
      this.constructor.pending.push(asJSON);
      localStorage.setItem('pending-classifications', JSON.stringify(this.constructor.pending));
      return this.trigger('pending');
    };

    Classification.prototype.makeRecent = function() {
      var favorite, recent, subject, _i, _len, _ref8, _results;
      this.normalizeSubjects();
      _ref8 = this.subjects;
      _results = [];
      for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
        subject = _ref8[_i];
        recent = new Recent({
          subjects: [subject]
        });
        recent.trigger('from-classification');
        if (this.favorite) {
          favorite = new Favorite({
            subjects: [subject]
          });
          _results.push(favorite.trigger('from-classification'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Classification;

  })(BaseModel);

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).models == null) {
    _base.models = {};
  }

  window.zooniverse.models.Classification = Classification;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Classification;
  }

}).call(this);

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var className;
    
      className = this.className || 'zooniverse-logo';
    
      __out.push('\n\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" width="1em" height="1em">\n  <g class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" fill="currentColor" stroke="transparent" stroke-width="0" transform="translate(50, 50)">\n    <path d="M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z" />\n    <path d="M 0 -12.5 A 12.5 12.5 0 0 1 0 12.5 A 12.5 12.5 0 0 1 0 -12.5 Z" />\n    <path d="M 0 -75 L 5 0 L 0 75 L -5 0 Z" transform="rotate(50)" />\n  </g>\n</svg>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['zooniverseLogoSvg'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var className;
    
      className = this.className || 'zooniverse-group-icon';
    
      __out.push('\n\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 100" class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" width="2em" height="1em">\n  ');
    
      if (document.getElementById('zooniverse-groups-icon-person') == null) {
        __out.push('\n    <defs>\n      <path id="zooniverse-groups-icon-person" d="M 0 -50 A 25 35 0 0 1 20 10 A 67 67 0 0 1 50 45 L 0 50 L -50 45 A 67 67 0 0 1 -20 10 A 25 35 0 0 1 0 -50 Z" />\n    </defs>\n  ');
      }
    
      __out.push('\n\n  <g class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" fill="currentColor" stroke="transparent" stroke-width="0" transform="translate(100, 50)">\n    <use xlink:href="#zooniverse-groups-icon-person" transform="scale(0.67) translate(-80, 0)" opacity="0.75" />\n    <use xlink:href="#zooniverse-groups-icon-person" transform="scale(0.67) translate(80, 0)" opacity="0.75" />\n    <use xlink:href="#zooniverse-groups-icon-person" />\n  </g>\n</svg>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['groupIconSvg'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var className;
    
      className = this.className || 'zooniverse-mail-icon';
    
      __out.push('\n\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100" class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" width="1.5em" height="1em">\n  <g class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" fill="currentColor" stroke="transparent" stroke-width="0">\n    <path d="M 0 0 L 75 65 L 150 0 Z" />\n    <path d="M 0 0 L 75 75 L 150 0 L 150 100 L 0 100 Z" opacity="0.85" />\n  </g>\n</svg>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['mailIconSvg'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="underlay">\n  <div class="container">\n    <div class="dialog"></div>\n  </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['dialog'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var groupIconSvg, mailIconSvg, translate, zooniverseLogoSvg, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    
      translate = ((_ref = window.zooniverse) != null ? _ref.translate : void 0) || require('../lib/translate');
    
      __out.push('\n');
    
      zooniverseLogoSvg = ((_ref1 = window.zooniverse) != null ? (_ref2 = _ref1.views) != null ? _ref2.zooniverseLogoSvg : void 0 : void 0) || require('./zooniverse-logo-svg');
    
      __out.push('\n');
    
      groupIconSvg = ((_ref3 = window.zooniverse) != null ? (_ref4 = _ref3.views) != null ? _ref4.groupIconSvg : void 0 : void 0) || require('./group-icon-svg');
    
      __out.push('\n');
    
      mailIconSvg = ((_ref5 = window.zooniverse) != null ? (_ref6 = _ref5.views) != null ? _ref6.mailIconSvg : void 0 : void 0) || require('./mail-icon-svg');
    
      __out.push('\n\n<div class="corner">\n  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">\n    <path d="M 0 0 L 100 0 L 100 100 Z" />\n  </svg>\n</div>\n\n<div class="no-user">\n  <div class="zooniverse-info piece">\n    ');
    
      __out.push(zooniverseLogoSvg());
    
      __out.push('\n    ');
    
      __out.push(translate('topBarHeading'));
    
      __out.push('\n  </div>\n\n  <div class="sign-in piece">\n    <button name="sign-up">');
    
      __out.push(translate('signUp'));
    
      __out.push('</button>\n    <span class="separator">|</span>\n    <button name="sign-in">');
    
      __out.push(translate('signIn'));
    
      __out.push('</button>\n  </div>\n</div>\n\n<div class="current-user">\n  <div class="user-info piece">\n    <div class="current-user-name">&mdash;</div>\n\n    <div class="sign-out">\n      <button name="sign-out">');
    
      __out.push(translate('signOut'));
    
      __out.push('</button>\n    </div>\n  </div>\n\n  <div class="groups piece">\n    <div class="groups-menu-toggle">\n      <button name="groups">');
    
      __out.push(groupIconSvg());
    
      __out.push('</button>\n    </div>\n  </div>\n\n  <div class="messages piece">\n    <a href="');
    
      __out.push(this.talkProfileHref);
    
      __out.push('" class="message-link">\n      ');
    
      __out.push(mailIconSvg());
    
      __out.push('\n      <span class="message-count">&mdash;</span>\n    </a>\n  </div>\n\n  <div class="avatar piece">\n    <a href="https://www.zooniverse.org/projects/current"><img src="" /></a>\n  </div>\n</div>\n\n<div class="languages piece">\n  <button name="languages-menu-toggle"></button>  \n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['topBar'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var translate, _ref;
    
      translate = ((_ref = window.zooniverse) != null ? _ref.translate : void 0) || require('../lib/translate');
    
      __out.push('\n<input type="text" name="username" required="required" data-zooniverse-translate="" data-zooniverse-translate-placeholder="username" />\n<input type="password" name="password" required="required" data-zooniverse-translate="" data-zooniverse-translate-placeholder="password" />\n<button type="submit">');
    
      __out.push(translate('signIn'));
    
      __out.push('</button>\n<button name="sign-out">');
    
      __out.push(translate('signOut'));
    
      __out.push('</button>\n<div class="error-message"></div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['loginForm'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var translate, zooniverseLogoSvg, _ref;
    
      translate = (typeof zooniverse !== "undefined" && zooniverse !== null ? zooniverse.translate : void 0) || require('../lib/translate');
    
      __out.push('\n');
    
      zooniverseLogoSvg = (typeof zooniverse !== "undefined" && zooniverse !== null ? (_ref = zooniverse.views) != null ? _ref.zooniverseLogoSvg : void 0 : void 0) || require('./zooniverse-logo-svg');
    
      __out.push('\n\n<div class="loader"></div>\n\n<button type="button" name="close-dialog">&times;</button>\n\n<header>\n  ');
    
      __out.push(zooniverseLogoSvg());
    
      __out.push('\n  ');
    
      __out.push(translate('signInHeading'));
    
      __out.push('\n</header>\n\n<label>\n  <span class="text-label">');
    
      __out.push(translate('username'));
    
      __out.push('</span><br />\n  <input type="text" name="username" required="required" />\n</label>\n\n<label>\n  <span class="text-label">');
    
      __out.push(translate('password'));
    
      __out.push('</span><br />\n  <input type="password" name="password" required="required" />\n</label>\n\n<div class="error-message"></div>\n\n<div class="action">\n  <a href="https://www.zooniverse.org/password/reset">');
    
      __out.push(translate('forgotPassword'));
    
      __out.push('</a>\n  <button type="submit">');
    
      __out.push(translate('signIn'));
    
      __out.push('</button>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['loginDialog'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var translate, zooniverseLogoSvg, _ref;
    
      translate = (typeof zooniverse !== "undefined" && zooniverse !== null ? zooniverse.translate : void 0) || require('../lib/translate');
    
      __out.push('\n');
    
      zooniverseLogoSvg = (typeof zooniverse !== "undefined" && zooniverse !== null ? (_ref = zooniverse.views) != null ? _ref.zooniverseLogoSvg : void 0 : void 0) || require('./zooniverse-logo-svg');
    
      __out.push('\n\n<div class="loader"></div>\n\n<button type="button" name="close-dialog">&times;</button>\n\n<header>\n  ');
    
      __out.push(zooniverseLogoSvg());
    
      __out.push('\n  ');
    
      __out.push(translate('signUpHeading'));
    
      __out.push('\n</header>\n\n<label>\n  <span class="text-label">');
    
      __out.push(translate('username'));
    
      __out.push('</span><br />\n  <input type="text" name="username" required="required" />\n</label>\n\n<label>\n  <span class="text-label">');
    
      __out.push(translate('password'));
    
      __out.push('</span><br />\n  <input type="password" name="password" required="required" />\n</label>\n\n<label>\n  <span class="text-label">');
    
      __out.push(translate('email'));
    
      __out.push('</span><br />\n  <input type="email" name="email" required="required" />\n</label>\n\n<label>\n  <span class="text-label">');
    
      __out.push(translate('realName'));
    
      __out.push('</span><br />\n  <input type="text" name="real-name" />\n  <div class="explanation">');
    
      __out.push(translate('whyRealName'));
    
      __out.push('</div>\n</label>\n\n<label class="checkbox">\n  <span></span>\n  <input type="checkbox" required="required" />');
    
      __out.push(translate('agreeToPrivacyPolicy'));
    
      __out.push('\n</label>\n\n<label class="checkbox">\n  <span></span>\n  <input type="checkbox" name="beta-preference" />');
    
      __out.push(translate('betaPreference'));
    
      __out.push('\n</label>\n\n<div class="error-message"></div>\n\n<div class="action">\n  <button type="submit">');
    
      __out.push(translate('signUp'));
    
      __out.push('</button>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['signupDialog'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="loader"></div>\n\n<div class="items"></div>\n\n<nav class="controls">\n  <span class="numbered"></span>\n</nav>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['paginator'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var translate, _ref;
    
      translate = ((_ref = window.zooniverse) != null ? _ref.translate : void 0) || require('../lib/translate');
    
      __out.push('\n\n<form class="sign-in-form">\n  <div class="loader"></div>\n\n  <header>');
    
      __out.push(translate('signInForProfile'));
    
      __out.push('</header>\n  <label><input type="text" name="username" required="required" data-zooniverse-translate="" data-zooniverse-translate-placeholder="username" /></label>\n  <label><input type="password" name="password" required="required" data-zooniverse-translate="" data-zooniverse-translate-placeholder="password" /></label>\n  <div class="error-message"></div>\n  <div class="action"><button type="submit">');
    
      __out.push(translate('signIn'));
    
      __out.push('</button></div>\n  <p class="no-account">');
    
      __out.push(translate('noAccount'));
    
      __out.push(' <button name="sign-up">');
    
      __out.push(translate('signUp'));
    
      __out.push('</button></p>\n</form>\n\n<nav>\n  <button name="turn-page" value="recents">');
    
      __out.push(translate('recents'));
    
      __out.push('</button>\n  <button name="turn-page" value="favorites">');
    
      __out.push(translate('favorites'));
    
      __out.push('</button>\n</nav>\n\n<div class="recents page"></div>\n<div class="recents-empty empty-message">');
    
      __out.push(translate('recents'));
    
      __out.push(' (');
    
      __out.push(translate('none'));
    
      __out.push(')</div>\n\n<div class="favorites page"></div>\n<div class="favorites-empty empty-message">');
    
      __out.push(translate('favorites'));
    
      __out.push(' (');
    
      __out.push(translate('none'));
    
      __out.push(')</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['profile'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var Favorite, location, thumbSrc, _ref, _ref1, _ref2, _ref3;
    
      Favorite = ((_ref = window.zooniverse) != null ? (_ref1 = _ref.models) != null ? _ref1.Favorite : void 0 : void 0) || require('zooniverse/models/favorite');
    
      __out.push('\n\n<div class=\'item\'>\n  <a href="');
    
      __out.push(__sanitize(((_ref2 = this.subjects[0]) != null ? _ref2.talkHref() : void 0) || '#/SUBJECT_ERROR'));
    
      __out.push('">\n    ');
    
      location = (_ref3 = this.subjects[0]) != null ? _ref3.location : void 0;
    
      __out.push('\n    ');
    
      thumbSrc = null;
    
      __out.push('\n    ');
    
      if (thumbSrc == null) {
        thumbSrc = location != null ? location.thumb : void 0;
      }
    
      __out.push('\n    ');
    
      if ((location != null ? location.standard : void 0) instanceof Array) {
        if (thumbSrc == null) {
          thumbSrc = location != null ? location.standard[0] : void 0;
        }
      }
    
      __out.push('\n    ');
    
      if (thumbSrc == null) {
        thumbSrc = location != null ? location.standard : void 0;
      }
    
      __out.push('\n    <img src="');
    
      __out.push(__sanitize(thumbSrc || ''));
    
      __out.push('" />\n  </a>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['profileItem'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var category, project, projects, translate, zooniverseLogoSvg, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    
      translate = (typeof zooniverse !== "undefined" && zooniverse !== null ? zooniverse.translate : void 0) || require('../lib/translate');
    
      __out.push('\n');
    
      zooniverseLogoSvg = ((_ref = window.zooniverse) != null ? (_ref1 = _ref.views) != null ? _ref1.zooniverseLogoSvg : void 0 : void 0) || require('./zooniverse-logo-svg');
    
      __out.push('\n\n<a href="https://www.zooniverse.org/" class="zooniverse-logo-container">\n  ');
    
      __out.push(zooniverseLogoSvg());
    
      __out.push('\n</a>\n\n<div class="zooniverse-footer-content">\n  <div class="zooniverse-footer-heading">');
    
      __out.push(translate('footerHeading'));
    
      __out.push('</div>\n\n  ');
    
      if (this.categories != null) {
        __out.push('\n    <div class="zooniverse-footer-projects">\n      ');
        _ref2 = this.categories;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          _ref3 = _ref2[_i], category = _ref3.category, projects = _ref3.projects;
          __out.push('\n        <div class="zooniverse-footer-category">\n          <div class="zooniverse-footer-category-title">');
          __out.push(__sanitize(category));
          __out.push('</div>\n          ');
          for (_j = 0, _len1 = projects.length; _j < _len1; _j++) {
            project = projects[_j];
            __out.push('\n            <div class="zooniverse-footer-project">\n              <a href="');
            __out.push(__sanitize(project.url));
            __out.push('">');
            __out.push(__sanitize(project.name));
            __out.push('</a>\n            </div>\n          ');
          }
          __out.push('\n          <div class="zooniverse-footer-project"></div>\n        </div>\n      ');
        }
        __out.push('\n    </div>\n  ');
      }
    
      __out.push('\n\n  <div class="zooniverse-footer-general">\n    <!--div class="zooniverse-footer-category"><a href="#">Zooniverse Daily</a></div-->\n    <div class="zooniverse-footer-category">\n      <a href="https://www.zooniverse.org/privacy">');
    
      __out.push(translate('privacyPolicy'));
    
      __out.push('</a>\n    </div>\n\n    <div class="zooniverse-footer-category">\n      <a href="https://github.com/zooniverse">');
    
      __out.push(translate('forkOnGitHub'));
    
      __out.push('</a>\n    </div>\n  </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['footer'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var id, name, _i, _len, _ref, _ref1;
    
      __out.push('<div class="user-groups">\n  ');
    
      _ref = this.user_groups || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], id = _ref1.id, name = _ref1.name;
        __out.push('\n    <div class="user-group">\n      <button name="user-group" value="');
        __out.push(__sanitize(id));
        __out.push('" ');
        if (id === this.user_group_id) {
          __out.push('class="active"');
        }
        __out.push('>');
        __out.push(__sanitize(name));
        __out.push('</button>\n    </div>\n  ');
      }
    
      __out.push('\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['groupsMenu'] = template;
if (typeof module !== 'undefined') module.exports = template;

window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var LanguageManager, code, label, _ref, _ref1, _ref2;
    
      LanguageManager = window.zooniverse.LanguageManager || require('../lib/language-manager');
    
      __out.push('\n\n<div class="languages">\n  ');
    
      _ref1 = (_ref = LanguageManager.current) != null ? _ref.translations : void 0;
      for (code in _ref1) {
        label = _ref1[code].label;
        __out.push('\n    <div class="language">\n      <button name="language" value="');
        __out.push(__sanitize(code));
        __out.push('" ');
        if (code === ((_ref2 = LanguageManager.current) != null ? _ref2.code : void 0)) {
          __out.push('class="active"');
        }
        __out.push('>');
        __out.push(__sanitize(label));
        __out.push('</button>\n    </div>\n  ');
      }
    
      __out.push('\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['languagesMenu'] = template;
if (typeof module !== 'undefined') module.exports = template;

(function() {
  var $, BaseController, EventEmitter, nextId, _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  EventEmitter = window.zooniverse.EventEmitter || require('../lib/event-emitter');

  $ = window.jQuery;

  nextId = 0;

  BaseController = (function(_super) {
    __extends(BaseController, _super);

    BaseController.prototype.el = null;

    BaseController.prototype.tagName = 'div';

    BaseController.prototype.className = '';

    BaseController.prototype.template = null;

    BaseController.prototype.id = '';

    BaseController.prototype.events = null;

    BaseController.prototype.elements = null;

    function BaseController(params) {
      var property, value;
      if (params == null) {
        params = {};
      }
      BaseController.__super__.constructor.apply(this, arguments);
      for (property in params) {
        if (!__hasProp.call(params, property)) continue;
        value = params[property];
        if (property in this) {
          this[property] = value;
        }
      }
      this.id || (this.id = "controller_" + nextId);
      nextId += 1;
      if (this.el == null) {
        this.el = document.createElement(this.tagName);
      }
      this.el = $(this.el);
      this.renderTemplate();
      this.delegateEvents();
      this.nameElements();
    }

    BaseController.prototype.renderTemplate = function() {
      if (this.className) {
        this.el.addClass(this.className);
      }
      if (!this.el.html()) {
        if (typeof this.template === 'string') {
          this.el.html(this.template);
        }
        if (typeof this.template === 'function') {
          return this.el.html(this.template(this));
        }
      }
    };

    BaseController.prototype.nameElements = function() {
      var name, selector, _ref, _results;
      if (this.elements != null) {
        _ref = this.elements;
        _results = [];
        for (selector in _ref) {
          name = _ref[selector];
          _results.push(this[name] = this.el.find(selector));
        }
        return _results;
      }
    };

    BaseController.prototype.delegateEvents = function() {
      var eventString, method, _ref, _results,
        _this = this;
      this.el.off("." + this.id);
      if (this.events != null) {
        _ref = this.events;
        _results = [];
        for (eventString in _ref) {
          method = _ref[eventString];
          _results.push((function(eventString, method) {
            var autoPreventDefault, eventName, selector, _ref1;
            _ref1 = eventString.split(/\s+/), eventName = _ref1[0], selector = 2 <= _ref1.length ? __slice.call(_ref1, 1) : [];
            selector = selector.join(' ');
            if (eventName.slice(-1) === '*') {
              eventName = eventName.slice(0, -1);
              autoPreventDefault = true;
            }
            if (typeof method === 'string') {
              method = _this[method];
            }
            return _this.el.on("" + eventName + "." + _this.id, selector, function(e) {
              if (autoPreventDefault) {
                e.preventDefault();
              }
              return method.call.apply(method, [_this].concat(__slice.call(arguments)));
            });
          })(eventString, method));
        }
        return _results;
      }
    };

    BaseController.prototype.destroy = function() {
      var propertyName, selector, _ref;
      if (this.elements != null) {
        _ref = this.elements;
        for (selector in _ref) {
          propertyName = _ref[selector];
          this[propertyName] = null;
        }
      }
      this.el.off();
      this.el.empty();
      this.el.remove();
      return BaseController.__super__.destroy.apply(this, arguments);
    };

    return BaseController;

  })(EventEmitter);

  window.zooniverse.controllers.BaseController = BaseController;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = BaseController;
  }

}).call(this);

(function() {
  var BaseController, Dialog, focusableElementsSelector, template, translate, _base, _base1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).views == null) {
    _base1.views = {};
  }

  BaseController = zooniverse.controllers.BaseController || require('./base-controller');

  template = zooniverse.views.dialog || require('../views/dialog');

  translate = zooniverse.translate || require('../lib/translate');

  focusableElementsSelector = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

  Dialog = (function(_super) {
    __extends(Dialog, _super);

    Dialog.prototype.warning = false;

    Dialog.prototype.error = false;

    Dialog.prototype.content = '';

    Dialog.prototype.className = 'zooniverse-dialog';

    Dialog.prototype.template = template;

    Dialog.prototype.events = {
      'click button[name="close-dialog"]': 'hide',
      'keydown': 'onKeyDown'
    };

    Dialog.prototype.elements = {
      '.dialog': 'contentContainer'
    };

    function Dialog() {
      Dialog.__super__.constructor.apply(this, arguments);
      this.el.css({
        display: 'none'
      });
      if (this.warning) {
        this.el.addClass('warning');
      }
      if (this.error) {
        this.el.addClass('error');
      }
      this.el.attr('role', 'dialog');
      this.el.attr('aria-hidden', 'true');
      this.contentContainer.append(this.content);
      this.focusableContent = this.contentContainer.find('*').filter(focusableElementsSelector);
      this.focussedElement = {};
      this.el.appendTo(document.body);
    }

    Dialog.prototype.onKeyDown = function(e) {
      var focusedElement, focusedIndex, lastIndex;
      if (e.which === 27) {
        this.hide();
      }
      if (e.which === 9) {
        focusedElement = window.jQuery(':focus');
        focusedIndex = this.focusableContent.index(focusedElement);
        lastIndex = this.focusableContent.length - 1;
        if (e.shiftKey) {
          if (focusedIndex === 0) {
            this.focusableContent.get(lastIndex).focus();
            return e.preventDefault();
          }
        } else {
          if (focusedIndex === lastIndex) {
            this.focusableContent.get(0).focus();
            return e.preventDefault();
          }
        }
      }
    };

    Dialog.prototype.show = function() {
      var element, _i, _len, _ref,
        _this = this;
      _ref = this.el.get(0).querySelectorAll("[" + translate.attr + "]");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        translate.refresh(element);
      }
      this.el.css({
        display: ''
      });
      this.el.attr('aria-hidden', 'false');
      this.focussedElement = window.jQuery(':focus');
      return setTimeout(function() {
        _this.el.addClass('showing');
        return _this.contentContainer.find('input, textarea, select').first().focus();
      }, 300);
    };

    Dialog.prototype.hide = function() {
      var _this = this;
      this.el.removeClass('showing');
      if (this.focussedElement.focus != null) {
        this.focussedElement.focus();
      }
      return setTimeout(function() {
        _this.el.css({
          display: 'none'
        });
        return _this.el.attr('aria-hidden', 'true');
      }, 500);
    };

    return Dialog;

  })(BaseController);

  window.zooniverse.controllers.Dialog = Dialog;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dialog;
  }

}).call(this);

(function() {
  var BETA_PREFERENCE_KEY, BaseController, SignupForm, User, translate, _base, _base1, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).models == null) {
    _base1.models = {};
  }

  BaseController = zooniverse.controllers.BaseController || require('./base-controller');

  User = zooniverse.models.User || require('../models/user');

  translate = zooniverse.translate || require('../lib/translate');

  BETA_PREFERENCE_KEY = 'beta_opt_in';

  SignupForm = (function(_super) {
    __extends(SignupForm, _super);

    function SignupForm() {
      _ref = SignupForm.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SignupForm.prototype.tagName = 'form';

    SignupForm.prototype.className = 'zooniverse-signup-form';

    SignupForm.prototype.events = {
      'submit*': 'onSubmit'
    };

    SignupForm.prototype.elements = {
      'input[name="username"]': 'usernameInput',
      'input[name="password"]': 'passwordInput',
      'input[name="email"]': 'emailInput',
      'input[name="real-name"]': 'realNameInput',
      'input[name="beta-preference"]': 'betaPreferenceInput',
      'button[type="submit"]': 'signUpButton',
      '.error-message': 'errorContainer'
    };

    SignupForm.prototype.onSubmit = function() {
      var signup,
        _this = this;
      this.el.addClass('loading');
      this.signUpButton.attr({
        disabled: true
      });
      signup = User.signup({
        username: this.usernameInput.val(),
        password: this.passwordInput.val(),
        email: this.emailInput.val(),
        real_name: this.realNameInput.val()
      });
      signup.done(function(_arg) {
        var message, success, _ref1;
        success = _arg.success, message = _arg.message;
        if (!success) {
          _this.showError(message);
        }
        return (_ref1 = User.current) != null ? _ref1.setPreference(BETA_PREFERENCE_KEY, _this.betaPreferenceInput.prop('checked'), true) : void 0;
      });
      signup.fail(function() {
        return _this.showError(translate('signInFailed'));
      });
      return signup.always(function() {
        _this.el.removeClass('loading');
        return _this.signUpButton.attr({
          disabled: false
        });
      });
    };

    SignupForm.prototype.showError = function(message) {
      return this.errorContainer.html(message);
    };

    return SignupForm;

  })(BaseController);

  window.zooniverse.controllers.SignupForm = SignupForm;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = SignupForm;
  }

}).call(this);

(function() {
  var Dialog, SignupForm, User, signupDialog, template, _base, _base1, _base2;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).views == null) {
    _base1.views = {};
  }

  if ((_base2 = window.zooniverse).models == null) {
    _base2.models = {};
  }

  Dialog = zooniverse.controllers.Dialog || require('./dialog');

  SignupForm = zooniverse.controllers.SignupForm || require('./signup-form');

  template = zooniverse.views.signupDialog || require('../views/signup-dialog');

  User = zooniverse.models.User || require('../models/user');

  signupDialog = new Dialog({
    content: (new SignupForm({
      template: template
    })).el
  });

  User.on('change', function(e, user) {
    if (user != null) {
      return signupDialog.hide();
    }
  });

  window.zooniverse.controllers.signupDialog = signupDialog;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = signupDialog;
  }

}).call(this);

(function() {
  var Api, BaseController, LoginForm, User, signupDialog, template, translate, _base, _base1, _base2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).views == null) {
    _base1.views = {};
  }

  if ((_base2 = window.zooniverse).models == null) {
    _base2.models = {};
  }

  BaseController = zooniverse.controllers.BaseController || require('./base-controller');

  template = zooniverse.views.loginForm || require('../views/login-form');

  Api = zooniverse.Api || require('../lib/api');

  User = zooniverse.models.User || require('../models/user');

  translate = zooniverse.translate || require('../lib/translate');

  signupDialog = zooniverse.controllers.signupDialog || require('./signup-dialog');

  LoginForm = (function(_super) {
    __extends(LoginForm, _super);

    LoginForm.prototype.tagName = 'form';

    LoginForm.prototype.className = 'zooniverse-login-form';

    LoginForm.prototype.template = template;

    LoginForm.prototype.events = {
      'submit*': 'onSubmit',
      'click* button[name="sign-up"]': 'onClickSignUp',
      'click* button[name="sign-out"]': 'onClickSignOut'
    };

    LoginForm.prototype.elements = {
      'input[name="username"]': 'usernameInput',
      'input[name="password"]': 'passwordInput',
      'button[type="submit"]': 'signInButton',
      'button[name="sign-out"]': 'signOutButton',
      '.error-message': 'errorContainer'
    };

    function LoginForm() {
      var _this = this;
      LoginForm.__super__.constructor.apply(this, arguments);
      User.on('change', function() {
        return _this.onUserChange.apply(_this, arguments);
      });
    }

    LoginForm.prototype.onSubmit = function() {
      var login,
        _this = this;
      this.el.addClass('loading');
      this.signInButton.attr({
        disabled: true
      });
      login = User.login({
        username: this.usernameInput.val(),
        password: this.passwordInput.val()
      });
      login.done(function(_arg) {
        var message, success;
        success = _arg.success, message = _arg.message;
        if (!success) {
          return _this.showError(message);
        }
      });
      login.fail(function() {
        return _this.showError(translate('signInFailed'));
      });
      return login.always(function() {
        _this.el.removeClass('loading');
        return setTimeout(function() {
          return _this.signInButton.attr({
            disabled: User.current != null
          });
        });
      });
    };

    LoginForm.prototype.onClickSignUp = function() {
      return signupDialog.show();
    };

    LoginForm.prototype.onClickSignOut = function() {
      this.signOutButton.attr({
        disabled: true
      });
      return User.logout();
    };

    LoginForm.prototype.onUserChange = function(e, user) {
      this.usernameInput.val((user != null ? user.name : void 0) || '');
      this.passwordInput.val((user != null ? user.api_key : void 0) || '');
      this.errorContainer.html('');
      this.usernameInput.attr({
        disabled: User.current != null
      });
      this.passwordInput.attr({
        disabled: User.current != null
      });
      this.signInButton.attr({
        disabled: User.current != null
      });
      return this.signOutButton.attr({
        disabled: User.current == null
      });
    };

    LoginForm.prototype.showError = function(message) {
      return this.errorContainer.html(message);
    };

    return LoginForm;

  })(BaseController);

  window.zooniverse.controllers.LoginForm = LoginForm;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = LoginForm;
  }

}).call(this);

(function() {
  var Dialog, LoginForm, User, loginDialog, template, _base;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  Dialog = zooniverse.controllers.Dialog || require('./dialog');

  LoginForm = zooniverse.controllers.LoginForm || require('./login-form');

  template = zooniverse.views.loginDialog || require('../views/login-dialog');

  User = zooniverse.models.User || require('../models/user');

  loginDialog = new Dialog({
    content: (new LoginForm({
      template: template
    })).el
  });

  User.on('change', function(e, user) {
    if (user != null) {
      return loginDialog.hide();
    }
  });

  window.zooniverse.controllers.loginDialog = loginDialog;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = loginDialog;
  }

}).call(this);

(function() {
  var Dropdown, toggleClass, _base, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  toggleClass = ((_ref = zooniverse.util) != null ? _ref.toggleClass : void 0) || require('../util/toggle-class');

  Dropdown = (function() {
    var _this = this;

    Dropdown.buttonClass = 'zooniverse-dropdown-button';

    Dropdown.menuClass = 'zooniverse-dropdown-menu';

    Dropdown.instances = [];

    Dropdown.elements = [];

    Dropdown.closeAll = function(_arg) {
      var except, instance, _i, _len, _ref1, _results;
      except = (_arg != null ? _arg : {}).except;
      _ref1 = this.instances;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        instance = _ref1[_i];
        if (instance !== except) {
          _results.push(instance.close());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    addEventListener('mousedown', function(e) {
      var node, shouldClose;
      shouldClose = true;
      node = e.target.correspondingUseElement || e.target;
      while (node != null) {
        if (__indexOf.call(Dropdown.elements, node) >= 0) {
          shouldClose = false;
          break;
        }
        node = node.parentNode;
      }
      if (shouldClose) {
        return Dropdown.closeAll();
      }
    });

    Dropdown.prototype.button = null;

    Dropdown.prototype.buttonClass = '';

    Dropdown.prototype.buttonTag = 'button';

    Dropdown.prototype.menu = null;

    Dropdown.prototype.menuClass = '';

    Dropdown.prototype.menuTag = 'div';

    Dropdown.prototype.buttonPinning = [0.5, 1];

    Dropdown.prototype.menuPinning = [0.5, 0];

    Dropdown.prototype._open = null;

    Dropdown.prototype.openClass = 'open';

    Dropdown.prototype.animationDelay = 250;

    function Dropdown(params) {
      var property, value;
      if (params == null) {
        params = {};
      }
      this.onResize = __bind(this.onResize, this);
      this.onButtonClick = __bind(this.onButtonClick, this);
      window.dropdown = this;
      for (property in params) {
        value = params[property];
        this[property] = value;
      }
      if (this.button == null) {
        this.button = document.createElement(this.buttonTag);
      }
      toggleClass(this.button, this.constructor.buttonClass, true);
      if (this.className) {
        toggleClass(this.button, this.className, true);
      }
      this.button.addEventListener('click', this.onButtonClick, false);
      if (this.menu == null) {
        this.menu = document.createElement(this.menuTag);
      }
      toggleClass(this.menu, this.constructor.menuClass, true);
      if (this.menuClass) {
        toggleClass(this.menu, this.menuClass, true);
      }
      this.menu.style.position = 'absolute';
      this.menu.style.display = 'none';
      document.body.appendChild(this.menu);
      this.close();
      this.constructor.instances.push(this);
      this.constructor.elements.push(this.button);
      this.constructor.elements.push(this.menu);
    }

    Dropdown.prototype.onButtonClick = function(e) {
      return this.toggle();
    };

    Dropdown.prototype.toggle = function() {
      if (this._open) {
        return this.close();
      } else {
        return this.open();
      }
    };

    Dropdown.prototype.open = function() {
      var _this = this;
      this.constructor.closeAll({
        except: this
      });
      toggleClass(this.button, this.openClass, true);
      this.menu.style.display = '';
      this.positionMenu();
      setTimeout(function() {
        toggleClass(_this.menu, _this.openClass, true);
        return _this._open = true;
      });
      return addEventListener('resize', this.onResize, false);
    };

    Dropdown.prototype.positionMenu = function() {
      var buttonOffset;
      buttonOffset = this.button.getBoundingClientRect();
      this.menu.style.left = ((buttonOffset.left + pageXOffset) + (this.button.offsetWidth * this.buttonPinning[0])) - (this.menu.offsetWidth * this.menuPinning[0]) + 'px';
      return this.menu.style.top = ((buttonOffset.top + pageYOffset) + (this.button.offsetHeight * this.buttonPinning[1])) - (this.menu.offsetHeight * this.menuPinning[1]) + 'px';
    };

    Dropdown.prototype.onResize = function() {
      return this.positionMenu();
    };

    Dropdown.prototype.close = function() {
      var _this = this;
      toggleClass(this.button, this.openClass, false);
      toggleClass(this.menu, this.openClass, false);
      setTimeout((function() {
        _this.menu.style.display = 'none';
        return _this._open = false;
      }), this.animationDelay);
      return removeEventListener('resize', this.onResize, false);
    };

    Dropdown.prototype.destroy = function() {
      var _ref1, _ref2;
      this.constructor.instances.splice(this.constructor.instances.indexOf(this), 1);
      this.constructor.elements.splice(this.constructor.instances.indexOf(this.button), 1);
      this.constructor.elements.splice(this.constructor.instances.indexOf(this.menu), 1);
      this.button.removeEventListener('click', this.onButtonClick, false);
      if ((_ref1 = this.button.parentNode) != null) {
        _ref1.removeChild(this.button);
      }
      return (_ref2 = this.menu.parentNode) != null ? _ref2.removeChild(this.menu) : void 0;
    };

    return Dropdown;

  }).call(this);

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  window.zooniverse.controllers.Dropdown = Dropdown;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dropdown;
  }

}).call(this);

(function() {
  var Controller, Dropdown, LanguageManager, LanguagesMenu, template, _base, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = ((_ref = window.zooniverse) != null ? (_ref1 = _ref.controllers) != null ? _ref1.BaseController : void 0 : void 0) || require('./base-controller');

  Dropdown = ((_ref2 = window.zooniverse) != null ? (_ref3 = _ref2.controllers) != null ? _ref3.Dropdown : void 0 : void 0) || require('./dropdown');

  LanguageManager = ((_ref4 = window.zooniverse) != null ? _ref4.LanguageManager : void 0) || require('../lib/language-manager');

  template = ((_ref5 = window.zooniverse) != null ? (_ref6 = _ref5.views) != null ? _ref6.languagesMenu : void 0 : void 0) || require('../views/languages-menu');

  LanguagesMenu = (function(_super) {
    __extends(LanguagesMenu, _super);

    LanguagesMenu.prototype.className = 'zooniverse-languages-menu';

    LanguagesMenu.prototype.template = template;

    LanguagesMenu.prototype.events = {
      'click button[name="language"]': 'onClickLanguageButton'
    };

    function LanguagesMenu() {
      this.onClickLanguageButton = __bind(this.onClickLanguageButton, this);
      var _ref7,
        _this = this;
      LanguagesMenu.__super__.constructor.apply(this, arguments);
      if ((_ref7 = LanguageManager.current) != null) {
        _ref7.on('change-language', function(e, code) {
          return _this.setLanguageButton(code);
        });
      }
    }

    LanguagesMenu.prototype.onClickLanguageButton = function(e) {
      var _ref7;
      if ((_ref7 = LanguageManager.current) != null) {
        _ref7.setLanguage(e.currentTarget.value);
      }
      return Dropdown.closeAll();
    };

    LanguagesMenu.prototype.setLanguageButton = function(code) {
      var buttons, target;
      target = this.el.find('button[value="' + code + '"]');
      if (target.length !== 0) {
        buttons = this.el.find('button[name="language"]');
        buttons.removeClass('active');
        return target.addClass('active');
      }
    };

    return LanguagesMenu;

  })(Controller);

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  window.zooniverse.controllers.LanguagesMenu = LanguagesMenu;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = LanguagesMenu;
  }

}).call(this);

(function() {
  var $, Controller, Dropdown, GroupsMenu, User, template, _base, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = ((_ref = window.zooniverse) != null ? (_ref1 = _ref.controllers) != null ? _ref1.BaseController : void 0 : void 0) || require('./base-controller');

  User = ((_ref2 = window.zooniverse) != null ? (_ref3 = _ref2.models) != null ? _ref3.User : void 0 : void 0) || require('../models/user');

  template = ((_ref4 = window.zooniverse) != null ? (_ref5 = _ref4.views) != null ? _ref5.groupsMenu : void 0 : void 0) || require('../views/groups-menu');

  $ = window.jQuery;

  Dropdown = ((_ref6 = window.zooniverse) != null ? (_ref7 = _ref6.controllers) != null ? _ref7.Dropdown : void 0 : void 0) || require('./dropdown');

  GroupsMenu = (function(_super) {
    __extends(GroupsMenu, _super);

    GroupsMenu.prototype.className = 'zooniverse-groups-menu';

    GroupsMenu.prototype.events = {
      'click button[name="user-group"]': 'onClickGroupButton'
    };

    function GroupsMenu() {
      this.onUserChangeGroup = __bind(this.onUserChangeGroup, this);
      this.onUserChange = __bind(this.onUserChange, this);
      GroupsMenu.__super__.constructor.apply(this, arguments);
      User.on('change', this.onUserChange);
      User.on('change-group', this.onUserChangeGroup);
    }

    GroupsMenu.prototype.onUserChange = function(e, user) {
      if (user != null) {
        this.el.html(template(user));
        if (user.user_group_id) {
          return this.el.find("button[name='" + user.user_group_id + "']").click();
        }
      }
    };

    GroupsMenu.prototype.onUserChangeGroup = function(e, user, group) {
      var buttons;
      buttons = this.el.find('button[name="user-group"]');
      buttons.removeClass('active');
      if (group != null) {
        return buttons.filter("[value='" + group.id + "']").addClass('active');
      }
    };

    GroupsMenu.prototype.onClickGroupButton = function(e) {
      var target, _ref8;
      target = $(e.currentTarget);
      if ((_ref8 = User.current) != null) {
        _ref8.setGroup(target.val() || 'TODO_HOW_DO_I_STOP_CLASSIFYING_AS_PART_OF_A_GROUP');
      }
      return Dropdown.closeAll();
    };

    return GroupsMenu;

  })(Controller);

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  window.zooniverse.controllers.GroupsMenu = GroupsMenu;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = GroupsMenu;
  }

}).call(this);

(function() {
  var Api, BaseController, Dropdown, GroupsMenu, LanguageManager, LanguagesMenu, TopBar, User, defaultTalkProfileHref, loginDialog, signupDialog, template, _base, _base1, _base2, _base3,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).views == null) {
    _base1.views = {};
  }

  if ((_base2 = window.zooniverse).lib == null) {
    _base2.lib = {};
  }

  if ((_base3 = window.zooniverse).models == null) {
    _base3.models = {};
  }

  BaseController = zooniverse.controllers.BaseController || require('./base-controller');

  loginDialog = zooniverse.controllers.loginDialog || require('./login-dialog');

  signupDialog = zooniverse.controllers.signupDialog || require('./signup-dialog');

  template = zooniverse.views.topBar || require('../views/top-bar');

  Dropdown = zooniverse.controllers.Dropdown || require('./dropdown');

  GroupsMenu = zooniverse.controllers.GroupsMenu || require('./groups-menu');

  LanguageManager = zooniverse.LanguageManager || require('../lib/language-manager');

  LanguagesMenu = zooniverse.controllers.LanguagesMenu || require('./languages-menu');

  Api = zooniverse.Api || require('../lib/api');

  User = zooniverse.models.User || require('../models/user');

  defaultTalkProfileHref = "http://talk." + (location.hostname.replace(/^www\./, '')) + "/#/profile";

  TopBar = (function(_super) {
    __extends(TopBar, _super);

    TopBar.prototype.className = 'zooniverse-top-bar';

    TopBar.prototype.template = template;

    TopBar.prototype.messageCheckTimeout = 2 * 60 * 1000;

    TopBar.prototype.talkProfileHref = defaultTalkProfileHref;

    TopBar.prototype.events = {
      'click button[name="sign-in"]': 'onClickSignIn',
      'click button[name="sign-up"]': 'onClickSignUp',
      'click button[name="sign-out"]': 'onClickSignOut'
    };

    TopBar.prototype.elements = {
      '.current-user-name': 'currentUserName',
      'button[name="groups"]': 'groupsMenuButton',
      'button[name="languages-menu-toggle"]': 'languagesMenuButton',
      '.message-count': 'messageCount',
      '.avatar img': 'avatarImage',
      '.group': 'currentGroup'
    };

    function TopBar() {
      this.onLanguageChange = __bind(this.onLanguageChange, this);
      this.onUserChangeGroup = __bind(this.onUserChangeGroup, this);
      this.getMessages = __bind(this.getMessages, this);
      this.onUserChange = __bind(this.onUserChange, this);
      TopBar.__super__.constructor.apply(this, arguments);
      this.groupsMenu = new GroupsMenu;
      this.groupsDropdown = new Dropdown({
        button: this.groupsMenuButton.get(0),
        buttonPinning: [1, 1],
        menu: this.groupsMenu.el.get(0),
        menuClass: 'from-top-bar',
        menuPinning: [1, 0]
      });
      this.el.toggleClass('has-languages', LanguageManager.current != null);
      if (LanguageManager.current != null) {
        this.onLanguageChange();
        LanguageManager.on('change-language', this.onLanguageChange);
        this.languagesMenu = new LanguagesMenu();
        this.languagesDropdown = new Dropdown({
          button: this.languagesMenuButton.get(0),
          buttonPinning: [1, 1],
          menu: this.languagesMenu.el.get(0),
          menuClass: 'from-top-bar',
          menuPinning: [1, 0]
        });
      }
      User.on('change', this.onUserChange);
      User.on('change-group', this.onUserChangeGroup);
    }

    TopBar.prototype.onClickSignIn = function() {
      signupDialog.hide();
      return loginDialog.show();
    };

    TopBar.prototype.onClickSignUp = function() {
      loginDialog.hide();
      return signupDialog.show();
    };

    TopBar.prototype.onClickSignOut = function() {
      return User.logout();
    };

    TopBar.prototype.onUserChange = function(e, user) {
      var _ref;
      this.el.toggleClass('signed-in', user != null);
      this.el.toggleClass('has-groups', (user != null ? (_ref = user.user_groups) != null ? _ref.length : void 0 : void 0) > 0);
      this.onUserChangeGroup(e, user != null, user != null ? user.user_group_id : void 0);
      this.getMessages();
      this.currentUserName.html((user != null ? user.name : void 0) || '');
      return this.avatarImage.attr({
        src: user != null ? user.avatar : void 0
      });
    };

    TopBar.prototype.getMessages = function() {
      var _this = this;
      if (User.current != null) {
        return Api.current.get('/talk/messages/count', function(messages) {
          _this.el.toggleClass('has-messages', messages !== 0);
          _this.messageCount.html(messages);
          return setTimeout(_this.getMessages, _this.messageCheckTimeout);
        });
      } else {
        this.el.removeClass('has-messages');
        return this.messageCount.html('0');
      }
    };

    TopBar.prototype.onUserChangeGroup = function(e, user, group) {
      return this.el.toggleClass('group-participant', group != null);
    };

    TopBar.prototype.onLanguageChange = function() {
      var _ref;
      return this.languagesMenuButton.html((_ref = LanguageManager.current) != null ? _ref.label() : void 0);
    };

    return TopBar;

  })(BaseController);

  window.zooniverse.controllers.TopBar = TopBar;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = TopBar;
  }

}).call(this);

(function() {
  var $, BaseController, Paginator, User, template, _base, _base1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).views == null) {
    _base1.views = {};
  }

  BaseController = window.zooniverse.controllers.BaseController || require('./base-controller');

  template = window.zooniverse.views.paginator || require('../views/paginator');

  User = window.zooniverse.models.User || require('../models/user');

  $ = window.jQuery;

  Paginator = (function(_super) {
    __extends(Paginator, _super);

    Paginator.prototype.type = null;

    Paginator.prototype.itemTemplate = null;

    Paginator.prototype.className = 'zooniverse-paginator';

    Paginator.prototype.template = template;

    Paginator.prototype.pages = 0;

    Paginator.prototype.perPage = 10;

    Paginator.prototype.events = {
      'click button[name="page"]': 'onClickPage'
    };

    Paginator.prototype.elements = {
      '.items': 'itemsContainer',
      '.numbered': 'numbersContainer'
    };

    function Paginator() {
      this.onItemDestroyed = __bind(this.onItemDestroyed, this);
      this.onItemFromClassification = __bind(this.onItemFromClassification, this);
      this.onFetchFail = __bind(this.onFetchFail, this);
      this.addItemToContainer = __bind(this.addItemToContainer, this);
      this.onFetch = __bind(this.onFetch, this);
      this.onUserChange = __bind(this.onUserChange, this);
      Paginator.__super__.constructor.apply(this, arguments);
      User.on('change', this.onUserChange);
      this.type.on('from-classification', this.onItemFromClassification);
      this.type.on('destroy', this.onItemDestroyed);
    }

    Paginator.prototype.onUserChange = function(e, user) {
      this.reset(this.typeCount());
      this.onFetch([]);
      if (user != null) {
        return this.goTo(1);
      }
    };

    Paginator.prototype.reset = function(itemCount) {
      var button, i, _i, _ref, _results;
      this.pages = Math.ceil(itemCount / this.perPage);
      this.numbersContainer.empty();
      _results = [];
      for (i = _i = 0, _ref = this.pages; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        button = $("<button name='page' value='" + (i + 1) + "'>" + (i + 1) + "</button>");
        _results.push(this.numbersContainer.append(button));
      }
      return _results;
    };

    Paginator.prototype.onClickPage = function(_arg) {
      var page, target;
      target = _arg.target;
      page = +$(target).val();
      return this.goTo(page);
    };

    Paginator.prototype.goTo = function(page) {
      var fetch,
        _this = this;
      page = Math.max(page, 1);
      this.el.removeClass('failed');
      this.numbersContainer.children().removeClass('active');
      this.numbersContainer.children("[value='" + page + "']").addClass('active');
      this.el.addClass('loading');
      fetch = this.type.fetch({
        page: page,
        per_page: this.perPage
      });
      fetch.then(this.onFetch, this.onFetchFail);
      return fetch.always(function() {
        return _this.el.removeClass('loading');
      });
    };

    Paginator.prototype.typeCount = function() {
      var _ref, _ref1;
      return ((_ref = User.current) != null ? (_ref1 = _ref.project) != null ? _ref1.classification_count : void 0 : void 0) || 0;
    };

    Paginator.prototype.onFetch = function(items) {
      var item, _i, _len, _results;
      this.itemsContainer.empty();
      this.el.toggleClass('empty', items.length === 0);
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push(this.addItemToContainer(item));
      }
      return _results;
    };

    Paginator.prototype.getItemEl = function(item) {
      var inner, itemEl, _ref, _ref1;
      itemEl = this.itemsContainer.find("[data-item-id='" + item.id + "']");
      if (itemEl.length === 0) {
        inner = this.itemTemplate != null ? this.itemTemplate(item) : "<div class='item'><a href=\"" + (((_ref = item.subjects[0]) != null ? _ref.talkHref() : void 0) || '#/SUBJECT-ERROR') + "\">" + (((_ref1 = item.subjects[0]) != null ? _ref1.zooniverse_id : void 0) || 'Error in subject') + "</a></div>";
        itemEl = $($.trim(inner));
        itemEl.attr({
          'data-item-id': item.id
        });
      }
      return itemEl;
    };

    Paginator.prototype.addItemToContainer = function(item) {
      var itemEl;
      itemEl = this.getItemEl(item);
      itemEl.prependTo(this.itemsContainer);
      return itemEl;
    };

    Paginator.prototype.onFetchFail = function() {
      return this.el.addClass('failed');
    };

    Paginator.prototype.onItemFromClassification = function(e, item) {
      var _results;
      this.addItemToContainer(item).addClass('new');
      if (this.itemsContainer.children().length > this.perPage) {
        _results = [];
        while (this.itemsContainer.children().length !== this.perPage) {
          _results.push(this.itemsContainer.children().last().remove());
        }
        return _results;
      }
    };

    Paginator.prototype.onItemDestroyed = function(e, item) {
      return this.getItemEl(item).remove();
    };

    return Paginator;

  })(BaseController);

  window.zooniverse.controllers.Paginator = Paginator;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Paginator;
  }

}).call(this);

(function() {
  var $, BaseController, Favorite, LoginForm, Paginator, Profile, ProfilePaginator, Recent, User, itemTemplate, template, _base, _base1, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).views == null) {
    _base1.views = {};
  }

  BaseController = zooniverse.controllers.BaseController || require('./base-controller');

  template = zooniverse.views.profile || require('../views/profile');

  LoginForm = zooniverse.controllers.LoginForm || require('zooniverse/controllers/login-form');

  Paginator = zooniverse.controllers.Paginator || require('./paginator');

  Recent = zooniverse.models.Recent || require('../models/recent');

  Favorite = zooniverse.models.Favorite || require('../models/favorite');

  itemTemplate = zooniverse.views.profileItem || require('../views/profile-item');

  User = zooniverse.models.User || require('../models/user');

  $ = window.jQuery;

  ProfilePaginator = (function(_super) {
    __extends(ProfilePaginator, _super);

    function ProfilePaginator() {
      _ref = ProfilePaginator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfilePaginator.prototype.typeCount = function() {
      var count, _ref1, _ref2, _ref3, _ref4;
      count = this.type === Recent ? (_ref1 = User.current) != null ? (_ref2 = _ref1.project) != null ? _ref2.classification_count : void 0 : void 0 : this.type === Favorite ? (_ref3 = User.current) != null ? (_ref4 = _ref3.project) != null ? _ref4.favorite_count : void 0 : void 0 : ProfilePaginator.__super__.typeCount.apply(this, arguments);
      return count || 0;
    };

    return ProfilePaginator;

  })(Paginator);

  Profile = (function(_super) {
    __extends(Profile, _super);

    Profile.prototype.className = 'zooniverse-profile';

    Profile.prototype.template = template;

    Profile.prototype.recentTemplate = itemTemplate;

    Profile.prototype.favoriteTemplate = itemTemplate;

    Profile.prototype.loginForm = null;

    Profile.prototype.recentsList = null;

    Profile.prototype.favoritesList = null;

    Profile.prototype.events = {
      'click button[name="unfavorite"]': 'onClickUnfavorite',
      'click button[name="turn-page"]': 'onTurnPage'
    };

    Profile.prototype.elements = {
      'nav': 'navigation',
      'button[name="turn-page"]': 'pageTurners'
    };

    function Profile() {
      var _this = this;
      Profile.__super__.constructor.apply(this, arguments);
      this.loginForm = new LoginForm({
        el: this.el.find('.sign-in-form')
      });
      this.recentsList = new ProfilePaginator({
        type: Recent,
        perPage: 12,
        className: "" + Paginator.prototype.className + " recents",
        el: this.el.find('.recents'),
        itemTemplate: this.recentTemplate
      });
      this.favoritesList = new ProfilePaginator({
        type: Favorite,
        perPage: 12,
        className: "" + Paginator.prototype.className + " favorites",
        el: this.el.find('.favorites'),
        itemTemplate: this.favoriteTemplate
      });
      User.on('change', function() {
        return _this.onUserChange.apply(_this, arguments);
      });
    }

    Profile.prototype.onUserChange = function(e, user) {
      this.el.toggleClass('signed-in', user != null);
      return this.pageTurners.first().click();
    };

    Profile.prototype.onClickUnfavorite = function(e) {
      var favorite, id, target;
      target = $(e.currentTarget);
      id = target.val();
      favorite = Favorite.find(id);
      favorite["delete"]();
      return target.parents('[data-item-id]').first().remove();
    };

    Profile.prototype.onTurnPage = function(e) {
      return this.turnPage($(e.currentTarget).val());
    };

    Profile.prototype.turnPage = function(targetType) {
      this.pageTurners.removeClass('active');
      this.pageTurners.filter("[value=\"" + targetType + "\"]").first().addClass('active');
      this.recentsList.el.add(this.favoritesList.el).removeClass('active');
      return this["" + targetType + "List"].el.addClass('active');
    };

    return Profile;

  })(BaseController);

  window.zooniverse.controllers.Profile = Profile;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Profile;
  }

}).call(this);

(function() {
  var $, $window, Footer, template, _base, _base1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).views == null) {
    _base1.views = {};
  }

  template = window.zooniverse.views.footer || require('../views/footer');

  $ = window.jQuery;

  $window = $(window);

  window.DEFINE_ZOONIVERSE_PROJECT_LIST = function(categories) {
    return $window.trigger('get-zooniverse-project-list', [categories]);
  };

  Footer = (function() {
    Footer.prototype.el = null;

    Footer.prototype.projectScript = 'http://zooniverse-demo.s3-website-us-east-1.amazonaws.com/projects.js';

    function Footer() {
      this.onFetch = __bind(this.onFetch, this);
      this.el = $(document.createElement('div'));
      this.el.addClass('zooniverse-footer');
      this.el.html(template);
      $window.on('get-zooniverse-project-list', this.onFetch);
      this.fetchProjects();
    }

    Footer.prototype.fetchProjects = function() {
      return $.getScript(this.projectScript);
    };

    Footer.prototype.onFetch = function(e, categories) {
      return this.el.html(template({
        categories: categories
      }));
    };

    return Footer;

  })();

  window.zooniverse.controllers.Footer = Footer;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Footer;
  }

}).call(this);

(function() {
  var $, activeHashLinks, anchors, className, init, root, updateClasses, _base;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).util == null) {
    _base.util = {};
  }

  $ = window.jQuery;

  className = 'active';

  root = document;

  anchors = $();

  updateClasses = function() {
    anchors.removeClass(className);
    anchors = $("a[href='" + location.hash + "']");
    return anchors.addClass(className);
  };

  init = function(newClassName, newRoot) {
    var _ref;
    if (newClassName == null) {
      newClassName = className;
    }
    if (newRoot == null) {
      newRoot = root;
    }
    _ref = [newClassName, newRoot], className = _ref[0], root = _ref[1];
    updateClasses();
    return $(window).on('hashchange', updateClasses);
  };

  activeHashLinks = {
    updateClasses: updateClasses,
    init: init
  };

  window.zooniverse.util.activeHashLinks = activeHashLinks;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = activeHashLinks;
  }

}).call(this);

if (typeof module !== 'undefined') module.exports = window.zooniverse
}(window));
