import { type ComponentProps } from "react"
import Button from "@/components/shared/button"
import Link from 'next/link'
import { type LinkData } from "@/lib/urls"
import { urlToRelative } from "@/components/shared/cms_link"

export type BaseCTAProps = { 
    href?: LinkData | null,
    text?: string | null,
    buttonType?: ComponentProps<typeof Button>['buttonType'] | "link"
    buttonColor?: ComponentProps<typeof Button>['buttonColor']
} & Omit<JSX.IntrinsicElements['div'], 'href' | 'text'>

export function BaseCTA({ href, text = 'Call-to-action', buttonType = "primary", buttonColor = "default", className, ...additionalProps }: BaseCTAProps ) {
    const hrefUrl = href ? new URL(href.default ?? '/', href.base ?? 'https://example.com') : undefined

    if (!hrefUrl)
        return <div className='cta w-full' { ...additionalProps }>
            <span className={ className }>{ text }</span>
        </div>

    return <div className="cta w-full" { ...additionalProps }>
        { buttonType == "link" ? 
            <Link href={ urlToRelative(hrefUrl) } className={ className }>{ text }</Link> : 
            <Button url={ urlToRelative(hrefUrl) } buttonType={ buttonType } buttonVariant="cta" className={ className } buttonColor={ buttonColor }>{ text }</Button> 
        }
    </div>
}

export default BaseCTA