
import { useState } from "react";
import ProductRow from "../componenets/ProductRow";
import { useAllDeleteProductMutation, useGetProductQuery } from "../redux/api/smartapi";
import Swal from "sweetalert2";

export default function Product() {
  const { data } = useGetProductQuery();
  console.log(data)
  const [productsId, setProductsId] = useState<string[]>([]);
  const [deletedAll]=useAllDeleteProductMutation()

  const handleCheckboxClick = (id: string) => {
    if (productsId) {
      const index = productsId.indexOf(id);

      if (index === -1) {
        setProductsId([...productsId, id]);
      } else {
        const newProductsId = [...productsId];
        newProductsId.splice(index, 1);
        setProductsId(newProductsId);
      }
    }
  };
  const handleDeleteMany = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletedAll(productsId);
        Swal.fire({
          title: "Deleted!",
          text: "Glass has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search Smart Phone"
          className="input input-bordered input-accent w-full max-w-xs ml-6"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th><button  disabled={!productsId[0]}   onClick={handleDeleteMany} className="btn btn-warning">Deleted All</button></th>
              <th>Name</th>
              <th>Model</th>
              <th>Brand</th>

              <th>Operating System</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          
            {/* row 1 */}
            <ProductRow handleCheckboxClick={handleCheckboxClick}  data={data}/>
         
        </table>
      </div>
    </div>
  );
}
