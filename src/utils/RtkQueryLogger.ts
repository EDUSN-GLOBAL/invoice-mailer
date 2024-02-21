import { isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'


export const rtkQueryLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {

    if (isRejectedWithValue(action)) {
      console.log('action', action);
        //@ts-expect-error
      action.payload.data ===null || action.payload.data === undefined ? null :
              //@ts-expect-error
          action.payload.status === 401 || action.payload.status === 403
        ? toast.warn('You dont have permission to perform this action! please contact your administrator.')

            //@ts-expect-error
  : action.payload.status === "FETCH_ERROR"
  ? toast.error('Server error, please try again later.')
  : // @ts-expect-error
    toast.warn(action?.payload.data.message || 'An error has occurred')

      }

    return next(action)
  }
export const rtkQuerySuccessLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isFulfilled(action)) {
      // @ts-expect-error
     toast.success(action.payload?.message)
    }

    return next(action)
  }
