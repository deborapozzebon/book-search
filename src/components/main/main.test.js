import { render, screen, fireEvent } from '@testing-library/react';
import Main from './main';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

test('books search', () => {
  render(<Main />);
  const linkElement = screen.getByText(/Books Search/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Main></Main>, div);
  ReactDOM.unmountComponentAtNode(div);
})

test('input and button', () => {
  render(<Main />);
  const input = screen.getByTestId("search-input");
  const button = screen.getByTestId("search-button");
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('snapshot 2', () => {
  const tree = renderer.create(<Main />).toJSON();
  expect(tree).toMatchSnapshot();
})