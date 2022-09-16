import { ref } from "vue";

const useSnackbar = () => {
  const snackText = ref("default");
  const snackColor = ref("default");
  const snackbar = ref(false);

  function showSnackbar({ text = "", color = "success" }) {
    snackColor.value = color;
    snackText.value = text;
    snackbar.value = true;
  }

  return { showSnackbar, snackText, snackColor, snackbar };
};

export default useSnackbar;
