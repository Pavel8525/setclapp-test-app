import React from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataType } from '@/src/types';

interface ActionColumnProps {
    record: DataType;
    onEdit?: (record: DataType) => void;
    onDelete?: (id: string) => void;
}

const ActionColumn = ({ record, onEdit, onDelete }: ActionColumnProps) => {
    const handleEdit = () => onEdit(record);

    const handleDelete = () => onDelete(record.id);

    return (
        <Space size="middle">
            <Button
                type="text"
                icon={<EditOutlined />}
                onClick={handleEdit}
            />
            <Popconfirm
                title="Удалить строку?"
                onConfirm={handleDelete}
                okText="Да"
                cancelText="Нет"
            >
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                />
            </Popconfirm>
        </Space>
    );
}

export default ActionColumn;
