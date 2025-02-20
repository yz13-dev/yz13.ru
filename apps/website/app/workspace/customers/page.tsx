import { get } from "@vercel/edge-config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "mono/components/table";

const customers = [
  {
    id: "USR001",
    email: "vladimir@example.com",
    totalAmount: 2500.0,
    totalProjects: 3,
  },
  {
    id: "USR002",
    email: "john@example.com",
    totalAmount: 1500.0,
    totalProjects: 2,
  },
  {
    id: "USR003",
    email: "jarah@example.com",
    totalAmount: 3500.0,
    totalProjects: 1,
  },
  {
    id: "USR004",
    email: "sarah@example.com",
    totalAmount: 4500.0,
    totalProjects: 4,
  },
  {
    id: "USR005",
    email: "amelia@example.com",
    totalAmount: 5500.0,
    totalProjects: 5,
  },
  {
    id: "USR006",
    email: "emily@example.com",
    totalAmount: 2000.0,
    totalProjects: 6,
  },
  {
    id: "USR007",
    email: "alex@example.com",
    totalAmount: 3000.0,
    totalProjects: 7,
  },
];

const page = async () => {
  const sign = await get<string>("price-sign");
  return (
    <>
      <h1 className="text-2xl font-medium text-foreground">Заказчики</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Проектов</TableHead>
            <TableHead className="text-right">Заказов на стоимость</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.id}</TableCell>
              <TableCell>{customer.email.slice(0.6)}</TableCell>
              <TableCell>{customer.totalProjects}</TableCell>
              <TableCell className="text-right">
                {customer.totalAmount}
                {sign}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Всего</TableCell>
            <TableCell className="text-left">
              {customers
                .map((c) => c.totalProjects)
                .reduce((a, b) => a + b)
                .toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              {customers
                .map((c) => c.totalAmount)
                .reduce((a, b) => a + b)
                .toLocaleString()}
              {sign}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default page;
