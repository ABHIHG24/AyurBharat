import React, { useState } from "react";
import { CustomFetch } from "../axios/Costomaxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { From } from "../styles/login";

const AddProduct = () => {
  const [ProductData, setProductData] = useState({
    title: "",
    description: "",
    company: "",
    category: "",
    image: "",
    price: 0,
  });

  const {
    mutate: insert,
    isError,
    error,
    isLoading,
  } = useMutation({
    mutationFn: async (productData) => {
      console.log(productData);
      await CustomFetch.post("api/product/insertProduct", productData)
        .then((res) => {
          console.log(res);
          toast.success("Successfully Added");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error while inserting");
        });
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.currentTarget.title.value);
    formData.append("description", e.currentTarget.description.value);
    formData.append("company", e.currentTarget.company.value);
    formData.append("category", e.currentTarget.category.value);
    formData.append("price", e.currentTarget.price.value);
    formData.append("image", e.currentTarget.image.files[0]);

    setProductData({
      title: e.currentTarget.title.value,
      description: e.currentTarget.description.value,
      company: e.currentTarget.company.value,
      category: e.currentTarget.category.value,
      price: e.currentTarget.price.value,
      image: e.currentTarget.image.files[0].name,
    });

    try {
      await insert(formData);
      toast.success("Successfully Added");
    } catch (err) {
      console.log(err);
      toast.error("Error while inserting");
    }
  };

  return (
    <div>
      <h1 className="text-5xl flex justify-center pt-4">Add the Product</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col font-bold  justify-center items-center text-2xl gap-10 pt-14"
      >
        <span>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            id="title"
            name="title"
            // value={ProductData.title}
          />
        </span>
        <span>
          <label htmlFor="description">Description : </label>
          <input
            type="text"
            id="description"
            name="description"
            // value={ProductData.description}
          />
        </span>
        <span>
          <label htmlFor="company">Company : </label>
          <input
            type="text"
            id="company"
            name="company"
            // value={ProductData.company}
          />
        </span>
        <span>
          <label htmlFor="category">Category : </label>
          <input
            type="text"
            id="category"
            name="category"
            // value={ProductData.category}
          />
        </span>
        <span>
          <label htmlFor="image">Image URL : </label>
          <input
            type="file"
            id="image"
            name="image"
            // onChange={(e) => {
            //   console.log(e.target.files[0]);
            // }}
          />
        </span>
        <span>
          <label htmlFor="price">Price (in Rs) : </label>
          <input
            type="number"
            id="price"
            name="price"
            // value={ProductData.price}
          />
        </span>
        <span>
          <button type="submit" className="btn bg-slate-400">
            Submit
          </button>
        </span>
      </form>
    </div>
  );
};

export default AddProduct;
