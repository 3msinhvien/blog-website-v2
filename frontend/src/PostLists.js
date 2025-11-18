import React from "react";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

export default function PostLists() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const URL = "http://localhost:8080/api/posts"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching the data.");
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <ul>
            {data.map((d) => (
                <li key={d.slug}>
                    <Link to={`/posts/${d.slug}`}>
                        <h3>{d.title}</h3>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
