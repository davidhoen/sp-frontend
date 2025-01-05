import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Tabs, TabsLinkTrigger, TabsList } from "./ui/tabs";

type NotificationTab = {
    href: string
    title: string
    icon: React.ReactNode
    badge: number
}

export default function TabsWithBadge({ defaultValue, tabs }: { defaultValue: string, tabs: NotificationTab[] }) {
    return (
        <Tabs value={defaultValue} className="w-fit">
            <TabsList className="flex gap-2.5">
                {tabs.map((tab) => (
                    <TabsLinkTrigger key={tab.href} href={tab.href} className={cn("relative px-4")}>
                        <span className="flex items-center space-x-2">
                            {tab.icon}
                            <span>{tab.title}</span>
                        </span>
                        {tab.badge > 0 && (
                            <Badge
                                variant="destructive"
                                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                            >
                                {tab.badge}
                            </Badge>
                        )}
                    </TabsLinkTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
