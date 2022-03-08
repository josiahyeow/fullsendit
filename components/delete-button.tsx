import { Trash } from "react-feather";
import { useFiles } from "./files-provider";
import { CircleButton } from "./share-panel";

export const DeleteButton = () => {
  const { dispose } = useFiles();
  return (
    <CircleButton onClick={dispose}>
      <Trash />
    </CircleButton>
  );
};
