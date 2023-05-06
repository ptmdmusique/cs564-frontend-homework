import { createContext, useContext } from "react";

export interface ThroneAPIData {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string;
}

export interface ThroneDataContextType {
  data: ThroneAPIData[];
  isFetching: boolean;
}

export const ThroneDataContext = createContext<ThroneDataContextType>({
  data: [],
  isFetching: false,
});

export const useThroneData = () => useContext(ThroneDataContext);
