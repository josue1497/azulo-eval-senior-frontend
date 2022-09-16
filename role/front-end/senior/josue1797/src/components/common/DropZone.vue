<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, defineProps } from "vue";
import AddIcon from "../icons/AddIcon.vue";

defineProps<{
  images: { name: string; file: string }[];
}>();

const emit = defineEmits(["files-dropped", "update:images"]);

const dragover = ref<boolean>(false);
const fileInput = ref<HTMLInputElement>();
const files = ref(Array<any>());
const readedFiles = ref(Array<any>());

const onDrop = (e: any) => {
  files.value = [...files.value, ...e.dataTransfer.files];
};

const preventDefaults = (e: any) => {
  e.preventDefault();
};

const clearReadedFiles = () => {
  readedFiles.value = [];
};

const readFile = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  clearReadedFiles();
  reader.onload = () => {
    readedFiles.value = !readedFiles.value.some(
      ({ file }: any) => reader.result === file
    )
      ? [...readedFiles.value, { name: file.name, file: reader.result }]
      : readedFiles.value;
  };
};

const openFileInput = () => {
  if (fileInput.value) fileInput.value.click();
};

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});

const onFileInputChanged = (e: any) => {
  files.value = [...files.value, ...e.target.files];
};

const deleteFile = (name: any) => {
  files.value = files.value.filter((f) => f.name !== name);
};

watch(files, () => {
  if (!files.value.length) {
    clearReadedFiles();
    return;
  }

  files.value.forEach((file: any) => {
    readFile(file);
  });

  emit("files-dropped", files.value);
  dragover.value = false;
  fileInput.value.value = "";
});
watch(readedFiles, () => {
  emit("update:images", readedFiles.value);
});
</script>
<template>
  <div
    @drop.prevent="onDrop"
    @dragover.prevent="dragover = true"
    @dragenter.prevent="dragover = true"
    @dragleave.prevent="dragover = true"
    @mouseup.prevent="dragover = false"
  >
    <input
      type="file"
      accept="image/png, image/gif, image/jpeg"
      ref="fileInput"
      v-show="false"
      @change="onFileInputChanged"
      multiple
    />
    <div
      v-if="dragover"
      class="d-flex w-100 h-100 bg-green text-white text-center justify-center align-center"
    >
      <p>Drop your images here</p>
    </div>
    <div
      v-if="!dragover && !readedFiles.length"
      class="d-flex w-100 h-100 bg-grey text-white text-center justify-center align-center cursor-pointer"
      @click="openFileInput"
    >
      <p>Click or drag your images here</p>
    </div>
    <div v-if="!dragover && readedFiles.length">
      <div
        class="d-flex position-relative overflow-auto w-100 px-3 py-2 h-100 bg-grey text-white text-center justify-start align-center cursor-pointer"
      >
        <div class="d-inline-flex">
          <AddIcon class="mb-auto add-icon" @click="openFileInput" />
          <div
            v-for="({ name, file }, index) in readedFiles"
            :key="index"
            :alt="`image ${name}`"
            class="ma-2 image-item position-relative"
            :style="{ backgroundImage: `url(${file})` }"
          >
            <v-btn
              class="position-absolute delete-button"
              icon
              size="x-small"
              @click="deleteFile(name, file)"
            >
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.add-icon {
  width: 5vh;
  height: 5vh;
  top: 1vh;
  right: 1vw;
}

.image-item {
  width: 10vh;
  height: 10vh;
  background-size: contain;
  background-repeat: no-repeat;
}

.delete-button {
  top: 2px;
  right: 2px;
}
</style>
