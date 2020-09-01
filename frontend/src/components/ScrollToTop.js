import { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation()

  // Only scroll when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null
};

export default withRouter(ScrollToTop);
