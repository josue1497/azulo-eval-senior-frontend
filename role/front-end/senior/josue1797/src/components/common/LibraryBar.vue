<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

defineProps<{
  name: string;
  description: string;
}>();

const showEditName = ref(false);

const emit = defineEmits(["update:name", "update:description", "exit"]);

const inputName = (e: { target: { value: string } }) => {
  emit("update:name", e.target.value);
};

const inputDescription = (e: { target: { value: string } }) => {
  emit("update:description", e.target.value);
};

const handleExit = () => {
  emit("exit");
};
</script>

<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-btn rounded @click="handleExit">
        <v-icon>mdi-chevron-left</v-icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <div>
        <v-card-title class="py-0">{{ name }}</v-card-title>
        <v-card-subtitle>{{ description }}</v-card-subtitle>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click="showEditName = !showEditName">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-dialog v-model="showEditName">
      <v-card width="500">
        <v-container>
          <v-text-field
            hide-details
            label="Title"
            placeholder="Insert Title"
            class="mb-3"
            type="text"
            :v-model="name"
            @input="inputName"
          ></v-text-field>
          <v-textarea
            hide-details
            label="Description"
            placeholder="Insert library description"
            :v-model="description"
            @input="inputDescription"
          ></v-textarea>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" block @click="showEditName = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
