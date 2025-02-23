import { render, screen } from '@testing-library/react';
import Form from '../src/components/Form';

test('renders learn react link', () => {
  render(<Form />);
  expect(screen.getByText("Form")).toBeInTheDocument();
});
