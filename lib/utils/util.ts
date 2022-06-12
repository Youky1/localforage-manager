import { message } from "antd";
import localforage from "localforage";

export const getType = (value: any) =>
  Object.prototype.toString.call(value).slice(8, -1);

export const isKeyExsit = async (key: string) => {
  const keys = await localforage.keys();
  return keys.includes(key);
};

export const handleAddItem = async (key: string, value: any) => {
  try {
    await localforage.setItem(key, value);
    message.info("添加成功");
    window.location.reload();
  } catch (e) {
    message.error("添加失败" + e);
  }
};

export const handleDeleteItem = async (key: string) => {
  try {
    await localforage.removeItem(key);
    message.info("删除成功");
    window.location.reload();
  } catch (e) {
    message.error("删除失败");
  }
};

export const handleUpdateItem = async (key: string, value: any) => {
  try {
    await localforage.setItem(key, value);
    message.info("更新成功");
    window.location.reload();
  } catch (e) {
    message.error("更新失败" + e);
  }
};
