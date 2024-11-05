import { ReactNode, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useTranslations } from "next-intl"
import StarRating from "../StarRating"

const UpdateRatingModal = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("modals")
    const [rating, setRating] = useState(0)

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>{t("updateStarRating.title")}</DialogTitle>
                    <DialogDescription>{t("updateStarRating.description")}</DialogDescription>
                </DialogHeader>

                <div>
                    <StarRating rating={rating} onRatingChange={(newRating) => setRating(newRating)} allowEdit />
                    <p className="text-sm">{t("updateStarRating.selectNewRating")}</p>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">{t("cancel")}</Button>
                    </DialogClose>
                    <Button type="submit">{t("saveChanges")}</Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    )
}

export default UpdateRatingModal
