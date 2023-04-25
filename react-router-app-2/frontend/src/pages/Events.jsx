import { json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

export default function EventsPage() {
  const response = useLoaderData();
  const events = response.events;
  // if(response.isError){
  //   return <p>{response.message}</p>
  // }
  return <EventsList events={events} />;
}

export async function eventsLoader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events!'};
    // throw new Response(JSON.stringify({message: 'Could not fetch events!'}), status: 500)
    throw json({ message: "Could not fetch events!" }, { status: 500 });
  } else {
    return response;
  }
}
