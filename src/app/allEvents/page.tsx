import React from "react";

const AllEvents = async () => {
  const res = await fetch("http://localhost:5000/events");
  const events = await res.json();
  console.log(events);
  return <div>AllEvents</div>;
};

export default AllEvents;
