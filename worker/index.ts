/**
 * Edge middleware for SEO-canonical hosting.
 *
 * Every non-canonical variant (HTTP, www, index.* and extensionless index/404
 * paths) is redirected to https://sdltogo.com with a permanent 301. This gives
 * Google a single canonical URL so it stops reporting redirecting duplicates
 * as "Page with redirect" / "Alternate page with proper canonical tag".
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

const INDEX_PATHS = new Set(['/index', '/index.html', '/index.htm']);
const NOT_FOUND_PATHS = new Set(['/404', '/404.html']);

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

    if (INDEX_PATHS.has(url.pathname)) {
      url.pathname = '/';
      return Response.redirect(url.toString(), 301);
    }

    if (NOT_FOUND_PATHS.has(url.pathname)) {
      url.pathname = '/404/';
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
