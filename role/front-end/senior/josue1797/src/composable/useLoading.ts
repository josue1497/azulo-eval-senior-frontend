import { ref } from "vue";
const useLoader = () => {
  const loading = ref(false);
  function setLoader() {
    loading.value = !loading.value;
  }
  return { loading, setLoader };
};

export default useLoader;
