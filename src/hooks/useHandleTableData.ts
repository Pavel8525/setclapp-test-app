import { useState, useCallback, useMemo } from 'react';
import { App as AntdApp } from 'antd';
import { DataType } from '../types';
import { initialData } from '../constants';

export const useHandleTableData = () => {
    const { message } = AntdApp.useApp();
    const [data, setData] = useState<DataType[]>(initialData);
    const [searchText, setSearchText] = useState('');

    const handleDelete = useCallback((id: string) => {
        setData(prev => prev.filter(item => item.id !== id));
        message.success('Запись успешно удалена');
    }, [message]);

    const handleSave = useCallback((record: Omit<DataType, 'id'>, id?: string) => {
        if (id) {
            setData(prev => prev.map(item => (item.id === id ? { ...item, ...record } : item)));
            message.success('Запись успешно обновлена');
        } else {
            setData(prev => [...prev, { id: Date.now().toString(), ...record }]);
            message.success('Запись успешно добавлена');
        }
    }, [message]);

    const filteredData = useMemo(() => {
        if (!searchText) return data;
        const lowercasedSearchText = searchText.toLowerCase();
        return data.filter(({ name, date, value }) => {
            return (
                name.toLowerCase().includes(lowercasedSearchText) ||
                date.includes(lowercasedSearchText) ||
                value.toString().includes(lowercasedSearchText)
            );
        });
    }, [data, searchText]);

    return {
        data: filteredData,
        searchText,
        setSearchText,
        handleDelete,
        handleSave,
    };
}
