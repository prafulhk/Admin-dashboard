import { createAction, props } from '@ngrx/store';
import { User } from '../../core/services/user-service';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>(),
);

export const addUser = createAction('[Users] Add User', props<{ user: User }>());

export const deleteUser = createAction('[Users] Delete User', props<{ index: number }>());

export const updateUser = createAction(
  '[Users] Update User',
  props<{ index: number; user: User }>(),
);
