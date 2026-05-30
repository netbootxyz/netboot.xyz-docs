// Guarantee `window.gtag` is always callable.
//
// The Google Analytics plugin only injects its inline `gtag` bootstrap in
// production builds, yet its route-change client module calls `window.gtag(...)`
// on every navigation. When the analytics script is blocked (ad blockers,
// offline, privacy extensions) or the page is viewed outside that injection,
// the call throws "window.gtag is not a function" and trips Docusaurus's error
// overlay. Defining a no-op fallback at client bootstrap makes the call safe in
// every mode. It runs before any route update, and the `typeof` guard means it
// never clobbers the real gtag once the production snippet has defined it.

if (typeof window !== 'undefined' && typeof window.gtag !== 'function') {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
}
