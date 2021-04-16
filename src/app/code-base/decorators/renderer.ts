import { TemplateRef, Type, ViewContainerRef } from "@angular/core";

import { BaseRenderer } from "../base-renderer";
import { ElementDefinition } from "../element-definition";
import { RendererRepository } from "../repositories/renderer-repository";

export function renderer(toolboxElement: ElementDefinition) {
   return <T extends Type<BaseRenderer>>(constructor: T) => {
      RendererRepository.register({ toolboxElement, componentType: constructor });
   }
}
