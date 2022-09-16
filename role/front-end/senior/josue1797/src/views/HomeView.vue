<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import useFetch from "../composable/useFetch";
import useLoader from "../composable/useLoading";
import { useRouter } from "vue-router";
import useSnackbar from "@/composable/useSnackbar";

// composables
const { fetchData, response, error } = useFetch("findAllFunction");
const { loading, setLoader } = useLoader();
const { showSnackbar, snackText, snackColor, snackbar } = useSnackbar();

const router = useRouter();
// variables
const libraries = ref([]);
const search = ref("");

const _libraries = computed(() => {
  if (!search.value) return libraries.value;

  return libraries.value.filter(({ name = "", description = "" }) =>
    `${name} ${description}`.toLowerCase().includes(search.value.toLowerCase())
  );
});
//methods
const redirectTo = (_id: string) => {
  router.push(`./${_id}`);
};

onMounted(async () => {
  setLoader();
  try {
    await fetchData();
    libraries.value = [...response.value];
  } catch (e: any) {
    showSnackbar({ text: `An error has occurred!`, color: "error" });
  }

  setLoader();
});
</script>

<template>
  <MainLayout class="position-relative">
    <v-card :loading="loading" class="h-100">
      <NavigationBar></NavigationBar>
      <PageHeader v-model="search"></PageHeader>
      <div class="w-100 pa-10 d-flex" v-if="!_libraries.length">
        <p class="ma-auto">Empt list</p>
      </div>
      <div v-for="(item, index) in _libraries" :key="index">
        <TravelLibraryItem
          :title="item.name"
          :subtitle="item.description"
          @click="redirectTo(item._id)"
        />
      </div>
      <v-btn color="primary" fab icon class="fab-button" to="/new">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card>
    <CommonSnackbar
      :snackbar="snackbar"
      :snackColor="snackColor"
      :snackText="snackText"
    />
  </MainLayout>
</template>

<style>
.fab-button {
  position: absolute;
  bottom: 2vh;
  right: 2vh;
}
</style>
