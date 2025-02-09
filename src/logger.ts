import { getFileInfo } from "./get-file-info";

export const logger = (message: string) => {
  const path = getFileInfo(3);
  console.log("MY LOGGER", { path, message });
};
