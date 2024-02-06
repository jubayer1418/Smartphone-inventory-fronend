import { baseApi } from "./baseapi";

export const smartapi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    
    getProduct: builder.query({
      query: () => ({
        url: "/smartphone/get-all-products",
        method: "GET",
      }),
      providesTags:["Phone"]
    }),
    getHistory: builder.query({
      query: (query) => {
        const params = new URLSearchParams();
        if (query) {
          params.append("filterBy", query);
        }
        return {
          url: "/sales/get-all-sales",
          method: "GET",
          params: params,
        };
      },
      providesTags:["Phone"]
    }),
    addProduct: builder.mutation({
      query: (data) => {
        
        return { url: "/smartphone/add-product", method: "POST", body: data };
      },
      invalidatesTags:["Phone"],
    }),
    sellProduct: builder.mutation({
      query: (data) => {
       
        return { url: "/sales//create-sales", method: "POST", body: data };
      },
      invalidatesTags:["Phone"],
    }),
    deleteProduct: builder.mutation({
      query: (pId) => {
        
        return { url: `/smartphone/delete-product/${pId}`, method: "DELETE" };
      },
      invalidatesTags:["Phone"],
    }),
    allDeleteProduct: builder.mutation({
      query: (ids) => {
        
        return { url: `/smartphone/delete-products`, method: "DELETE",body:ids };
      },
      invalidatesTags:["Phone"],
    }),
    getSingleProduct: builder.query({
      query: (pId) => {
        
        return { url: `/smartphone/get-single-product/${pId}`, method: "GET" };
      },
      providesTags:["Phone"],
     
    }),
    updateProduct: builder.mutation({
      query: ({data,id}) => {
    
        return { url: `/smartphone/update-product/${id}`, method: "PUT",body:data };
      },
      invalidatesTags:["Phone"],
      
    }),
  }),

});
export const {useUpdateProductMutation,useAllDeleteProductMutation,useGetSingleProductQuery,useSellProductMutation,useGetHistoryQuery,useDeleteProductMutation, useGetProductQuery, useAddProductMutation } = smartapi;
