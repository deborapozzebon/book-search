import Books from './books';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

test('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Books></Books>, div);
    ReactDOM.unmountComponentAtNode(div);
})

test('snapshot 1', () => {
    const book = [{
        title: 'JavaScript',
        Description: 'JavaScript book to begginers'
    }]
    const tree = renderer.create(<Books books={book}/>).toJSON();
    expect(tree).toMatchSnapshot();
})
