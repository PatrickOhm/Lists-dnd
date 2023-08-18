import { Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store";
import { Draggable } from "react-beautiful-dnd";
import { useRef } from "react";

function ListItem({ title, id, listId, index }) {
    const dispatch = useDispatch();
    const itemRef = useRef(null);
    const itemContainer = useRef(null);

    const handleItemDelete = () => {
        itemRef.current.classList.add('fadeout');
        setTimeout(() => {
            itemRef.current.classList.add('slideup');
            itemContainer.current.classList.add('mt-0')
            setTimeout(() => {
                dispatch(deleteItem({ id, listId }))
            }, 200)
        }, 200)
    }
    return (
        <Draggable draggableId={id} index={index} key={id}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={(el) => {
                        itemContainer.current = el;
                        provided.innerRef(el);
                    }}
                    className="mt-2"
                >
                    <li
                        ref={itemRef}
                        className="
                                group flex 
                                justify-between 
                                items-center
                                bg-slate-400 
                                rounded-md
                                h-10 
                                cursor-pointer
                                ease-linear
                                duration-200
                                "
                    >
                        <div
                            className="ml-2"
                        >{title}</div>
                        <div
                            onClick={handleItemDelete}
                            className="mr-2 transition duration-200 text-slate-400 group-hover:text-white
                                        "
                        ><Trash /></div>
                    </li>
                </div>
            )}
        </Draggable>
    )
};

export default ListItem;