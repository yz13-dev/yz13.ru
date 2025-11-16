"use client";
import allStacks from "@yz13/registries/stack";
import { Button } from "@yz13/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@yz13/ui/dropdown-menu";
import { ArrowDownAZIcon, ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, ArrowDownZAIcon, CheckIcon, ListFilterIcon } from "@yz13/ui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";


export default function Filters() {

  const [stack, setStack] = useQueryState("stack", { shallow: false });

  const [sortBy, setSortBy] = useQueryState("sortBy", { shallow: false });
  const [order, setOrder] = useQueryState("order", { shallow: false });

  useEffect(() => {
    if (sortBy && !order) setOrder("asc");
    if (!sortBy) setOrder(null);
  }, [sortBy, order])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary"><ListFilterIcon /><span>Фильтры</span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Отфильтровать по</DropdownMenuLabel>
          {
            allStacks
              .map(item => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => setStack(item.id)}
                  >
                    <Icon className="fill-foreground" />
                    <span>{item.name}</span>
                    {
                      stack === item.id &&
                      <CheckIcon className="ml-auto" />
                    }
                  </DropdownMenuItem>
                )
              })
          }
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Сортировать по</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setSortBy("date")
              if (!order) setOrder("asc")
              if (order === "asc") setOrder("desc")
              if (order === "desc") setOrder(null)
            }}
          >
            <span>Дате создания</span>
            {
              sortBy === "date" &&
                order
                ?
                order === "asc"
                  ? <ArrowDownNarrowWideIcon />
                  : <ArrowDownWideNarrowIcon />
                : null
            }
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSortBy("name")
              if (!order) setOrder("asc")
              if (order === "asc") setOrder("desc")
              if (order === "desc") setOrder(null)
            }}
          >
            <span>Названию</span>
            {
              sortBy === "name" &&
                order
                ?
                order === "asc"
                  ? <ArrowDownAZIcon />
                  : <ArrowDownZAIcon />
                : null
            }
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export const FilterItem = ({
  children,
  filterKey
}: {
  filterKey?: string,
  children?: React.ReactNode
}) => {

  const searchParams = useSearchParams();
  const router = useRouter()

  const removeFilter = () => {
    if (!filterKey) return;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(filterKey);

    router.push(`?${newSearchParams.toString()}`);
  }

  return (
    <Button variant="secondary" size="sm" className="text-base group" onClick={removeFilter}>
      {children}
    </Button>
  )
}
