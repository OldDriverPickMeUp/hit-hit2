import { Subject, interval } from "rxjs";

class Press {
  constructor() {
    this.targetRef = null;
    this.onPress = null;
    this.subject = new Subject();
    const seconds = interval(100);
    this.pressing = false;
    this.startTs = performance.now();
    this.result = seconds.subscribe(() => {
      if (performance.now() - this.startTs < 200) return;
      if (this.pressing) {
        this.onPress && this.onPress();
      }
    });
  }

  onTouchStart = () => {
    this.pressing = true;
    this.startTs = performance.now();
  };

  onTouchMove = (e) => {
    if (!this.targetRef.current) {
      this.pressing = false;
      return;
    }
    const {
      bottom,
      top,
      left,
      right,
    } = this.targetRef.current.getBoundingClientRect();
    const touches = e.targetTouches;
    for (let { clientX, clientY } of touches) {
      if (clientX < left || clientX > right) {
        this.pressing = false;
        return;
      }
      if (clientY < top || clientY > bottom) {
        this.pressing = false;
        return;
      }
    }
  };
  onTouchEnd = () => {
    this.pressing = false;
  };
  onTouchCancel = () => {
    this.pressing = false;
  };

  onMouseDown = () => {
    this.pressing = true;
    this.startTs = performance.now();
  };

  onMouseLeave = () => {
    if (performance.now() - this.startTs < 100) {
      this.onPress && this.onPress();
    }
    this.pressing = false;
  };
  onMouseUp = () => {
    if (performance.now() - this.startTs < 100) {
      this.onPress && this.onPress();
    }
    this.pressing = false;
  };

  unsubscribe() {
    this.result.unsubscribe();
  }
}

export default Press;
