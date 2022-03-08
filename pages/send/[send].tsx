import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Zap } from "react-feather";
import styled from "styled-components";
import { FilesProvider, useFiles } from "../../components/files-provider";
import { ImageGallery } from "../../components/image-gallery";
import { Loading } from "../../components/loading";
import { SharePanel } from "../../components/share-panel";
import { UploadDropZone } from "../../components/upload-dropzone";

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

const SendPage: NextPage<SendProps> = ({ sendId }) => {
  return (
    <div>
      <Head>
        <title>Full send it</title>
        <meta name="description" content="Send photos in full quality" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <FilesProvider sendId={sendId}>
          <Send />
        </FilesProvider>
      </Main>
    </div>
  );
};

const Spacer = styled.div`
  padding: 2rem;
`;

const Send = () => {
  const { files, loading } = useFiles();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {!files.length && <NoPhotos />}
      {!!files.length && (
        <>
          <ImageGallery />
          <Spacer />
          <SharePanel />
        </>
      )}
    </>
  );
};

const Layout = styled.div`
  display: grid;
`;

const H1 = styled.h1`
  font-family: "Syne", sans-serif;
`;

const Pitch = styled.p`
  font-family: "DM Sans", sans-serif;
`;
const NoPhotos = () => {
  return (
    <Layout>
      <div>
        <H1>
          fullsendit <Zap />
        </H1>
        <Pitch>
          No AirDrop? Easily share full quality photos between iOS, Android or
          any device.
        </Pitch>
        <Pitch>
          Simply select the photos you want to send and share the link.
        </Pitch>
        <Pitch>
          <i>Say goodbye to potato quality photos</i> 👋 🥔
        </Pitch>
      </div>
      <UploadDropZone />
    </Layout>
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

export default SendPage;
