import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventsPage() {
  const { events } = useLoaderData();
  // const events = response.events;
  // // if(response.isError){
  // //   return <p>{response.message}</p>
  // // }
  // return <EventsList events={events} />;
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events!'};
    // throw new Response(JSON.stringify({message: 'Could not fetch events!'}), status: 500)
    throw json({ message: "Could not fetch events!" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function eventsLoader() {
  // to defer loading to page till all data is acquired
  return defer({
    events: loadEvents(),
  });
}
