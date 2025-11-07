


export const categories = new Map()

categories.set("test", "Тест")
categories.set("разработка", "Разработка")

export const getCategory = (category: string) => categories.get(category)
