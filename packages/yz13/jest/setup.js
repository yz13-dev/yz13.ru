// Adds a DOMException polyfill
process.env.NEXT_PUBLIC_SITE_URL = "https://www.yz13.space"
//
// The polyfill is necessary to use AbortController in node v16 by our tests.
// AbortController itself is used when calling fetchMock.mockAbortOnce().
if ( !globalThis.DOMException ) {
  require( 'node-domexception' );
}