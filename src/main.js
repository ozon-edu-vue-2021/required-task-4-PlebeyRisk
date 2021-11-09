import Vue from "vue";
import App from "./App.vue";
import Notifications from "vue-notification";
import VueMask from "v-mask";
import NotifyErrorPlugin from "./plugins/notifyErrorPlugin";

import "normalize.css";
import "./assets/css/global.css";

import { extend, localize } from "vee-validate";
import veeRu from "vee-validate/dist/locale/ru.json";
import { required, email, digits } from "vee-validate/dist/rules";
import { cyrillic, latin, dateLess } from "./utils/validate/rules";

localize("ru", veeRu);
localize({
  ru: {
    messages: {
      digits: "Поле должно быть числовым и точно содержать {length} цифры",
      email: "Поле должно быть действительным электронным адресом",
      required: "Поле обязательно для заполнения",
    },
  },
});
extend("email", email);
extend("required", required);
extend("digits", digits);
extend("digits", digits);
extend("cyrillic", cyrillic);
extend("latin", latin);
extend("dateLess", dateLess);

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(NotifyErrorPlugin);
Vue.use(VueMask);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
