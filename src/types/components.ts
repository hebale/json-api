/**
 * ApiListItem
 */
type Method = {
  method: string;
  delay: number;
  status: number;
  code: string;
};

export type ApiListItemProps = {
  path: string;
  headers: {
    [key: string]: string | number;
  };
  methods: Method[];
  response: any;
  searchText?: string;
};

export type ApiData = {
  path: string;
  headers: {
    [key: string]: string | number;
  };
  methods: Method[];
  response: any;
  searchText?: string;
};
