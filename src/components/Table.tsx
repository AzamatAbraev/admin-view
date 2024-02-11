import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Space, Table, Tag, message } from 'antd';
import type { TableColumnsType } from 'antd';

import "../general-styles/Table.scss"
import useUsers from '../store/users';
import dateTimeFormatter from '../utils/dateFormatter';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { USER_DATA } from '../constants';
import LoadingPage from '../pages/loading';

interface DataType {
  _id: string;
  name: string;
  email: string;
  lastLogin: string;
  status: string
}


const DashboardTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<DataType | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   setIsLoading(true);
  //   const timerId = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 500)

  //   return () => {
  //     clearTimeout(timerId)
  //   }
  // }, [])


  const [form] = Form.useForm();
  const { users, loading, getAllUsers, deleteUser, blockUser, unblockUser, updateUser } = useUsers();
  const navigate = useNavigate();


  const userDatajson = localStorage.getItem(USER_DATA) || "";
  const userData = JSON.parse(userDatajson);
  const userId = userData?.userId;

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, record) => <a onClick={() => showEditModal(record)} style={{ textTransform: "capitalize" }} className='table__name'>{name}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email: string) => <p className='table__email'>{email}</p>
    },
    {
      title: 'Last login',
      dataIndex: 'lastLogin',
      render: (time: Date) => <p className='table__date'>{dateTimeFormatter(time)}</p>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (<Tag icon={status === "active" ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={status === "active" ? "success" : "error"}>
        {status}
      </Tag>)
    },
  ];


  const handleDelete = async () => {
    await Promise.all(selectedRowKeys.map((userId) => deleteUser(userId as string)));
    getAllUsers()
    selectedRowKeys.length === 1 ? message.info("User deleted") : message.info("Selected users deleted")

    setSelectedRowKeys([])
    if (selectedRowKeys.includes(userId)) {
      message.info("Your account has been deleted. Redirecting to register page...");
      navigate('/register');
    }
  }

  const showDeleteModal = () => {
    if (selectedRowKeys.length > 0) {
      Modal.confirm({
        title: selectedRowKeys.length === 1 ? 'Are you sure delete this user?' : 'Are you sure delete these users?',
        content: 'This action cannot be undone',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk() {
          handleDelete();
        },
        onCancel() {
          setSelectedRowKeys([])
        },
      });
    } else {
      message.info("Please select user(s) to perform this action")
    }
  };

  const showBlockModal = () => {
    if (selectedRowKeys.length > 0) {
      Modal.confirm({
        title: selectedRowKeys.length === 1 ? 'Are you sure block this user?' : 'Are you sure block these users?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk() {
          handleBlock();
        },
        onCancel() {
          setSelectedRowKeys([])
        },
      });
    } else {
      message.info("Please select user(s) to perform this action")
    }
  };

  const showUnblockModal = () => {
    if (selectedRowKeys.length > 0) {
      Modal.confirm({
        title: selectedRowKeys.length === 1 ? 'Are you sure unblock this user?' : 'Are you sure unblock these users?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk() {
          handleUnblock();
        },
        onCancel() {
          setSelectedRowKeys([])
        },
      });
    } else {
      message.info("Please select user(s) to perform this action")
    }
  };

  const showEditModal = (user: DataType) => {
    setCurrentUser(user);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleEditUser(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBlock = async () => {
    if (selectedRowKeys.length > 0) {
      await Promise.all(selectedRowKeys.map((userId) => blockUser(userId as string)))
      getAllUsers()
      message.info("Selected users blocked")
      setSelectedRowKeys([])
      selectedRowKeys.length === 1 ? message.info("User blocked") : message.info("Selected users blocked")

      if (selectedRowKeys.includes(userId)) {
        message.info("You have been blocked. Redirecting to login page...");
        navigate('/login');
      }
    } else {
      message.error("Please select user to perform this action")
    }
  }

  const handleUnblock = async () => {
    if (selectedRowKeys.length > 0) {
      await Promise.all(selectedRowKeys.map((userId) => unblockUser(userId as string)))
      getAllUsers()
      selectedRowKeys.length === 1 ? message.info("User unblocked") : message.info("Selected users unblocked")
      setSelectedRowKeys([])
    } else {
      message.error("Please select user to perform this action")
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const handleEditUser = async (values: { name: string; email: string }) => {
    if (!currentUser) return;
    await updateUser({
      id: currentUser._id, name: values.name,
      email: values.email,
    });
    setIsModalVisible(false);
    message.success('User updated successfully');
    getAllUsers();
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <Fragment>
      {loading ? <LoadingPage /> : <main className='table'>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={showBlockModal} className='table__block__btn' danger >Block <LockOutlined /></Button>
          <Button onClick={showUnblockModal} className='table__unblock__btn'>Unblock <UnlockOutlined /></Button>
          <Button onClick={showDeleteModal} type='primary' danger>Delete   <DeleteOutlined /></Button>
        </Space>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={users.map((user) => ({ ...user, key: user._id }))}
          bordered
          rowKey={(user) => user._id}
          scroll={{ x: "700px" }}
          pagination={{ defaultPageSize: 7 }}
        />
        <Modal title="Edit User" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout="vertical" name="userForm">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input the user\'s name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input the user\'s email!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </main>}
    </Fragment>
  );
};

export default DashboardTable;