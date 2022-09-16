<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

const props = defineProps<{
  editor: any;
}>();

const mapDialog = ref(false);

const coords = ref(null);

const buttons = [
  {
    name: "bold",
    class: "rich-text__bold",
    label: "Bold",
    icon: "mdi-format-bold",
    action: () => props.editor.chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    class: "rich-text__italic",
    label: "Italic",
    icon: "mdi-format-italic",
    action: () => props.editor.chain().focus().toggleItalic().run(),
  },
  {
    name: "strike",
    class: "rich-text__under",
    label: "Underline",
    icon: "mdi-format-underline",
    action: () => props.editor.chain().focus().toggleStrike().run(),
  },
  {
    name: "bulletList",
    class: "rich-text__u",
    label: "Bullet list",
    icon: "mdi-format-list-bulleted",
    action: () => props.editor.chain().focus().toggleBulletList().run(),
  },
  {
    name: "orderedList",
    class: "toggleOrderedList",
    label: "Order list",
    icon: "mdi-format-list-numbered",
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
  },
  {
    name: "geoCode",
    class: "geoCode",
    label: "Geo code",
    icon: "mdi-google-maps",
    action: () => (mapDialog.value = true),
  },
];
</script>

<template>
  <div class="py-1 d-flex flex-row justify-space-around align-around w-100">
    <div v-for="({ action, label, icon, name }, index) of buttons" :key="index">
      <RichButton
        tabIndex="-1"
        @click="action"
        :icon="icon"
        :label="label"
        :class="{ 'is-active': editor.isActive(name), toolbar: 'toolbar' }"
      />
    </div>
    <v-dialog v-if="mapDialog" v-model="mapDialog">
      <v-card width="950">
        <GeoMap></GeoMap>
      </v-card>
    </v-dialog>
  </div>
</template>
