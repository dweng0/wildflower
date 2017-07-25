
export class DomHandler {
      defaultElementId: string = 'gui';
      private element: HTMLElement;
      constructor(id?: string) {
            console.log('Wildflower launched');
            let elementId = (id) ? id : this.defaultElementId
            this.element = document.getElementById(elementId);
      }

      getCanvas(): HTMLElement {
            return this.element;
      }
}