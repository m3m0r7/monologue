import { useRouter } from "next/router";
import { useMemo } from "react";

type URLParameterType = {
  isMonologue: boolean;
  isEyecatch: boolean;
  isSignIn: boolean;
  isNew: boolean;
  isTag: boolean;
  isEdit: boolean;
  id: number | null;
  tagName: string | null;
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
        isTag: false,
        isNew: false,
        isEdit: false,
        id: null,
        tagName: null,
      };
    }
    const hashValue = router.asPath.substring(pathIndex + 1)
      .replace(/^\/+/, '')
      .replace(/\?.+/, '')
      .split('/');

    const id = hashValue[1] && hashValue[1].match(/^[0-9]+$/) ? parseInt(hashValue[1]) : null;

    return {
      isTag: hashValue[0] === 'tag',
      isMonologue: hashValue[0] === 'monologue',
      isEyecatch: hashValue[2] === 'picture',
      isSignIn: hashValue[1] === 'signIn',
      isNew: !id && hashValue[1] === 'new',
      isEdit: hashValue[2] === 'edit',
      id,
      tagName: !id && hashValue[0] === 'tag' ? hashValue[1] : null,
    };
  }, [router.asPath]);
}
