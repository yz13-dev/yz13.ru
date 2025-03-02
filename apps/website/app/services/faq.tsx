import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "mono/components/accordion";

const FAQ = () => {
  return (
    <>
      <div className="w-full">
        <div className="max-w-screen-2xl w-full md:divide-x divide-x-0 md:divide-y-0 divide-y mx-auto border-x flex md:flex-row flex-col">
          <div className="md:w-1/4 w-full p-3">
            <h3 className="text-center text-3xl font-semibold">Есть вопрос?</h3>
          </div>
          <Accordion
            type="multiple"
            collapsible
            className="md:w-3/4 w-full *:px-3"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-xl text-start">
                Какую услугу выбрать для первого раза?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                "Страницы", идеальный вариант для первого раза.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold text-xl text-start">
                Is it styled?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold text-xl text-start">
                Is it animated?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FAQ;
