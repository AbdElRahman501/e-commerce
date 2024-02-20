export async function fetchCars() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b3aaaa263dmsh7317120cba08d5cp173d64jsn42b65f1e24e2",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla`,
    options
  );
  const result = await response.text();
  return result;
}
