export type ApiParam<T = undefined> = {
  path: string;
  key?: string | number;
  data: T;
};

export type ApiData = {
  path: string;
  headers: Header[];
  methods: {
    [key in 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE']: Method;
  };
  response: any;
};

export type Header = {
  uuid: string;
  isActive: boolean;
  key: string;
  value: string;
};

export type Method = {
  delay: number;
  status: number;
};

export type Error = {
  status: number;
  message: string;
};

export type Response = any;

export * from './queries';
export * from './mutation';
