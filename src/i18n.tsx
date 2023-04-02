import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en/index";
import { fr } from "./locales/fr/index";

const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    }
}
i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en"
    });

export default i18next;