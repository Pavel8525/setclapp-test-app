import dayjs from 'dayjs';
import { DataType } from '../types';

const sortByName = (a: DataType, b: DataType) => a.name.localeCompare(b.name);

const sortByDate = (a: DataType, b: DataType) => dayjs(a.date).unix() - dayjs(b.date).unix();

const sortByValue = (a: DataType, b: DataType) => a.value - b.value;

export {
    sortByName,
    sortByDate,
    sortByValue,
}