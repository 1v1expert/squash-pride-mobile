import {configureStore} from '@reduxjs/toolkit';
import {middleware} from './middleware';

import user from '../../bus/user/slice';

export const store = configureStore({
  reducer: {
    user,
  },
  middleware,
  // devTools: NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
