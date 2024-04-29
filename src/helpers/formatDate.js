import React from "react";
import { format } from "date-fns";

export const formatDate = (date) => {
  const formattedDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss");
  return formattedDate;
};
