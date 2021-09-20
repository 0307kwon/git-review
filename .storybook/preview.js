import { configure, addDecorator } from "@storybook/react";
import ModalProvider from "../src/context/modalProvider/ModalProvider";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ModalProvider>
      <Story />
    </ModalProvider>
  ),
];
