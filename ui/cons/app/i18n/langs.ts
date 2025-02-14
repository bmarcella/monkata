export const locales = {
    en: {
        label: "English",
        dayjs: () => import('dayjs/locale/en'),
        flatpickr: null,
        i18n: () => import("./locales/en/translations.json"),
        flag: 'united-kingdom'
    },
    fr: {
        label: "Français",
        dayjs: () => import('dayjs/locale/fr'),
        flatpickr: null,
        i18n: () => import("./locales/fr/translations.json"),
        flag: 'france'
    },
    ht: {
        label: "Creole Haitien",
        dayjs: () => import('dayjs/locale/ht'),
        flatpickr: null,
        i18n: () => import("./locales/ht/translations.json"),
        flag: 'haiti'
    },
}