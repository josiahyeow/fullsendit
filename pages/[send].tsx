import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ImageGallery } from "../components/image-gallery";

type SendProps = {
  sendId: string;
  isNew: boolean;
};

const Send: NextPage<SendProps> = ({ sendId }) => {
  return (
    <div>
      <Head>
        <title>Full send it</title>
        <meta name="description" content="Send photos in full quality" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ display: "flex", gap: "4rem" }}>
          <ImageGallery sendId={sendId} />
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { send: sendId } = context.params || {};
  return {
    props: {
      sendId,
    },
  };
};

export default Send;
