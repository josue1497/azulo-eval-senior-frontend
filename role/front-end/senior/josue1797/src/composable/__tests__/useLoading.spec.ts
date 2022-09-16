import { expect, test } from "vitest";
import useLoader from "../useLoading";

test("useLoader", () => {
  const { setLoader, loading } = useLoader();
  expect(loading.value).toBe(false);

  setLoader();
  expect(loading.value).toBe(true);
});
