import { useRouter } from "next/router";

type HashType = {
  isMonologue: boolean;
  isEyecatch: boolean;
  id: string | null;
}

export const useHash = (): HashType => {
  const router = useRouter();
  const pathIndex = router.asPath.indexOf('#');
  if (pathIndex === -1) {
    return {
      isMonologue: false,
      isEyecatch: false,
      id: null,
    };
  }
  const hashValue = router.asPath.substring(pathIndex + 1).replace(/^\/+/, '').split('/');

  return {
    isMonologue: hashValue[0] === 'monologue',
    isEyecatch: hashValue[2] === 'picture',
    id: hashValue[1] ?? null,
  };
}
