import { GrowthBook } from "@growthbook/growthbook";
import { autoAttributesPlugin } from "@growthbook/growthbook/plugins";

export const growthbook = new GrowthBook({
  apiHost: "http://localhost:3100",
  clientKey: "sdk-KgBtcNISptNhy5i",
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    // This is where you would send an event to your analytics provider
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key,
    });
  },
  plugins: [autoAttributesPlugin()],
});
