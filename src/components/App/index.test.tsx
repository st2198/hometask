import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from '.';
import { Provider } from 'react-redux';
import store from '../../store';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
  
describe('App', () => {
  afterEach(cleanup);
  test('renders App component', () => {
    render(<Provider store={store}>
      <App />
    </Provider>);

    expect(screen.getByPlaceholderText(/Add note about ABC/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('allows users to input a message', async () => {
    render(<Provider store={store}><App /></Provider>);
    const input = screen.getByRole('textbox');
    
    act(() => {
      userEvent.type(input, 'Meeting with client', {delay: 1});
    })

    await waitFor(async() => {
      expect(await screen.findByText(/Meeting with client/)).toBeInTheDocument();
    });
  });

  test('submits a new activity log', () => {
    render(<Provider store={store}><App /></Provider>);
    const input = screen.getByRole('textbox');

    act(() => {
      userEvent.type(input, 'Meeting with client');
      userEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    // Check if the new activity is added to the timeline
    expect(screen.getByText(/Meeting with client/i)).toBeInTheDocument();
  });

  test('allows users to select an activity type', () => {
    render(<Provider store={store}><App /></Provider>);
    const input = screen.getByRole('textbox');

    act(() => {
      userEvent.type(input, 'Meeting with client');
    });

    const radioButton = within(screen.getByTestId('phone')).getByRole('radio');

    act(() => {
      userEvent.click(radioButton);
    });

    expect(radioButton).toBeChecked();
  });


  test('allows users to remove an activity type', async () => {
    render(<Provider store={store}><App /></Provider>);

    const activities = await screen.findAllByText(/Milton Romaguera/);
    const closestDiv = activities[0].closest('div');

    if (closestDiv) {
      const menuMoreButtons = await within(closestDiv).findByRole('button');
      
      act(() => {
        userEvent.click(menuMoreButtons);
      });
  
      const deleteOption = await screen.findByText(/Delete/);
  
      act(() => {
        userEvent.click(deleteOption);
      });
  
      const remainingActivities = await screen.findAllByText(/Milton Romaguera/);

      expect(remainingActivities.length).toEqual(activities.length - 1);
    } else {
      throw new Error('Unable to find the closest div element.');
    }
  });


      

})