import { Link } from "react-router-dom";
import {
 
  useDeleteProductMutation,
  
} from "../redux/api/smartapi";

import Swal from "sweetalert2";

import { SubmitHandler, set, useForm } from "react-hook-form";
import SalesModal from "./SeleModal";
type Inputs = {
  productId: string;
  quantity: number;
  buyerName: string;
  dateOfSale: Date;
};
export default function ProductRow({data,handleCheckboxClick}) {
 


  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
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
        await deleteProduct(id);
        Swal.fire({
          title: "Deleted!",
          text: "Smart has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <tbody>
      {data?.data?.map((p) => (
        <tr key={p.name}>
          <th>
            <label>
              <input type="checkbox" onClick={() => handleCheckboxClick(p._id)} className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src="/tailwind-css-component-profile-2@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{p.name}</div>
                <div className="text-sm opacity-50">United States</div>
              </div>
            </div>
          </td>
          <td>{p.model}</td>
          <td>{p.brand}</td>
          <td>{p.operatingSystem}</td>
          <td>{p.price}</td>
          <td>{p.quantity}</td>
          <th>
       
          <SalesModal id={p._id}></SalesModal>
            <Link to={`/duplicate-product/${p._id}`} className="btn btn-warning btn-xs">Duplicate & Edit</Link>
            <Link to={`/update-product/${p._id}`} className="btn btn-warning btn-xs mx-3">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(p._id)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </th>
        </tr>
      ))}
    </tbody>
  );
}
