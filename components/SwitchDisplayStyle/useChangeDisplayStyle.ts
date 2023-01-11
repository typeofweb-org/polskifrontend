import { useRouter } from 'next/navigation';

export const useChangeDisplayStyle = () => {
  const router = useRouter();

  const changeDisplayToGrid = () => {
    router.push('/grid');
  };

  const changeDisplayToList = () => {
    router.push('/list');
  };

  return {
    changeDisplayToGrid,
    changeDisplayToList,
  };
};
