<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { computed, defineProps, onMounted, ref, onUnmounted } from "vue";
import useFetch from "@/composable/useFetch";
import useLoader from "@/composable/useLoading";
import { useLibraryStore } from "@/stores/library";
import { useRouter } from "vue-router";
import useSnackbar from "@/composable/useSnackbar";

const { library_id } = defineProps({
  library_id: String,
});

const content = ref("");
const name = ref("Insert name");
const description = ref("Insert library description");
const images = ref([]);

const isNew = computed<boolean>(() => {
  return library_id === "new";
});
// Store
const libraryStore = useLibraryStore();

// Composables
const { fetchData, response } = useFetch("findOneFunction", {
  body: JSON.stringify({ _id: library_id }),
  method: "POST",
});

const { fetchData: createData, response: createResponse } = useFetch(
  "createFunction",
  {
    method: "POST",
  }
);

const { fetchData: updateData } = useFetch("updateFunction", {
  method: "POST",
});
const { loading, setLoader } = useLoader();
const router = useRouter();
const { showSnackbar, snackText, snackColor, snackbar } = useSnackbar();

const buildItems = () => {
  return [
    ...libraryStore.items,
    {
      caption: content.value,
      images: images.value.map((i: any) => i.file),
      geocode: libraryStore.temporalGeoCode,
    },
  ];
};

const buildData = () => {
  let result: any = {
    name: name.value,
    description: description.value,
    items: buildItems(),
  };

  if (!isNew.value) {
    result = {
      ...result,
      _id: library_id,
    };
  }

  return result;
};

const getRecord = async () => {
  setLoader();
  await fetchData();
  name.value = response.value.name;
  description.value = response.value.description;
  libraryStore.setItems(response.value.items);
  setLoader();
};

const saveRecord = async () => {
  if (!content.value) {
    showSnackbar({ text: "The note is empty!", color: "error" });
    return;
  }
  setLoader();
  try {
    const data = buildData();
    if (isNew.value) {
      await createFlow(data);
      window.location.href = `./${createResponse.value.insertedId}`;
    } else await updateFlow(data);

    await getRecord();
    showSnackbar({ text: "The note was saved!" });
    clearData();
  } catch (e: any) {
    showSnackbar({ text: `An error has occurred!`, color: "error" });
  }
  setLoader();
};

const clearData = () => {
  content.value = "";
  images.value = [];
};

const createFlow = (data = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await createData({ body: JSON.stringify(data) }));
    } catch (e) {
      reject(e);
    }
  });
};

const updateFlow = async (data = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await updateData({ body: JSON.stringify(data) }));
    } catch (e) {
      reject(e);
    }
  });
};

const handleExit = async () => {
  if (content.value) {
    if (confirm("Are you sure to exit?")) {
      if (confirm("Do you want save current note?")) await saveRecord();
      router.push(`./`);
      return;
    }
  }
  router.push(`./`);
};

onMounted(async () => {
  if (!isNew.value) await getRecord();
});

onUnmounted(async () => {
  libraryStore.setItems([]);
});
</script>

<template>
  <MainLayout class="d-flex flex-column">
    <v-card :loading="loading">
      <LibraryBar
        v-model:name="name"
        v-model:description="description"
        @exit="handleExit"
      ></LibraryBar>
      <div class="main-content border pa-5 overflow-auto d-block flex-column">
        <LibraryItem
          v-for="(item, index) of libraryStore.items"
          :key="index"
          :content="item.caption"
          :images="item.images"
          :coords="item.geocode"
        ></LibraryItem>
      </div>
      <div class="mt-auto border">
        <RichTextArea v-model:content="content" v-model:images="images" />
      </div>
      <div class="d-flex w-100">
        <p
          class="pa-2 my-auto mr-auto"
          v-if="
            libraryStore.temporalGeoCode.lat && libraryStore.temporalGeoCode.lng
          "
          v-html="
            `<b>Latitude</b>: ${libraryStore.temporalGeoCode.lat} | <b>Longitude</b>: ${libraryStore.temporalGeoCode.lng}`
          "
        ></p>
        <v-btn
          color="primary"
          class="position-relative ml-auto ma-3"
          @click="saveRecord"
        >
          Save
          <v-icon class="ml-3">mdi-send</v-icon>
        </v-btn>
      </div>
    </v-card>
    <CommonSnackbar
      :snackbar="snackbar"
      :snackColor="snackColor"
      :snackText="snackText"
    />
  </MainLayout>
</template>
<style>
.main-content {
  height: 60vh;
}
</style>
