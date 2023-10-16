import { Event } from "./event.js";
import { useReducer, Reducer, useCallback, useMemo } from "react";
import { NavDirection } from "./commonTypes.js";
import { unreachable } from "./utils.js";
import { splitEvent, SplitEvent } from "./utils.js";

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

const getMonthOffset = (direction: NavDirection) => {
  switch (direction) {
    case NavDirection.Next:
      return 1;

    case NavDirection.Prev:
      return -1;

    default:
      unreachable(direction);
  }
};

const getWeekOffset = (direction: NavDirection) => {
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

  const weekStartDate = new Date(getDisplayDate().getTime());
  weekStartDate.setDate(getDisplayDate().getDate() - getDisplayDate().getDay());

  const weekEndDate = new Date(getDisplayDate().getTime());
  weekEndDate.setDate(weekEndDate.getDate() + 6 - getDisplayDate().getDay());

  const getWeekEvents = useMemo(
    () =>
      getEvents()
        .filter((event) => {
          return (
            event.startDate <= weekEndDate && event.endDate >= weekStartDate
          );
        })
        .reduce((acc, event) => {
          return [...acc, ...splitEvent(event)];
        }, [] as SplitEvent[])
        .filter((event) => {
          return (
            event.displayStartTime <= weekEndDate &&
            event.displayEndTime >= weekStartDate
          );
        }),
    [getEvents(), getDisplayDate()]
  );

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
      prop: getMonthOffset(offset),
    });
  }

  function changeWeek(offset: NavDirection) {
    dispatch({
      type: "changeWeek",
      prop: getWeekOffset(offset),
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
    getWeekEvents,
  };
};

export default useAppState;
