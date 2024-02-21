import { rtkQueryLogger, rtkQuerySuccessLogger } from '../utils/RtkQueryLogger';
import generalApi from './query/generalApi';
import authReducer from './slice/AuthSlice';
import { configureStore } from '@reduxjs/toolkit'
import studentDataReducer from './slice/StudentDataSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      studentData: studentDataReducer,

      [generalApi.reducerPath]:generalApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(generalApi.middleware,rtkQueryLogger,rtkQuerySuccessLogger ),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
