import React from 'react';
import Head from '@docusaurus/Head';

// Emits Schema.org JSON-LD into <head>. Accepts a single schema object or an
// array of them; each is rendered as its own <script type="application/ld+json">.
// SSR-safe — Docusaurus's Head renders it into the prerendered HTML.
export default function StructuredData({data}) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <Head>
      {items.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Head>
  );
}
