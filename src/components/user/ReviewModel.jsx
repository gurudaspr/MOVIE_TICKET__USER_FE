import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../../baseUrl/baseUrl';


const schema = yup.object().shape({
  rating: yup.number().required('Rating is required').min(1).max(5),
  review: yup.string().min(3).max(50).optional(),
});

const ReviewModal = ({ isOpen, onClose, movieId, movieName }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data) => {
    console.log('Submitting review:', { ...data, movieId });
    await axios.post(`${baseUrl}/api/add-review`, { ...data, movieId },{ withCredentials: true });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open ' : ''}`}>
      <div className="modal-box">
        <h2 className="font-bold text-lg">Add Review : {movieName}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 text-center">
            <Controller
              name="rating"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <div className="rating rating-md ">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <input
                      key={value}
                      type="radio"
                      name="rating"
                      className={`mask mask-star-2 ${field.value >= value ? 'bg-warning' : 'bg-neutral-content'} text-3xl`}
                      checked={field.value === value}
                      onChange={() => field.onChange(value)}
                    />
                  ))}
                </div>
              )}
            />
            {errors.rating && <p className="text-error">{errors.rating.message}</p>}
            <Controller
              name="review"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <textarea
                    {...field}
                    className="textarea textarea-bordered w-full mt-4"
                    placeholder="Write your review here (optional)..."
                  ></textarea>
                  {errors.review && <p className="text-error">{errors.review.message}</p>}
                </div>
              )}
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;