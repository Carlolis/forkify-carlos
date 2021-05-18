import { TIMEOUT_SECONDS } from './config';

const timeout = function (s: number): Promise<Response> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url: string) {
  try {
    const res = await Promise.race([timeout(TIMEOUT_SECONDS), fetch(`${url}`)]);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})Coucou`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
