interface AssignMetadata<TParamtype = any, TArgs = any> {
  args: TArgs;
  paramtype: TParamtype;
  index: number;
  data?: object | string | number;
}

export const assignMetadata = ({
  args,
  paramtype,
  index,
  data,
}: AssignMetadata) => ({
  ...args,
  [`${paramtype}:${index}`]: {
    index,
    data,
  },
});
