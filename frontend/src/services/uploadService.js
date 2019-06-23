import api from './serviceApi';
import { getToken } from './loginService';

const IMPORT_PATH = '/banco-uati/v1/servant';

export const fileUpload = async (files) => {
  const header = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `${getToken()}` } };
  const uploadRequest = new FormData();

  console.log(files[0], files[0].name)

  uploadRequest.append('file', files[0], files[0].name);

  console.log(uploadRequest.getAll('file'))

  api.post(`${IMPORT_PATH}/import`, uploadRequest, header);
};