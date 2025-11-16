import stacks from "../stack";



export const getStack = (id: string) => stacks.find(item => item.id === id);
