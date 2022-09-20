import { useRouter } from "next/router";
import { useMemo } from "react";

type URLParameterType = {
  isMonologue: boolean;
  isEyecatch: boolean;
  isSignIn: boolean;
  isNew: boolean;
  isEdit: boolean;
  id: number | null;
}

export const useURLParameter = (): URLParameterType => {
  const router = useRouter();
  const pathIndex = router.asPath.indexOf('#');
  return useMemo(() => {
    if (pathIndex === -1) {
      return {
        isMonologue: false,
        isEyecatch: false,
        isSignIn: false,
        isNew: false,
        isEdit: false,
        id: null,
      };
    }
    const hashValue = router.asPath.substring(pathIndex + 1)
      .replace(/^\/+/, '')
      .replace(/\?.+/, '')
      .split('/');

    return {
      isMonologue: hashValue[0] === 'monologue',
      isEyecatch: hashValue[2] === 'picture',
      isSignIn: hashValue[1] === 'signIn',
      isNew: hashValue[1] === 'new',
      isEdit: hashValue[2] === 'edit',
      id: hashValue[1] ? parseInt(hashValue[1]) : null,
    };
  }, [router.asPath]);
}
