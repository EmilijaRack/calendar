import { Event } from "./event.js";
import { useReducer, Reducer, useCallback } from "react";
import { NavDirection } from "./commonTypes.js";
import { unreachable } from "./utils.js";
import { SplitEvent } from "./Components/MainCalendar.js";

interface initialState {
  displayDate: Date;
  displaySideCalDate: Date;
  events: SplitEvent[] | Event[];
}

type ActionType =
  | { type: "updateEvents"; prop: Event[] }
  | { type: "addEvent"; prop: Event }
  | { type: "removeEvent"; prop: number }
  | { type: "changeWeek"; prop: number }
  | { type: "changeMonth"; prop: number };

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

    case "changeMonth": {
      return {
        ...state,
        displaySideCalDate: new Date(
          state.displaySideCalDate.getFullYear(),
          state.displaySideCalDate.getMonth() + action.prop
        ),
      };
    }

    case "changeWeek": {
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

const useAppState = () => {
  const [state, dispatch] = useReducer<Reducer<initialState, ActionType>>(
    reducer,
    {
      displayDate: new Date(),
      displaySideCalDate: new Date(),
      events: [],
    }
  );

  const getDisplayDate = useCallback(() => {
    return state.displayDate;
  }, [state.displayDate]);

  const getEvents = useCallback((): SplitEvent[] | Event[] => {
    return state.events;
  }, [state.events]);

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

  function changeMonth(offset: NavDirection) {
    dispatch({
      type: "changeMonth",
      prop: offset === NavDirection.Next ? 1 : -1,
    });
  }

  function changeWeek(offset: NavDirection) {
    dispatch({
      type: "changeWeek",
      prop: getOffset(offset),
    });
  }

  return {
    getDisplayDate,
    updateEvents,
    addEvent,
    removeEvent,
    changeWeek,
    changeMonth,
    getSideCalDisplayDate,
    getEvents,
  };
};

export default useAppState;
