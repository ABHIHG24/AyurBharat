import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomFetch } from "../axios/Costomaxios";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const Reviews = () => {
  const [productId, setProductId] = useState();
  const [reviews, setReviews] = useState([]);
  const queryClient = useQueryClient();

  // Fetch reviews when productId changes
  const { isLoading: dataLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!productId) return;
      try {
        const { data } = await CustomFetch.get(
          `/api/product/reviews?id=${productId}`
        );
        setReviews(data.reviews);
        return data;
      } catch (error) {
        throw new Error("Failed to fetch reviews");
      }
    },
    enabled: !!productId, // Enable the query only when productId is set
  });

  // Mutation to delete a review
  const deleteReviewMutation = useMutation(
    (reviewId) =>
      CustomFetch.delete(
        `/api/product/reviews?id=${reviewId}&productId=${productId}`
      ),
    {
      onSuccess: () => {
        toast.success("Deleted successfully");
        queryClient.invalidateQueries(["reviews", productId]);
      },
      onError: (error) => {
        toast.error("Failed to delete review");
      },
    }
  );

  // Handle review deletion
  const handleDelete = (reviewId) => {
    deleteReviewMutation.mutate(reviewId);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) {
      toast.error("Please enter a product ID");
      return;
    }
    deleteReviewMutation.reset(); // Reset mutation state before fetching reviews
    queryClient.invalidateQueries(["reviews", productId]); // Invalidate existing query to trigger refetch
  };

  return (
    <div className="flex flex-col gap-8 mt-40 items-center h-screen w-full">
      <h1 className="font-bold text-2xl">Check Product Reviews</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Product Id"
          className="input input-bordered w-full max-w-xs"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-error w-2/5"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Show Reviews
        </button>
      </form>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h3 className="font-bold text-lg">Product Reviews</h3>
            {dataLoading ? (
              <h1>Loading...</h1>
            ) : reviews.length === 0 ? (
              <h1 className="font-bold">No reviews yet</h1>
            ) : (
              <div>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SL No</th>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Rating</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>User: {review.name}</td>
                          <td>Comment: {review.comment}</td>
                          <td>Rating: {review.rating}</td>
                          <td>
                            <MdDeleteForever
                              onClick={() => handleDelete(review._id)}
                              className="cursor-pointer hover:bg-red-400 w-6 h-6"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Reviews;
