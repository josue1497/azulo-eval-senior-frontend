import { reactive, toRefs } from "vue";
const apiUrl = import.meta.env.VITE_BASE_API_URL;

const useFetch = (url: string, options: any = {}) => {
  const state = reactive({
    response: [],
    error: null,
  });

  const fetchData = async (_options = {}) => {
    try {
      const res = await fetch(`${apiUrl}${url}`, { ...options, ..._options });
      const json = await res.json();
      state.response = json;
    } catch (errors: any) {
      state.error = errors;
    }
  };
  return { ...toRefs(state), fetchData };
};

export default useFetch;
