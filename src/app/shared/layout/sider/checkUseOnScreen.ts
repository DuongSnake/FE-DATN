import { useEffect, useState } from 'react';

export function useOnScreen(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting));

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    } else {
      setIsIntersecting(false);
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
