<script setup lang="ts">
import { computed, defineProps, ref } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
const updateValue = (value: string) => {
  emit("update:modelValue", value);
};

const showInput = ref(false);
const search = ref("");

const toggleInput = () => {
  showInput.value = !showInput.value;
};

const searchButtonColor = computed<any>(() => {
  return {
    button: showInput.value ? "default" : "primary",
    icon: showInput.value ? "primary" : "white",
  };
});

const inputContainerStyle = computed<string>(() => {
  return `d-flex align-center rounded-pill flex-row justify-end align-center px-5 ${
    showInput.value ? "bg-primary" : "bg-transparent"
  }`;
});
</script>
<template>
  <div>
    <v-container class="my-5">
      <v-row>
        <v-col cols="6" class="d-flex align-center">
          <h3>Libretas de viaje</h3>
        </v-col>
        <v-col cols="6" :class="inputContainerStyle">
          <div
            :class="{
              'input-active': showInput,
              'input-hidden': !showInput,
              'search d-flex align-center': true,
            }"
          >
            <v-text-field
              label="Buscar destino"
              rounded
              hide-details
              outlined
              dense
              v-model="search"
              v-on:input="updateValue($event.target.value)"
            ></v-text-field>
          </div>
          <v-btn
            rounded
            icon
            :color="searchButtonColor.button"
            @click="toggleInput"
            class="ml-auto"
          >
            <v-icon class="mx-10" :color="searchButtonColor.icon"
              >mdi-magnify</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>
<style scoped>
.search {
  width: 100%;
  transition: all 0.5s ease;
  transform-origin: right;
}

.input-active {
  transform: scaleX(1);
}

.input-hidden {
  transform: scaleX(0);
}
</style>
