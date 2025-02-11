/**
 * @jest-environment jsdom
 */

import { mount } from '../../../test/utils';
import { __setState } from '../../mixins/widget';
import HitsPerPage from '../HitsPerPage.vue';
import '../../../test/utils/sortedHtmlSerializer';

jest.mock('../../mixins/widget');
jest.mock('../../mixins/panel');

const defaultState = {
  items: [
    {
      label: '10 results',
      value: 10,
      default: true,
    },
    {
      label: '20 results',
      value: 20,
    },
  ],
};

const defaultProps = {
  items: [
    {
      label: '10 results',
      value: 10,
      default: true,
    },
    {
      label: '20 results',
      value: 20,
    },
  ],
};

it('accepts a transformItems prop', () => {
  __setState({ ...defaultState });

  const transformItems = () => {};

  const wrapper = mount(HitsPerPage, {
    propsData: {
      ...defaultProps,
      transformItems,
    },
  });

  expect(wrapper.vm.widgetParams.transformItems).toBe(transformItems);
});

it('renders correctly', () => {
  __setState({ ...defaultState });

  const wrapper = mount(HitsPerPage, {
    propsData: defaultProps,
  });

  expect(wrapper.html()).toMatchSnapshot();
});

it('calls `refine` with the `value` on `change`', async () => {
  __setState({
    ...defaultState,
    refine: jest.fn(),
  });

  const wrapper = mount(HitsPerPage, {
    propsData: defaultProps,
  });

  await wrapper.setData({
    selected: 20,
  });

  await wrapper.find('select').trigger('change');

  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith(20);
});
