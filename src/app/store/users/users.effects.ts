import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { UserService } from '../../core/services/user-service';
import * as UsersActions from './users.actions';

@Injectable({ providedIn: 'root' })
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(map((users) => UsersActions.loadUsersSuccess({ users }))),
      ),
    ),
  );
}
