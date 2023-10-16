import React from "react";
import { useState } from "react";
import { getTitleError, getTimeError } from "../errorHandler";
import Event from "./Event";
import EventModalBtnList from "./EventModalBtnList";
import FormHeader from "./FormHeader";
import EventModalTitle from "./EventModalTitle";
import EventModalTimeInput from "./EventModalTimeInput";
import FormFooter from "./FormFooter";
import EventModalTimeSettings from "./EventModalTimeSettings";
import EventModalNotifications from "./EventModalNotifications";
import EventModalVideoOptions from "./EventModalVideoOptions";
import SideInputField from "./EventModalSideInputField";
import AttachmentBtn from "./EventModalAttachmentBtn";
import UserInfo from "./EventModelUserInfo";
import SimpleBtn from "./EventModalSimpleBtn";

const EventModal = ({
  onCloseBtnClick,
  onSaveBtnClick,
}: {
  onCloseBtnClick: () => void;
  onSaveBtnClick: (event: Event) => void;
}) => {
  const endDate = new Date();
  endDate.setMinutes(new Date().getMinutes() + 30);

  const [event, setEvent] = useState<Event>({
    id: Date.now(),
    title: "",
    startDate: new Date(),
    endDate,
  });

  return (
    <section className="event-modal" id="event-modal">
      <form
        className="event-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !getTitleError(event.title) &&
            !getTimeError({
              endTime: new Date(event.endDate),
              startTime: new Date(event.startDate),
            })
          ) {
            onSaveBtnClick(event);
          }
        }}
      >
        <FormHeader onCloseBtnClick={onCloseBtnClick} />
        <section className="form-body">
          <span className="form-body__icons"></span>
          <EventModalTitle event={event} setEvent={setEvent} />
          <span className="form-body__icons"></span>
          <EventModalBtnList />
          <span className="form-body__icons material-symbols-outlined">
            access_time
          </span>
          <EventModalTimeInput event={event} setEvent={setEvent} />
          <span className="form-body__icons"></span>
          <EventModalTimeSettings />
          <span className="form-body__icons"></span>
          <EventModalNotifications />
          <span className="form-body__icons"></span>
          <div>
            <SimpleBtn value="Find a time" />
          </div>
          <span className="material-symbols-outlined"> group </span>
          <SideInputField placeholder="Add Guests" />
          <span className="material-symbols-outlined"> meeting_room </span>
          <EventModalVideoOptions />
          <span className="material-symbols-outlined"> videocam </span>
          <div>
            <SimpleBtn value="Add rooms" />
          </div>
          <span className="material-symbols-outlined"> location_on </span>
          <SideInputField placeholder="Add Location" />
          <span className="form-body__icons material-symbols-outlined">
            notes
          </span>
          <AttachmentBtn />
          <span className="material-symbols-outlined"> event </span>
          <UserInfo />
        </section>
        <FormFooter />
      </form>
    </section>
  );
};

export default EventModal;
