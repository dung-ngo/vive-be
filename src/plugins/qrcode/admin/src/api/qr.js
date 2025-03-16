import axiosInstance from "../utils/axiosInstance.js";

export async function getPocketBook() {
  try {
    const response = await axiosInstance.get(`/qrcode`);
    return response.data;
  } catch (err) {
    throw err?.response?.data?.error;
  }
}


export async function updateQRCode(id, qrCode) {
  try {
    const response = await axiosInstance.put(`/qrcode`, { id, qrCode });
    return response.data;
  } catch (err) {
    throw err?.response?.data?.error;
  }
}

