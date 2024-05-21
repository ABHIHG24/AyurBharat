import React, { useEffect, useState } from "react";
import { CustomFetch } from "../axios/Costomaxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { From } from "../styles/login";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading: ProductDataLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await CustomFetch.get(
        `/api/product//getSingleProduct/${id}`
      );
      return data;
    },
  });

  const {
    mutate: insert,
    isError,
    error,
    isLoading,
  } = useMutation({
    mutationFn: async (productData) => {
      await CustomFetch.put(`api/product/updateProduct/${id}`, productData)
        .then((res) => {
          console.log(res);
          toast.success("Successfully Added");
          navigate("/admin/products");
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
    formData.append("stock", e.currentTarget.stock.value);
    // formData.append("image", e.currentTarget.image.files[0]);

    console.log(Object.fromEntries(formData));
    try {
      await insert(Object.fromEntries(formData));
      // toast.success("Successfully Added");
      e.target.reset();
    } catch (err) {
      console.log(err);
      toast.error("Error while inserting");
    }
  };

  if (ProductDataLoading) {
    return <h1>Loading ...</h1>;
  }

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
            defaultValue={data.title}
            // value={ProductData.title}
          />
        </span>
        <span>
          <label htmlFor="description">Description : </label>
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={data.description}

            // value={ProductData.description}
          />
        </span>
        <span>
          <label htmlFor="company">Company : </label>
          <input
            type="text"
            id="company"
            name="company"
            defaultValue={data.company}

            // value={ProductData.company}
          />
        </span>
        <span>
          <label htmlFor="category">Category : </label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={data.category}
            // value={ProductData.category}
          />
        </span>
        {/* <span>
          <label htmlFor="image">Image URL : </label>
          <input
            type="file"
            id="image"
            name="image"

            // onChange={(e) => {
            //   console.log(e.target.files[0]);
            // }}
          />
        </span> */}
        <span>
          <label htmlFor="price">Price (in Rs) : </label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={data.price}
            // value={ProductData.price}
          />
        </span>
        <span>
          <label htmlFor="stock">no of Stock: : </label>
          <input
            type="number"
            id="stock"
            name="stock"
            defaultValue={data.stock}
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

export default UpdateProduct;
