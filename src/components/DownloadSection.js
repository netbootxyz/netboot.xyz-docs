import React, {useState} from 'react';
import clsx from 'clsx';
import DownloadCard from './DownloadCard';
import styles from './DownloadSection.module.css';
import PropTypes from 'prop-types';

const DownloadSection = ({
  title,
  description,
  downloads,
  isCollapsible = false,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    if (isCollapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={styles.downloadSection}>
      <div
        className={clsx(
          styles.sectionHeader,
          isCollapsible && styles.collapsible,
        )}
        onClick={toggleExpanded}
      >
        <h3 className={styles.sectionTitle}>{title}</h3>
        {description && (
          <p className={styles.sectionDescription}>{description}</p>
        )}
        {isCollapsible && (
          <button className={styles.toggleButton} aria-label="Toggle section">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={clsx(styles.chevron, isExpanded && styles.expanded)}
            >
              <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" />
            </svg>
          </button>
        )}
      </div>

      {(!isCollapsible || isExpanded) && (
        <div className={styles.cardsGrid}>
          {downloads.map((download, index) => (
            <DownloadCard key={index} {...download} />
          ))}
        </div>
      )}
    </div>
  );
};
DownloadSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  downloads: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCollapsible: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
};

export default DownloadSection;
