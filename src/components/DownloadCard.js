import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './DownloadCard.module.css';

const DownloadCard = ({
  title,
  description,
  url,
  type,
  isRecommended = false,
  icon,
}) => {
  return (
    <div
      className={clsx(styles.downloadCard, isRecommended && styles.recommended)}
    >
      {isRecommended && (
        <div className={styles.recommendedBadge}>Recommended</div>
      )}

      <div className={styles.cardHeader}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.type}>{type}</span>
      </div>

      <p className={styles.description}>{description}</p>

      <a
        className={styles.downloadButton}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${title}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
        Download
      </a>
    </div>
  );
};
DownloadCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isRecommended: PropTypes.bool,
  icon: PropTypes.node,
};

export default DownloadCard;
