import { useRouter } from "next/router";

type URLParameterType = {
  isMonologue: boolean;
  isEyecatch: boolean;
  isNew: boolean;
  isEdit: boolean;
  id: string | null;
}

export const useURLParameter = (): URLParameterType => {
  const router = useRouter();
  const pathIndex = router.asPath.indexOf('#');
  if (pathIndex === -1) {
    return {
      isMonologue: false,
      isEyecatch: false,
      isNew: false,
      isEdit: false,
      id: null,
    };
  }
  const hashValue = router.asPath.substring(pathIndex + 1).replace(/^\/+/, '').split('/');

  return {
    isMonologue: hashValue[0] === 'monologue',
    isEyecatch: hashValue[2] === 'picture',
    isNew: hashValue[1] === 'new',
    isEdit: hashValue[2] === 'edit',
    id: hashValue[1] ?? null,
  };
}
