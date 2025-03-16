export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // "vi",
      // 'zh-Hans',
      // 'zh',
    ],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Vive CMS",
        "app.components.LeftMenu.navbrand.workplace": "Vive Dashboard",
        "Auth.form.welcome.title": "Vive CMS",
        "Auth.form.welcome.subtitle": "Log in to Vive CMS Account",
      },
    },
    theme: {
      light: true,
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
