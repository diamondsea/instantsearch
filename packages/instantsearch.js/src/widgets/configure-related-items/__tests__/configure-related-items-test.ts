import configureRelatedItems from '../configure-related-items';
import type { ConfigureRelatedItemsConnectorParams } from '../../../connectors/configure-related-items/connectConfigureRelatedItems';
import connectConfigureRelatedItems from '../../../connectors/configure-related-items/connectConfigureRelatedItems';
import { castToJestMock } from '@instantsearch/testutils/castToJestMock';

jest.mock(
  '../../../connectors/configure-related-items/connectConfigureRelatedItems'
);

describe('configureRelatedItems', () => {
  test('forwards the options to the connector', () => {
    const makeWidget = jest.fn();
    castToJestMock(connectConfigureRelatedItems).mockImplementationOnce(
      () => makeWidget
    );

    const widgetParams: ConfigureRelatedItemsConnectorParams = {
      hit: { objectID: '1' },
      matchingPatterns: {},
      transformSearchParameters: (x) => x,
    };

    configureRelatedItems(widgetParams);

    expect(connectConfigureRelatedItems).toHaveBeenCalledTimes(1);
    expect(makeWidget).toHaveBeenCalledTimes(1);
    expect(makeWidget).toHaveBeenCalledWith(widgetParams);
  });
});
