import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";





export const login = createAction(
  "[Login Page] User Login", // source of event, event/command
  props<{user: User}>()
)
