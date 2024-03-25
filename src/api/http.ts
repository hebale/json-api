import { objectToString } from "~/utils";

type HttpProps = {
  path: string;
  queries?: {
    [key: string]: string;
  };
  body?: any;
};

class Http {
  port: string;
  headers: {
    [key: string]: string;
  };

  constructor() {
    this.port = `${process.env.SERVER_PORT}`;
    this.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  }

  get = async ({ path, queries }: HttpProps) => {
    try {
      const response = await fetch(
        `${path ?? ""}${queries ? `&${objectToString(queries)}` : ""}`,
        {
          method: "GET",
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
          this.headers["Content-Type"].indexOf("json") > -1
        ) {
          return response.json();
        }
        return response;
      })();

      return data;
    } catch (err) {
      let message = "Unknown Error!";
      if (err instanceof Error) message = err.message;

      // console.error(err);
    }
  };

  post = async ({ path, body }: HttpProps) => {
    console.log(body);

    try {
      const response = await fetch(`${path ?? ""}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const { ok, status, statusText } = response;
        throw { ok, status, message: statusText };
      }

      const data = await (() => {
        if (
          !this.headers ||
          this.headers["Content-Type"].indexOf("json") > -1
        ) {
          return response.json();
        }
        return response;
      })();

      return data;
    } catch (err) {
      let message = "Unknown Error!";
      if (err instanceof Error) message = err.message;

      // console.error(err);
    }
  };
  pull = async ({ path, body }: HttpProps) => {};
  patch = async ({ path, body }: HttpProps) => {
    try {
      const response = await fetch(`${path ?? ""}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(body),
      });

      console.log(JSON.stringify(body, null, 2));

      if (!response.ok) {
        const { ok, status, statusText } = response;
        throw { ok, status, message: statusText };
      }

      const data = await (() => {
        if (
          !this.headers ||
          this.headers["Content-Type"].indexOf("json") > -1
        ) {
          return response.json();
        }
        return response;
      })();

      return data;
    } catch (err) {
      let message = "Unknown Error!";
      if (err instanceof Error) message = err.message;

      // console.error(err);
    }
  };
  delete = async ({ path, body }: HttpProps) => {};
}

export default new Http();
