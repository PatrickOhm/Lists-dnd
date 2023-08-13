import { useDispatch, useSelector } from "react-redux";
import { addList, changeNewListTerm } from "../store";
import { useRef, useEffect } from "react";


function NewListForm({ onFormClose }) {
    const dispatch = useDispatch();
    const term = useSelector((state) => {
        return state.form.newListTerm
    })

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleListNameChange = (event) => {
        dispatch(changeNewListTerm(event.target.value))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (term) {
            dispatch(addList({
                listName: term,
                items: []
            }));
            onFormClose();
        }
    }

    return (
        <div className="w-64 p-4 bg-slate-600 rounded-lg mr-4 self-start">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="w-full rounded-md p-2 text-slate-700 focus:outline-none"
                    placeholder="New list name ..."
                    onChange={handleListNameChange}
                    value={term}
                    ref={inputRef}
                ></input>
                <div className="flex space-x-2">
                    <button
                        className="rounded-md bg-slate-500 p-2 w-1/2 mt-2 text-white"
                        onClick={handleSubmit}
                    >Add list</button>
                    <button
                        className="rounded-md bg-orange-400 p-2 w-1/2 mt-2 text-white"
                        onClick={onFormClose}
                    >Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default NewListForm;