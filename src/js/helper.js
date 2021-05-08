import { API_URL } from './config';

export const getProData = async function () {
  const resProducts = await fetch(`${API_URL}products`);
  return await resProducts.json();
};

// function to upload Img
export const uploadImg = async function (img) {
  const formData = new FormData();
  formData.append('productImg', img);
  // image upload
  const imageUpload = await fetch(`${API_URL}products/imgUpload`, {
      method: 'POST',
      body: formData,
    }),
    imgData = await imageUpload.json();
  return imgData;
};

export const postProData = async function (proData) {
  const res = await fetch(`${API_URL}products`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(proData),
  });
  return await res.json();
};
