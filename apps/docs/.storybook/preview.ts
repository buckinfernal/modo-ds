import type { Preview } from '@storybook/react';
import '@modo/tokens/css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { config: { rules: [] } },
  },
};

export default preview;
