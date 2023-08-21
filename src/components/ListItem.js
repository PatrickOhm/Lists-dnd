import { Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useRef } from "react";

function ListItem({ title, id, listId, index, dragged }) {
    const dispatch = useDispatch();
    const itemRef = useRef(null);
    const itemContainer = useRef(null);

    const handleItemDelete = () => {
        itemRef.current.classList.remove('fadein')
        itemRef.current.classList.add('fadeout');
        setTimeout(() => {
            itemRef.current.classList.add('slideup');
            itemContainer.current.className = 'ease-linear duration-200 mt-0';
            setTimeout(() => {
                dispatch(deleteItem({ id, listId }))
            }, 200)
        }, 200)
    }

    useEffect(() => {
        if (!dragged) {
            itemRef.current.classList.add('ease-linear');
            itemRef.current.classList.add('duration-200');
            itemRef.current.classList.add('h-10');
            setTimeout(() => {
                itemRef.current.classList.add('fadein');
                itemRef.current.classList.remove('fadeout');
            }, 200);
        } else {
            itemRef.current.classList.add('fadein');
            itemRef.current.classList.add('h-10');
        }
    }, [dragged]);

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
                                fadeout
                                
                                cursor-pointer
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