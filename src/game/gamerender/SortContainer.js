import * as PIXI from "pixi.js"

export default class SortContainer extends PIXI.Container {
    addChildZ(container, zOrder) {
      container.zOrder = zOrder || 0;
      container.arrivalOrder = this.children.length;
      this.addChild(container);
      this.sortChildren();
    }
   
    sortChildren() {
      const _children = this.children;
      let len = _children.length, i, j, tmp;
      for (i = 1; i < len; i++) {
        tmp = _children[i];
        j = i - 1;
        while (j >= 0) {
          if (tmp.zOrder < _children[j].zOrder) {
            _children[j + 1] = _children[j];
          } else if (tmp.zOrder === _children[j].zOrder && tmp.arrivalOrder < _children[j].arrivalOrder) {
            _children[j + 1] = _children[j];
   
          } else {
            break;
          }
          j--;
        }
        _children[j + 1] = tmp;
      }
    };
  }