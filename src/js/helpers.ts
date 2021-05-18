import { TIMEOUT_SECONDS } from './config';
import { sentRecipe } from './Recipe';

const timeout = function (s: number): Promise<Response> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// export const getJSON = async function (url: string) {
//   try {
//     const res = await Promise.race([timeout(TIMEOUT_SECONDS), fetch(url)]);

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(`${data.message} (${res.status})Coucou`);
//     }
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

export const AJAX = async function (url: string, uploadData: any = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([timeout(TIMEOUT_SECONDS), fetchPro]);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
// export const sendJSON = async function (url: string, uploadData: sentRecipe) {
//   try {
//     const res = await Promise.race([
//       timeout(TIMEOUT_SECONDS),
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(uploadData),
//       }),
//     ]);

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(`${data.message} (${res.status})`);
//     }
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
