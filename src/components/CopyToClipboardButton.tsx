import { CopyIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// Store a string to the user clipboard
const CopyToClipboardButton = ({ text }: { text: string }) => {
    const t = useTranslations("general")

    const [copiedText, setCopiedText] = useState<boolean>(false)

    return <Popover>
        <PopoverTrigger asChild>
            <CopyIcon size={18} className="cursor-pointer" onClick={async () => {
                //Copy the embed code
                await navigator.clipboard.writeText(text);
                //Set the copied flag
                setCopiedText(true);
            }} />
        </PopoverTrigger>
        <PopoverContent side="top" className="w-fit">
            {t(copiedText ? "copied" : "copy")}
        </PopoverContent>
    </Popover>
}

export default CopyToClipboardButton;