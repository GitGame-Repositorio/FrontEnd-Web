type OrderNumberProps = {
  numberOrder: number;
};

type OrderProps = {
  order: number;
};

export const organizeOrder = (
  data: OrderNumberProps,
  dataPrev: OrderNumberProps
) => data.numberOrder - dataPrev.numberOrder;

export const organizeOrderNumber = (data: OrderProps, dataPrev: OrderProps) =>
  data.order - dataPrev.order;

export const bgForStatus = {
  TO_DO: "bg-primary-400",
  IN_PROGRESS: "bg-primary-600",
  COMPLETED: "bg-primary-800",
  BLOCK: "bg-primary-200",
};

export const bgForHover = {
  TO_DO: "hover:bg-primary-600",
  IN_PROGRESS: "hover:bg-primary-500",
  COMPLETED: "hover:bg-primary-700",
  BLOCK: "hover:bg-primary-300",
};
