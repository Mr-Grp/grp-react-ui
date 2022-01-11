import { act } from 'react-dom/test-utils';

export const findTestWrapper = (wrapper, tag) => {
  return wrapper.find(`[data-test="${tag}"]`);
};

export const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });
    wrapper.update();
  });
};
