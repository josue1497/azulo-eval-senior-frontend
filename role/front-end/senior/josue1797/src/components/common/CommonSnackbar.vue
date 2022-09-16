<template>
  <v-snackbar v-model="snackbar" :color="snackColor" timeout="3000">
    {{ snackText }}

    <template v-slot:actions>
      <v-btn icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  snackbar: boolean;
  snackText: string;
  snackColor?: string;
}>();
</script>
