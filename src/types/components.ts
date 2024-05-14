/**
 * ApiListItem
 */
type Method = {
  method: string;
  delay: number;
  status: number;
  code: string;
};

type Header = {
  id: string;
  isActive: boolean;
  key: string;
  value: string;
};

export type ApiData = {
  path: string;
  headers: Header[];
  methods: Method[];
  response: any;
  searchText?: string;
};
