import React, {useState} from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import {translate} from '@docusaurus/Translate';

// Helper function to extract text from React children
const getTextContent = (children) => {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }
  if (children?.props?.children) {
    return getTextContent(children.props.children);
  }
  return String(children || '');
};

export default function CodeBlockWrapper(props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const textContent = getTextContent(props.children);
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
      // Fallback for older browsers or when clipboard API fails
      try {
        const textArea = document.createElement('textarea');
        textArea.value = getTextContent(props.children);
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        console.error('Copy to clipboard failed:', fallbackError);
      }
    }
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
