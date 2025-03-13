import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mono/components/select";

const ChatRequestSelector = () => {
  return (
    <Select defaultValue="work-request">
      <SelectTrigger className="w-56">
        <SelectValue defaultValue="Выберите тип запроса" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="work-request">Запрос на разработку</SelectItem>
        <SelectItem value="ask-question">Задать вопрос</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ChatRequestSelector;
