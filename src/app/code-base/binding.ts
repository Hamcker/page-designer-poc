import { DatasourceParameter } from "./datasource-parameter";
import { PropertyDesign } from "./property-design";
import { TPropertyValue } from "./types";

export type TBindingSource = 'dataSource' | 'dataContext' | 'viewContext' | 'itemContext';
export type TBindingDirection = 'oneWayToSource' | 'oneWay' | 'once' | 'twoWay' | 'default';

export class Binding {
   $thisIsBinding?= true;
   source: TBindingSource;
   path?: string;
   parameters?: DatasourceParameter[];
   direction?: TBindingDirection = 'oneWay';

   constructor(options?: Partial<Binding>) {
      Object.assign(this, options);
      this.$thisIsBinding = true;
   }
}

// examples
const examples: Binding[] = [

   // binding to dataContext without any path
   // binding to whole DataContext object.
   new Binding({
      source: 'dataContext',
      path: ''
   }),

   // binding to dataContext with a relative path
   // binds to `person` property of parent element's DataContext.
   new Binding({
      source: 'dataContext',
      path: 'person'
   }),

   // binding to dataContext with an absolute path
   // can be used anywhere in visual tree to bind through root DataContext
   new Binding({
      source: 'dataContext',
      path: '^.employee.person'
   }),





   // binding to an element in viewContext
   new Binding({
      source: 'viewContext',
      path: '#name.value'
   }),

   // binding to an element in ui hierarchy (Binding to nearest Col element's `width` property)
   new Binding({
      source: 'viewContext',
      path: '^Col.width'
   }),

   // binding to parent in ui hierarchy (Binding to first parent element's `width` property)
   new Binding({
      source: 'viewContext',
      path: '^.width'
   }),





   // simple binding to datasource without parameters
   new Binding({
      source: 'dataSource',
      path: '12',
   }),

   // binding to datasource with static parameters
   new Binding({
      source: 'dataSource',
      path: '12',
      parameters: [
         new DatasourceParameter({
            name: 'groupId',
            valueType: 'static',
            value: 12
         }),
      ]
   }),

   // binding to datasource with dynamic parameters bound to view
   new Binding({
      source: 'dataSource',
      path: '12',
      parameters: [
         new DatasourceParameter({
            name: 'groupId',
            valueType: 'dynamic',
            value: new Binding({
               source: 'viewContext',
               path: '#name.value'
            })
         }),
      ]
   }),

   // binding to datasource with dynamic parameters bound to Workflow's dataContext
   new Binding({
      source: 'dataSource',
      path: '12',
      parameters: [
         new DatasourceParameter({
            name: 'groupId',
            valueType: 'dynamic',
            value: new Binding({
               source: 'dataContext',
               path: 'person.firstName'
            })
         }),
      ]
   }),

   // binding to datasource with dynamic parameters bound to Another datasource
   new Binding({
      source: 'dataSource',
      path: '12',
      parameters: [
         new DatasourceParameter({
            name: 'groupId',
            valueType: 'dynamic',
            value: new Binding({
               source: 'dataSource',
               path: '11'
            })
         }),
      ]
   }),

];
