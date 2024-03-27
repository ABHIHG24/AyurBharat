import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { newReview } from "../features/Cart/cartSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductReview = ({ product }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    edit: true,
    // color: "rbg(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    // value: product.ratings,
    isHalf: true,
  };

  const handleSubmitReview = () => {
    dispatch(
      newReview({
        productId: id,
        rating,
        comment,
      })
    );
    setRating(0);
    setComment("");
    window.location.reload();
  };

  return (
    <div className="flex pt-6 flex-col gap-2 lg:flex-row ">
      <div className="flex flex-col gap-4 w-1/2 ">
        <h3 className="font-bold">Product Rating</h3>
        <div className="flex flex-row gap-4 items-center">
          <ReactStars {...options} value={rating} onChange={setRating} />

          <p className="font-bold">reviews ({product.reviews.length})</p>
        </div>
        <p className="font-bold">write a review</p>
        <textarea
          placeholder="write a review..."
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="btn btn-success w-1/4" onClick={handleSubmitReview}>
          Submit
        </button>
      </div>
      <div className="flex flex-col w-1/2 h-96 overflow-auto">
        <p className="font-bold underline">
          Reviews ({product.reviews.length})
        </p>
        {product.reviews && product.reviews.length > 0 ? (
          <ul>
            {product.reviews.map((review) => (
              <li
                key={review._id}
                className="border-2 shadow-lg border-b-stone-500 m-6 p-6"
              >
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      alt="User Avatar"
                    />
                  </div>
                  <p className="ml-8 font-bold">{review.name}</p>
                </div>

                <ReactStars
                  // value={review.rating}
                  edit={false}
                  isHalf={true}
                  value={review.rating}
                />

                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 ml-8 text-neutral-content font-bold capitalize">
            no review yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
