"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CITIES } from "@/lib/cities";
import { cn } from "@/lib/utils";

/**
 * URL 쿼리 파라미터 `city`와 연동되는 도시 선택 Combobox.
 * 도시 선택 시 URL이 갱신되어 서버 컴포넌트(page.tsx)가 새 도시 데이터를 패칭한다.
 */
export function LocationSelect() {
  const [open, setOpen] = React.useState(false);
  const [cityId, setCityId] = useQueryState("city", {
    defaultValue: "seoul",
    shallow: false, // 서버 컴포넌트 재렌더링을 위해 shallow 비활성화
  });

  const selectedCity = CITIES.find((c) => c.id === cityId) ?? CITIES[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="도시 선택"
          className="w-48 justify-between bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white"
        >
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-sky-500 shrink-0" />
            {selectedCity.nameKo}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="start">
        <Command>
          <CommandInput placeholder="도시 검색..." />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {CITIES.map((city) => (
                <CommandItem
                  key={city.id}
                  value={city.nameKo}
                  onSelect={() => {
                    setCityId(city.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      cityId === city.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.nameKo}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
