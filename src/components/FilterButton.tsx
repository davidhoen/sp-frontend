import { XIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

// This component renders button with a border
const FilterButton = ({ children, url, onClick, active }: { children: ReactNode, url?: string, onClick?: () => void, active?: boolean }) => {
    return (
        <ToggleGroup type="multiple">
            <ToggleGroupItem variant="outline" value="test">1</ToggleGroupItem>
            <ToggleGroupItem value="test1">2</ToggleGroupItem>
            <ToggleGroupItem value="test3">3</ToggleGroupItem>
        </ToggleGroup>
    )
}

export default FilterButton;