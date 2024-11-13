<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function getEvents()
    {
        return Event::all();
    }
    
    public function getEvent($id)
    {
        return Event::find($id);
    }

    public function createEvent(Request $request)
    {
        $event = Event::create($request->all());
        return $event;
    }

    public function updateEvent(Request $request, $id)
    {
        $event = Event::find($id);
        $event->title = $request->title;
        $event->save();
        return $event;
    }

    public function deleteEvent($id)
    {
        $event = Event::find($id);
        $event->delete();
        return $event;
    }

    public function searchEvent($title)
    {
        return Event::where('title', 'like', '%'.$title.'%')->get();
    }
}
