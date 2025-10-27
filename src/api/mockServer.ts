if (typeof window !== 'undefined' && import.meta.env.DEV) {
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

    if (url.endsWith('/api/leads') && init?.method?.toUpperCase() === 'POST') {
      const bodyText = init.body ? init.body.toString() : '';
      try {
        const payload = bodyText ? JSON.parse(bodyText) : undefined;
        console.log('Mock lead submission', payload);
      } catch (error) {
        console.error('Failed to parse mock payload', error);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      return new Response(null, { status: 200 });
    }

    return originalFetch(input, init);
  };
}
