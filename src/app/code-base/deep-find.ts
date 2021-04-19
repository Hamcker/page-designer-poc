export function deepFindValue(obj: object, path: string): any {
   if (!path) return obj;

   const paths = path.split('.');
   let current = obj;
   let i: number;

   for (i = 0; i < paths.length; ++i) {
      if (current[paths[i]] == undefined) {
         return undefined;
      } else {
         current = current[paths[i]];
      }
   }
   return current;
}
