import React, { useState, useEffect } from 'react';
import '../styles/saved.css';

interface DataItem {
    id: number;
    text: string;
    showFullText: boolean;
}

const TableComponent: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/saved_messages')
            const data: DataItem[] = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const toggleFullText = (id: number) => {
        const newData = data.map((item) => {
            if (item.id === id) {
                return { ...item, showFullText: !item.showFullText };
            }
            return item;
        });
        setData(newData);
    };

    return (
        <div className='table-container'>
            {data.length > 0 ? (
                renderData(data, toggleFullText)
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

const renderData = (data: DataItem[], toggleFullText: (id: number) => void) => {
    const maxPreviewLength = 30;
    const items = [];

    for (let i = 0; i < data.length; i++) {
        const previewText = data[i].text.length > maxPreviewLength
            ? data[i].text.substring(0, maxPreviewLength) + '...' 
            : data[i].text;
        const divContent = data[i].showFullText ? data[i].text : previewText;
        items.push(
        <div 
            key={data[i].id} 
            className={`bubble ${data[i].showFullText ? 'full-text' : ''}`} 
            onClick={() => toggleFullText(data[i].id)}
            >
                {divContent}
        </div>);
    }
    return items;
};

export default TableComponent;

