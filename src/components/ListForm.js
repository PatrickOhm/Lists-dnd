import { useDispatch, useSelector } from "react-redux";
import { addItem, changeItemTerm } from "../store";
import { useRef, useEffect } from "react";

function ListForm({ id }) {
    const dispatch = useDispatch();
    const newItemTerm = useSelector((state) => {
        function findListById(data, id) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) return data[i].newItemTerm;
            }
        }
        return findListById(state.lists.data, id) || "";
    });

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleItemNameChange = (event) => {
        let term = event.target.value;
        dispatch(changeItemTerm({
            id: id,
            term: term
        }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newItemTerm) {
            dispatch(addItem({
                title: newItemTerm,
                id: id
            }));
        }
        inputRef.current.focus();
    };

    return (
        <div className="flex space-x-2">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="w-44 rounded-md mt-4 p-2 text-slate-700 focus:outline-none"
                    placeholder="Add an item ..."
                    onChange={handleItemNameChange}
                    value={newItemTerm}
                    ref={inputRef}
                ></input>
                <button
                    onClick={handleSubmit}
                    className="transition rounded-full w-10 p-2 mt-4 ml-2 bg-slate-400 text-white cursor-pointer hover:bg-orange-400"
                >+</button>
            </form>
        </div>
    )
}

export default ListForm;