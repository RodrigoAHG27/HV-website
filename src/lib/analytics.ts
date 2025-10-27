export function track(event: string, payload?: Record<string, unknown>): void {
  if (typeof window === 'undefined') {
    return;
  }

  const data = payload ? { event, ...payload } : { event };
  console.debug('[analytics]', data);

  if (Array.isArray((window as typeof window & { dataLayer?: unknown[] }).dataLayer)) {
    (window as typeof window & { dataLayer: unknown[] }).dataLayer.push(data);
  }
}
