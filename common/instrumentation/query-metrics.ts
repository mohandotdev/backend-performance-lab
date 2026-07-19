class QueryMetrics {
  private queries = 0;
  private totalDuration = 0;
  private slowQueries = 0;

  increment() {
    this.queries++;
  }

  reset() {
    this.queries = 0;
  }

  getCount() {
    return this.queries;
  }
}

console.log("QueryMetrics instance created");

export const queryMetrics = new QueryMetrics();
