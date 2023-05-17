import datePicker from "@/datePicker";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.directive("date", datePicker);
app.mount("#app");
