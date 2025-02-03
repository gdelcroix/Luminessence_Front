import { useEffect, useState } from 'react';

export function useIsVisible(ref, setCurrentSection = () => {}, isObserverActive = true, onOffsetTopChange = () => {}) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!isObserverActive) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.target) {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id); // Mettre à jour currentSection dans le contexte
            if (entry.target.offsetTop > 300) {
              onOffsetTopChange(true);
            } else {
              onOffsetTopChange(false);
            }
          }
          setIntersecting(entry.isIntersecting);
        }
      },
      { threshold: 0.2 }
    ); // Ajustez le seuil

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, setCurrentSection, isObserverActive]);

  return isIntersecting;
}

