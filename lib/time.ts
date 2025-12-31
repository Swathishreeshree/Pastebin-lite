import "server-only";
import { headers } from "next/headers";

export async function nowMs(): Promise<number> {
  if (process.env.TEST_MODE === "1") {
    const h = await headers();
    const testNow = h.get("x-test-now-ms");
    if (testNow) {
      const parsed = Number(testNow);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }
  return Date.now();
}
