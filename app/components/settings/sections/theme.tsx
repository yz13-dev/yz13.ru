import { useStore, useThemeStore } from "@/hooks/use-theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@yz13/ui/select";

const themes = [
  {
    "label": "Светлая",
    "value": "light"
  },
  {
    "label": "Темная",
    "value": "dark"
  },
  {
    "label": "Системная",
    "value": "system"
  }
]

export default function () {

  const theme = useStore(useThemeStore, (state) => state)

  return (
    <div className="w-full flex items-center justify-between">
      <span className="text-base font-mediun">Тема</span>
      <Select value={theme?.theme} onValueChange={theme?.setTheme}>
        <SelectTrigger>
          <SelectValue placeholder="Выберите тему" />
        </SelectTrigger>
        <SelectContent>
          {
            themes
              .map(theme => {
                return (
                  <SelectItem key={theme.value} value={theme.value}>{theme.label}</SelectItem>
                )
              })
          }
        </SelectContent>
      </Select>
    </div>
  )
}
