<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  label: string;
  icon?: string;
}>();

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>
<template>
  <button type="button" @click.prevent="handleClick">
    <v-icon small>{{ icon || "mdi-format-italic" }}</v-icon>
  </button>
</template>
