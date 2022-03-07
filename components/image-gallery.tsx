import styled from "styled-components";
import { useFiles } from "./files-provider";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Image = styled.img`
  max-width: 16rem;
  max-height: 16rem;
  border-radius: 1rem;
`;

export const ImageGallery = () => {
  const { files } = useFiles();

  return (
    <Container>
      {files.map((file) => (
        <div key={file}>
          <Image src={file} alt={"image"} />
        </div>
      ))}
    </Container>
  );
};
