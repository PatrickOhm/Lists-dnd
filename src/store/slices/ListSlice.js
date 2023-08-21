import { createSlice, nanoid } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: 'lists',
    initialState: {
        data: [],
    },
    reducers: {
        addList(state, action) {
            state.data.push({
                listName: action.payload.listName,
                items: action.payload.items,
                id: nanoid(),
                newItemTerm: '',
                newListName: action.payload.listName
            });
        },
        changeItemTerm(state, action) {
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.payload.id) {
                    state.data[i].newItemTerm = action.payload.term;
                }
            }
        },

        addItem(state, action) {
            const list = state.data.find(item => item.id === action.payload.id);
            if (list) {
                list.items.push({
                    title: action.payload.title,
                    id: nanoid(),
                    dragged: false
                });
                list.newItemTerm = '';
            }
        },

        deleteItem(state, action) {
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.payload.listId) {
                    const updatet = state.data[i].items.filter((item) => {
                        return item.id !== action.payload.id;
                    });
                    state.data[i].items = updatet;
                }
            }
        },

        deleteList(state, action) {
            const updated = state.data.filter((list) => {
                return list.id !== action.payload.listId;
            });
            state.data = updated;
        },

        changeListTitle(state, action) {
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.payload.id) {
                    state.data[i].newListName = action.payload.newListName;
                }
            }
        },

        submitNewListTitle(state, action) {
            const list = state.data.find(list => list.id === action.payload.id);
            if (list) {
                list.listName = action.payload.newListName;
            }
        },

        moveItem(state, action) {
            if (action.payload.start) {
                const indexOfItemToMove = state.data.findIndex(item => item.id === action.payload.start.id);

                if (indexOfItemToMove !== -1) {
                    const newData = [...state.data];
                    newData.splice(indexOfItemToMove, 1, action.payload.newList);

                    state.data = newData;
                }
            } else {
                const indexOfSourceList = state.data.findIndex(list => list.id === action.payload.newSourceList.id);
                const indexOfDestinationList = state.data.findIndex(list => list.id === action.payload.newDestinationList.id);

                if (indexOfSourceList !== -1 && indexOfDestinationList !== -1) {
                    const newData = [...state.data];
                    newData.splice(indexOfSourceList, 1, action.payload.newSourceList);
                    newData.splice(indexOfDestinationList, 1, action.payload.newDestinationList);

                    state.data = newData;
                }
            }
        },

        moveList(state, action) {
            state.data = action.payload.newLists;
        }
    }
});

export const {
    addItem,
    addList,
    changeItemTerm,
    deleteItem,
    deleteList,
    changeListTitle,
    submitNewListTitle,
    moveItem,
    moveList
} = listSlice.actions;

export const listReducer = listSlice.reducer;