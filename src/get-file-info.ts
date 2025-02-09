const extractPathFromStackLine = (stackLine: string): string => {
  const urlMatch = stackLine.match(/\((https?:\/\/.+?):\d+:\d+\)/);
  if (!urlMatch) return "unknown";

  try {
    const url = new URL(urlMatch[1]);
    const pathSegments = url.pathname.split("/").filter((seg) => seg !== "");
    if (pathSegments.length === 0) return "unknown";
    return "/" + pathSegments.slice(0, -1).join("/");
  } catch (error) {
    return "unknown";
  }
};

// While in expo development mode, this funcion produces something like:
// "/app/(tabs)/explore.bundle"
export const getFileInfo = (depth: number = 3): string => {
  const err = new Error();
  if (!err.stack) return "unknown";
  const stackLines = err.stack.split("\n");
  const line = stackLines[depth] || "";
  return extractPathFromStackLine(line);
};
