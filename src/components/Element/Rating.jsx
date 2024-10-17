export const Rating = ({ rating }) => {
  let ratingArr = Array(5).fill(false);

  // For loop converts rating array of 5 false values to true
  // IF i is less than rating value that was passed aboveb
  for (let i = 0; i < rating; i++) {
    ratingArr[i] = true;
  }

  return (
    <>
      {ratingArr.map((value, index) =>
        value ? (
          <i
            key={index}
            className="text-lg bi bi-star-fill text-yellow-500 mr-1"
          ></i>
        ) : (
          <i
            key={index}
            className="text-lg bi bi-star text-yellow-500 mr-1"
          ></i>
        )
      )}
    </>
  );
};
