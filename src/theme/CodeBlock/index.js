import React, {useState} from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import {translate} from '@docusaurus/Translate';

export default function CodeBlockWrapper(props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textContent = props.children;
    navigator.clipboard.writeText(textContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{position: 'relative'}}>
      <CodeBlock {...props} />
      <button
        type="button"
        aria-label={translate({
          id: 'theme.CodeBlock.copyButtonAriaLabel',
          message: 'Copy code to clipboard',
        })}
        className="clean-btn copy-code-button"
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          padding: '0.25rem 0.5rem',
          backgroundColor: 'var(--ifm-color-secondary)',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '0.25rem',
          color: 'var(--ifm-color-emphasis-800)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onClick={copyToClipboard}
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </button>
    </div>
  );
}
