import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Easy to Use',
    imageUrl: 'img/nbxyz-logo.svg',
    description: (
      <>
        netboot.xyz enables you to boot into many types of operating systems using lightweight tooling to get you up and 
        running as soon as possible.
      </>
    ),
  },
  {
    title: 'Evaluate, Install, Rescue',
    imageUrl: 'img/nbxyz-logo.svg',
    description: (
      <>
        Discover new operating systems without having to download and rewrite media over and over again.  Rescue operating
	systems with a single tool. An essential for any sysadmin.
      </>
    ),
  },
  {
    title: 'Powered by the iPXE project',
    imageUrl: 'img/ipxe-logo.svg',
    description: (
      <>
        netboot.xyz uses the iPXE project to enable you to provision, rescue or load into a live boot environment leveraging the 
        the Preboot Execution Environment (PXE) on most systems.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title} | your favorite operating systems in one place`}
      description="netboot.xyz enables you to PXE boot Operating System installers and utilities from a simple to use menu based on the iPXE project.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
