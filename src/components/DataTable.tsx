import React, {useMemo, ChangeEvent, useState, useCallback} from 'react';
import { Table, Button, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { DataType } from '../types';
import { useHandleTableData } from '../hooks/useHandleTableData';
import ActionColumn from '../components/common/columns/ActionColumn';
import { sortByName, sortByDate, sortByValue } from '../utils/sortDataTable';
import type { ColumnsType } from 'antd/es/table';
import AddDataModal from "@/src/components/AddDataModal";

const DataTable = () => {
    const { data, searchText, setSearchText, handleDelete, handleSave } = useHandleTableData();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);

    const handleOpenModal = () => setIsModalVisible(prev => !prev);

    const handleAdd = useCallback(() => {
        setEditingRecord(null);
        handleOpenModal();
    }, []);

    const handleEdit = useCallback((record: DataType) => {
        setEditingRecord(record);
        handleOpenModal();
    }, []);

    const onSave = useCallback((record: Omit<DataType, 'id'>, id?: string) => {
        handleSave(record, id);
        handleOpenModal();
    }, [handleSave]);

    const columns: ColumnsType<DataType> = useMemo(() => [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: sortByName,
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            sorter: sortByDate,
        },
        {
            title: 'Числовое значение',
            dataIndex: 'value',
            key: 'value',
            sorter: sortByValue,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <ActionColumn
                    record={record}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
    ], [handleDelete]);

    const handleChangeInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setSearchText(value)

    return (
        <>
            <div className="p-8 max-w-6xl mx-auto">
                <div className="flex justify-between mb-4">
                    <Input
                        placeholder="Поиск по всем ячейкам..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={handleChangeInput}
                        className="max-w-md"
                        allowClear
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Добавить
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    bordered
                />
            </div>

            {isModalVisible && (
                <AddDataModal
                    open={isModalVisible}
                    editingRecord={editingRecord}
                    onSave={onSave}
                    onCancel={handleOpenModal}
                />
            )}
        </>

    );
}

export default DataTable;
