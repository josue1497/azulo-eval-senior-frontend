<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import GeoCode from "@/types/GeoCode";
// eslint-disable-next-line vue/no-setup-props-destructure
const { images, coords } = defineProps<{
  content: string;
  coords?: GeoCode;
  images?: string[];
}>();

const _coords = ref(coords);
const dialog = ref(false);
const mapDialog = ref(false);

const handleDialog = () => {
  dialog.value = !dialog.value;
};

const handleMapDialog = () => {
  mapDialog.value = !mapDialog.value;
};
const coverImage = computed(() => {
  return images && images.length ? images[0] : "";
});

const showMenu = computed(() => {
  return _coords.value && _coords.value.lat && _coords.value.lng;
});
</script>
<template>
  <v-card
    width="350"
    class="d-flex flex-column ml-auto mb-7 pa-10 border position-relative"
  >
    <v-menu v-if="showMenu">
      <template v-slot:activator="{ props }">
        <v-btn
          color="transparent"
          v-bind="props"
          size="x-small"
          class="position-absolute options-btn"
          icon
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-btn @click="handleMapDialog">
            <v-list-item-title>Open location</v-list-item-title>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <div
      class="d-flex stack my-5 position-relative"
      v-if="images.length"
      @click="handleDialog"
    >
      <v-badge
        color="primary"
        :content="`+${images.length - 1}`"
        top
        right
      ></v-badge>
      <div
        :style="{ backgroundImage: `url(${coverImage})` }"
        class="ma-auto main-stack-image"
      ></div>
    </div>
    <div v-html="content" class="ma-5"></div>
    <v-dialog v-model="dialog">
      <v-card width="750" height="500">
        <v-carousel>
          <v-carousel-item v-for="(image, i) in images" :key="i">
            <v-sheet color="default" height="100%" tile>
              <div class="d-flex fill-height justify-center align-center">
                <img :src="image" alt="image" class="text-h2" />
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
    <v-dialog v-if="mapDialog" v-model="mapDialog">
      <v-card width="950">
        <GeoLocation :coords="_coords"></GeoLocation>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style>
.main-stack-image {
  min-width: 230px;
  height: 200px;
  object-fit: cover;
  background-size: cover;
}

.stack {
  position: relative;
}

.stack:before {
  background: #eff4de;
  top: -10px;
  left: -15px;
  border: 1px solid #000;
  -webkit-transform: rotate(-5deg);
  -moz-transform: rotate(-5deg);
  -o-transform: rotate(-5deg);
  -ms-transform: rotate(-5deg);
  transform: rotate(-5deg);
}

.stack:after {
  background: #768590;
  top: 5px;
  left: 0px;
  border: 1px solid #000;
  -webkit-transform: rotate(4deg);
  -moz-transform: rotate(4deg);
  -o-transform: rotate(4deg);
  -ms-transform: rotate(4deg);
  transform: rotate(4deg);
}

.stack,
.stack:before,
.stack:after {
  border: 6px solid #fff;
  width: 250px;
  height: 180px;
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.stack:before,
.stack:after {
  content: "";
  position: absolute;
  z-index: -1;
}

.options-btn {
  right: 1vh;
  top: 1vh;
}
</style>
