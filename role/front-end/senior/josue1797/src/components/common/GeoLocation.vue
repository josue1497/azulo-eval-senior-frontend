<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import GeoCode from "@/types/GeoCode";
import { useGeolocation } from "@/composable/useGeolocation";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const { coords } = defineProps<{
  coords: GeoCode;
}>();

const _coords = ref(coords);
const loader = new Loader({
  apiKey: GOOGLE_API_KEY,
  version: "weekly",
});

const { coords: currentGeoLocation } = useGeolocation();

const currCords = computed(() => {
  if (_coords.value) return { lat: _coords.value.lat, lng: _coords.value.lng };

  return {
    lat: currentGeoLocation.value.latitude,
    lng: currentGeoLocation.value.longitude,
  };
});

const mapDiv = ref(null);
let map = ref(null);

onMounted(async () => {
  await loader.load();
  map.value = new google.maps.Map(mapDiv.value, {
    center: currCords.value,
    zoom: 20,
  });
});
</script>
<template>
  <div>
    <div id="map" class="geo-map" ref="mapDiv"></div>
  </div>
</template>
