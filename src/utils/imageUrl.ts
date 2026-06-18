import api from '../services/api';

const DEFAULT_IMAGE_HOST = 'https://scania-clube.azurewebsites.net';

/**
 * Resolve the host that serves backend images.
 *
 * Prefers the session `fileServer` when it is an absolute URL; otherwise
 * derives the host from the API base URL (dropping the trailing `/api`),
 * falling back to the production host.
 */
function imageHost(fileServer?: string | null): string {
  if (fileServer && /^https?:\/\//i.test(fileServer)) {
    return fileServer.replace(/\/+$/, '');
  }

  const derived = (api.defaults.baseURL ?? '')
    .replace(/\/api\/?$/i, '')
    .replace(/\/+$/, '');

  return derived || DEFAULT_IMAGE_HOST;
}

/**
 * Resolve a backend image path into an absolute, loadable URL.
 *
 * The API returns image paths inconsistently — absolute URLs, root-relative
 * (`/img/x.jpg`) and dot-relative (`../../img/x.jpg`). Naive `fileServer + path`
 * concatenation produced URLs like `about:///../../img/x.jpg`, which
 * `RCTImageLoader` rejects on iOS ("No suitable URL request handler found").
 *
 * Returns an empty string when there is no usable path, so callers can pass
 * the result straight to an image `uri`/`urlImage` prop.
 */
export function resolveImageUrl(
  path?: string | null,
  fileServer?: string | null,
): string {
  const raw = path?.trim();
  if (!raw) {
    return '';
  }

  // Already absolute — use as-is.
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // Drop leading `../`, `./` and `/` segments to get a clean relative path.
  const cleanPath = raw.replace(/^(?:\.\.?\/)+/, '').replace(/^\/+/, '');
  if (!cleanPath) {
    return '';
  }

  return `${imageHost(fileServer)}/${cleanPath}`;
}

/**
 * Rewrite the `src` of every `<img>` tag inside an HTML string into an
 * absolute URL.
 *
 * `react-native-render-html` renders `<img>` tags as native `<Image>`
 * components, so a relative `src` (`../../img/x.jpg`) reaches `RCTImageLoader`
 * and fails on iOS ("No suitable URL request handler found for about://...")
 * exactly like a bad `uri` prop. Run backend HTML through this before handing
 * it to a renderer.
 */
export function resolveHtmlImageSources(
  html?: string | null,
  fileServer?: string | null,
): string {
  if (!html) {
    return '';
  }

  return html.replace(
    /(<img\b[^>]*?\bsrc\s*=\s*)(["'])(.*?)\2/gi,
    (_match, prefix: string, quote: string, src: string) => {
      const resolved = resolveImageUrl(src, fileServer);
      return `${prefix}${quote}${resolved || src}${quote}`;
    },
  );
}
