import React from 'react';
import { render } from '@testing-library/react';

import Layout from './Layout';

test('renders the Layout component', () => {
  const { container } = render(<Layout />);
  const mainElement = container.querySelector('main.App');

  expect(mainElement).toBeInTheDocument();
});
