import { Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store";
import { Draggable } from "react-beautiful-dnd";

function ListItem({ title, id, listId, index }) {
    const dispatch = useDispatch();

    const handleItemDelete = () => {
        dispatch(deleteItem({ id, listId }))
    }
    return (
        <Draggable draggableId={id} index={index} key={id}>
            {(provided) => (
                <li
                    className="group flex justify-between bg-slate-400 rounded-md p-2 mt-2 cursor-pointer"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div>{title}</div>
                    <div
                        onClick={handleItemDelete}
                        className="mt-1 transition text-slate-400 group-hover:text-white"
                    ><Trash /></div>
                </li>
            )}
        </Draggable>
    )
};

export default ListItem;