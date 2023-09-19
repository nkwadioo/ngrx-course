import { createSelector } from "@ngrx/store";


export const isLoggedIn = createSelector( // momoized function,
  state => state['auth'], // slice of state
  (auth) => !!auth.user// projection function
)

export const isLoggedOut = createSelector( // momoized function,
  isLoggedIn, // slice of state
  loggedIn => !isLoggedIn// projection function
)
