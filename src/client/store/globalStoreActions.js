
import { QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()

export function globalStoreActions(set, get){

    return ({
        setData: async (queryTerm) => {
            const url = `/api${location.pathname}?q=${queryTerm}`
            const resp = await queryClient.fetchQuery(
              ["itemsData"],
              {
                queryFn: () =>
                  fetch(url, {
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                  })
              }
            );
            const data = await resp.json();
            set({ lastUpdate: Date.now(), ...data })
          },
    })
}