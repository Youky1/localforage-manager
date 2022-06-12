import React, { useState } from "react";
import { Table, Button, Tag, Modal, Input, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useStorage } from "../utils/hooks";
import s from "./index.module.scss";
import { handleDeleteItem, handleUpdateItem } from "../utils/util";

import AddItem from "./AddItem";

const { TextArea } = Input;

export default function StorageMap({
  columns,
}: {
  columns?: ColumnsType<any>;
}) {
  const dataSource = useStorage();
  console.log(dataSource);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentKey, setCurrentKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const confirmUpdate = async () => {
    try {
      await handleUpdateItem(currentKey, JSON.parse(newValue));
      setIsUpdate(false);
    } catch (e: any) {
      message.warn(String(e));
    }
  };
  const startUpdate = async (record: DataItem) => {
    setIsUpdate(true);
    setNewValue(JSON.stringify(record.value));
    setCurrentKey(record.key);
  };
  const confirmDelete = (key: string) => {
    Modal.confirm({
      title: "确定要删除吗",
      async onOk() {
        await handleDeleteItem(key);
      },
    });
  };
  const defaultColumns = [
    {
      title: "变量名",
      dataIndex: "key",
      render: (key: string) => <Tag color="blue">{key}</Tag>,
    },
    {
      title: "类型",
      dataIndex: "type",
      render: (type: string) => <Tag color="green">{type}</Tag>,
    },
    {
      title: "JSON值",
      dataIndex: "value",
      render: (value: any) => (
        <Tag color="gold" className={s.tag}>
          {JSON.stringify(value)}
        </Tag>
      ),
    },
    {
      title: "操作",
      dataIndex: "key",
      render: (key: string, record: DataItem) => (
        <div className={s.btnContainer}>
          <Button type="primary" onClick={() => startUpdate(record)}>
            修改
          </Button>
          <Button danger onClick={() => confirmDelete(key)}>
            删除
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <AddItem />
      <Table dataSource={dataSource} columns={columns || defaultColumns} />
      <Modal
        title="修改数据"
        visible={isUpdate}
        onOk={confirmUpdate}
        onCancel={() => setIsUpdate(false)}
        width={1000}
      >
        <p>请按JSON格式修改</p>
        <TextArea
          rows={20}
          placeholder="请输入更新后的数据值"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      </Modal>
    </>
  );
}
