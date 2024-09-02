"use client";

import * as React from "react";

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
import { useEffect, useState } from "react";
import { modelUsedCookie } from "@/lib/const";
import { modelList } from "@/lib/model";
import { getCookie } from "../ui/cookie";

export default function ModelComponent() {
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(modelList[0]);

    useEffect(() => {
        getCookie(modelUsedCookie) &&
            setSelectedStatus(
                modelList.find(
                    (model) => model.value === getCookie(modelUsedCookie),
                ) || modelList[0],
            );
    }, []);

    const onStatusChange = (value: string) => {
        setSelectedStatus(
            modelList.find((model) => model.value === value) || modelList[0],
        );

        // save the selected status to cookie
        document.cookie = `${modelUsedCookie}=${value}; path=/; max-age=31536000`;

        setOpen(false);
    };

    return (
        <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Model</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[150px] justify-start"
                    >
                        {selectedStatus ? (
                            <>{selectedStatus.label}</>
                        ) : (
                            <>+ Change model</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Change model..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {modelList.map((model) => (
                                    <CommandItem
                                        key={model.value}
                                        value={model.value}
                                        onSelect={(value) =>
                                            onStatusChange(value)
                                        }
                                    >
                                        {model.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
