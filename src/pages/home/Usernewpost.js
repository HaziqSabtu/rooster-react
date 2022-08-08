import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserApi } from "../../api/UserApi";
import { client } from "../../client/client";

import UploadImagebtn from "./UploadImagebtn";

const Usernewpost = () => {
    const navigate = useNavigate();
    const [userText, setUserText] = useState("");
    const [assetData, setAssetData] = useState(null);
    const currentUser = useContext(UserApi);
    const [isEmpty, setIsEmpty] = useState(true);
    const [warning, setWarning] = useState(false);

    // log user input
    const handleChange = (e) => {
        setUserText((oldVal) => e.target.value);
        if (userText.length <= 1) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
            setWarning(false);
        }
    };

    //check if text field are empty
    const handleEmpty = () => {
        setWarning(true);
    };

    // submit post to database
    const handleSubmit = () => {
        if (assetData && !isEmpty) {
            const doc = {
                _type: "posts",
                content: userText,
                image: {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: assetData._id,
                    },
                },
                userId: currentUser.currentUser[0]._id,
                postedBy: {
                    _type: "postedBy",
                    _ref: currentUser.currentUser[0]._id,
                },
            };
            client.create(doc).then(() => {
                navigate("/", { replace: true });
            });
            setUserText("");
        } else {
            const doc2 = {
                _type: "posts",
                content: userText,
                image: "none",
                userId: currentUser.currentUser[0]._id,
                postedBy: {
                    _type: "postedBy",
                    _ref: currentUser.currentUser[0]._id,
                },
            };

            client.create(doc2).then(() => {
                navigate("/", { replace: true });
            });
            setUserText("");
        }
    };

    return (
        <div>
            <div className='primary-color w-full shadow rounded-lg p-5 border-2'>
                {!warning ? (
                    <textarea
                        className='bg-gray-200 w-full rounded-lg shadow border p-2'
                        rows='4'
                        placeholder='Write Something Here'
                        onChange={handleChange}
                        value={userText}
                    ></textarea>
                ) : (
                    <textarea
                        className='bg-gray-200 w-full rounded-lg shadow border p-2 border-rose-500 placeholder-red-500'
                        rows='4'
                        placeholder='Write Something Here'
                        onChange={handleChange}
                        value={userText}
                    ></textarea>
                )}

                <div className='w-full flex flex-row flex-wrap flex-end items-stretch mt-3'>
                    <UploadImagebtn setAssetData={setAssetData} />
                    <div>
                        {isEmpty ? (
                            <button
                                type='disable'
                                onClick={handleEmpty}
                                className='float-right disabled-color text-white p-2 rounded-lg'
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                type='button'
                                onClick={handleSubmit}
                                className='float-right secondary-color hover:tertiary-color text-white p-2 rounded-lg'
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Usernewpost;
