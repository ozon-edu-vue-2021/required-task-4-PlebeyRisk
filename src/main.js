import Vue from "vue";
import App from "./App.vue";
import "normalize.css";
import "./assets/css/global.css";
import Notifications from "vue-notification";
import NotifyErrorPlugin from "./plugins/notifyErrorPlugin";

import { extend, localize } from "vee-validate";
import veeRu from "vee-validate/dist/locale/ru.json";
import { required, digits, email } from "vee-validate/dist/rules";
import { cyrillic, latin, dateLess } from "./utils/validate/rules";

localize("ru", veeRu);
extend("email", email);
extend("required", required);
extend("digits", digits);
extend("cyrillic", cyrillic);
extend("latin", latin);
extend("dateLess", dateLess);

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(NotifyErrorPlugin);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
