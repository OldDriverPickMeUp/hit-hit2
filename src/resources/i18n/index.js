import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import notFound from "./pages/notFound";
import tools from "./pages/tools";
import support from "./pages/support";
import common from "./common";
import metronome from "./pages/metronome";
import stat from "./stat";
import dashboard from "./pages/dashboard";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {},
    lng: navigator.language,
    fallbackLng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

i18n.addResourceBundle("en", "notFound", notFound.en);
i18n.addResourceBundle("zh", "notFound", notFound.zh);
i18n.addResourceBundle("en", "tools", tools.en);
i18n.addResourceBundle("zh", "tools", tools.zh);
i18n.addResourceBundle("en", "support", support.en);
i18n.addResourceBundle("zh", "support", support.zh);
i18n.addResourceBundle("en", "metronome", metronome.en);
i18n.addResourceBundle("zh", "metronome", metronome.zh);
i18n.addResourceBundle("en", "dashboard", dashboard.en);
i18n.addResourceBundle("zh", "dashboard", dashboard.zh);

i18n.addResourceBundle("en", "common", common.en);
i18n.addResourceBundle("zh", "common", common.zh);
i18n.addResourceBundle("en", "stat", stat.en);
i18n.addResourceBundle("zh", "stat", stat.zh);
export default i18n;
