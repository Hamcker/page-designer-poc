import { Binding, TBindingSource } from 'src/app/code-base/binding';
import { Component, OnInit } from '@angular/core';
import { TPropertyValue, TPropertyValueType } from 'src/app/code-base/types';

import { ElementInstance } from 'src/app/code-base/element-instance';
import { PageDesignService } from 'src/app/services/page-design.service';
import { PropertyDesign } from 'src/app/code-base/property-design';
import { PropertyPrptotype } from 'src/app/code-base/property-prototype';

@Component({
   selector: 'app-element-properties',
   templateUrl: './element-properties.component.html',
   styleUrls: ['./element-properties.component.scss']
})
export class ElementPropertiesComponent implements OnInit {

   selectedElement: ElementInstance;

   constructor(
      private pageDesignService: PageDesignService,
   ) { }

   ngOnInit(): void {
      this.pageDesignService.getSelectedItem().subscribe(selectedItem => this.onSelectedItemChange(selectedItem));
   }

   onSelectedItemChange(element: ElementInstance) {
      this.selectedElement = element;
   }


   getValueType(propertyDef: PropertyPrptotype): TPropertyValueType {
      return this.getProperty(this.selectedElement, propertyDef.name)?.valueType;
   }
   setValueType(propertyDef: PropertyPrptotype, valueType: TPropertyValueType): void {
      const property = this.getProperty(this.selectedElement, propertyDef.name);
      property.valueType = valueType

      if (valueType === 'dynamic') {
         property.value = new Binding();
      } else {
         property.value = null;
      }

      this.onPropertyChange();
   }


   getBindindSource(propertyDef: PropertyPrptotype): TBindingSource {
      const property = this.getProperty(this.selectedElement, propertyDef.name);
      if (property?.valueType === 'static') return null;
      return (property?.value as Binding)?.source;
   }
   setBindindSource(propertyDef: PropertyPrptotype, value: TBindingSource): void {
      const property = this.getProperty(this.selectedElement, propertyDef.name);
      if (property?.valueType === 'static') return null;
      (property?.value as Binding).source = value;

      this.onPropertyChange();
   }


   getStaticVaue(propertyDef: PropertyPrptotype): Exclude<TPropertyValue, Binding> {
      return this.getProperty(this.selectedElement, propertyDef.name)?.value;
   }
   setStaticValue(propertyDef: PropertyPrptotype, value: Exclude<TPropertyValue, Binding>): void {
      this.getProperty(this.selectedElement, propertyDef.name).value = value;

      this.onPropertyChange();
   }


   getDynamicValuePath(propertyDef: PropertyPrptotype): string {
      const property = this.getProperty(this.selectedElement, propertyDef.name);
      if (property.valueType === 'static') return null;
      return (property?.value as Binding)?.path;
   }
   setDynamicValuePath(propertyDef: PropertyPrptotype, value: any): void {
      const property = this.getProperty(this.selectedElement, propertyDef.name);
      if (property.valueType === 'static') return;
      (property.value as Binding).path = value;

      this.onPropertyChange();
   }

   private getProperty(element: ElementInstance, key: string): PropertyDesign {
      return element.properties.find(x => x.definition.name === key);
   }

   private onPropertyChange() {
      this.pageDesignService.layoutChange.next();
   }
}
