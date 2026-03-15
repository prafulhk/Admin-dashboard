import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(selectUsersState, (state) => state.users);

export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);
