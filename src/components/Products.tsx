import { Fragment, useState } from "react";
import { useGetProduct, useProducts } from "../services/queries";

type Props = {};

export default function Products({}: Props) {
  const productsQuery = useProducts();
  const [selected, setSelected] = useState<number | null>(null);
  const productQuery = useGetProduct(selected);
  return (
    <div>
      {selected && productQuery?.data && (
        <div className="mt-5">
          <h1 className="text-3xl font-bold">Selected Product</h1>
          <h1 className="">Product ID : {productQuery.data.id}</h1>
          <h1 className="">Product Name : {productQuery.data.name}</h1>
        </div>
      )}
      <h1 className="text-3xl font-bold">Products</h1>
      {productsQuery?.data?.pages.map((data, index) => {
        return (
          <Fragment key={index}>
            {data.map((product) => {
              return (
                <div className="flex gap-3 mt-2 items-center" key={product.id}>
                  <h1>
                    {product.id}. {product.name}
                  </h1>
                  <button
                    className="bg-sky-500 text-slate-100 px-2 rounded"
                    onClick={() => setSelected(product.id)}
                  >
                    Select
                  </button>
                </div>
              );
            })}
          </Fragment>
        );
      })}
      <div className="">
        <button
          className="disabled:opacity-50 mt-5 bg-emerald-500 px-2 rounded text-slate-100 py-1"
          onClick={() => {
            productsQuery.fetchNextPage();
          }}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? "Loading More ...."
            : productsQuery.hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
}
