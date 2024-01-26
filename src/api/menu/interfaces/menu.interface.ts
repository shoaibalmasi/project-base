interface NestedMenuObject {
    id: number,
    pid: number,
    name: string,
    description: string,
    service: string,
    icon: string,
    children?: NestedMenuObject[];
  }