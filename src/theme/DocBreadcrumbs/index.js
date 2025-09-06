import React from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';

export default function DocBreadcrumbsWrapper(props) {
  return (
    <div style={{marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--ifm-color-emphasis-200)'}}>
      <DocBreadcrumbs {...props} />
    </div>
  );
}