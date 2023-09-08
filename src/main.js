import { createApp } from "vue";
import App from "./App.vue";
import createRouter from "./router";

import "./css/normalize.css";
import "./css/components.css";
import "./css/mydentist-apps.css";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// library.add(faXmark, faMagnifyingGlass);

// createApp(App)
//   .use(createRouter())
//   .component("font-awesome-icon", FontAwesomeIcon)
//   .mount("#app");

createApp(App).use(createRouter()).mount("#app");
