export const telemetryConfig = {
  serviceName: process.env.OTEL_SERVICE_NAME ?? "backend-performance-lab",
  serviceVersion: "1.0.0",

  exporter: {
    endpoint:
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT ??
      "http://localhost:4318/v1/traces",
  },
};

console.log("OTEL_SERVICE_NAME =", process.env.OTEL_SERVICE_NAME);
console.log("OTEL_SERVICE_NAME =", process.env.OTEL_EXPORTER_OTLP_ENDPOINT);
