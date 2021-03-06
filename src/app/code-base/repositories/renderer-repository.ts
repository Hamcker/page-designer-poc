import { TemplateRef, Type, ViewContainerRef } from "@angular/core";

import { ElementDefinition } from "../element-definition";

export interface IRenderer {
   toolboxElement: ElementDefinition;
   componentType: Type<any>;
   templateRef?: TemplateRef<any>;
}


export class RendererRepository {
   static repository: { [i: string]: IRenderer } = {};

   static register(renderer: IRenderer): void {
      if (!renderer?.toolboxElement?.name || !renderer?.componentType) return;
      if (this.repository[renderer.toolboxElement.name]) return;

      this.repository[renderer.toolboxElement.name] = renderer;
   }

   static get(name: string): IRenderer | null {
      return this.repository[name];
   }

   static registerViewContainerRef(toolboxElement: ElementDefinition, templateRef: TemplateRef<any>) {
      const renderer = this.get(toolboxElement.name);
      if (!renderer) return;

      renderer.templateRef = templateRef;
   }
}
