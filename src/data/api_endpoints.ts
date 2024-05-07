export const api_endpoints = {
  dogs: "https://api.thedogapi.com/v1/breeds",
  dog: (id: number) => `https://api.thedogapi.com/v1/breeds/${id}`,
  img: (id: string) => `https://cdn2.thedogapi.com/images/${id}.jpg`,
};
