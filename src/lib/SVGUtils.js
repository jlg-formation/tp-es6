export const SVGNS = 'http://www.w3.org/2000/svg';

export class SVGUtils {
  static getCoordinates(event) {
    const e = event.target;
    const dim = e.getBoundingClientRect();
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;
    return { x, y };
  }

  static addGroup(parent, name) {
    const group = document.createElementNS(SVGNS, 'g');
    group.setAttribute('class', name);
    parent.appendChild(group);
    return group;
  }

  static removeAllChildren(group) {
    while (group.firstChild) {
      group.removeChild(group.firstChild);
    }
  }
}
