import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';

import "../general-styles/Table.scss"
import useUsers from '../store/users';
import dateTimeFormatter from '../utils/dateFormatter';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface DataType {
  _id: string;
  name: string;
  email: string;
  lastLogin: string;
  status: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a style={{ textTransform: "capitalize" }} className='table__name'>{name}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (email: string) => <p className='table__email'>{email}</p>
  },
  {
    title: 'Last login',
    dataIndex: 'lastLogin',
    render: (time: string) => <p className='table__date'>{dateTimeFormatter(time)}</p>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (<Tag icon={status === "active" ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={status === "active" ? "success" : "error"}>
      {status}
    </Tag>)
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const DashboardTable = () => {
  const { users, getAllUsers } = useUsers();

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <main className='table'>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={users}
        bordered
        rowKey={(user) => user._id}
      />
    </main>
  );
};

export default DashboardTable;