import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

export function createEvent(eventType, payload = {}) {
  return { type: eventType, payload };
}

class EventManager {
  static _instance = null;

  constructor() {
    this._subject = this._createSubject();
  }

  _createSubject() {
    const subject = new Subject();
    subject.pipe(debounceTime(300));
    return subject;
  }

  subscribe(eventType, handler) {
    return this._subject.subscribe({
      next: e => e.type === eventType && handler(e)
    });
  }

  dispatch(event) {
    this._subject.next(event);
  }

  static get instance() {
    if (EventManager._instance === null) {
      EventManager._instance = new EventManager();
    }
    return EventManager._instance;
  }
}

export default EventManager;
