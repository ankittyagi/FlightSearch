
export class CommonUtility {
   public static throttle(delay: number, fn) {
      let lastCall = 0;
      return function (...args) {
        const now = (new Date).getTime();
        if (now - lastCall < delay) {
           console.log('no call');
          return;
        }
        lastCall = now;
        console.log(' called');
        return fn(...args);
      };
   }

}
