import List from "./List";
import NewListBtn from "./NewListBtn";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { moveItem, moveList } from "../store";
import DeleteModal from "./DeleteModal";


function ListsList() {
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.lists.data);
    const isModalOpen = useSelector((state) => state.modal.isOpen);

    const handleOnDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;

        if (type === 'column') {
            const newLists = [...lists];
            const draggedList = lists.find(list => list.id === draggableId);
            newLists.splice(source.index, 1);
            newLists.splice(destination.index, 0, draggedList);

            dispatch(moveList({ newLists }));
            return;
        }

        const start = lists.find(list => list.id === source.droppableId);
        const finish = lists.find(list => list.id === destination.droppableId);
        const draggedItem = start.items.find(item => item.id === draggableId);

        if (start === finish) {
            const newItems = [...start.items];
            newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, draggedItem);

            const newList = {
                ...start,
                items: newItems
            };

            dispatch(moveItem({ newList, start }));
            return;
        }

        const newSourceItems = [...start.items];
        newSourceItems.splice(source.index, 1);

        const newSourceList = {
            ...start,
            items: newSourceItems
        };

        const newDestinationItems = [...finish.items];
        newDestinationItems.splice(destination.index, 0, draggedItem);

        const newDestinationList = {
            ...finish,
            items: newDestinationItems
        };

        dispatch(moveItem({ newSourceList, newDestinationList }));
    };

    const renderedLists = lists.map((list, index) => {
        return (
            <List
                items={list.items}
                key={list.id}
                id={list.id}
                name={list.listName}
                index={index}
            />
        )
    })

    return (
        <div className="inline-block">
            <div className={`flex ml-8 mt-8 ${isModalOpen ? 'blur-sm' : ''}`}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable
                        droppableId="all-lists"
                        direction="horizontal"
                        type="column">
                        {(provided) => (
                            <div className="flex"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {renderedLists}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <NewListBtn />
                <div className="p-1"></div>
            </div>
            {isModalOpen && <DeleteModal />}
        </div>
    )

}

export default ListsList;