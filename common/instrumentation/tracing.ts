import { NodeSDK } from "@opentelemetry/sdk-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";

import { telemetryConfig } from "./config";

const traceExporter = new OTLPTraceExporter({
  url: telemetryConfig.exporter.endpoint,
});

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: telemetryConfig.serviceName,
    [ATTR_SERVICE_VERSION]: telemetryConfig.serviceVersion,
  }),

  traceExporter,

  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),

    new PgInstrumentation(),
  ],
});

sdk.start();

console.log("OpenTelemetry initialized!!!");

process.on("SIGTERM", async () => {
  await sdk.shutdown();
  console.log("OpenTelemetry terminated :)");
});
