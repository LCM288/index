import { DateTime } from "luxon";
import { useContext, useMemo, useEffect } from "react";
import { TimerContext } from "pages/_app";

export const useLogoutTimer = (): DateTime => {
  const [timer] = useContext(TimerContext);
  return timer;
};

export const useSetLogoutTimer = (exp: number): void => {
  const [logoutTime, setLogoutTime] = useContext(TimerContext);
  const curLogoutTime = useMemo(() => DateTime.fromMillis(exp * 1000), [exp]);
  useEffect(() => {
    if (logoutTime !== curLogoutTime) {
      setLogoutTime(curLogoutTime);
    }
  }, [logoutTime, setLogoutTime, curLogoutTime]);
};
