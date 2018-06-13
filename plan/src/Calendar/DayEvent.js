import React from 'react';
import { Link } from 'react-router-dom';

const DayEvent = ({ event }) => {

  let icon = "";
  switch (event.category) {
    case "Dom":
      icon = "fa fa-home";
      break;
    case "Praca":
      icon = "fa fa-bank";
      break;
    case "Sport":
      icon = "fa fa-futbol-o";
      break;
    case "Studia":
      icon = "fa fa-graduation-cap";
      break;
    case "Zakupy":
      icon = "fa fa-shopping-basket";
      break;
    case "Zdrowie":
      icon = "fa fa-heartbeat";
      break;
    case "Inna":
      icon = "fa fa-cogs";
      break;
    default:
      icon = "fa fa-cogs";
      break;
  }
  let updateLink = "/updatetask/" + event.id;
  return (
    <div >
      <p className="title">{event.title}</p>
      <p className="category"><span className={icon}></span> {event.category}</p>
      <h4 className="person">{event.person}</h4>
      <Link to={updateLink}>Edytuj</Link>
    </div>
  );
};
export default DayEvent;
