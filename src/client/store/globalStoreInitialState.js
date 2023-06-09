
export const globalStoreInitialState ={
    author: {
        name: "",
        lastname: ""
      },
      hydrated: false,
      categories: [],
      items: [],
      item: {
        id: '',
        title: '',
        price: { currency: '', amount: 0, decimals: 0 },
        picture: '',
        condition: '',
        free_shipping: false,
        sold_quantity: 0,
        description:''
      },
      lastUpdate: 0,
}