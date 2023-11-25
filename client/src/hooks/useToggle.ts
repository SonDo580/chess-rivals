import { useCallback, useMemo, useState } from "react";

type ReturnType = [boolean, () => void, () => void];

function useToggle(initialState: boolean): ReturnType {
  const [visible, setVisible] = useState(initialState);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const value: ReturnType = useMemo(
    () => [visible, show, hide],
    [visible, show, hide]
  );

  return value;
}

export default useToggle;
