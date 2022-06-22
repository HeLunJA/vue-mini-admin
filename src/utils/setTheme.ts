export function setStyleVar(styleName: string, value: any, doc: HTMLElement) {
  doc.style.setProperty(styleName, value)
}
