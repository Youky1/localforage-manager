import React, { useState } from "react";
import s from "./index.module.scss";
import { Input, Button, Modal, message } from "antd";
import { handleAddItem, isKeyExsit } from "../utils/util";

const { TextArea } = Input;

export default function AddItem() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isValueInput, setIsValueInput] = useState(false);

  const showValueInput = async () => {
    if (!key) {
      message.warn("键不能为空");
      return;
    }
    if (await isKeyExsit(key)) {
      message.error(`键 ${key} 已存在`);
      setKey("");
      return;
    }
    setIsValueInput(true);
  };

  const handleAdd = async () => {
    let v;
    eval("v = " + value);
    await handleAddItem(key, v);
    setKey("");
    setValue("");
    setIsValueInput(false);
  };

  return (
    <div className={s.addContainer}>
      <Input
        value={key}
        placeholder="输入要添加的键，点击确定后输入值"
        onChange={(e) => setKey(e.target.value)}
      />
      <Button onClick={showValueInput}>确定</Button>
      <Modal
        title="新增数据"
        visible={isValueInput}
        onOk={handleAdd}
        onCancel={() => setIsValueInput(false)}
        width={1000}
      >
        <TextArea
          rows={20}
          placeholder="请输入JSON化之后的数据值"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Modal>
    </div>
  );
}
