import { Event } from "../event.js";
import { useReducer, Reducer } from "react";
import { NavDirection } from "./commonTypes.js";
import { unreachable } from "./utils.js";

interface initialState {
  displayDate: Date;
  displaySideCalDate: Date;
  events: Event[];
}

type ActionType =
  | { type: "updateEvents"; prop: Event[] }
  | { type: "addEvent"; prop: Event }
  | { type: "removeEvent"; prop: number }
  | { type: "addDirection"; prop: number }
  | { type: "addSideCalDirection"; prop: number };

const reducer = (state: initialState, action: ActionType): initialState => {
  switch (action.type) {
    case "updateEvents": {
      return { ...state, events: action.prop };
    }
    case "addEvent": {
      return { ...state, events: [...state.events, action.prop] };
    }

    case "removeEvent": {
      return {
        ...state,
        events: state.events.filter(
          (event: { id: number }) => event.id !== action.prop
        ),
      };
    }

    case "addSideCalDirection": {
      return {
        ...state,
        displaySideCalDate: new Date(
          state.displaySideCalDate.getFullYear(),
          state.displaySideCalDate.getMonth() + action.prop
        ),
      };
    }

    case "addDirection": {
      return {
        ...state,
        displayDate: new Date(
          state.displayDate.getFullYear(),
          state.displayDate.getMonth(),
          state.displayDate.getDate() + action.prop
        ),
        displaySideCalDate: state.displayDate,
      };
    }

    default:
      return state;
  }
};

const getOffset = (direction: NavDirection) => {
  switch (direction) {
    case NavDirection.Next:
      return 7;

    case NavDirection.Prev:
      return -7;

    default:
      unreachable(direction);
  }
};

const useAppState = (props: initialState) => {
  const { displayDate, displaySideCalDate, events } = props;

  const [state, dispatch] = useReducer<Reducer<initialState, ActionType>>(
    reducer,
    {
      displayDate: displayDate ?? new Date(),
      displaySideCalDate: displaySideCalDate ?? new Date(),
      events: events ?? [],
    }
  );

  const getDisplayDate = () => {
    return state.displayDate;
  };

  const getSideCalDisplayDate = () => {
    return state.displaySideCalDate;
  };

  const updateEvents = (events: Event[]) => {
    dispatch({ type: "updateEvents", prop: events });
  };

  const addEvent = (event: Event) => {
    dispatch({ type: "addEvent", prop: event });
  };

  const removeEvent = (id: number) => {
    dispatch({ type: "removeEvent", prop: id });
  };

  function addSideCalDirection(offset: NavDirection) {
    dispatch({
      type: "addSideCalDirection",
      prop: offset ? offset : offset - 1,
    });
  }

  function addDirection(offset: NavDirection) {
    dispatch({
      type: "addDirection",
      prop: getOffset(offset),
    });
  }

  return {
    getDisplayDate,
    updateEvents,
    addEvent,
    removeEvent,
    addDirection,
    addSideCalDirection,
    getSideCalDisplayDate,
  };
};

export default useAppState;
