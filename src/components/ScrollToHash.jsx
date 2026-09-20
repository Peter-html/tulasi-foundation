import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Reusable component to handle both scroll-to-top on page transitions
 * and smooth scrolling to anchor hashes (e.g. /#about, /#projects, /#contact).
 */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToTarget = () => {
        try {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            return true;
          }
        } catch {
          // Invalid selector
        }
        return false;
      };

      // Attempt immediately
      if (!scrollToTarget()) {
        // Retry with short timeouts to account for route mounting/transitions
        const t1 = setTimeout(scrollToTarget, 80);
        const t2 = setTimeout(scrollToTarget, 200);
        const t3 = setTimeout(scrollToTarget, 450);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
    } else {
      // Normal route transition without hash -> scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    return undefined;
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
