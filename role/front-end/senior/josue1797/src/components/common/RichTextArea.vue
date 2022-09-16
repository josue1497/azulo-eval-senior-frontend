<script setup lang="ts">
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, defineEmits, defineProps, watch } from "vue";

const editorContent = ref("");
const _images = ref([]);
defineProps<{
  content: string;
  images: string[];
}>();
const emit = defineEmits(["update:content", "update:images"]);
watch(_images, () => {
  emit("update:images", _images.value);
});

const editor = new Editor({
  content: editorContent.value,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    ListItem,
  ],
  onUpdate: ({ editor }) => {
    editorContent.value = editor.getHTML();
    emit("update:content", editor.getHTML());
  },
});
</script>
<template>
  <div class="d-flex justify-center align-center flex-column">
    <RichMenu :editor="editor" v-if="editor" class="border-b"></RichMenu>
    <DropZone class="border w-100 drag-zone" v-model:images="_images" />
    <EditorContent :editor="editor" class="w-100"></EditorContent>
  </div>
</template>
<style>
.drag-zone {
  height: 15vh;
  width: 100%;
}
/* Basic editor styles */
.ProseMirror {
  padding: 2rem;
  height: 8rem;
  overflow: auto;
}

button.toolbar.is-active,
button.toolbar.is-active:hover {
  /* box-shadow: -2px -2px 5px 1px #fff, 1.5px 1.5px 1.5px #ccc; */
  background-color: #333333;
  color: #fff;
}

button.toolbar {
  padding: 5px;
  border-radius: 500px;
  width: 3vh;
  height: 3vh;
  font-size: 12px;
  color: #333333;
  /* box-shadow: inset -3px -3px 5px 0px #fff, inset 3px 3px 5px 0px #ccc; */
}

.ProseMirror > * + * {
  margin-top: 0.75em;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  line-height: 1.1;
}

.ProseMirror code {
  background-color: rgba(#616161, 0.1);
  color: #616161;
}

.ProseMirror pre {
  background: #0d0d0d;
  color: #fff;
  font-family: "JetBrainsMono", monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.ProseMirror pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.ProseMirror mark {
  background-color: #faf594;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
}

.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(#0d0d0d, 0.1);
}

.ProseMirror hr {
  border: none;
  border-top: 2px solid rgba(#0d0d0d, 0.1);
  margin: 2rem 0;
}
</style>
