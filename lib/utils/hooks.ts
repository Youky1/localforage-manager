import { useState, useEffect } from "react";
import localforage from "localforage";
import { getType } from "./util";

export const useStorage = () => {
  const [dataSource, setDataSource] = useState<Array<DataItem>>([]);
  useEffect(() => {
    const temp: Array<DataItem> = [];
    localforage.iterate(
      (value, key) => {
        console.log("iterate");
        temp.push({
          key,
          value,
          type: getType(value),
        });
      },
      () => {
        setDataSource(temp);
      }
    );
  }, []);
  return dataSource;
};
