import { render, screen, fireEvent } from '@testing-library/react';
import Search from './search';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Search ></Search>, div);
  ReactDOM.unmountComponentAtNode(div);
})

test('snapshot 1', () => {
  const book = [{
    title: 'JavaScript',
    Description: 'JavaScript book to begginers'
  }]
  const tree = renderer.create(<Search books={book} />).toJSON();
  expect(tree).toMatchSnapshot();
})

test('hadlerSubmit', () => {
  const handler = jest.fn(e => e.preventDefault())
  const { getByTestId } = render(
    <form onSubmit={handler} data-testid="form">
      <button type="submit">Submit</button>
    </form>,
  )
  fireEvent.submit(getByTestId('form'))
  expect(handler).toHaveBeenCalledTimes(1)
})