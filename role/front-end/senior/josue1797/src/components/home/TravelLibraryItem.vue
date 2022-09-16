<script setup lang="ts">
import { defineProps } from "vue";

interface TravelLibraryItem {
  title: string;
  subtitle?: string;
}

defineProps<TravelLibraryItem>();
</script>

<template>
  <div class="my-2">
    <v-hover v-slot="{ isHovering, props }">
      <v-list-item
        class="transition-all"
        :elevation="isHovering ? 5 : 0"
        v-bind="props"
      >
        <v-list-item-title class="title">{{ title }}</v-list-item-title>
        <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
    </v-hover>
  </div>
</template>
<style scoped>
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
