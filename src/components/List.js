import ListForm from "./ListForm";
import ListItem from "./ListItem";
import ListNameEdit from "./ListNameEdit";
import { XCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { openModal } from "../store";
import { Droppable, Draggable } from "react-beautiful-dnd";


function List({ items, id, name, index }) {
    const dispatch = useDispatch();

    const handleListDelete = () => {
        dispatch(openModal({ id }));
    }

    const renderedItems = items.map((item, index) => {
        return (
            <ListItem
                title={item.title}
                id={item.id}
                listId={id}
                key={item.id}
                index={index}
            />
        )
    })
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="w-64 p-4 bg-slate-600 rounded-lg mr-4 self-start"
                >
                    <div
                        className="flex justify-between"
                        {...provided.dragHandleProps}
                    >
                        <ListNameEdit
                            name={name}
                            id={id}
                        />
                        <div
                            onClick={handleListDelete}
                            className="text-white mt-2 mr-0 cursor-pointer"
                        ><XCircle /></div>
                    </div>
                    <Droppable droppableId={id} type="item">
                        {(provided) => (
                            <ul
                                className="text-white"
                                ref={provided.innerRef}
                                {...provided.droppableProps}

                            >
                                {renderedItems}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                    <ListForm
                        id={id}
                    />
                </div>
            )}
        </Draggable>
    )
}

export default List;