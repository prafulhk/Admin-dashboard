import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { initialState } from './users.state';

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),

  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),

  on(UsersActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(UsersActions.updateUser, (state, { index, user }) => ({
    ...state,
    users: state.users.map((u, i) => (i === index ? user : u)),
  })),

  on(UsersActions.deleteUser, (state, { index }) => ({
    ...state,
    users: state.users.filter((_, i) => i !== index),
  })),
);
