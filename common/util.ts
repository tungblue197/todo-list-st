import { ITEM } from './constants';
import { Todo } from '../hooks/todoList';

export function getDataFormLocalStorage(){
    const jsonData = localStorage.getItem(ITEM)
    if(jsonData) return JSON.parse(jsonData)
    return null
}

export function saveToLocalStoreage(data?: Array<Todo>){
    localStorage.setItem(ITEM, JSON.stringify(data))
}

export function generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const formatDate = (date: Date | string |undefined) => {
    if(!date) return ''
    if(typeof date === 'string') date = new Date(date)
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }
