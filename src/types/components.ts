/**
 * ApiListItem
 */
export type Header = {
  uuid: string;
  isActive: boolean;
  key: string;
  value: string;
};

export type Methods = {
  [key in 'GET' | 'POST' | 'PATCH' | 'PULL' | 'DELETE']: {
    delay: number;
    status: number;
    callback: {
      isActive: boolean;
      code: string | null;
    };
  };
};

export type ApiData = {
  path: string;
  headers: Header[];
  methods: Methods;
  response: any;
  searchText?: string;
};

// export type JSONData = {
//   path: string;
//   description?: string | number;
//   headers: {
//     [key: string]: string;
//   };
//   methods: {
//     [key in 'GET' | 'POST' | 'PATCH' | 'PULL' | 'DELETE']: {
//       delay: number;
//       status: number;
//       callback: {
//         isActive: boolean;
//         code: string | null;
//       };
//     };
//   };
//   response: any;
// };
