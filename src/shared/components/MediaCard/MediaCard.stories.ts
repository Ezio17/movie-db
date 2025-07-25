import type { Meta, StoryObj } from '@storybook/vue3';
import type { AdaptedRecommendation } from '@shared/types';
import MediaCard from './MediaCard.vue';

const mockMovieWithPoster: AdaptedRecommendation = {
  id: 1,
  name: 'The Dark Knight',
  type: 'movie',
  poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  vote_average: 9.0,
  release_date: '2008-07-18',
};

const mockTvShowWithoutPoster: AdaptedRecommendation = {
  id: 2,
  name: 'Breaking Bad',
  type: 'tv',
  poster_path: null,
  vote_average: 7.5,
  release_date: '2008-01-20',
};

const mockPersonWithPoster: AdaptedRecommendation = {
  id: 3,
  name: 'Leonardo DiCaprio',
  type: 'person',
  poster_path: '/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg',
  vote_average: 8.7,
  release_date: '1974-11-11',
};

const mockMinimalDetails: AdaptedRecommendation = {
  id: 4,
  name: 'Minimal Details',
  type: 'movie',
  poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
};

const mockLongTitle: AdaptedRecommendation = {
  id: 5,
  name: 'This is a Very Long Movie Title That Should Test How the Component Handles Long Text Content',
  type: 'movie',
  poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  vote_average: 8.3,
  release_date: '2024-01-20',
};

const meta: Meta<typeof MediaCard> = {
  title: 'Shared/Components/MediaCard',
  tags: ['autodocs'],
  component: MediaCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент медіа-картки, що відображає інформацію про фільми/серіали/персони, включаючи постер, назву, рейтинг та дату виходу.',
      },
    },
  },
  argTypes: {
    mediaData: {
      description: "Об'єкт медіа-даних, що містить всю інформацію для відображення",
      control: { type: 'object' },
    },
    onClick: {
      description: 'Подія, що випромінюється при натисканні на картку',
      action: 'clicked',
    },
  },
  decorators: [
    () => ({
      template: '<div style="padding: 20px; background: #1a1a1a;"><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {
  args: {
    mediaData: mockMovieWithPoster,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Стандартна картка фільму з усіма заповненими полями даних, включаючи зображення постера, рейтинг та дату виходу.',
      },
    },
  },
};

export const TvShowWithoutPoster: Story = {
  args: {
    mediaData: mockTvShowWithoutPoster,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Картка серіалу, коли зображення постера недоступне - показує резервне зображення "не знайдено".',
      },
    },
  },
};

export const PersonCard: Story = {
  args: {
    mediaData: mockPersonWithPoster,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Картка персони, що показує інформацію про актора/режисера з їх фото, рейтингом та датою народження.',
      },
    },
  },
};

export const MinimalData: Story = {
  args: {
    mediaData: mockMinimalDetails,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Медіа-картка з мінімальними даними - показано тільки назву та постер, рейтинг і дата приховані, коли недоступні.',
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    mediaData: mockLongTitle,
  },
  parameters: {
    docs: {
      description: {
        story: 'Медіа-картка з дуже довгою назвою для демонстрації поведінки перенесення тексту.',
      },
    },
  },
};

export const GridLayout: Story = {
  render: () => ({
    components: { MediaCard },
    setup() {
      const mediaItems = [
        mockMovieWithPoster,
        mockTvShowWithoutPoster,
        mockPersonWithPoster,
        mockMinimalDetails,
        mockLongTitle,
      ];

      return { mediaItems };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 20px; padding: 20px; background: #1a1a1a; width: 100%">
        <MediaCard
          v-for="item in mediaItems"
          :key="item.id"
          :media-data="item"
          @click="() => console.log('Clicked:', item.name, 'Type:', item.type)"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Кілька медіа-карток різних типів (фільм, серіал, персона), відображених у адаптивному сітковому макеті.',
      },
    },
  },
};
