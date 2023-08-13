import { useState, useRef, useEffect } from "react";
import { changeListTitle, submitNewListTitle } from "../store";
import { useDispatch, useSelector } from "react-redux";

function ListNameEdit({ name, id }) {
    const dispatch = useDispatch();
    const [listNameChangeOpen, setListNameChangeOpen] = useState(false);
    const inputRef = useRef(null);

    const newListName = useSelector((state) => {
        function findListById(data, id) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) return data[i].newListName;
            }
        }
        return findListById(state.lists.data, id);
    })

    const handleFormOpen = () => {
        dispatch(changeListTitle({ newListName: name, id }));
        setListNameChangeOpen(true);
    };

    const handleFormClose = () => {
        setListNameChangeOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleFormClose();
        dispatch(submitNewListTitle({ newListName, id }))
    }

    const handleListNameChange = (event) => {
        let term = event.target.value;
        dispatch(changeListTitle({ newListName: term, id }));
    }

    useEffect(() => {
        if (listNameChangeOpen) {
            inputRef.current.focus();
            inputRef.current.select();
        }

        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                handleFormClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [listNameChangeOpen]);

    if (!listNameChangeOpen) {
        return (
            <h2
                onClick={handleFormOpen}
                className="pl-2 pr-2 mb-2 text-lg font-semibold text-white cursor-pointer"
            >{name}</h2>
        )
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <input
                    className="rounded-md bg-slate-600 pl-2 mb-2 text-lg font-semibold text-white w-44 focus:outline-none focus:ring focus:border-blue-500"
                    type="text"
                    value={newListName}
                    onChange={handleListNameChange}
                    ref={inputRef}
                ></input>
            </form>
        )
    }
}

export default ListNameEdit;

