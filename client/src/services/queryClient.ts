import { QueryClient, QueryCache, MutationCache } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';


const queryCache = new QueryCache({
  onError: (error, query) => {
    const err: any = { ...error };

    if (query.meta?.onError) {
      (query.meta?.onError as (err: unknown) => void)(err)
    } else {
      toast.error(err.response?.data?.message || err.message);
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
    console.debug(error, variables, onMutateResult, mutation)
    toast.error(error.message);
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


export default queryClient;
