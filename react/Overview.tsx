import React, { useEffect, useRef, useState } from "react";
import { Link, canUseDOM } from "vtex.render-runtime";
// @ts-ignore
import { useProduct } from 'vtex.product-context';

// Styles
import styles from "./styles.css";

export interface OverviewProps {
  blockClass: string;
}

const Overview: StorefrontFunctionComponent<OverviewProps> = ({ }) => {
  const productContextValue = useProduct();
  const [overview, setOverview] = useState<string>("");

  useEffect(() => {
    getOverview();
  }, []);

  const getOverview = () => {
    const productInfo = productContextValue.product;
    if (!productInfo) return;

    const items = productInfo.items;
    if (!items.length) return;

    const overview = items[0].complementName;
    const overviewHasMarkdown = overview.includes("<div");

    if (overviewHasMarkdown) setOverview(overview);
  }

  return (<>
    {
      overview && <div className={styles.container} dangerouslySetInnerHTML={{ __html: overview }} />
    }
  </>);
};

Overview.schema = {
  title: "Overview",
  description: "",
  type: "object",
  properties: {

  }
};

export default Overview;
