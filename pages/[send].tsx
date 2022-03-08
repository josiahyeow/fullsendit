import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { FilesProvider, useFiles } from "../components/files-provider";
import { ImageGallery } from "../components/image-gallery";
import { Loading } from "../components/loading";

type SendProps = {
  sendId: string;
};

const Main = styled.main`
  padding: 2rem;
  padding-bottom: 8rem;
  margin: auto;
  max-width: 60rem;
  min-height: 100vh;
  display: grid;
  gap: 4rem;
`;

const ViewPage: NextPage<SendProps> = ({ sendId }) => {
  return (
    <div>
      <Head>
        <title>Full send it</title>
        <meta name="description" content="Send photos in full quality" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <FilesProvider sendId={sendId}>
          <View />
        </FilesProvider>
      </Main>
    </div>
  );
};

const View = () => {
  const { loading } = useFiles();

  if (loading) {
    return <Loading />;
  }

  return <ImageGallery />;
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

export default ViewPage;
