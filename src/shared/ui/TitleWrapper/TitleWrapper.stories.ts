import type { Meta, StoryObj } from '@storybook/vue3';
import TitleWrapper from './TitleWrapper.vue';

const meta: Meta<typeof TitleWrapper> = {
  title: 'Shared/UI/Title',
  component: TitleWrapper,
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text', description: 'Вміст всередині слоту заголовка' },
  },
};

export default meta;

type Story = StoryObj<typeof TitleWrapper>;

export const Default: Story = {
  name: 'Default Title',
  args: {
    default: 'Recommendation',
  },
  render: (args) => ({
    components: { TitleWrapper },
    setup() {
      return { args };
    },
    template: '<TitleWrapper>{{ args.default }}</TitleWrapper>',
  }),
};
