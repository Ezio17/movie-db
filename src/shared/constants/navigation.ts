const navigation = [
  {
    name: 'movie',
    link: '/movie?endpoint=popular',
  },
  {
    name: 'serial',
    link: '/tv?endpoint=top_rated',
  },
  {
    name: 'actors',
    link: '/person?endpoint=popular',
  },
  {
    name: 'contacts',
    link: '#contacts',
  },
] as const;

export default navigation;
