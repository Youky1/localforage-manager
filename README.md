# localforage-manager

[仓库地址](https://github.com/Youky1/localforage-manager) | [NPM 地址](https://www.npmjs.com/package/localforage-manager)

## 安装

```
npm i localforage-manager
```

## 作用

为使用 `Localforage` 的 React 应用提供：

- 一个简单的操作存储内容的组件
- 获取存储内容键、值、类型的 Hook 函数

## API

| 导出名称  | 类型 | 接受参数 | 含义             |
| --------- | ---- | -------- | ---------------- |
| `Manager` | 组件 | columns  | 存储内容管理页面 |

| 导出名称     | 类型      | 接受参数 | 返回值                                                     | 含义                                          |
| ------------ | --------- | -------- | ---------------------------------------------------------- | --------------------------------------------- |
| `useStorage` | Hook 函数 | 无       | Array 类型，每个元素为对象，包含 key、value、type 三个属性 | 获取 Localforage 存储的所有数据的键、值、类型 |

注：

- `Manager` 接收的 `columns` 参数将传递到 Antd 的 Table 组件作为 columns。如果要自定义页面的显示格式，可以传入该参数进行配置。
- `Manager` 使用 `useStorage` 获取数据，在此基础上进行 `columns` 参数的自定义。

## 使用方法

```typescript
import {Manager, useStorage} = 'localforage-manager';
export default function App() {
  const dataSource = useStorage();
  console.log(dataSource)
  // [{ key: "foo", value: "bar", type: "String" }, ... ]
  return (
    <div>
      <Manager />
    </div>
  );
}
```
