import { useFetch } from 'nuxt/app';

interface PersonInfo {
  name: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  biography: string;
  profile_path: string | null;
  also_known_as: string[];
}

const usePersonInfo = (id: string) => {
  return useFetch<PersonInfo>(`/api/person/${id}`, {
    pick: [
      'name',
      'birthday',
      'deathday',
      'place_of_birth',
      'biography',
      'profile_path',
      'also_known_as',
    ],
  });
};

export default usePersonInfo;
