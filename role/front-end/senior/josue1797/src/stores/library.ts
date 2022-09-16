import { defineStore } from "pinia";
import type GeoCode from "@/types/GeoCode";

export const useLibraryStore = defineStore("library", {
  state: () => {
    return { libraries: [], library: null, temporalGeoCode: {}, items: [] };
  },
  actions: {
    setLibraries(payload: []) {
      this.libraries = [...payload];
    },
    setLibrary(payload: any) {
      this.library = { ...payload };
    },
    setTemporalGeoCode(payload: GeoCode) {
      this.temporalGeoCode = { ...payload };
    },
    setItems(payload = []) {
      this.items = [...payload];
    },
  },
});
