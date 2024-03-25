/**
 * ApiListItem
 */
type Method = {
  method: string;
  delay: number;
  status: number;
};

export type ApiListItemProps = {
  name: string;
  headers: {
    [key: string]: string | number;
  };
  methods: Method[];
  data: any;
};
