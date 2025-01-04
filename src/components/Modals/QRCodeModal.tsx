"use client"
import { Download } from "lucide-react"
import { useTranslations } from "next-intl"
import { useQRCode } from 'next-qrcode'
import { ReactNode, useRef, useState } from "react"
import toast from "react-hot-toast"
import CopyToClipboardButton from "../CopyToClipboardButton"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

const QRCodeModal = ({ children, path, title }: { children: ReactNode, path: string, title: string }) => {
  const t = useTranslations("general")
  const { Image } = useQRCode()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const url = `${window.location.origin}${path}`

  const handleDownload = async () => {
    if (!qrRef.current) return

    try {
      // Get the QR code image from the rendered component
      const qrImage = qrRef.current.querySelector('img')
      if (!qrImage) return

      // Create a canvas and draw the image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size to match image
      canvas.width = qrImage.naturalWidth
      canvas.height = qrImage.naturalHeight

      // Draw image to canvas
      ctx.drawImage(qrImage, 0, 0)

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `qr-code-${title.toLowerCase().replace(/\s+/g, '-')}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
      }, 'image/png', 1.0)
    }
    catch (error) {
      toast.error(t("genericError"))
      console.error('Error downloading QR code:', error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">

          {/* QR code */}
          <div ref={qrRef}>
            {/* Will result in a build warning for a missing alt tag. The QR package does not support that. We have to ignore it. */}
            <Image
              text={url}
              options={{
                type: 'image/png',
                quality: 1.0,
                errorCorrectionLevel: 'L',
                margin: 3,
                scale: 10,
                width: 900,
                color: {
                  dark: "#000000",
                },
              }}
            />
          </div>

          <div className="flex justify-between items-center bg-border p-2 rounded-lg overflow-x-auto">
            <div className="flex-1">{url}</div>
            <div className="px-2"><CopyToClipboardButton text={url} /></div>
          </div>

        </div>
        <DialogFooter>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            {t("downloadQrCode")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QRCodeModal