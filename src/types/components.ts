/**
 * ApiListItem
 */
type Method = {
  method: string;
  delay: number;
  status: number;
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
