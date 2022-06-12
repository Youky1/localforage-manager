interface StoragedItem {
  [key: string]: any;
}
interface DataItem {
  key: string;
  type: string;
  value: any;
}
interface LocalForageView extends LocalForage {
  getStorageMap?: () => Promise<StoragedItem>;
}
declare module "*.scss";
