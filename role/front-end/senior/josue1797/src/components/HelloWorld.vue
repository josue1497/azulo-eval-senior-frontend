<script setup lang="ts">
import { ref } from "vue";
import Logo from "./icons/AppLogo.vue";

const msg = ref("Hello Vitest");

const ecosystem = [
  {
    text: "vuetify-loader",
    href: "https://github.com/vuetifyjs/vuetify-loader",
  },
  {
    text: "github",
    href: "https://github.com/vuetifyjs/vuetify",
  },
  {
    text: "awesome-vuetify",
    href: "https://github.com/vuetifyjs/awesome-vuetify",
  },
];

const importantLinks = [
  {
    text: "Chat",
    href: "https://community.vuetifyjs.com",
  },
  {
    text: "Made with Vuetify",
    href: "https://madewithvuejs.com/vuetify",
  },
  {
    text: "Twitter",
    href: "https://twitter.com/vuetifyjs",
  },
  {
    text: "Articles",
    href: "https://medium.com/vuetify",
  },
];

const whatsNext = [
  {
    text: "Explore components",
    href: "https://vuetifyjs.com",
  },
  {
    text: "Roadmap",
    href: "https://vuetifyjs.com/en/introduction/roadmap/",
  },
  {
    text: "Frequently Asked Questions",
    href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
  },
];
</script>

<template>
  <h3>{{ msg }}</h3>
</template>
