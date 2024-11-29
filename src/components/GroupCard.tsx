"use client"

import { getFullName } from "@/lib";
import { useUser } from "@/providers/UserProvider";
import { GroupType } from "@/types";
import { ChevronRightIcon, UsersIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import UserAvatar from "./UserAvatar";
import { Link } from "@/i18n/routing";
import { Button } from "./ui/button";

export function GroupCard({ group }: { group: GroupType }) {
    const t = useTranslations("general")

    return (
        <Link href={`/student/groups/${group.id}`}>
            <div className="relative flex flex-col border rounded-lg px-4 py-3">

                {/* Name */}
                <div className="mb-4">
                    <span className="font-bold text-xl">{group.name}</span>
                </div>

                {/* Teachers */}
                <div>
                    <div className="flex gap-2 items-center">
                        {/* First teacher */}
                        {group.teachers.length > 0 && (
                            <div className="flex items-center gap-2">
                                <UserAvatar user={group.teachers[0]} />
                                <span>{getFullName(group.teachers[0])}</span>
                            </div>
                        )}
                        {/* Plus icon when more then one teacher is connected */}
                        {group.teachers.length > 1 && (
                            <div className="flex items-center h-fit gap-1 bg-border rounded-full text-xs p-1">
                                <span>+{group.teachers.length - 1}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chip for every connected skill */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {group.skills.map((skill) => (
                        <span key={skill.id} className="bg-primary text-white px-2 py-1 text-xs rounded-full">{skill.title}</span>
                    ))}
                </div>

                {/* Number of students with users icon */}
                <div className="flex items-center gap-2 mt-4">
                    <UsersIcon size={18} />
                    <span>{group.students.length} {t("students")}</span>
                </div>

                {/* Chevron right in the right corner of the component */}
                <Button variant="ghost" className="absolute bottom-2 right-2">
                    <ChevronRightIcon size={24} />
                </Button>
            </div>
        </Link>
    )
}
