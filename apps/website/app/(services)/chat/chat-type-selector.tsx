import { Pricing } from "@/types/pricing";
import ChatTypeButton from "./chat-type-button";

const ChatTypeSelector = ({ services = [] }: { services?: Pricing[] }) => {
  return (
    <div className="flex items-start gap-1 flex-wrap">
      {services.map((service) => {
        return (
          <ChatTypeButton key={service.type} type={service.type as string}>
            {service.name}
          </ChatTypeButton>
        );
      })}
    </div>
  );
};

export default ChatTypeSelector;
