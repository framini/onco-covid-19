import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET;
  const token = req.body.token;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`;

  console.log('url', url);
  console.log('token', token);

  try {
    const googleResponse = await fetch(url, {
      method: 'post',
    }).then((response) => response.json());

    console.log('googleResponse', googleResponse);

    // @ts-ignore
    if (googleResponse.success && googleResponse.score > 0.1) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(400).json({ ok: false });
    }
  } catch (error) {
    console.log('ERROR', error.message);

    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ status: false, message: error.message });
  }
};
