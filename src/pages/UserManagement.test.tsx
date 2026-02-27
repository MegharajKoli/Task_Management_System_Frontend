import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserManagement from './UserManagement';
import userReducer, { fetchUsers, createUser } from '../store/userSlice';

vi.mock('../store/userSlice', async () => {
  const actual = await vi.importActual<typeof import('../store/userSlice')>('../store/userSlice');
  
  return {
    ...actual,
    fetchUsers: vi.fn().mockImplementation(() => async () => {
      return { type: 'users/fetchUsers/fulfilled', payload: [] };
    }),
    createUser: vi.fn().mockImplementation((user) => async () => {
      return { 
        type: 'users/createUser/fulfilled', 
        payload: { ...user, _id: 'mocked-id', createdAt: new Date().toISOString() } 
      };
    }),
  };
});

const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: {
      users: userReducer,
    },
    preloadedState: initialState, 
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

describe('UserManagement Component', () => {
  let store: ReturnType<typeof createTestStore>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
    user = userEvent.setup();
  });

  it('renders header and "New User" button', () => {
    render(
      <Provider store={store}>
        <UserManagement />
      </Provider>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Users');
    expect(screen.getByRole('button', { name: /\+ New User/i })).toBeInTheDocument();
  });

  it('shows loading state when users are being fetched', async () => {
    // Mock pending state
    vi.mocked(fetchUsers).mockReturnValueOnce({
      type: 'users/fetchUsers/pending',
      payload: undefined,
      meta: { requestId: '123', arg: undefined },
    } as any);

    render(
      <Provider store={store}>
        <UserManagement />
      </Provider>
    );

    // trigger fetch
    store.dispatch(fetchUsers());

    expect(await screen.findByText('Loading users...')).toBeInTheDocument();
  });

  it('shows "No users found" when users array is empty', async () => {
    render(
      <Provider store={store}>
        <UserManagement />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No users found')).toBeInTheDocument();
    });
  });

  describe('Create User Form', () => {
    it('opens and closes form when clicking New User / Cancel', async () => {
      render(
        <Provider store={store}>
          <UserManagement />
        </Provider>
      );

      await user.click(screen.getByRole('button', { name: /\+ New User/i }));

      expect(screen.getByText('Create New User')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /Cancel/i }));

      expect(screen.queryByText('Create New User')).not.toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
      render(
        <Provider store={store}>
          <UserManagement />
        </Provider>
      );

      await user.click(screen.getByRole('button', { name: /\+ New User/i }));

      await user.click(screen.getByRole('button', { name: /Create User/i }));

      //  — we check that inputs are invalid
      const nameInput = screen.getByLabelText(/Name \*/i);
      const emailInput = screen.getByLabelText(/Email \*/i);
      const contactInput = screen.getByLabelText(/Contact \*/i);
      const passwordInput = screen.getByLabelText(/Password \*/i);

      expect(nameInput).toBeInvalid();
      expect(emailInput).toBeInvalid();
      expect(contactInput).toBeInvalid();
      expect(passwordInput).toBeInvalid();
    });

    it('submits form with valid data and resets form on success', async () => {
      render(
        <Provider store={store}>
          <UserManagement />
        </Provider>
      );

      await user.click(screen.getByRole('button', { name: /\+ New User/i }));

      await user.type(screen.getByLabelText(/Name \*/i), 'John Doe');
      await user.type(screen.getByLabelText(/Email \*/i), 'john.doe@example.com');
      await user.type(screen.getByLabelText(/Contact \*/i), '9876543210');
      await user.type(screen.getByLabelText(/Password \*/i), 'secure123');

      const createButton = screen.getByRole('button', { name: /Create User/i });
      await user.click(createButton);

      await waitFor(() => {
        expect(vi.mocked(createUser)).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'John Doe',
            email: 'john.doe@example.com',
            contact: '9876543210',
            password: 'secure123',
          })
        );
      });
      await user.click(createButton);

    await waitFor(() => {
    expect(vi.mocked(createUser)).toHaveBeenCalled();
});

// Since the form closes, we check that it's no longer in the document
expect(screen.queryByText('Create New User')).not.toBeInTheDocument();
      
    });

    it('shows error message when redux state has error', async () => {
      const testError = 'Email already exists';

      store = createTestStore({
        users: {
          error: testError,
          loading: false,
          submitting: false,
          users: [],
        },
      });

      render(
        <Provider store={store}>
          <UserManagement />
        </Provider>
      );

      expect(screen.getByText(testError)).toBeInTheDocument();
    });

    it('disables submit button while submitting', async () => {
        const submittingStore = createTestStore({
    users: {
      users: [],
      loading: false,
      error: null,
      submitting: true, 
    },
  });
      render(
        <Provider store={submittingStore}>
          <UserManagement />
        </Provider>
      );

      await user.click(screen.getByRole('button', { name: /\+ New User/i }));

      await user.type(screen.getByLabelText(/Name \*/i), 'Test User');
      await user.type(screen.getByLabelText(/Email \*/i), 'test@example.com');
      await user.type(screen.getByLabelText(/Contact \*/i), '1234567890');
      await user.type(screen.getByLabelText(/Password \*/i), 'pass1234');

      // Simulate submitting state
      store.dispatch({ type: 'users/createUser/pending' });

      const submitBtn = screen.getByRole('button', { name: /Creating.../i });
      expect(submitBtn).toBeDisabled();
    });
  });

  it('displays list of users correctly', async () => {
    const mockUsers = [
      { _id: '1', name: 'Alice', email: 'alice@ex.com', contact: '1112223333' },
      { _id: '2', name: 'Bob', email: 'bob@ex.com', contact: '4445556666' },
    ];

    store = createTestStore({
      users: {
        users: mockUsers,
        loading: false,
        error: null,
        submitting: false,
      },
    });

    render(
      <Provider store={store}>
        <UserManagement />
      </Provider>
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@ex.com')).toBeInTheDocument();
    expect(screen.getByText('1112223333')).toBeInTheDocument();

    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});