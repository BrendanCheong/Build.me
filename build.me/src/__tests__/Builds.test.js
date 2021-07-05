import Builds from '../pages/Builds';
import BuildPart from '../components/BuildPageComp/BuildPart';
import ContextData from '../pages/Builds';
import { render, fireEvent, cleanup, waitFor, act } from '@testing-library/react';

let container
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

test('BuildCard properly renders', async () => {

    const { getByTitle } = render(

        <Builds/>
    )
    const AddBuild = getByTitle('Add Build');
    fireEvent.click(AddBuild);
})