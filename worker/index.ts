/**
 * Edge middleware for SEO-canonical hosting.
 * Redirects www / HTTP alternates to https://sdltogo.com so Google indexes
 * one URL instead of "Alternate page with proper canonical tag".
 */

const CANONICAL_HOST = 'sdltogo.com';

export interface Env {
  ASSETS: Fetcher;
}

function isLocalOrPreviewHost(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.workers.dev') ||
    hostname.endsWith('.local')
  );
}

function securityHeaders(base: Headers): Headers {
  const headers = new Headers(base);
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return headers;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    const needsHostRedirect = !isLocalOrPreviewHost(host) && host !== CANONICAL_HOST;
    const needsHttpsRedirect = url.protocol === 'http:';

    if (needsHostRedirect || needsHttpsRedirect) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/index.html' || url.pathname === '/index.htm') {
      url.pathname = '/';
      return Response.redirect(url.toString(), 301);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers: securityHeaders(assetResponse.headers),
    });
  },
};
