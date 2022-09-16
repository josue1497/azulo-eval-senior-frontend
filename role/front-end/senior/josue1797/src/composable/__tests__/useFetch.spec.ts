import { beforeEach, describe, expect, test, vi } from "vitest";
import useFetch from "../useFetch";

import createFetchMock from "vitest-fetch-mock";

const fetchMock = createFetchMock(vi);
const { response, error, fetchData } = useFetch("findAllFunction", {});

describe("useLoader", () => {
  beforeEach(async () => {
    fetchMock.doMock();
  });

  test("Fetch data", async () => {
    await fetchData();
    expect(response.value).toBeInstanceOf(Array);
  });
});
