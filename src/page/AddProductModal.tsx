import { SubmitHandler, useForm } from "react-hook-form";
import { useAddProductMutation } from "../redux/api/smartapi";
import { toast } from "sonner";
type Inputs = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: Date;
  brand: string;
  model: string;
  operatingSystem: string;
  storageCapacity: string;
  screenSize: string;
  camera: string;
  battery: string;
};
export default function AddProductModal() {
  const [addProduct] = useAddProductMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onsubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Please wait...");
    try {
      const price = Number(data.price);
      const quantity = Number(data.quantity);
      const productData = {
        ...data,
        price,
        quantity,
      };
      const res = await addProduct(productData);
      if(res.error){
        throw new Error("fdskjg")
      }
      toast.success("Product added successfully!", {
        id: toastId,
        duration: 2000,
      });
      reset();
    } catch (error) {
     
      toast.error(`something went wrong`, { id: toastId, duration: 2000 });
    }
  };
  return (
    <section className="text-gray-600 body-font relative w-full">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Add Product
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="lg:w-1/2 md:w-2/3 mx-auto"
        >
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="brand"
                  className="leading-7 text-sm text-gray-600"
                >
                  Brand
                </label>
                <input
                  {...register("brand")}
                  type="text"
                  id="brand"
                  name="brand"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="model"
                  className="leading-7 text-sm text-gray-600"
                >
                  Model
                </label>
                <input
                  {...register("model")}
                  type="text"
                  id="model"
                  name="model"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="price"
                  className="leading-7 text-sm text-gray-600"
                >
                  Price
                </label>
                <input
                  {...register("price")}
                  type="number"
                  id="price"
                  name="price"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="quantity"
                  className="leading-7 text-sm text-gray-600"
                >
                  Quantity
                </label>
                <input
                  {...register("quantity")}
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="operatingSystem"
                  className="leading-7 text-sm text-gray-600"
                >
                  Operating System
                </label>
                <input
                  {...register("operatingSystem")}
                  type="text"
                  id="operatingSystem"
                  name="operatingSystem"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="storageCapacity"
                  className="leading-7 text-sm text-gray-600"
                >
                  Storage Capacity
                </label>
                <input
                  {...register("storageCapacity")}
                  type="text"
                  id="storageCapacity"
                  name="storageCapacity"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="screenSize"
                  className="leading-7 text-sm text-gray-600"
                >
                  Screen Size
                </label>
                <input
                  {...register("screenSize")}
                  type="text"
                  id="screenSize"
                  name="screenSize"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="releaseDate"
                  className="leading-7 text-sm text-gray-600"
                >
                  Release Date
                </label>
                <input
                  {...register("releaseDate")}
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="battery"
                  className="leading-7 text-sm text-gray-600"
                >
                  Battery
                </label>
                <input
                  {...register("battery")}
                  type="text"
                  id="battery"
                  name="battery"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <label
                  htmlFor="camera"
                  className="leading-7 text-sm text-gray-600"
                >
                  Camera
                </label>
                <input
                  {...register("camera")}
                  type="text"
                  id="camera"
                  name="camera"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Add Smart Phone
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
