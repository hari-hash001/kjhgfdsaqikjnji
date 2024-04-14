import React, { Component } from 'react';
import { DayPilot, DayPilotMonth } from "@daypilot/daypilot-lite-react";
import "./cobSchedule.css";

 
class cobSchedule extends Component {
 
  constructor(props) {
    super(props);
 
    this.calendarRef = React.createRef();
 
    this.state = {
      eventHeight: 30,
      headerHeight: 30,
      cellHeaderHeight: 25,
      onBeforeEventRender: args => {
        args.data.borderColor = "darker";
        if (args.data.backColor) {
          args.data.barColor = DayPilot.ColorUtil.darker(args.data.backColor, -1);
        }
      },
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: args => {
              const e = args.source;
              this.calendar.events.remove(e);
            }
          },
          {
            text: "-"
          },
          {
            text: "Blue",
            icon: "icon icon-blue",
            color: "#3d85c6",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Green",
            icon: "icon icon-green",
            color: "#6aa84f",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Yellow",
            icon: "icon icon-yellow",
            color: "#ecb823",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Red",
            icon: "icon icon-red",
            color: "#d5663e",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Auto",
            color: null,
            onClick: args => this.updateColor(args.source, args.item.color)
          },
        ]
      }),
      onTimeRangeSelected: async args => {
        const { start, end } = args;
        const selectedDate = new Date(start.getTime()).toISOString().substring(0, 10); // Extract the selected date in 'YYYY-MM-DD' format
 
        // Check if the selected date is disabled
        if (this.state.disabledDays.includes(selectedDate)) {
          alert("Events cannot be created on disabled days.");
          return;
        }
 
        // Prompt the user to create a new event
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
 
        this.calendar.clearSelection();
        if (!modal.result) {
          return;
        }
        this.calendar.events.add({
          start: start,
          end: end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      disabledDays: ["2022-11-01", "2022-11-10", "2022-11-20"]
    };
  }
 
  updateColor(e, color) {
    e.data.backColor = color;
    this.calendar.events.update(e);
  }
 
  get calendar() {
    return this.calendarRef.current.control;
  }
 
  render() {
    return (
      <div>
        <DayPilotMonth
          {...this.state}
          ref={this.calendarRef}
        />
 
      </div>
    );
  }
}
 
export default cobSchedule;