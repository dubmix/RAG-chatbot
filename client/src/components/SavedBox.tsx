import React, { useState, useEffect } from 'react';
import '../styles/savedbox.css';
import { DateTime } from 'luxon';
import { apiBaseHost, apiBasePort } from '../App.tsx';


const UPDATE_INTERVAL_SECONDS = 0.1;

interface DataItem {
    id: number;
    text: string;
    showFullText: boolean;
    date: string;
}

const RelativeTimeText = ({ date } : DateTime) => {

    const calculateRelativeTime = (createdAt: DateTime): string => {
        const diff = DateTime.now().toSeconds() - createdAt.toSeconds();

        if (diff < 60) {
            return 'Just now';
        }
        return date.toRelative() as string;
    };

    const [relativeTime, setRelativeTime] = useState(calculateRelativeTime(date));

    useEffect(() => {
        const interval = setInterval(() => 
            setRelativeTime(calculateRelativeTime(date)), 1000 * UPDATE_INTERVAL_SECONDS);
        return () => clearInterval(interval);
        }, [calculateRelativeTime]);

    return (
        <span>{relativeTime}</span>
    );
}

const renderDate = (createdAt: string) => {
    return (<RelativeTimeText date={DateTime.fromISO(createdAt)} />)
};

const SavedBox: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiBaseHost}:${apiBasePort}/api/saved_messages`)
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
        <div className='savedbox-container'>
            {data.length > 0 ? (
                renderData(data, toggleFullText)
            ) : (
                <div className="data-empty">No saved messages</div>
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
        items.push( // @ts-ignore
        <>
        <div className="bubble-container">
            <div className="date">
                {renderDate(data[i].date)}
            </div>
            <div 
                key={data[i].id} 
                className={`bubble ${data[i].showFullText ? 'full-text' : ''}`} 
                onClick={() => toggleFullText(data[i].id)}
                >
                    {divContent}
            </div>
        </div>
        </>);
    }
    return items;
};

export default SavedBox;

