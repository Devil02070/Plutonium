import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef, ElementType } from "react"

type TypographyElement = HTMLHeadingElement | HTMLParagraphElement | HTMLElement
type FontWeight = "regular" | "medium" | "semibold" | "bold"

type TypographyTag =
    | "h1"
    | "h2"
    | "h3"
    | "p16"
    | "p14"
    | "p12"

interface TypographyProps extends HTMLAttributes<TypographyElement> {
    as?: TypographyTag
    weight?: FontWeight
}

const Typography = forwardRef<TypographyElement, TypographyProps>(
    ({ className, as = "p16", weight = "regular", children, ...props }, ref) => {
        const Component = (["h1", "h2", "h3"].includes(as) ? as : "p") as ElementType

        const weights: Record<FontWeight, string> = {
            regular: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
        }

        const variants: Record<TypographyTag, string> = {
            h1: "text-[22px]  lg:text-[28px] leading-[22px] lg:leading-[28px] font-manrope",
            h2: "text-[18px]  lg:text-[24px] leading-[18px] lg:leading-[24px] font-manrope",
            h3: "text-[14px]  lg:text-[20px] leading-[14px] lg:leading-[20px] font-manrope",

            p16: "text-[12px] md:text-[16px] leading-[16px] font-manrope",
            p14: "text-[10px] md:text-[14px] leading-[14px] font-manrope",
            p12: "text-[10px] md:text-[12px] leading-[12px] font-manrope",
        }

        return (
            <Component
                className={cn(variants[as], weights[weight], "text-foreground", className)}
                ref={ref}
                {...props}
            >
                {children}
            </Component>
        )
    }
)

Typography.displayName = "Typography"

export { Typography }

// Prebuilt exports
export const H1 = (props: TypographyProps) => <Typography as="h1" {...props} />
export const H2 = (props: TypographyProps) => <Typography as="h2" {...props} />
export const H3 = (props: TypographyProps) => <Typography as="h3" {...props} />

export const P16 = (props: TypographyProps) => <Typography as="p16" {...props} />
export const P14 = (props: TypographyProps) => <Typography as="p14" {...props} />
export const P12 = (props: TypographyProps) => <Typography as="p12" {...props} />
