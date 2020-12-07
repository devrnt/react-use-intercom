import React from "react";
import { useIntercom } from "react-use-intercom";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => {
  const { boot } = useIntercom();

  return (
    <Layout>
      <SEO title="Home" />
      <button onClick={() => boot()}>Boot</button>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div
        style={{
          maxWidth: `300px`,
          marginBottom: `1.45rem`,
        }}
      >
        <Image />
      </div>
    </Layout>
  );
};

export default IndexPage;
