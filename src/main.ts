
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import { createAuth } from "./composables/useAuth"; 

const app = createApp(App);
createAuth();
app.use(router);
app.mount("#app");
