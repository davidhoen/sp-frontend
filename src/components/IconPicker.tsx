import { icons, Loader2Icon, LucideIcon } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

interface IconPickerProps {
    value: string
    onChange: (value: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
    const t = useTranslations("general")

    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    const filteredIcons = useMemo(() => {
        return Object.entries(icons)
            .filter(([displayName]) => displayName.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [searchTerm])

    // Simulate loading state for icons
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    const SelectedIcon = value && icons[value as keyof typeof icons] as LucideIcon | undefined
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(true)}
                className="w-full justify-start text-left font-normal"
            >
                <div className="flex items-center gap-2">
                    {SelectedIcon ? <SelectedIcon size={16} /> : <div className="h-4 w-4" />}
                    <span>{value || t("selectIcon")}</span>
                </div>
            </Button>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{t("selectIcon")}</DialogTitle>
                    <DialogDescription>{t.rich("iconPickerDescription", {
                        link: (chunks) => <u><Link href="https://lucide.dev/icons/?focus" target="_blank" rel="noopener noreferrer">{chunks}</Link></u>
                    })}</DialogDescription>
                </DialogHeader>
                <div className="p-4">
                    <Input
                        placeholder={t("searchIcons")}
                        value={searchTerm}
                        onChange={({ target: { value } }) => setSearchTerm(value)}
                        className="mb-4"
                    />
                    <ScrollArea className="h-[300px]">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2Icon className="h-8 w-8 animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-8 gap-2">
                                {filteredIcons.map((icon) => {
                                    const Icon = icon[1] as LucideIcon
                                    const name = Icon.displayName
                                    return <Button
                                        key={name}
                                        variant="outline"
                                        className="h-10 w-10 p-0"
                                        onClick={() => {
                                            if (name)
                                                onChange(name.replace("Icon", ""))
                                            setOpen(false)
                                        }}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Button>
                                })}
                            </div>
                        )}
                    </ScrollArea>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">{t("cancel")}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}