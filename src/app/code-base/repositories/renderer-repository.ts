import { ToolboxElement } from "../toolbox-element";
import { Type } from "@angular/core";

export interface IRenderer {
   toolboxElement: ToolboxElement;
   componentType: Type<any>;
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
}
