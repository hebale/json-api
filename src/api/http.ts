import { objectToString } from '~/utils';

type Options = {
  headers?: {
    [key: string]: string;
  };
  queries?: {
    [key: string]: string;
  };
  body?: any;
};
type HttpResponse = { code: number; message?: string; data: any };
type HttpMethod = (path: string, options?: Options) => Promise<HttpResponse>;

class Http {
  port: string;
  headers: {
    [key: string]: string;
  };

  constructor() {
    this.port = `${process.env.SERVER_PORT}`;
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
  }

  get: HttpMethod = async (path, options) => {
    try {
      const response = await fetch(
        `${path ?? ''}${
          options?.queries ? `&${objectToString(options.queries)}` : ''
        }`,
        {
          method: 'GET',
          headers: this.headers,
        }
      );

      if (!response.ok) {
        const { ok, status, statusText } = response;
        throw { ok, status, message: statusText };
      }

      const data = await (() => {
        if (
          !this.headers ||
          this.headers['Content-Type'].indexOf('json') > -1
        ) {
          return response.json();
        }
        return response;
      })();

      return data;
    } catch (err) {
      let message = 'Unknown Error!';
      if (err instanceof Error) message = err.message;

      // console.error(err);
    }
  };

  post: HttpMethod = async (path, options) => {
    try {
      const response = await fetch(`${path ?? ''}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(options?.body || ''),
      });

      if (!response.ok) {
        const { ok, status, statusText } = response;
        throw { ok, status, message: statusText };
      }

      const data = await (() => {
        if (
          !this.headers ||
          this.headers['Content-Type'].indexOf('json') > -1
        ) {
          return response.json();
        }
        return response;
      })();

      return data;
    } catch (err) {
      let message = 'Unknown Error!';
      if (err instanceof Error) message = err.message;

      // console.error(err);
    }
  };
  patch: HttpMethod = async (path, options) => {
    try {
      const response = await fetch(`${path ?? ''}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(options?.body || ''),
      });

      if (!response.ok) {
        const { ok, status, statusText } = response;
        throw { ok, status, message: statusText };
      }

      const data = await (() => {
        if (
          !this.headers ||
          this.headers['Content-Type'].indexOf('json') > -1
        ) {
          return response.json();
        }
        return response;
      })();

      return data;
    } catch (err) {
      let message = 'Unknown Error!';
      if (err instanceof Error) message = err.message;

      // console.error(err);
    }
  };
  put: HttpMethod = async (path, options) => {
    try {
      const response = await fetch(`${path ?? ''}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(options?.body || ''),
      });

      if (!response.ok) {
        const { ok, status, statusText } = response;
        throw { ok, status, message: statusText };
      }

      const data = await (() => {
        if (
          !this.headers ||
          this.headers['Content-Type'].indexOf('json') > -1
        ) {
          return response.json();
        }
        return response;
      })();

      return data;
    } catch (err) {
      let message = 'Unknown Error!';
      if (err instanceof Error) message = err.message;

      // console.error(err);
    }
  };
  delete: HttpMethod = async (path, options) => {
    try {
      const response = await fetch(`${path ?? ''}`, {
        method: 'DELETE',
        headers: this.headers,
        body: JSON.stringify(options?.body || ''),
      });

      if (!response.ok) {
        const { ok, status, statusText } = response;
        throw { ok, status, message: statusText };
      }

      const data = await (() => {
        if (
          !this.headers ||
          this.headers['Content-Type'].indexOf('json') > -1
        ) {
          return response.json();
        }
        return response;
      })();

      return data;
    } catch (err) {
      let message = 'Unknown Error!';
      if (err instanceof Error) message = err.message;

      // console.error(err);
    }
  };
}

export default new Http();
