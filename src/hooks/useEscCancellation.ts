import { DependencyList, useEffect } from "react";

export const useEscCancellation = (callback: (e: KeyboardEvent) => void, deps: DependencyList): void => {
  useEffect(() => {
    const eventCallback = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        callback(e);
      }
    };
    document.addEventListener('keyup', eventCallback);

    return () => document.removeEventListener('keyup', eventCallback)
  }, deps)
}
