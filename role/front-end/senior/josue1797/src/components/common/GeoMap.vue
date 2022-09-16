<script setup lang="ts">
/* eslint-disable no-undef */
import { ref, computed, onMounted, watch } from "vue";
import { useGeolocation } from "@/composable/useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import useLoader from "@/composable/useLoading";
import { useLibraryStore } from "@/stores/library";
import GeoCode from "@/types/GeoCode";
import useSnackbar from "@/composable/useSnackbar";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

defineProps<{
  coords?: GeoCode;
}>();

const emit = defineEmits(["update:coords"]);

const loader = new Loader({
  apiKey: GOOGLE_API_KEY,
  version: "weekly",
});

const { coords: currentGeoLocation } = useGeolocation();
const { setTemporalGeoCode } = useLibraryStore();
const { showSnackbar, snackText, snackColor, snackbar } = useSnackbar();

const currCords = computed(() => ({
  lat: currentGeoLocation.value.latitude,
  lng: currentGeoLocation.value.longitude,
}));

const mapDiv = ref(null);
let map = ref(null);
const service = ref();
const searchResults = ref([]);
const location = ref([]);
const placeSelected = ref([]);

const mapsInit = async () => {
  await loader.load();
  service.value = new google.maps.places.AutocompleteService();
};

const displaySuggestions = (predictions: any, status: any) => {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    searchResults.value = [];
    return;
  }
  searchResults.value = predictions.map(({ place_id, description }: any) => ({
    place_id,
    description,
  }));
};

watch(location, () => {
  if (location.value) {
    service.value.getPlacePredictions(
      {
        input: location.value,
        types: ["(cities)"],
      },
      displaySuggestions
    );
  }
});

watch(placeSelected, () => {
  const geocoder = new google.maps.Geocoder();
  const marker = new google.maps.Marker({ map: map.value });
  const infowindow = new google.maps.InfoWindow();
  geocoder
    .geocode({ placeId: placeSelected.value })
    .then(({ results }: any) => {
      map.value.setZoom(11);
      map.value.setCenter(results[0].geometry.location);
      marker.setPlace({
        placeId: placeSelected.value,
        location: results[0].geometry.location,
      });
      currentGeoLocation.value = {
        latitude: results[0].geometry.location.lat(),
        longitude: results[0].geometry.location.lng(),
      };
      setTemporalGeoCode({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      });

      marker.setVisible(true);

      infowindow.open(map, marker);
    })
    .catch((e: any) => window.alert("Geocoder failed due to: " + e));
});

onMounted(async () => {
  mapsInit();
  await loader.load();
  map.value = new google.maps.Map(mapDiv.value, {
    center: currCords.value,
    zoom: 15,
  });
  emit("update:coords", currCords.value);

  map.value.addListener("click", (e: any) => {
    setTemporalGeoCode({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    emit("update:coords", { lat: e.latLng.lat(), lng: e.latLng.lng() });
    showSnackbar({ text: "Location updated!" });
  });
});

const handleInput = (e: any) => {
  location.value = e.target.value;
};
</script>
<template>
  <div>
    <v-autocomplete
      class="w-100"
      v-model="placeSelected"
      :items="searchResults"
      item-value="place_id"
      item-title="description"
      @input="handleInput"
    ></v-autocomplete>
    <div id="map" class="geo-map" ref="mapDiv"></div>
    <CommonSnackbar
      :snackbar="snackbar"
      :snackColor="snackColor"
      :snackText="snackText"
    />
  </div>
</template>
<style>
.geo-map {
  width: 100%;
  height: 50vh;
}
</style>
