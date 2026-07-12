// Artificial delay to simulate network latency — remove once a real API is connected.
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
