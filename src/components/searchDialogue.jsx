import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Key, Tag, Calendar } from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

const SearchDialogue = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='relative w-fit flex gap-3 p-3'>
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <p>Search Docs</p>
          <Badge className={'bg-zinc-300 text-black hover:bg-zinc-300'}>
            ⌘K
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className={'p-0'}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Advanced Search">
              <CommandItem>
                <Search className="mr-2 h-4 w-4" />
                <span>Full-text Search</span>
              </CommandItem>
              <CommandItem>
                <Key className="mr-2 h-4 w-4" />
                <span>Keyword Search</span>
              </CommandItem>
              <CommandItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>Search by Tag</span>
              </CommandItem>
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Search by Date</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialogue;