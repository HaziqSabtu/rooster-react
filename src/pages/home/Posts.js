import React from "react";
import { getPost } from "../../client/query";
import { useState, useEffect } from "react";
import { client } from "../../client/client";
import Post from "./Post";

const Posts = () => {
    const [query, setQuery] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const d = await client.fetch(getPost()).then((data) => {
                setQuery(data);
            });
        };

        fetchData();
    }, []);

    const showPost =
        query == null
            ? console.log("isNull")
            : query.map((item) => {
                  return <Post key={item._id} item={item} />;
              });

    return <div className='mt-3 flex flex-col'>{showPost}</div>;
};

export default Posts;
