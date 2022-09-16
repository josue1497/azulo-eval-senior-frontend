import { expect, test } from "vitest";
import useSnackbar from "../useSnackbar";

test("useSnackbar", () => {
  const { showSnackbar, snackText, snackColor, snackbar } = useSnackbar();
  expect(snackText.value).toBe("default");
  expect(snackColor.value).toBe("default");
  expect(snackbar.value).toBe(false);

  showSnackbar({ text: "Message" });
  expect(snackText.value).toBe("Message");
  expect(snackColor.value).toBe("success");
  expect(snackbar.value).toBe(true);
});
