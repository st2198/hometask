import React from 'react';
import { render, screen, within, cleanup, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from '.';
import store from '../../store';
import { State } from '../../types/ActivityLogEntry';
import { initialState } from '../../store/slices/activityLogSlice';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('App', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(cleanup);

  const typeInTextbox = async (text: string) => {
    const input = screen.getByRole('textbox');
    await act(async () => {
      userEvent.type(input, text);
    });
    return input;
  };

  test('renders App component', () => {
    expect(screen.getByPlaceholderText(/Add note about ABC/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('allows users to input a message', async () => {
    await typeInTextbox('Meeting with client');
    expect(await screen.findByText(/Meeting with client/)).toBeInTheDocument();
  });

  test('submits a new activity log', async () => {
    await typeInTextbox('Meeting with client');
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    expect(screen.getByText(/Meeting with client/i)).toBeInTheDocument();
  });

  test('allows users to select an activity type', async () => {
    await typeInTextbox('Meeting with client');
    const radioButton = within(screen.getByTestId('message')).getByRole('radio');
    act(() => {
      userEvent.click(radioButton);
    });
    expect(radioButton).toBeChecked();
  });

  test('allows users to remove an activity type', async () => {
    const activities = await screen.findAllByText(/Milton Romaguera/);
    const closestDiv = activities[0].closest('div');

    if (!closestDiv) throw new Error('Unable to find the closest div element.');

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
  });

  test('saves state to localStorage when the store updates', async () => {
    const input = screen.getByRole('textbox');
    const newMessage = 'New message';

    await act(async () => {
      fireEvent.change(input, { target: { value: newMessage } });
    });

    const expectedState: State = {
      ...initialState,
      currentActivityLog: {
        message: newMessage,
        type: initialState.currentActivityLog.type
      },
    };
    expect(localStorageMock.setItem).toHaveBeenCalledWith('state', JSON.stringify(expectedState));
  });
});
