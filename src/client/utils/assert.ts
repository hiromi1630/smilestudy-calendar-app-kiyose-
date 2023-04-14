export function assert(
  condition: unknown,
  message?: string,
): asserts condition {
  if (condition === undefined || condition === null || condition === false)
    throw new Error(message || 'Assertion failed');
}
