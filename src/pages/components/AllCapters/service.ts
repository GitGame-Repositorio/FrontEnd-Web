type OrderProps = {
  numberOrder: number;
};

export const organizateOrder = (data: OrderProps, dataPrev: OrderProps) =>
  data.numberOrder - dataPrev.numberOrder;

export const bgForStatus = {
  TO_DO: "bg-primary-400",
  IN_PROGRESS: "bg-primary-600",
  COMPLETED: "bg-primary-800",
};

export const bgForHover = {
  TO_DO: "hover:bg-primary-600",
  IN_PROGRESS: "hover:bg-primary-500",
  COMPLETED: "hover:bg-primary-700",
};
