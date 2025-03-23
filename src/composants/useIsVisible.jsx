import { useEffect, useState } from 'react';

export function useIsVisible(
  refs,
  setCurrentSection = () => {},
  isObserverActive = true,
  onOffsetTopChange = () => {}
) {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    if (!isObserverActive) return;

    const observers = refs.map((ref) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.target) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting,
            }));

            if (entry.isIntersecting) {
              setCurrentSection(entry.target.id); // Mettre à jour currentSection dans le contexte
              onOffsetTopChange(entry.target.offsetTop > 300);
            }
          }
        },
        { threshold: 0.2 } // Ajuster le seuil pour modifier le début du défilement
      );

      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, [refs, setCurrentSection, isObserverActive, onOffsetTopChange]);

  return isVisible;
}
