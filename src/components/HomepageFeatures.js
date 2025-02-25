import React, { Suspense, lazy } from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

const ThemedImage = lazy(() => import("@theme/ThemedImage"));

// List of features to be displayed on the homepage
const FeatureList = [
  {
    title: "Simple to Use",
    Svg: ["./img/nbxyz-user.svg", "./img/nbxyz-user.svg"],
    description: (
      <>
        netboot.xyz enables you to boot into many types of operating systems
        using lightweight tooling to get you up and running as soon as possible.
      </>
    ),
  },
  {
    title: "Evaluate, Install, Rescue",
    Svg: ["./img/nbxyz-laptop.gif", "./img/nbxyz-laptop.gif"],
    description: (
      <>
        Discover new operating systems without having to download and rewrite
        media over and over again. Rescue operating systems from a single image.
        An essential for any sysadmin.
      </>
    ),
  },
  {
    title: "Powered by the iPXE project",
    Svg: ["./img/ipxechip.svg", "./img/ipxechip.svg"],
    description: (
      <>
        netboot.xyz uses the iPXE project to enable you to provision, rescue or
        load into a live boot environment leveraging the Preboot Execution
        Environment (PXE) on most systems.
      </>
    ),
  },
];

// LazyImage component to lazy load images
const LazyImage = ({ sources, alt, className }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ThemedImage sources={sources} alt={alt} className={className} />
  </Suspense>
);

// Feature component to display individual features
function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <LazyImage
          sources={{
            light: useBaseUrl(Svg[0]),
            dark: useBaseUrl(Svg[1]),
          }}
          alt="logo"
          className={styles.featureSvg}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
