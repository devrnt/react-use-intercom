import { useIntercomContext } from './provider';

export const useIntercom = () => {
  const methods = useIntercomContext();

  return methods;
};
