import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import dayjs from 'dayjs';
import type { DataType } from '../types';

interface RecordModalProps {
    open: boolean;
    editingRecord: DataType | null;
    onSave: (record: Omit<DataType, 'id'>, id?: string) => void;
    onCancel: () => void;
}

const AddDataModal = ({ open, editingRecord, onSave, onCancel }: RecordModalProps) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            const formattedValues = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
            };
            onSave(formattedValues, editingRecord?.id);
            form.resetFields();
        });
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    useEffect(() => {
        if (open && editingRecord) {
            form.setFieldsValue({
                name: editingRecord.name,
                date: dayjs(editingRecord.date),
                value: editingRecord.value,
            });
        }
    }, [open, editingRecord]);

    return (
        <Modal
            title={editingRecord ? 'Редактировать запись' : 'Добавить запись'}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Сохранить"
            cancelText="Отмена"
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите имя!' },
                        { pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/, message: 'Имя должно содержать только буквы!' }
                    ]}
                >
                    <Input placeholder="Введите имя" />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Дата"
                    rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}
                >
                    <DatePicker className="w-full" format="YYYY-MM-DD" placeholder="Выберите дату" />
                </Form.Item>
                <Form.Item
                    name="value"
                    label="Числовое значение"
                    rules={[{ required: true, message: 'Пожалуйста, введите числовое значение!' }]}
                >
                    <InputNumber className="w-full" placeholder="Введите число" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddDataModal;
