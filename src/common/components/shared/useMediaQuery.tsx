import { useCallback, useEffect, useState } from "react";

export default function useMediaQuery() {
  const [size, setSize] = useState<{ width: number; height: number }>();

  const handleSetSize = useCallback(() => {
    setSize(calculateSize());
  }, []);

  const calculateSize = () => {
    return {
      width: Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      ),
      height: Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      ),
    };
  };

  useEffect(() => {
    window.addEventListener("resize", handleSetSize);
    setSize(calculateSize());
    return () => {
      window.removeEventListener("resize", handleSetSize);
    };
  }, [handleSetSize]);

  return [size];
}
