import { trace } from "@opentelemetry/api";

export const tracer = trace.getTracer("backend-performance-lab", "1.0.0");
