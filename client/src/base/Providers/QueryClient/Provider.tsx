import React, { FC, ReactNode } from "react"
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { useSnackbar } from "notistack"
import { useErrors } from "../Errors"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { parseErrorMessage = (e: string) => "" } = useErrors()

  const queryCache = new QueryCache({
    onError: (error, query) => {
      const err: any = { ...error };

      if (query.meta?.onError) {
        (query.meta?.onError as (err: unknown) => void)(err)
      } else {
        enqueueSnackbar({
          message: parseErrorMessage(err.response?.data?.message || err.message),
          variant: "error"
        })
      }
    },
    onSuccess: (data, query) => {
      if (query.meta?.onSuccess) {
        (query.meta?.onSuccess as (data: unknown) => void)(data)
      }
    },
    onSettled: (data, error, query) => {
    }
  });

  const mutationCache = new MutationCache({
    onError: (error, variables, onMutateResult, mutation) => {
      const err: any = { ...error };

      console.debug(error, variables, onMutateResult, mutation)
      enqueueSnackbar({
        message: parseErrorMessage(err.response?.data?.message || err.message),
        variant: "error"
      })
    }
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        throwOnError: false
      },
    },
    queryCache: queryCache,
    mutationCache: mutationCache
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export default Provider