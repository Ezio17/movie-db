import type { Meta, StoryObj } from '@storybook/vue3';
import TitleWrapper from './TitleWrapper.vue';

type TitleWrapperType = typeof TitleWrapper;

const meta: Meta<TitleWrapperType> = {
  title: 'Shared/UI/Title',
  component: TitleWrapper,
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text', description: 'Вміст всередині слоту заголовка' },
  },
};

export default meta;

type Story = StoryObj<TitleWrapperType>;

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
