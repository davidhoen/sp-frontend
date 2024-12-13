"use client";

import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationLink } from "./ui/pagination";
import { useTranslations } from "next-intl";

type Props = {
    itemCount: number;
    pageSize: number;
    currentPage: number;
    entityKey?: string;
};

const PaginationComponent = ({ itemCount, pageSize, currentPage, entityKey }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations("pagination");

    const generatePaginationLinks = () => {
        const paginationLinks = [];
        const leftEllipsis = currentPage > 2;
        const rightEllipsis = currentPage < pageCount - 1;

        for (let i = 1; i <= pageCount; i++) {
            if (
                i === 1 ||
                i === pageCount ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                paginationLinks.push(
                    <PaginationLink
                        key={i}
                        onClick={() => changePage(i)}
                        isActive={currentPage === i}
                    >
                        {i}
                    </PaginationLink>
                );
            }
        }

        if (leftEllipsis) {
            paginationLinks.splice(1, 0, <PaginationEllipsis key="left" />);
        }
        if (rightEllipsis) {
            paginationLinks.splice(
                paginationLinks.length - 1,
                0,
                <PaginationEllipsis key="right" />
            );
        }

        return paginationLinks;
    };

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(entityKey ? `${entityKey}Page` : "page", page.toString());
        router.push("?" + params.toString(), { scroll: false });
    };
    return (
        <Pagination>
            <PaginationContent className="cursor-pointer">
                <Button
                    variant="ghost"
                    disabled={currentPage <= 1}
                    onClick={() => changePage(currentPage - 1)}
                    className="group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-all duration-300 delay-150" />{" "}
                    <span className="hidden sm:block">{t("previous")}</span>
                </Button>
                {generatePaginationLinks()}
                <Button
                    variant="ghost"
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(currentPage + 1)}
                    className="group"
                >
                    <span className="hidden sm:block">{t("next")}</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-all duration-300 delay-150" />
                </Button>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;