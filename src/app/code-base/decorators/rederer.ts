import { RendererRepository } from "../repositories/renderer-repository";
import { ToolboxElement } from "../toolbox-element";
import { Type } from "@angular/core";

export function renderer(toolboxElement: ToolboxElement) {
   return <T extends Type<any>>(constructor: T) => {
      RendererRepository.register({ toolboxElement, componentType: constructor });
   }
}
